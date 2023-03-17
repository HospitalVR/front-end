<template>
    <div id="disease_view">
        <div id="header">
            <h1>{{disease_name}}</h1>
            <button v-on:click="edit">编辑</button>
            <button v-on:click="back">返回</button>
        </div>
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
            disease_group: "没有数据无法显示类别啊"
        };
    },
    methods: {
        edit: function () {
            this.$router.push({
                path: '/home/edit_disease', query: {
                    disease_name: this.disease_name,
                    disease_group: this.disease_group,
                    disease_data: this.disease_data
                }
            })
            alert("修改  "+this.disease_name)
        },
        back: function () {
            this.$router.go(-1)
        },
        get_data: function () {
            let resurl="http://localhost:8888/res/"
            let loader = new NetLoader("test")
            loader.get("/case/findByName?name=" + this.disease_name).then((value) => {
                for (let key in value.data) {
                    if (value.data[key].image != null) {
                        value.data[key].image = resurl + this.disease_name+ "/" + value.data[key].image
                    }
                    if (value.data[key].video != null) {
                        value.data[key].video = resurl + this.disease_name+ "/" + value.data[key].video
                    }
                }
                console.log(value.data)
                this.disease_data=value.data
            })
        }
    },
    components: { Case_editor },
    mounted() {
        this.get_data()
    }
}
</script>

<style scoped lang="less">
#disease_view {
    width: 100vw;
    height: wrap-content;
    //background: rgb(114, 239, 139);
    padding-top: 60px;
    margin: 0;
}
#header{
    display: flex;
    flex-direction: row;
    justify-content: center;
};
</style>