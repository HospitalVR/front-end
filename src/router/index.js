import VueRouter from "vue-router"
import { store } from "@/store"
import { NetLoader } from "@/net"
// 路由的配置信息
const router = new VueRouter({
    routes:[
        { path: "/", redirect: "/home" },
        { path:"/vr",component:()=>import("@/page/webvr/HospitalVR.vue") },
        { path: "/login", component: () => import("@/page/login/Login.vue")},
        {   
            path: "/home", 
            component: () => import("@/page/home/Home.vue"),
            children:[
                {
                    path: "case_list",
                    component: () => import("@/page/disease_viewer/Case_list.vue")
                },
                {
                    path: "add_disease",
                    component: () => import("@/page/disease_viewer/Add_disease.vue")
                },
                {
                    path: "disease_view",
                    component: () => import("@/page/disease_viewer/Disease_view.vue")
                },
                {
                    path: "edit_disease",
                    component: () => import("@/page/disease_viewer/Edit_disease.vue")
                },
                {
                    path: "role",
                    component: () => import("@/page/role/Role.vue"),
                    children:[
                        {
                            path: "detail",
                            component: () => import("@/page/role/RoleDetail.vue")
                        }
                    ]
                },
                {
                    path: "roleDetail",
                    component: () => import("@/page/role/RoleDetail.vue")
                }
            ] 
        },
        {
            path: "/admin",
            component: () => import("@/page/admin/Admin.vue"),
            children:[
                {
                    path: "user",
                    component: () => import("@/page/admin/User.vue")
                },
                {
                    path: "case",
                    component: () => import("@/page/disease_viewer/Case_list.vue")
                }
            ]
        }
    ]
})


const net = new NetLoader("test");

router.beforeEach((to,from,next) => {
    switch(to.path) {
        case "/home":
            store.commit("changePath",{
                index: 0,
                router: to,
                name: "首页"
            })
            break;
        case "/home/case_list":
            store.commit("changePath",{
                index: 1,
                router: to,
                name: "病例管理"
            })
            break;
        case "/home/role":
            store.commit("changePath",{
                index: 1,
                router: to,
                name: "角色扮演"
            })
            break;
        case "/home/roleDetail":
            let name = "";
            switch(to.query.role) {
                case "yizhu":
                    name = "医助"
                    break;
                case "shouyi":
                    name = "兽医";
                    break;
                case "qiantai":
                    name = "前台";
                    break;
                default:
                    name = "游客"
            }
            store.commit("changePath",{
                index: 2,
                router: to,
                name
            })
            break;
    }
    next();
})


router.beforeEach((to,from,next) => {
    let path = to.path;
    if(/\/admin(\/)?.*/g.test(path)) {
        //TODO 如果是想访问后台页面的话则需要发送请求进行验证，这部分需要和后端对接
        store.commit("changeType","admin")
        next();
    } else {
        next();
    }
})
export default router;