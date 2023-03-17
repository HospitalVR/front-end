<template>
    <div id="add_disease">
        <div class="header">
            <h1>添加疾病</h1>
        </div>
        <h2>疾病类别</h2>
        <p>{{this.$route.query.disease_group}}</p>
        <Case_editor title="疾病名称" :text="disease_data.name.text" :disease_picture="disease_data.name.image" :disease_video="disease_data.name.video" :component_type="component_type"></Case_editor>
        <Case_editor title="接诊" :text="disease_data.treat.text" :disease_picture="disease_data.treat.image" :disease_video="disease_data.treat.video" :component_type="component_type"></Case_editor>
        <Case_editor title="病例检查" :text="disease_data.check.text" :disease_picture="disease_data.check.image" :disease_video="disease_data.check.video" :component_type="component_type"></Case_editor>
        <Case_editor title="诊断结果" :text="disease_data.result.text" :disease_picture="disease_data.result.image" :disease_video="disease_data.result.video" :component_type="component_type"></Case_editor>
        <Case_editor title="治疗方案" :text="disease_data.plan.text" :disease_picture="disease_data.plan.image" :disease_video="disease_data.plan.video" :component_type="component_type"></Case_editor>
        <div class="header">
            <button v-on:click="confirm">确认添加</button>
            <button v-on:click="back">返回</button>
        </div>
    </div>
</template>

<script>
import Case_editor from '@/component/Case_editor.vue';

export default {
    name: "Add_disease",
    data() {
        return {
            component_type: 1, 
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
        };
    },
    methods: {
        confirm: function () {
            this.$router.replace('/case_list')
            alert("添加成功");
        },
        back: function () {
            this.$router.replace('/case_list')
        }
    },
    components: { Case_editor }
}
</script>

<style scoped lang="less">
#add_disease {
    width: 100vw;
    height: wrap-content;
    background: rgb(245, 30, 70);
    padding: 0;
    margin: 0;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>