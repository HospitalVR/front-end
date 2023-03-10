import VueRouter from "vue-router"
// 路由的配置信息
export default new VueRouter({
    routes:[
        { path: "/", redirect: "/home" },
        { path:"/vr",component:()=>import("@/page/webvr/HospitalVR.vue") },
        { path: "/case",component: ()=>import("@/page/case/Case.vue") },
        { path: "/home",component:()=>import("@/page/home/Home.vue") }
    ]
})