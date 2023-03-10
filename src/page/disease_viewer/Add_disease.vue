<template>
    <div id="add_disease">
        <div class="header">
            <h1>添加疾病</h1>
        </div>
        <h2>疾病名称</h2>
        <input v-model="disease_name" placeholder="在此处输入疾病名称">
        <h2>疾病信息</h2>
        <textarea id="textarea" v-model="disease_description" placeholder="在此处输入疾病信息"></textarea>
        <Picture_editor :disease_picture="disease_picture" :component_type="1"></Picture_editor>
        <Video_editor :disease_video="disease_video" :component_type="1"></Video_editor>
        <div class="header">
            <button v-on:click="confirm">确认添加</button>
            <button v-on:click="back">返回</button>
        </div>
    </div>
</template>

<script>
import Picture_editor from '@/component/Picture_editor.vue'
import Video_editor from '@/component/Video_editor.vue'

export default {
    name: "Add_disease",
    data() {
        return {
            disease_name: "",
            disease_description: "",
            disease_picture: "",
            disease_video: ""
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
    components: { Picture_editor,Video_editor }
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

#textarea {
    width: 800px;
    height: 300px;
}
</style>