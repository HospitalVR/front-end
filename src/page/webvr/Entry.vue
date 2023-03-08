<template>
    <div id="vr_entry-container" ref="vr"></div>
</template>

<script>
import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls'
export default {
    name: "Entry",
    data() {
        return {
            scene: null, // 场景
            camera: null, // 相机
            renderer: null, // 渲染器
            object: null, // 3d场景中的物品
            controls: null // 轨道控制器
        }
    },
    methods: {
        animate() {
            this.renderer.render( this.scene, this.camera );
            this.controls.update()
            // 请求动画帧，即在下一次页面刷新之后传入函数会被调用
            window.requestAnimationFrame( this.animate );
        }
    },
    mounted() {
        // created事件钩子
        // 创建场景
        this.scene = new THREE.Scene()

        // 创建相机
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.z = 5;
        this.scene.add(this.camera)
        // 创建渲染器
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(window.innerWidth,window.innerHeight)
        this.$refs.vr.appendChild(this.renderer.domElement)

        // 创建3D模型,网格模型 = 基本模型 + 材质贴图
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // material -- 材质
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        this.scene.add( cube );

        const axes = new THREE.AxesHelper(5);
        this.scene.add(axes);
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.update()
        this.controls.enableDamping = true;
        // 开始逐帧渲染场景
        this.animate()
    }
}
</script>

<style scoped lang="less">
#vr_entry-container {
    width: 100vw;
    height: 100vh;
    background: skyblue;
    padding: 0;
    margin: 0;
}
</style>