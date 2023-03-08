<template>
    <div class="vr_hospital-container">
        <div id="vr_hospital-three" ref="threeDom"></div>
        <div class="vr_hospital-tip" ref="tipBox" v-if="showTip" :style="tipStyle">
            <div v-if="tipContent.type === 'tip'">
                <div>{{ tipContent.tip }}</div>
            </div>
            <div v-else-if="tipContent.type === 'title'">
                {{ tipContent.title }}
            </div>
        </div>
    </div>
</template>

<script>
import * as THREE from "three"
import gsap from "gsap"
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { sceneList } from "@/page/webvr/utils/tips"
import { nextTick } from 'vue'
export default {
    data() {
        return {
            scene: null,
            camera: null,
            model: null,
            controller: null,
            renderer: null,
            group: null,
            sceneList: sceneList,
            currentScene: null,
            tipContent: {
                tip: "",
                title: "",
                type: "tip"
            }, //当前展示的tip的信息
            spriteList: [] ,
            showTip: false,
            tipStyle: {
                left: "-100%",
                top: "-100%"
            }
        }
        
    },
    methods: {
        // 初始化场景
        initScene() {
            this.scene = new THREE.Scene(); //初始化场景
            var ambient = new THREE.AmbientLight(0x444444, 3); //添加光源  颜色和光照强度
            var axisHelper = new THREE.AxesHelper(600); //添加辅助坐标系 参数位辅助坐标系的长度
            this.scene.add(ambient, axisHelper); //向场景中添加光源 和 辅助坐标系
        },
        // 初始化相机
        initCamera() {
            this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000); //使用透视相机
            this.camera.position.set(0, 0, 10); //设置相机位置
            this.camera.lookAt(new THREE.Vector3(0, 0, 0)); // 相机看向
        },
        // 初始化场景中的模型
        initModel() {
            
            var textureLoader = new THREE.TextureLoader(); //创建纹理贴图			
            var img = textureLoader.load(this.currentScene.image);
            var geometry = new THREE.SphereGeometry(130, 256, 256); // 球体网格模型
            // 将2d全景图作为该模型的贴图材质
            var material = new THREE.MeshLambertMaterial({
                map: img, //设置颜色贴图属性值
                side: THREE.DoubleSide, //双面渲染
            });
            var meshSphere = new THREE.Mesh(geometry, material); //网格模型对象Mesh	
            geometry.scale(1,1,-1);
            meshSphere.name = '球体容器';
            this.model = meshSphere;
            this.scene.add(this.model);
        },
        // 初始化渲染器
        initRenderer() {
            this.renderer = new THREE.WebGLRenderer(); //创建渲染器
            this.renderer.setClearColor(0xffffff); //添加背景颜色
            this.renderer.setSize(window.innerWidth, window.innerHeight); // 设定渲染器尺寸
            this.$refs.threeDom.appendChild(this.renderer.domElement); //通过 this.$refs获取页面的dom将场景初始化上去
        },
        // 初始化轨道控制器
        initController() {
            this.controller = new OrbitControls(this.camera, this.$refs.threeDom); // 初始化控制器
            this.controller.target.set(0, 0, 0); // 设置控制器的焦点，使控制器围绕这个焦点进行旋转
            this.controller.minDistance = 10; // 设置移动的最短距离（默认为零）
            this.controller.maxPolarAngle = Math.PI; //绕垂直轨道的距离（范围是0-Math.PI,默认为Math.PI）
            this.controller.maxDistance = 30; // 设置移动的最长距离（默认为无穷）
            this.controller.enablePan = false; //禁用右键功能
        },
        /**
         * @description 添加标签
         * @param {{position:{x:number;y:number;z:number};content:{}}} tip 
         */
        addTip(tip) {
            let tipTexture = new THREE.TextureLoader().load(
                require("@/assets/tip.png")
            );
            let material = new THREE.SpriteMaterial({ map: tipTexture });
            let sprite = new THREE.Sprite(material);
            sprite.scale.set(10, 10, 10);
            sprite.position.set(tip.position.x, tip.position.y, tip.position.z); // 设置标签位置
            sprite.content = tip.content; // 设置标签内容
            this.spriteList.push(sprite);
            this.scene.add(sprite);
        },
        // 初始化页面中的所有标签
        initTips() {
            this.currentScene.tipList.forEach(item => {
                this.addTip(item)
            })
        },
        // 刷新页面
        refresh() {
            this.renderer.render(this.scene,this.camera)

            // 屏幕每刷新一帧都需要渲染
            requestAnimationFrame(this.refresh)
        },
        initVR() {
            this.initScene();

            this.initCamera();
            this.initModel();
            this.initRenderer();
            this.initController();
            this.initTips();

            this.initClick();
            this.refresh();
        },

        // 更换场景
        changeScene(index) {
            console.log(this.sceneList,index)
            this.scene.children = this.scene.children.filter(item => {
                return String(item.type) !== "Sprite"
            })
            this.spriteList = []
            this.currentScene = this.sceneList[index];
            // 加载新场景的材质
            let texture = new THREE.TextureLoader().load(this.currentScene.image);
            let sphereMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 0,
            });

            // 为场景中的模型更换材质
            this.model.material = sphereMaterial;

            gsap.to(sphereMaterial, { transparent: false, opacity: 1, duration: 2 });
            this.camera.updateProjectionMatrix();
            this.initTips();
            this.refresh();
        },

        initClick() {
            this.$refs.threeDom.addEventListener("click",(e) => {
                e.preventDefault();
                let element = this.$refs.threeDom;
                let raycaster = new THREE.Raycaster();
                let mouse = new THREE.Vector2();
                mouse.x = (e.clientX / element.clientWidth) * 2 - 1;
                mouse.y = -(e.clientY / element.clientHeight) * 2 + 1;
                raycaster.setFromCamera(mouse, this.camera);
                let intersects = raycaster.intersectObjects(this.spriteList, true);
                console.log(intersects)
                if (intersects.length > 0 && intersects[0].object.content.type === "title") {
                    
                    this.changeScene(intersects[0].object.content.directTo);
                    this.hideTip(e);
                }
            })
        },

        onMousemove(e) {
            e.preventDefault();
            let element = this.$refs.threeDom;
            let raycaster = new THREE.Raycaster();
            let mouse = new THREE.Vector2();
            // 通过鼠标移动到的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.
            mouse.x = (e.clientX / element.clientWidth) * 2 - 1;
            mouse.y = -(e.clientY / element.clientHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, this.camera);
            // 将标签精灵数据放进来做视线交互
            let intersects = raycaster.intersectObjects(this.spriteList, true);   
            if(intersects.length > 0) { //如果目光射线和标签之间具有交点的话
                // 将标签的空间坐标转屏幕坐标，通过计算赋给元素的top、left
                this.showTip = true;
                nextTick(() => {
                    let elementWidth = element.clientWidth / 2;
                    let elementHeight = element.clientHeight / 2;
                    let worldVector = new THREE.Vector3(
                        intersects[0].object.position.x,
                        intersects[0].object.position.y,
                        intersects[0].object.position.z
                    );
                    let position = worldVector.project(this.camera); //将三维坐标转为二维坐标
                    this.tipContent = intersects[0].object.content;
                    if(this.tipContent.type === "title") { // 显示标题 
                        let left = Math.round(
                            elementWidth * position.x +
                            elementWidth - 
                            document.getElementsByClassName("vr_hospital-tip")[0].clientWidth / 2 + 
                            10
                        );
                        let top = Math.round(-elementHeight * position.y + 
                            elementHeight + 
                            document.getElementsByClassName("vr_hospital-tip")[0].clientHeight / 2 - 
                            10
                        );
                        this.tipStyle = {
                            left: `${left}px`,
                            top: `${top}px`
                        }

                        setTimeout(() => {
                            document.getElementsByClassName("vr_hospital-tip")[0].style.transition = "top .5s ease";
                            document.getElementsByClassName("vr_hospital-tip")[0].style.visibility = "visible";
                            let top = Math.round(-elementHeight * position.y + 
                                elementHeight + 
                                document.getElementsByClassName("vr_hospital-tip")[0].clientHeight / 2 +
                                5
                            );
                            this.tipStyle.top = `${top}px`
                        },100)
                    } else if(this.tipContent.type === "tip") { // 显示标签
                        console.log(document.getElementsByClassName("vr_hospital-tip")[0].clientWidth)
                        let left = Math.round(
                            elementWidth * position.x +
                            elementWidth - 
                            document.getElementsByClassName("vr_hospital-tip")[0].clientWidth / 2 + 
                            10
                        );
                        let top = Math.round(
                            -elementHeight * position.y +
                            elementHeight -
                            document.getElementsByClassName("vr_hospital-tip")[0].clientHeight / 2 +
                            10
                        );

                        this.tipStyle = {
                            left: `${left}px`,
                            top: `${top}px`
                        }

                        setTimeout(() => {
                            document.getElementsByClassName("vr_hospital-tip")[0].style.transition = "top .5s ease";
                            document.getElementsByClassName("vr_hospital-tip")[0].style.visibility = "visible"
                            let top = Math.round(-elementHeight * position.y + 
                                elementHeight - 
                                document.getElementsByClassName("vr_hospital-tip")[0].clientHeight / 2 -
                                25
                            );
                            this.tipStyle.top = `${top}px`
                        },100)
                    }
                })
            }

            if(intersects.length === 0) {
                this.hideTip();
            }
        },

        hideTip() {
            if(document.getElementsByClassName("vr_hospital-tip")[0]) {
                document.getElementsByClassName("vr_hospital-tip")[0].style.visibility = ""
            }
            
            this.showTip = false;
            
            this.tipStyle = {
                left: "-100%",
                top: "-100%"
            }
            this.tipContent = {
                tip: "",
                title: "",
                type: "tip"
            }
        }
    },
    created() {
        this.currentScene = sceneList[0];
        this.sceneList = sceneList;
    },
    mounted() {
        this.initVR();

        this.$refs.threeDom.addEventListener("mousemove", this.onMousemove)
        
    }
}
</script>

<style lang="less" scoped>
.vr_hospital-tip {
    position: absolute;
    background: rgba(0,0,0,0.5);
    padding: 5px;
    color: #fff;
    font-size: 12px;
    border-radius: 2px;
    visibility: hidden;
}
</style>