<template>
    <div id="disease_view">
        <div id="header">
            <h1>{{disease_name}}</h1>
        </div>
        <div style="float:right;">
            <template v-if="this.$store.state.type == 'admin'"><el-button type="primary" v-on:click="delete_disease" size="medium">删除</el-button></template>
            <template v-if="this.$store.state.type == 'admin'"><el-button type="primary" v-on:click="edit" size="medium">编辑</el-button></template>
            <el-button type="primary" v-on:click="back" size="medium" style="margin-right: 80px;">返回</el-button>
        </div>
        <br>
        <Case_editor title="疾病名称" :text="disease_data.name.text" :disease_picture="disease_data.name.image" :disease_video="disease_data.name.video" :component_type="component_type"></Case_editor>
        <Case_editor title="接诊" :text="disease_data.treat.text" :disease_picture="disease_data.treat.image" :disease_video="disease_data.treat.video" :component_type="component_type"></Case_editor>
        <Case_editor title="病例检查" :text="disease_data.check.text" :disease_picture="disease_data.check.image" :disease_video="disease_data.check.video" :component_type="component_type"></Case_editor>
        <Case_editor title="诊断结果" :text="disease_data.result.text" :disease_picture="disease_data.result.image" :disease_video="disease_data.result.video" :component_type="component_type"></Case_editor>
        <Case_editor title="治疗方案" :text="disease_data.plan.text" :disease_picture="disease_data.plan.image" :disease_video="disease_data.plan.video" :component_type="component_type"></Case_editor>
    </div>
</template>

<script>
import Case_editor from '@/component/Case_editor.vue'
import { NetLoader } from '@/net';

export default {
    name: "disease_view",
    data() {
        return {
            disease_name: this.$route.query.disease_name,
            loader: new NetLoader("test"),
            disease_data: {
                "name": {
                    "text": "",
                    "image": "",
                    "video": ""
                },
                "treat": {
                    "text": "",
                    "image": "",
                    "video": ""
                },
                "check": {
                    "text": "",
                    "image": "",
                    "video": ""
                },
                "result": {
                    "text": "",
                    "image": "",
                    "video": ""
                },
                "plan": {
                    "text": "",
                    "image": "",
                    "video": ""
                }
            },
            component_type: 2,
            disease_group: this.$route.query.disease_group
        };
    },
    methods: {
        edit() {
            this.$router.push({
                path: '/admin/edit_disease', query: {
                    disease_name: this.disease_name,
                    disease_group: this.disease_group,
                    disease_data: this.disease_data
                }
            })
        },
        delete_disease() {
            let loader = new NetLoader("test")
            this.$confirm('这将会永久删除数据，确定继续删除吗？', '警告', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                loader.get("/case/deleteByName?name=" + this.disease_name + "").then((value) => {
                    this.$message({
                        message: '删除成功',
                        type: "success"
                    });
                    this.$router.go(-1)
                })
            }).catch(() => {
            });
        },
        back() {
            this.$router.go(-1)
        },
        get_data() {
            let resurl="http://localhost:8888/res/"
            this.loader.get("/case/findByName?name=" + this.disease_name).then((value) => {
                for (let key in value.data) {
                    if (value.data[key].image != null) {
                        value.data[key].image = resurl  + value.data[key].image
                    }
                    if (value.data[key].video != null) {
                        value.data[key].video = resurl + value.data[key].video
                    }
                }
                this.disease_data = value.data
            })
        }
    },
    components: { Case_editor },
    created() {
        this.get_data()
    }
}
</script>

<style scoped lang="less">
#disease_view {
    width: 100%;
    height: wrap-content;
    //background: rgb(114, 239, 139);
    padding-top: 60px;
    margin: 0;
    margin-left:2%;
}
#header{
    display: flex;
    flex-direction: row;
    justify-content: center;
};
</style>