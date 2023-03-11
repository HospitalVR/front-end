import VueRouter from "vue-router"
// 路由的配置信息
export default new VueRouter({
    routes:[
        { path: "/", redirect: "/home" },
        { path:"/vr",component:()=>import("@/page/webvr/HospitalVR.vue") },
        { path: "/home", component: () => import("@/page/home/Home.vue") },
        { path: "/add_disease", component: () => import("@/page/disease_viewer/Add_disease.vue") },
        { path: "/case_list", component: () => import("@/page/disease_viewer/Case_list.vue") },
        { path: "/disease_view", component: () => import("@/page/disease_viewer/Disease_view.vue") },
        { path: "/edit_disease", component: () => import("@/page/disease_viewer/Edit_disease.vue") }
    ]
})