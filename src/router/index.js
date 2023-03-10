import Router from "vue-router"

export default new Router({
    routes:[
        { path:"/vr",component:()=>import("@/page/webvr/HospitalVR.vue") }
    ]
})