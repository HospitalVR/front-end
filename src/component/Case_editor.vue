<template>
    <div id="case_editor">
        <h2>{{title}}</h2>
        <h3>文字</h3>
        <template v-if="component_type==2">
            <p>{{ text }}</p>
        </template>
        <template v-else>
            <textarea :value="text"></textarea>
        </template>
        <Picture_editor :disease_picture="disease_picture" :component_type="component_type"></Picture_editor>
        <Video_editor :disease_video="disease_video" :component_type="component_type"></Video_editor>
    </div>
</template>

<script>
import Picture_editor from '@/component/Picture_editor.vue';
import Video_editor from '@/component/Video_editor.vue';

export default {
    name: "case_editor",
    data() {
        return {
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
    width: 100vw;
    height: wrap-content;
    background: rgb(154, 113, 236);
    padding: 0;
    margin: 0;
    margin-top: 30px;
}

;</style>