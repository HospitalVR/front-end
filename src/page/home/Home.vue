<template>
    <el-container>
        <el-header class="nav">
            <div class="nav-left">
                <div class="nav-icon" @click="$router.push('/home')">
                    <span>虚拟宠物医院学习系统</span>
                </div>
            </div>
            <div class="nav-right">
                <div class="nav-right-item">
                    
                    <div v-if="$store.state.status === 1 && $store.state.type === 'user' " class="nav-right-itemLogin" @click="toggleUserInfo"> 
                        <span>{{ username }}</span>
                    </div>
                    <span v-else @click="$router.push('/login')">登录</span>
                    <div class="nav-right-user" v-if="showUserInfo">
                        <div class="nav-right-info">用户详细信息</div>
                        <div class="nav-right-logout" @click="logout">退出登录</div>
                    </div>
                </div>
                <div class="nav-right-item" @click="$router.push('/home/test')"><span>测试功能</span></div>
                <div class="nav-right-item" @click="$router.push('/home/role')"><span>角色扮演</span></div>
                <div class="nav-right-item" @click="$router.push('/home/case_list')"><span>病例管理</span></div>
                <div class="nav-right-item" ref="guide">
                    <span>医院导览</span>
                    <transition name="itemList">
                        <div class="nav-right-itemList" v-if="showItemList">
                            <div @click="$router.push('/vr')">VR导览</div>
                            <div @click="$router.push('/detail?room=手术室')">平面导览</div>
                        </div>
                    </transition>
                </div>
            </div>
            
        </el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="nav-path" style="marginTop: 70px;marginLeft: 10px" v-if="$router.currentRoute.path !== '/home/main'">
                <el-breadcrumb-item v-for="(item, index) in $store.state.path" :key="index" :to="{ path: item.to }">{{ item.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-main>
            <router-view>
            </router-view>
        </el-main>
    </el-container>
</template>

<script>
import Add_disease from '@/page/disease_viewer/Add_disease.vue';
import Case_list from '@/page/disease_viewer/Case_list.vue';
import Disease_view from '@/page/disease_viewer/Disease_view.vue';
import Edit_disease from '@/page/disease_viewer/Edit_disease.vue';
import Disease_group from '@/component/Disease_group.vue';
import Disease_list from '@/component/Disease_list.vue';
import Picture_editor from '@/component/Picture_editor.vue';
import Video_editor from '@/component/Video_editor.vue';
import { NetLoader } from '@/net';
    export default {
        name: "Home",
        components:{
            Add_disease,
            Case_list, 
            Disease_view, 
            Edit_disease, 
            Disease_group, 
            Disease_list, 
            Picture_editor, 
            Video_editor
        },
        data() {
            return {
                loader: new NetLoader("test"),
                username: null,
                showItemList: false,
                showUserInfo: false,
                loader: new NetLoader("test")
            }
        },
        methods: {
            toggleUserInfo() {
                this.showUserInfo = !this.showUserInfo;
            },
            logout() {
                this.loader.post("/user/logout").then(() => {
                    window.localStorage.removeItem("token");
                    this.$store.commit("changeStatus",0);
                    this.showUserInfo = false;
                    this.$message({
                        message: '退出账号成功',
                        type: 'success'
                    });
                    this.$router.push("/login")
                })
            }
        },
        created() {
            if(window.localStorage.getItem("token")) {
                //TODO 此处需要发送请求来验证该token的具体身份方便在导航栏出展示用户名和用户的信息
                this.loader.get("/user/verify").then(value => {
                    this.username = value.data.userName;
                    let type = value.data.type;
                    if(type === "user") {
                        this.$message({
                            message: '恭喜你，登陆成功',
                            type: 'success'
                        });
                        this.$store.commit("changeStatus",1);
                    } else if(type === "admin"){
                        
                        this.$store.commit("changeStatus",1);
                    }
                    this.$store.commit("changeType",type)
                    
                },err => {
                    console.log(err);
                    this.$store.commit("changeStatus",0);
                })
            }
        },
        mounted() {
            this.$refs.guide.addEventListener("mouseenter",() => {
                this.showItemList = true;
            })

            this.$refs.guide.addEventListener("mouseleave", () => {
                this.showItemList = false;
            })
        }
    }
</script>

<style lang="less" scoped>
.nav {
    background: rgba(0,0,0,0.8);
    position: fixed;
    left:0;
    top: 0;
    width: 100%;
    z-index: 10;
    .nav-path {
        margin-top: 70px;
    }
    .nav-left {
        float: left;
        height: 100%;
        .nav-icon {
            cursor: pointer;
            float: left;
            margin-left: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            span {
                background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff);
                background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 24px;
                font-weight: 600;
            }
            
        }
    }
    .nav-right {
        float: right;
        height: 100%;
        .nav-right-item {
            float: right;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 25px;
            cursor: pointer;
            color: #fff;
            opacity: 0.6;
            font-weight: 200;
            position: relative;
            &:hover {
                opacity: 1;
            }

            .nav-right-user {
                position: absolute;
                top: 65px;
                left: 50%;
                transform: translateX(-50%);
                white-space: nowrap;
                background: rgba(0,0,0,0.8);
                border-radius: 5px;
                div {
                    padding: 10px 20px;
                    border-radius: 5px;
                    &:hover {
                        background: gray;
                    }
                }
            }

            // svg {
            //     margin-left: 5px;
            //     margin-top: 5px;
            // }            

            .nav-right-itemList {
                position: absolute;
                top: 60px;
                left: 50%;
                transform: translateX(-50%);
                white-space: nowrap;
                background: rgba(0,0,0,0.8);
                border-radius: 5px;
                div {
                    padding: 10px 20px;
                    border-radius: 5px;
                    &:hover {
                        background: gray;
                    }
                }
            }

        }
    }
}

.el-main {
    padding: 0!important;
}

</style>