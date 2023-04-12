<template>
    <div id="picture_editor">
        <h3 style="color:#606266">疾病图片</h3>
        <div class="pic_video_button">
            <template v-if="component_type!=2">
                <template v-if="image_url != null">
                    <div class="box-card"><img id="img" :src="image_url"></div>
                </template>
                <template v-else>
                    <template v-if="component_type == 1"><p style="color:#909399; width:405px">请导入图片资源</p></template>
                    <template v-else><p style="color:#909399; width:405px">不存在图片资源</p></template>
                </template>
                
                <el-upload :style="(image_url==null)? {'margin-left':'30px'}:{'margin-left': '30px','margin-top':'160px' }" :file-list="fileList" class="upload-demo" action="#" :on-preview="handlePreview" :http-request="uploadFile" :on-remove="handleRemove" :on-change="handleChange">
                    <el-button size="mini" type="primary">上传图片</el-button>
                    <el-button v-if="image_url != null" size="mini" type="primary" v-on:click.stop="handleRemove">删除图片</el-button>
                    <div slot="tip" class="el-upload__tip">请上传jpg或png格式的图片</div>
                </el-upload>

            </template>
            <template v-else>
                <template v-if="disease_picture != null">
                    <div class="box-card">
                        <img id="img" :src="disease_picture">
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: "Picture_editor",
    data() {
        return {
            image_url: this.disease_picture,
            image: null,
            fileList:[]
        }
    },
    methods: {
        handlePreview(file) {
            console.log(file);
        },
        uploadFile(file) {
            this.image = file.file
            this.image_url = window.URL.createObjectURL(new Blob([this.image]))
        },
        handleRemove() {
            this.image = null
            this.image_url = null
            this.fileList=[]
        },
        handleChange(files, fileList) {
            this.fileList=fileList.slice(-1)
        }
    },
    props: {
        disease_picture: String,
        component_type: Number
    }
}
</script>

<style scoped lang="less">
#picture_editor {
    width: wrap-content;
    height: wrap-content;
    //background: rgb(151, 208, 237);
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

#img {
    width: 100%;
    height: 100%;
}
</style>