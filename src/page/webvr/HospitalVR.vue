<template>
    <div class="vr_hospital-container" ref="vr">
        <transition name="vr">
            <div class="vr_hospital-info" v-if="showInfo">VR模式</div>
        </transition>
        <div class="vr_hospital-room" v-if="showInfo === false">
            <span>{{ currentScene.name }}</span>
        </div>
        <div class="vr_hospital-three" ref="threeDom"></div>
        <div class="vr_hospital-scene">
            <div class="vr_hospital-icon" @click="handleShowList">
                <svg t="1678412736341" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2761" width="30" height="30">
                    <path d="M975.1 496l-95.4-96.3c24.3-30.9 38.8-69.9 38.8-112.2 0-100.4-81.6-182-182-182s-182 81.6-182 182 81.6 182 182 182c42.2 0 81.2-14.5 112.1-38.7l95.3 96.2c4.3 4.3 10 6.5 15.6 6.5s11.2-2.1 15.5-6.4c8.6-8.5 8.7-22.5 0.1-31.1z m-238.6-70.5c-76.1 0-138-61.9-138-138s61.9-138 138-138 138 61.9 138 138-61.9 138-138 138zM386 555H188c-45.2 0-82 36.8-82 82v198c0 45.2 36.8 82 82 82h198c45.2 0 82-36.8 82-82V637c0-45.2-36.8-82-82-82z m38 280c0 21-17 38-38 38H188c-21 0-38-17-38-38V637c0-21 17-38 38-38h198c21 0 38 17 38 38v198zM386 153H188c-45.2 0-82 36.8-82 82v198c0 45.2 36.8 82 82 82h198c45.2 0 82-36.8 82-82V235c0-45.2-36.8-82-82-82z m38 280c0 21-17 38-38 38H188c-21 0-38-17-38-38V235c0-21 17-38 38-38h198c21 0 38 17 38 38v198zM790 555H592c-45.2 0-82 36.8-82 82v198c0 45.2 36.8 82 82 82h198c45.2 0 82-36.8 82-82V637c0-45.2-36.8-82-82-82z m38 280c0 21-17 38-38 38H592c-21 0-38-17-38-38V637c0-21 17-38 38-38h198c21 0 38 17 38 38v198z" p-id="2762">
                    </path>
                </svg>
                <div>选择场景</div>
            </div>
            <transition name="list">
                <div class="vr_hospital-list" v-show="showList">
                    <div class="vr_hospital-item" v-for="(item,index) in sceneList" :key="index" @click="() => changeScene(index)">
                        <img :src="item.image" alt="">
                        <div>{{ item.name }}</div>
                    </div>
                </div>
            </transition>
            
        </div>
        <div class="vr_hospital-tip" ref="tipBox" v-if="showTip" :style="tipStyle">
            <div v-if="tipContent.type === 'tip'">
                <div>{{ tipContent.tip }}</div>
            </div>
            <div v-else-if="tipContent.type === 'title'">
                {{ tipContent.title }}
            </div>
        </div>
        <transition name="room">
            <div class="vr_hospital-roomInfo" v-if="showRoomInfo">
                <div class="vr_hospital-iconContainer"><i class="el-icon-close" @click="showRoomInfo = false"></i></div>
                <div class="vr_hospital-roomDetail">
                    <h3>科室介绍</h3>
                    <p>{{ currentScene.desc[0] }}</p>
                </div>
                <div class="vr_hospital-btn" @click="$router.push(`/detail?room=${currentScene.name}`)">点击查看科室详情</div>
            </div>
        </transition>
        <div class="vr_hospital-close" @click="$router.push('/home')">
            <span>退出导览系统</span>
        </div>
    </div>
</template>

<script>
import * as THREE from "three"
import gsap from "gsap"
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js"
import { sceneList } from "@/page/webvr/utils/tips"
import { nextTick } from 'vue'

export default {
    name: "HospitalVR",
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
            clock: null,
            mode: "orbit",
            tipContent: {
                tip: "",
                title: "",
                type: "tip"
            }, //当前展示的tip的信息
            spriteList: [] ,
            showTip: false,
            showInfo: false,
            showList: false,
            showRoomInfo: false,
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
            // var axisHelper = new THREE.AxesHelper(600); //添加辅助坐标系 参数位辅助坐标系的长度
            this.scene.add(ambient); //向场景中添加光源 和 辅助坐标系
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
            this.renderer = new THREE.WebGLRenderer({
                    antialias: true, // 抗锯齿
                }
            ); //创建渲染器
            this.renderer.setClearColor(0xffffff); //添加背景颜色
            this.renderer.setSize(window.innerWidth, window.innerHeight); // 设定渲染器尺寸
            this.$refs.threeDom.appendChild(this.renderer.domElement); //通过 this.$refs获取页面的dom将场景初始化上去
        },
        // 初始化轨道控制器
        initOrbitController() {
            this.controller && this.controller.dispose();
            this.controller = new OrbitControls(this.camera, this.$refs.threeDom); // 初始化控制器
            this.controller.target.set(0, 0, 0); // 设置控制器的焦点，使控制器围绕这个焦点进行旋转
            this.controller.minDistance = 10; // 设置移动的最短距离（默认为零）
            this.controller.maxPolarAngle = Math.PI; //绕垂直轨道的距离（范围是0-Math.PI,默认为Math.PI）
            this.controller.maxDistance = 30; // 设置移动的最长距离（默认为无穷）
            this.controller.enablePan = false; //禁用右键功能
        },

        // 初始化第一人称控制器
        initFirstPersonController() {
            this.controller && this.controller.dispose();
            this.controller = new PointerLockControls(this.camera, this.renderer.domElement)
            this.controller.addEventListener("lock",() => {
                console.log("鼠标锁定")            
            })
            this.controller.lock()
        },
        /**
         * @description 添加标签
         * @param {{position:{x:number;y:number;z:number};content:{}}} tip 
         */
        addTip(tip) {
            let source = null;
            if(tip.content.type === "tip") {
                source = require("@/assets/vr/tip.png")
            } else {
                source = require("@/assets/vr/title.png")
            }
            let tipTexture = new THREE.TextureLoader().load(
                source
            );
            let material = new THREE.SpriteMaterial({ map: tipTexture });
            let sprite = new THREE.Sprite(material);
            sprite.scale.set(10, 10, 10);
            sprite.position.set(tip.position.x, tip.position.y, tip.position.z); // 设置标签位置
            sprite.content = tip.content; // 设置标签内容
            sprite.tip = tip;
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
            const delta = this.clock.getDelta() //获取自上次调用的时间差
            console.log(delta)
            this.controller.update && this.controller.update(delta)
            this.renderer.render(this.scene,this.camera)

            // 屏幕每刷新一帧都需要渲染
            requestAnimationFrame(this.refresh)
        },
        initVR() {
            this.clock = new THREE.Clock()
            this.initScene();

            this.initCamera();
            this.initModel();
            this.initRenderer();
            this.initOrbitController();
            this.initTips();

            this.initClick();
            this.initResize();
            this.refresh();
        },

        // 更换场景
        changeScene(index) {
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
                if (intersects.length > 0 && intersects[0].object.content.type === "title") {
                    
                    this.changeScene(intersects[0].object.content.directTo);
                    this.hideTip(e);
                } else if(intersects.length > 0 && intersects[0].object.content.type === "tip") {
                    let tip =  intersects[0].object.tip;
                    this.showRoomsInfo(tip);
                }
            })
        },

        // 监听window的尺寸变化
        initResize() {
            window.addEventListener("resize",() => {
                // 重新设置相机的视角
                this.camera.aspect = window.innerWidth / window.innerHeight;
                // 更新相机的投影矩阵
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(window.innerWidth,window.innerHeight);
                this.renderer.setPixelRatio(window.devicePixelRatio)
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
                            if(!document.getElementsByClassName("vr_hospital-tip")[0]) return;
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
                            if(!document.getElementsByClassName("vr_hospital-tip")[0]) return;
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

        // 该函数用于展示房间的描述信息
        showRoomsInfo(tip) {
            console.log(tip)
            this.showRoomInfo = true;
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
        },

        handleShowList() {
            this.showList = !this.showList;
        }
    },
    created() {
        this.currentScene = sceneList[0];
        this.sceneList = sceneList;
    },
    mounted() {
        this.initVR();

        this.$refs.threeDom.addEventListener("mousemove", this.onMousemove)
        document.addEventListener("keypress", (e) => {
            if(e.key === "f") {
                if(this.mode === "orbit") {
                    // 进入第一人称视角
                    this.mode = "firstperson"
                    this.showInfo = true;
                    if(!document.fullscreenElement && document.fullscreenEnabled) {
                        this.$refs.vr.requestFullscreen();
                    }
                    this.initFirstPersonController();
                    
                } else {
                    // 进入轨道控制器视角
                    this.mode = "orbit"
                    this.showInfo = false;
                    document.exitFullscreen(); //退出全屏
                    this.controller.unlock();
                    this.initOrbitController();
                }
            }
        })

        document.addEventListener("fullscreenchange",(e ) => {
            e.preventDefault();
        })
    } 
}
</script>

<style lang="less" scoped>
.vr_hospital-container {
    position: relative;
    height: 100vh;
    width: 100vw;
    .vr_hospital-tip {
        position: absolute;
        background: rgba(0,0,0,0.5);
        padding: 5px;
        color: #fff;
        font-size: 12px;
        border-radius: 2px;
        visibility: hidden;
    }
    .vr_hospital-three {
        width: 100%;
        height: 100%;
    }
    .vr_hospital-info {
        position: absolute;
        top: 20px;
        padding: 10px 20px;
        border-radius: 15px;
        background: rgba(0,0,0,0.4);
        font-size: 20px;
        color: #fff;
        left: 50%;
        transform: translateX(-50%);

    }

    .vr_hospital-room {
        position: absolute;
        top: 40px;
        padding: 5px 10px;
        border-radius: 10px;
        height: 40px;
        background: rgba(0,0,0,0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 18px;
        left: 50%;
        transform: translateX(-50%);
        cursor: pointer;
    }

    .vr_hospital-scene {
        position: absolute;
        bottom: 20px;
        padding: 0 40px;
        display: flex;
        align-items: center;
        .vr_hospital-icon {
            width: 80px;
            height: 80px;
            background: rgba(0,0,0,0.4);
            border-radius: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            color: #fff;
            cursor: pointer;
            svg {
                fill: #fff;
            }
        }
        .vr_hospital-list {
            width: 80vw;
            box-sizing: border-box;
            padding: 10px;
            background: rgba(0,0,0,0.4);
            border-radius: 5px;
            margin-left: 15px;
            display: flex;
            align-items: center;
            overflow-x: scroll;
            .vr_hospital-item {
                margin-left: 15px;
                transition: transform .2s ease;
                display: flex;
                flex-direction: column;
                align-items: center;
                img {
                    width: 150px;
                    height: auto;
                    border-radius: 10px;
                }
                div {
                    color: #fff;
                }
                &:hover {
                    transform: scale(1.1);
                }
            }
        }
    }

    .vr_hospital-close {
        background: rgba(0,0,0,0.5);
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        padding: 5px 10px;
        border-radius: 5px;
        position: absolute;
        top: 40px;
        right: 10px;
        cursor: pointer;
    }

    .vr_hospital-roomInfo {
        overflow: hidden;
        background: rgba(0,0,0,0.5);
        border-radius: 10px;
        width: 400px;
        min-height: 200px;
        box-sizing: border-box;
        padding: 5px 10px;
        color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        cursor: pointer;
        .vr_hospital-iconContainer {
            margin-bottom: 10px;
            i {
                float: right;
                margin-right: 5px;
            }
        }
        .vr_hospital-roomDetail {

            h3 {
                background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff);
                background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 24px;
                font-weight: 600;
            }
            p {
                font-size: 15px;
                margin-top: 20px;
            }
        }
        .vr_hospital-btn {
            display: inline-block;
            margin-top: 10px;
            margin-left: 50%;
            transform: translateX(-50%);
            padding: 10px;
            background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff);
            border-radius: 10px;
        }
    }

    .vr-enter,.vr-leave-to {
        transform: translateY(-20px);
        opacity: 0;
    }
    .vr-enter-active,.vr-leave-active {
        transition: all .3s ease;
    }

    .list-enter,.list-leave-to {
        width: 0;
        height: 0;
    }

    .list-enter-active,.list-leave-active {
        transition: width .5s ease;
    }

    .room-enter,.room-leave-to {
       opacity: 0;
    }

    .room-enter-active,.room-leave-active {
        transition: width  .5s ease;
    }
}

</style>