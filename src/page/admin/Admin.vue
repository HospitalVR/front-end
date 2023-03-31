<template>
    <el-container class="hospital_admin-container">
        <el-header class="hospital_admin-header">后台管理系统页面</el-header>
        <el-main class="hospital_admin-main">
            <div class="hospital_admin-nav">
                <el-menu router>
                    <el-menu-item index="/admin/user">用户管理</el-menu-item>
                    <el-menu-item index="/admin/basic_structure">基本结构与功能管理</el-menu-item>
                    <el-menu-item index="/admin/case_list" >病例管理</el-menu-item>
                </el-menu>
            </div>
            <div class="hospital_admin-page">
                <router-view></router-view>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "Admin",
        data() {
            return {

            }
        },
        methods: {

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
        text-align: center;
        line-height: 60px;
        font-size: 23px;
        font-weight: 500;
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