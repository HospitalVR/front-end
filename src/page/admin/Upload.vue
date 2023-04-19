<template>
    <div class="hospital_upload-container">
        <el-upload
            class="upload"
            drag
            ref="upload"
            :file-list="fileList"
            action="https://jsonplaceholder.typicode.com/posts/"
            :auto-upload="false"
            :on-change="handleChange"
            multiple
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip"><el-button class="btn" type="success" @click="uploadFile">批量上传</el-button></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png/mp4/ogg/mkv文件，且不超过500kb</div>
        </el-upload>
        <div class="hospital_upload-resources">
            <h1>后台资源总览</h1>
            
        </div>
    </div>
</template>

<script>
import { NetLoader } from '@/net';
    export default {
        name: "Upload",
        data() {
            return {
                loader: new NetLoader("test"),
                fileList: []
            }
        },
        methods: {
            uploadFile() {
                // console.log(this.fileList);
                let formdata = new FormData();
                this.fileList.forEach(file => {
                    formdata.append("fileList", file);
                })

                //注意： 在FormData对象中使用getAll来获取某个键名下的所有值，组成一个数组显示出来
                console.log(formdata.getAll("fileList"));
                this.loader.post("", formdata, {"Content-Type": "multipart/form-data"}).then(value => {
                    this.$message({
                        message: '文件批量上传成功',
                        type: 'success'
                    });

                })
            },
            handleChange(file) {
                this.fileList.push(file.raw);
            }
        }
    }
</script>

<style lang="less" scoped>
.hospital_upload-container {
    display: flex;
    .upload {
        padding: 20px;
        height: 80vh;
        box-sizing: border-box;
        overflow: hidden;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        width: 50%;
        .btn {
            width: 100px!important;
        }
        * {
            width: 100%;
        }
    }
    .hospital_upload-resources {
        flex: 1;
        padding: 10px;
        box-sizing: border-box;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        margin-left: 15px;
        height: 80vh;
        overflow-y: scroll;
    }
}
</style>