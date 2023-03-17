<template>
    <div id="video_editor">
        <h3>疾病视频</h3>
        <div class="pic_video_button">
            <div class="pic_video">
                <template v-if="video_url!=''">
                    <video id="video" controls="controls" :src="video_url"></video>
                </template>
                <template v-else>
                    <div style="margin-top:100px;">
                        <template v-if="component_type==1"><h1>请导入视频资源</h1></template>
                        <template v-else><h1>不存在视频资源</h1></template>
                    </div>
                </template>
            </div>
            <template v-if="component_type!=2">
                <input class="button1" type="file" ref="file">
            </template>
            <template v-else>
                <div style="display: none;">
                    <input class="button1" type="file" ref="file">
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
            video_url: this.disease_video
        }
    },
    methods: {
        change_picture: function () {
            alert("修改视频");
        },
    },
    props: {
        disease_video: String,
        component_type: Number
    },
    mounted() {
        let file = this.$refs.file;
        file.addEventListener("change", (e) => {
            console.log(e.target.files)
            let video = e.target.files[0]
            this.video_url= window.webkitURL.createObjectURL(video);
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

.pic_video {
    width: 400px;
    height: 280px;
    text-align: center;
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