<template>
    <div id="video_editor">
        <h3 style="color:#606266">疾病视频</h3>
        <div class="pic_video_button">
            <template v-if="component_type!=2">
                <template v-if="video_url != null">
                    <div class="box-card"><video id="video" controls="controls" :src="video_url"></video></div>
                    <input style="margin-left:10px" class="button1" type="file" ref="file">
                </template>
                <template v-else>
                    <template v-if="component_type == 1"><p style="color:#909399; width:405px;">请导入视频资源</p></template>
                    <template v-else><p style="color:#909399; width:405px;">不存在视频资源</p></template>
                    <input style="margin-left:10px" type="file" ref="file">
                </template>
            </template>
            <template v-else>
                <template v-if="disease_video != null">
                    <div class="box-card"><video id="video" controls="controls" :src="disease_video"></video></div>
                </template>
                <template v-else>
                    <template v-if="component_type == 1"><h1>请导入视频资源</h1></template>
                    <template v-else><h1>不存在视频资源</h1></template>
                </template>
                <div style="display: none;">
                    <input style="margin-left:10px" class="button1" type="file" ref="file">
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: "Video_editor",
    data() {
        return {
            video_url: this.disease_video,
            video:null
        }
    },
    methods: {
    },
    props: {
        disease_video: String,
        component_type: Number
    },
    mounted() {
        let file = this.$refs.file;
        file.addEventListener("change", (e) => {
            this.video = e.target.files[0]
            this.video_url= window.webkitURL.createObjectURL(this.video);
        })
    }
}
</script>

<style scoped lang="less">
#video_editor {
    width: wrap-content;
    height: wrap-content;
    //background: rgb(175, 240, 211);
    padding: 0;
    margin: 0;
}

.box-card {
    width: 400px;
    height: 280px;
    text-align: center;
    border: solid;
    border-color: gray;
}

.pic_video_button {
    width: wrap-content;
    height: wrap-content;
    display: flex;
    flex-direction: row;
    justify-content: left;
}

#video {
    width: 100%;
    height: 100%;
}

.button1 {
    margin-top: 250px;
    height: 30px;
}
</style>