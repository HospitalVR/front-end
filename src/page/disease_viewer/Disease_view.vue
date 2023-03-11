<template>
    <div id="disease_view">
        <div id="header">
            <h1>{{disease_name}}</h1>
            <button v-on:click="edit">编辑</button>
            <button v-on:click="back">返回</button>
        </div>
        <h2>疾病类别</h2>
        <p>{{ disease_group }}</p>
        <h2>疾病信息</h2>
        <p>{{disease_description}}</p>
        <Picture_editor :disease_picture="disease_picture" :component_type="2"></Picture_editor>
        <Video_editor :disease_video="disease_video" :component_type="2"></Video_editor>
    </div>
</template>

<script>
import Picture_editor from '@/component/Picture_editor.vue';
import Video_editor from '@/component/Video_editor.vue';
import picture from "@/test_picture/test1.jpg"
import video from "@/video/test1.mp4"

export default {
    name: "disease_view",
    data() {
        let disease_name = this.$route.query.disease_name;
        return {
            disease_name: disease_name,
            disease_group: "没有数据无法显示类别啊",
            disease_description: "我也不知道这是什么病，反正它是个病。我也不知道这是什么病，反正它是个病。"+
                "我也不知道这是什么病，反正它是个病。我也不知道这是什么病，反正它是个病。" +
                "我也不知道这是什么病，反正它是个病。我也不知道这是什么病，反正它是个病。" +
                "我也不知道这是什么病，反正它是个病。我也不知道这是什么病，反正它是个病。" +
                "我也不知道这是什么病，反正它是个病。我也不知道这是什么病，反正它是个病。" +
                "我也不知道这是什么病，反正它是个病。我也不知道这是什么病，反正它是个病。" +
                "我也不知道这是什么病，反正它是个病。我也不知道这是什么病，反正它是个病。",
            disease_picture: picture,
            disease_video:video
        };
    },
    methods: {
        edit: function () {
            this.$router.push({
                path: '/edit_disease', query: {
                    disease_name: this.disease_name,
                    disease_group: this.disease_group,
                    disease_description: this.disease_description,
                    disease_picture: this.disease_picture,
                    disease_video: this.disease_video
                }
            })
            alert("修改  "+this.disease_name)
        },
        back: function () {
            this.$router.go(-1)
        }
    },
    components: { Picture_editor, Video_editor }
}
</script>

<style scoped lang="less">
#disease_view {
    width: 100vw;
    height: wrap-content;
    background: rgb(114, 239, 139);
    padding: 0;
    margin: 0;
}
#header{
    display: flex;
    flex-direction: row;
    justify-content: center;
};
</style>