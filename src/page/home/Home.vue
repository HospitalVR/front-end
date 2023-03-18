<template>
    <el-container>
        <el-header class="nav">
            <div class="nav-left">
                <div class="nav-icon" @click="$router.push('/home')">
                    <span>虚拟宠物医院学习系统</span>
                </div>
            </div>
            <div class="nav-right">
                <div class="nav-right-item" @click="$router.push('/login')"><span>管理员登录</span></div>
                <div class="nav-right-item" @click="$router.push('/home/role')"><span>角色扮演</span></div>
                <div class="nav-right-item" @click="$router.push('/home/case_list')"><span>病例管理</span></div>
                <div class="nav-right-item" @click="$router.push('/vr')"><span>医院导览</span></div>
            </div>
            
        </el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="nav-path" style="marginTop: 70px;marginLeft: 10px">
                <el-breadcrumb-item v-for="(item, index) in $store.state.path" :key="index" :to="{ path: item.to }">{{ item.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-main>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
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

            }
        },
        methods: {

        }
    }
</script>

<style lang="less" scoped>
.nav {
    background: rgba(0,0,0,0.5);
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
            margin-right: 15px;
            cursor: pointer;
            color: #fff;
            // background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff);
            // background-clip: text;
            // -webkit-text-fill-color: transparent;
            font-weight: 200;

            &:hover {
                color: blue;
            }
        }
    }
}

</style>