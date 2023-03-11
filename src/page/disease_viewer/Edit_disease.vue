<template>
    <div id="edit_disease">
        <div class="header">
            <h1>修改疾病</h1>
        </div>
        <h2>疾病名称</h2>
        <input v-model="disease_name" placeholder="在此处输入疾病名称">
        <h2>疾病类别</h2>
        <input v-model="disease_group" placeholder="在此处输入疾病类别">
        <h2>疾病信息</h2>
        <textarea id="textarea" v-model="disease_description" placeholder="在此处输入疾病信息"></textarea>
        <Picture_editor :disease_picture="disease_picture" :component_type="3"></Picture_editor>
        <Video_editor :disease_video="disease_video" :component_type="3"></Video_editor>
        <div class="header">
            <button v-on:click="confirm">确认修改</button>
            <button v-on:click="back">返回</button>
        </div>
    </div>
</template>

<script>
import Picture_editor from '@/component/Picture_editor.vue'
import Video_editor from '@/component/Video_editor.vue';

export default {
    name: "Edit_disease",
    data() {
        return {
            disease_name: this.$route.query.disease_name,
            disease_group: this.$route.query.disease_group,
            disease_description: this.$route.query.disease_description,
            disease_picture: this.$route.query.disease_picture,
            disease_video: this.$route.query.disease_video
        };
    },
    methods: {
        confirm: function () {
            this.$router.replace('/case_list')
            alert("修改成功");
        },
        back: function () {
            this.$router.go(-1)
            alert("返回上一页");
        }
    },
    components: { Picture_editor, Video_editor }
}
</script>

<style scoped lang="less">
#edit_disease {
    width: 100vw;
    height: wrap-content;
    background: rgb(34, 218, 188);
    padding: 0;
    margin: 0;
}
.header{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
#textarea{
    width:800px;
    height:300px;
}
</style>