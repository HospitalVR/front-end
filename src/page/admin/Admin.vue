<template>
    <el-container class="hospital_admin-container">
        <el-header class="hospital_admin-header">
            <div class="hospital_admin-title">虚拟宠物医院--后台管理系统</div>
            <div class="hospital_admin-info">
                <span>{{username}}</span>
                <span @click = "logout">退出账号</span>
            </div>
        </el-header>
        <el-main class="hospital_admin-main">
                <el-menu router 
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                >
                    <el-menu-item index="/admin/user">用户管理</el-menu-item>
                    <el-menu-item index="/admin/basic_structure">基本结构与功能管理</el-menu-item>
                    <el-menu-item index="/admin/case_list" >病例管理</el-menu-item>
                    <el-menu-item index="/admin/test_management" >测试管理</el-menu-item>
                    <el-menu-item index="/admin/upload" >文件批量上传</el-menu-item>
                </el-menu>
            <div class="hospital_admin-page">
                <router-view></router-view>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import { NetLoader } from '@/net';
    export default {
        name: "Admin",
        data() {
            return {
                loader: new NetLoader("test"),
                username: "default"
            }
        },
        methods: {
            logout() {
                this.loader.post("/user/logout").then(() => {
                    this.$message({
                        message: "退出账号成功",
                        type: "success"
                    })
                    window.localStorage.removeItem("token");
                    this.$store.commit("changeStatus",0);
                    this.$router.push("/login");
                })
            }
        },
        created() {
            this.loader.get("/user/verify").then(value => {
                let username = value.data.userName;
                this.username = username;
            })
        },
        mounted() {
            this.$notify({
                title: '恭喜你登陆成功',
                message: '这是一条登录成功的提示消息，现在请你好好体验管理员功能吧',
                type: 'success'
            });
        }
    }
</script>

<style lang="less" scoped>
.hospital_admin-container {
    width: 100vw;
    .hospital_admin-header {
        display: flex;
        justify-content: space-between;
        background: rgba(0,0,0,0.8);
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100vw;
        z-index: 100;
        .hospital_admin-title {
            line-height: 60px;
            font-size: 24px;
            font-weight: 600;
            background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff);
            background-clip: text;
            -webkit-text-fill-color: transparent;
            cursor: pointer;
        }

        .hospital_admin-info {
            line-height: 60px;
            font-size: 16px;
            // font-weight: 400;
            cursor: pointer;
            color: #fff;
            span {
                margin-right: 18px;
            }
        }
    }
    .hospital_admin-main {
        display: flex;
        padding-left: 175px;
        padding-top: 60px;
        overflow: hidden;
        .hospital_admin-page {
            flex-grow: 1;
            padding: 10px;
        }
    }
}
.el-menu {
    height: 100%;
    position: fixed;
    top: 60px;
    left: 0px;
}
</style>