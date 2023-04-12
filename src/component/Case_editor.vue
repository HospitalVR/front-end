<template>
    <div id="case_editor">
        <el-card class="box-card">
            <h2>{{title}}</h2>
            <template v-if="title=='疾病名称'"></template>
            <template v-else><br><h3 style="color:#606266">描述文字</h3></template>

            <template v-if="component_type==2">
                <p style="color:#909399">{{ text?text:"没有描述文字，点击编辑按钮可以进行编辑" }}</p>
            </template>
            <template v-else>
                <div id="input">
                    <el-input type="textarea" autosize placeholder="请输入文字" v-model="case_text" :disabled="((component_type==3)&(title=='疾病名称'))?true:false"></el-input>
                </div>
            </template>

            <template v-if="!((component_type == 2) & (disease_picture==null))">
                <br><Picture_editor ref="pic" :disease_picture="disease_picture" :component_type="component_type"></Picture_editor>
            </template>
            <template v-if="!((component_type == 2) & (disease_video == null))">
                <br><Video_editor ref="vid" :disease_video="disease_video" :component_type="component_type"></Video_editor>
            </template>

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