<template>
    <div id="basic_structure">
        <h1 style="textAlign: center">基本结构与功能管理导航页面</h1>
        <el-row>
            <el-col v-for="section in section_list" :key="section" :span="12" style="align-items: center;">
                <el-card class="box-card" shadow="hover" v-on:click.native="show_detail(section)"><h1>{{ section }}</h1></el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "Basic_structure",
    data() {
        return {
            section_list:["科室管理", "人员管理", "药品管理", "档案管理", "收费管理", "化验项目管理", "疫苗管理", "住院管理"]
        }
    },
    methods: {
        show_detail: function (name) {
            let s = ""
            switch (name) {
                case "药品管理": s = "/medicine"; break;
            }
            this.$router.push({
                path: "/admin" + s
            })
        }
    }
}
</script>

<style lang="less" scoped>
#basic_structure{
    width:100%;
    align-items: center;
}
.box-card{
    text-align: center;
    width:300px;
    margin: auto;
    margin-top:20px;
}
</style>