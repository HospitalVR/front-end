import VueRouter from "vue-router"
import Vue from "vue"
import { store } from "@/store"
import { NetLoader } from "@/net"

Vue.use(VueRouter)

// 路由的配置信息
const router = new VueRouter({
    routes:[
        { path: "/", redirect: "/home" },
        { path:"/vr",component:()=>import("@/page/webvr/HospitalVR.vue") },
        { path: "/detail", component: () => import("@/page/room/RoomDetail.vue") },
        { path: "/login", component: () => import("@/page/login/Login.vue")},
        {   
            path: "/home", 
            component: () => import("@/page/home/Home.vue"),
            children:[
                {
                    path: "",
                    redirect: "main"
                },
                {
                    path: "main",
                    component: () => import("@/page/home/Main.vue")
                },
                {
                    path: "case_list",
                    component: () => import("@/page/disease_viewer/Case_list.vue")
                },
                {
                    path: "disease_view",
                    component: () => import("@/page/disease_viewer/Disease_view.vue")
                },
                {
                    path: "disease_simulator",
                    component: () => import("@/page/disease_viewer/Disease_simulator.vue")
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
                },
                {
                    path: "test",
                    component: () => import("@/page/test/Test.vue"),
                },
                {
                    path: "exams",
                    component: () => import("@/page/test/Exams.vue")
                },
                {
                    path: "testPaper",
                    component: () => import("@/page/test/TestPaper.vue")
                },
                {
                    path: "testResult",
                    component: () => import("@/page/test/TestResult.vue")
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
                    path: "upload",
                    component: () => import("@/page/admin/Upload.vue")
                },
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
                    path: "basic_structure",
                    component: () => import("@/page/basic_structure/Basic_structure.vue")
                },
                {
                    path: "medicine",
                    component: () => import("@/page/basic_structure/Medicine_management.vue")
                },
                {
                    path: "test_management",
                    component: () => import("@/page/test/TestManagement.vue")
                },
                {
                    path: "question_management",
                    component: () => import("@/page/test/QuestionManagement.vue")
                },
                {
                    path: "paper_management",
                    component: () => import("@/page/test/PaperManagement.vue")
                },
                {
                    path: "exam_management",
                    component: () => import("@/page/test/ExamManagement.vue")
                },
                {
                    path: "paper_edit",
                    component: () => import("@/page/test/PaperEdit.vue")
                },
                {

                    path: "vaccinum",
                    component: () => import("@/page/basic_structure/Vaccinum_management.vue")
                },
                {
                    path: "assay",
                    component: () => import("@/page/basic_structure/Assay_management.vue")
                },
                {
                    path: "charge",
                    component: () => import("@/page/basic_structure/Charge_management.vue")
                },
                {
                    path: "inpatient",
                    component: () => import("@/page/basic_structure/Inpatient_management.vue")
                },
                {
                    path: "department",
                    component: () => import("@/page/basic_structure/Department_management.vue")
                },
                {
                    path: "record",
                    component: () => import("@/page/basic_structure/Record_management.vue")
                },
                {
                    path: "staff",
                    component: () => import("@/page/basic_structure/Staff_management.vue")
                }
            ]
        }
    ]
})


const net = new NetLoader("test");

router.beforeEach((to, from, next) => {
    switch(to.path) {
        case "/home/main":
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
        case "/home/test":
            store.commit("changePath",{
                index: 1,
                router: to,
                name: "测试"
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

// 前置路由守卫
router.beforeEach((to,from,next) => {
    let path = to.path;
    if(/\/admin.*/g.test(path)) {
        //TODO 如果是想访问后台页面的话则需要发送请求进行验证，这部分需要和后端对接
        if(!window.localStorage.getItem("token")) {
            store.commit("changeStatus",0);
            
            next("/login");
        } else {
            //TODO 如果本次存储有token数据的话需要对该token进行验证才能继续进行下一步操作
            net.get("/user/verify").then((value) => {
                let type = value.data.type;
                // 表明该用户已经登录
                store.commit("changeStatus",1);
                if(type === "admin") {
                    store.commit("changeType","admin");// 将用户的类型修改为admin
                    next();
                } else {
                    store.commit("changeType","user");// 将用户的类型修改为user
                    next("/login");
                }
                
            }, (err)  => {
                next("/login");
            })
            
        }
    } else if(/home.*/g.test(path)){
        if(!window.localStorage.getItem("token")) {
            store.commit("changeStatus",0);
            next(); // 如果本地没有存储token的话也需要放行!!!!
        } else {
            net.get("/user/verify").then((value) => {
                let type = value.data.type;
                // 表明该用户已经登录
                store.commit("changeStatus",1);
                if(type === "admin") {
                    store.commit("changeType","admin");// 将用户的类型修改为admin
                } else {
                    store.commit("changeType","user");// 将用户的类型修改为user
                }  
                next();
                
            }, (err)  => {
                next("/login");
            })
        }
    } else {
        next();
    }
})
export default router;