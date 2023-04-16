<template>
    <el-container class="hospital_admin-container">
        <el-header class="hospital_admin-header">
            <div class="hospital_admin-title">虚拟宠物医院--后台管理系统</div>
            <div class="hospital_admin-info">
                <span>管理员</span>
                <span>查看更多</span>
            </div>
        </el-header>
        <el-main class="hospital_admin-main">
            <div class="hospital_admin-nav">
                <el-menu router>
                    <el-menu-item index="/admin/user">用户管理</el-menu-item>
                    <el-menu-item index="/admin/basic_structure">基本结构与功能管理</el-menu-item>
                    <el-menu-item index="/admin/case_list" >病例管理</el-menu-item>
                    <el-menu-item index="/admin/test_management" >测试管理</el-menu-item>
                    <el-menu-item @click.native="logout">退出管理员账号</el-menu-item>
                </el-menu>
            </div>
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
                loader: new NetLoader("test")
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
        .hospital_admin-page {
            flex-grow: 1;
            padding: 10px;
        }
        .hospital_admin-nav {
            width: 170px;
        }
    }
}
</style>