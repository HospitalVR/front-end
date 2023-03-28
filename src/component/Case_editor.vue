<template>
    <div id="case_editor">
        <el-card class="box-card">
            <h2>{{title}}</h2>
            <h3>文字</h3>
            <template v-if="component_type==2">
                <p>{{ text }}</p>
            </template>
            <template v-else>
                <div id="input">
                    <el-input type="textarea" autosize placeholder="请输入文字" v-model="case_text"></el-input>
                </div>
            </template>
            <Picture_editor ref="pic" :disease_picture="disease_picture" :component_type="component_type"></Picture_editor>
            <Video_editor ref="vid" :disease_video="disease_video" :component_type="component_type"></Video_editor>
        </el-card>
    </div>
</template>

<script>
import Picture_editor from '@/component/Picture_editor.vue';
import Video_editor from '@/component/Video_editor.vue';

export default {
    name: "case_editor",
    data() {
        return {
            case_text:this.text
        };
    },
    props: {
        title: String,
        text: String,
        disease_picture: String,
        disease_video: String,
        component_type: Number
    },
    methods: {
        
    },
    components: { Picture_editor, Video_editor },
}
</script>

<style scoped lang="less">
#case_editor {
    width: 95%;
    height: wrap-content;
//    background: rgb(154, 113, 236);
    padding: 0;
    margin: 0;
    margin-top: 30px;
}
#input {
    width:680px;
}
;</style>