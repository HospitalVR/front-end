<template>
    <div id="edit_disease">
        <div class="header">
            <h1>修改疾病</h1>
        </div>
        <Case_editor title="疾病名称" :text="disease_data.name.text" :disease_picture="disease_data.name.image" :disease_video="disease_data.name.video" :component_type="component_type"></Case_editor>
        <Case_editor title="接诊" :text="disease_data.treat.text" :disease_picture="disease_data.treat.image" :disease_video="disease_data.treat.video" :component_type="component_type"></Case_editor>
        <Case_editor title="病例检查" :text="disease_data.check.text" :disease_picture="disease_data.check.image" :disease_video="disease_data.check.video" :component_type="component_type"></Case_editor>
        <Case_editor title="诊断结果" :text="disease_data.result.text" :disease_picture="disease_data.result.image" :disease_video="disease_data.result.video" :component_type="component_type"></Case_editor>
        <Case_editor title="治疗方案" :text="disease_data.plan.text" :disease_picture="disease_data.plan.image" :disease_video="disease_data.plan.video" :component_type="component_type"></Case_editor>
        <div class="header">
            <button v-on:click="confirm">确认修改</button>
            <button v-on:click="back">返回</button>
        </div>
    </div>
</template>

<script>
import Case_editor from '@/component/Case_editor.vue';

export default {
    name: "Edit_disease",
    data() {
        return {
            disease_name: this.$route.query.disease_name,
            disease_group: this.$route.query.disease_group,
            disease_data: this.$route.query.disease_data,
            component_type:3
        };
    },
    methods: {
        confirm: function () {
            this.$router.replace('/home/case_list')
            alert("修改成功");
        },
        back: function () {
            this.$router.go(-1)
            alert("返回上一页");
        }
    },
    components: { Case_editor }
}
</script>

<style scoped lang="less">
#edit_disease {
    width: 100vw;
    height: wrap-content;
    //background: rgb(34, 218, 188);
    padding-top: 60px;
    margin: 0;
}
.header{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>