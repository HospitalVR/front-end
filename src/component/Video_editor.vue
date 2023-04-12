<template>
    <div id="video_editor">
        <h3 style="color:#606266">疾病视频</h3>
        <div class="pic_video_button">
            <template v-if="component_type!=2">
                <template v-if="video_url != null">
                    <div class="box-card"><video id="video" controls="controls" :src="video_url"></video></div>
                </template>
                <template v-else>
                    <template v-if="component_type == 1"><p style="color:#909399; width:405px;">请导入视频资源</p></template>
                    <template v-else><p style="color:#909399; width:405px;">不存在视频资源</p></template>
                </template>

                <el-upload :style="(video_url == null) ? { 'margin-left': '30px' } : { 'margin-left': '30px', 'margin-top': '160px' }" :file-list="fileList" class="upload-demo" action="#" :http-request="uploadFile" :on-remove="handleRemove" :on-change="handleChange">
                    <el-button size="mini" type="primary">上传视频</el-button>
                    <el-button v-if="video_url != null" size="mini" type="primary" v-on:click.stop="handleRemove">删除视频</el-button>
                    <div slot="tip" class="el-upload__tip">请上传mp4格式的视频</div>
                </el-upload>
            </template>

            <template v-else>
                <template v-if="disease_video != null">
                    <div class="box-card"><video id="video" controls="controls" :src="disease_video"></video></div>
                </template>
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
            video: null,
            fileList: []
        }
    },
    methods: {
        uploadFile(file) {
            this.video = file.file
            this.video_url = window.URL.createObjectURL(new Blob([this.video]))
        },
        handleRemove() {
            this.video = null
            this.video_url = null
            this.fileList = []
        },
        handleChange(files, fileList) {
            this.fileList = fileList.slice(-1)
        }
    },
    props: {
        disease_video: String,
        component_type: Number
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
</style>