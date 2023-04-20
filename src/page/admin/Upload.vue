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
            <div class="hospital_upload-resourcesList">
                <div class="hospital_upload hospital_upload-image" @click="toggleImageClick">
                    <span class="arrow">
                        <svg t="1681882602013" :class="imageSvgClass" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3389" width="32" height="32"><path d="M558.933333 490.666667L384 665.6l59.733333 59.733333 234.666667-234.666666L443.733333 256 384 315.733333l174.933333 174.933334z" fill="#444444" p-id="3390"></path></svg>
                    </span>
                    <span class="content">
                        <svg t="1681883470904" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4549" width="32" height="32"><path d="M259.072 303.104q30.72 0 52.736 22.016t22.016 53.76q0 30.72-22.016 52.736t-52.736 22.016q-31.744 0-53.248-22.016t-21.504-52.736q0-31.744 21.504-53.76t53.248-22.016zM864.256 57.344q43.008 0 69.12 28.672t26.112 65.536l0 550.912q0 23.552-16.896 39.936t-40.448 16.384l-70.656 0 0-123.904 44.032 0q11.264 0 19.456-8.192t8.192-20.48q0-11.264-8.192-19.456t-19.456-8.192l-44.032 0 0-79.872 44.032 0q11.264 0 19.456-8.192t8.192-19.456-8.192-19.968-19.456-8.704l-44.032 0 0-72.704 44.032 0q11.264 0 19.456-8.192t8.192-20.48q0-11.264-8.192-19.456t-19.456-8.192l-44.032 0 0-86.016q0-57.344-26.624-80.896t-90.112-23.552l-394.24 0 0-9.216q0-23.552 16.896-39.936t40.448-16.384l486.4 0zM692.224 184.32q39.936 0 57.856 23.04t17.92 59.904l0 565.248q0 23.552-19.456 43.52t-48.128 19.968l-572.416 0q-24.576 0-44.032-20.48t-19.456-48.128l0-575.488q0-29.696 16.384-48.64t43.008-18.944l568.32 0zM703.488 291.84q0-17.408-10.752-30.208t-34.304-12.8l-488.448 0q-4.096 0-11.264 1.536t-14.336 5.12-12.288 9.728-5.12 15.36l0 274.432q8.192 9.216 23.04 22.016t34.816 23.552 44.544 18.432 53.248 7.68q43.008 0 75.264-13.824t59.904-34.816 54.272-45.056 58.88-45.568 73.728-36.352 98.816-16.896l0-142.336z" p-id="4550"></path></svg>
                        <span>图片</span>
                    </span>
                </div>
                <transition name="imageList">
                    <div class="hospital_upload-imageList" v-if="showImageList">
                        <div class="image-item" v-for="(item, index) in imageList" :key="index" @click="previewImage(item)">
                            <span class="icon">
                                <svg t="1681882949969"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4394" width="23" height="23"><path d="M938.666667 553.92V768c0 64.8-52.533333 117.333333-117.333334 117.333333H202.666667c-64.8 0-117.333333-52.533333-117.333334-117.333333V256c0-64.8 52.533333-117.333333 117.333334-117.333333h618.666666c64.8 0 117.333333 52.533333 117.333334 117.333333v297.92z m-64-74.624V256a53.333333 53.333333 0 0 0-53.333334-53.333333H202.666667a53.333333 53.333333 0 0 0-53.333334 53.333333v344.48A290.090667 290.090667 0 0 1 192 597.333333a286.88 286.88 0 0 1 183.296 65.845334C427.029333 528.384 556.906667 437.333333 704 437.333333c65.706667 0 126.997333 16.778667 170.666667 41.962667z m0 82.24c-5.333333-8.32-21.130667-21.653333-43.648-32.917333C796.768 511.488 753.045333 501.333333 704 501.333333c-121.770667 0-229.130667 76.266667-270.432 188.693334-2.730667 7.445333-7.402667 20.32-13.994667 38.581333-7.68 21.301333-34.453333 28.106667-51.370666 13.056-16.437333-14.634667-28.554667-25.066667-36.138667-31.146667A222.890667 222.890667 0 0 0 192 661.333333c-14.464 0-28.725333 1.365333-42.666667 4.053334V768a53.333333 53.333333 0 0 0 53.333334 53.333333h618.666666a53.333333 53.333333 0 0 0 53.333334-53.333333V561.525333zM320 480a96 96 0 1 1 0-192 96 96 0 0 1 0 192z m0-64a32 32 0 1 0 0-64 32 32 0 0 0 0 64z" fill="#000000" p-id="4395"></path></svg>
                            </span>
                            <span class="name">{{ item.name }}</span>
                        </div>
                    </div>
                </transition>
                <div class="hospital_upload hospital_upload-video" @click="toggleVideoClick">
                    <span class="arrow">
                        <svg t="1681882602013" :class="videoSvgClass" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3389" width="32" height="32"><path d="M558.933333 490.666667L384 665.6l59.733333 59.733333 234.666667-234.666666L443.733333 256 384 315.733333l174.933333 174.933334z" fill="#444444" p-id="3390"></path></svg>
                    </span>
                    <span class="content">
                        <svg t="1681887643971" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4426" width="32" height="32"><path d="M327.111111 361.244444V207.644444c0-17.066667 14.222222-28.444444 28.444445-28.444444h406.755555c17.066667 0 28.444444 14.222222 28.444445 28.444444v147.911112c17.066667-19.911111 207.644444-170.666667 207.644444-170.666667 28.444444 0 25.6 8.533333 25.6 39.822222v329.955556c0 31.288889 5.688889 36.977778-25.6 36.977777 0 0-190.577778-153.6-207.644444-170.666666v145.066666c0 17.066667-14.222222 28.444444-28.444445 28.444445h-28.444444v-190.577778c0-31.288889 5.688889-48.355556-22.755556-48.355555 0 0-201.955556 150.755556-219.022222 170.666666v-133.688889c0-17.066667-14.222222-28.444444-28.444445-28.444444h-136.533333z m344.177778 76.8s-190.577778 150.755556-207.644445 170.666667v-147.911111c0-17.066667-14.222222-28.444444-28.444444-28.444444H28.444444c-17.066667 0-28.444444 14.222222-28.444444 28.444444v355.555556c0 17.066667 14.222222 28.444444 28.444444 28.444444h406.755556c17.066667 0 28.444444-14.222222 28.444444-28.444444v-145.066667c17.066667 17.066667 207.644444 170.666667 207.644445 170.666667 28.444444 0 25.6-5.688889 25.6-36.977778V475.022222c0-28.444444 5.688889-36.977778-25.6-36.977778z" fill="#666666" p-id="4427"></path></svg>
                        <span>视频</span>
                    </span>
                </div>
                <div class="hospital_upload-videoList" v-if="showVideoList">
                    <div class="video-item" v-for="(item, index) in videoList" :key="index" @click="previewVideo(item)">
                        <span class="icon">
                            <svg t="1681887976469" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4581" width="32" height="32"><path d="M632 106.5 803.7 240 632 240 632 106.5M624 80l-8 0 0 176 224 0 0-8L624 80 624 80z" p-id="4582"></path><path d="M512 432c-92.8 0-168 75.2-168 168 0 92.8 75.2 168 168 168 92.8 0 168-75.2 168-168C680 507.2 604.8 432 512 432zM456 680 456 520l144 80L456 680z" p-id="4583"></path><path d="M512.2 137.6 490 206.3 467 137.6 447.1 137.6 479.6 230.4 499.1 230.4 531.7 137.6Z" p-id="4584"></path><path d="M394.2 136c-7.4 0-13.9 1.2-19.6 3.7-4.3 1.8-8.2 4.6-11.7 8.4-3.6 3.7-6.4 8-8.5 12.7-2.8 6.4-4.1 14.3-4.1 23.8 0 14.8 4 26.4 11.9 34.8 8 8.4 18.7 12.6 32.2 12.6 13.3 0 24-4.2 32-12.7 8-8.5 12-20.2 12-35.2 0-15.1-4-26.9-12.1-35.4C418.2 140.2 407.5 136 394.2 136zM412.3 207.9c-4.7 5.4-10.7 8.1-18 8.1-7.3 0-13.3-2.7-18.1-8.1-4.7-5.4-7.1-13.4-7.1-23.9 0-10.7 2.3-18.7 6.9-24 4.6-5.3 10.7-7.9 18.3-7.9 7.6 0 13.6 2.6 18.2 7.9s6.9 13.2 6.9 23.8C419.4 194.5 417 202.5 412.3 207.9z" p-id="4585"></path><path d="M287.7 201.5 271.2 136 243.7 136 243.7 232 260.8 232 260.8 156.4 278.8 232 296.5 232 314.6 156.4 314.6 232 331.7 232 331.7 136 304.1 136Z" p-id="4586"></path><path d="M576 96l0 184 0 16 16 0 232 0 0 632L200 928 200 96 576 96M592 80 184 80l0 864 656 0L840 280 592 280 592 80 592 80z" p-id="4587"></path></svg>
                        </span>
                        <span class="name">{{ item.name }}</span>
                    </div>
                </div>
            </div>
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
                fileList: [],
                imageList: [],
                videoList: [],
                showImageList: false,
                showVideoList: false,
                imageClick: false,
                videoClick: false
            }
        },
        methods: {
            uploadFile() {
                let formdata = new FormData();
                this.fileList.forEach(file => {
                    formdata.append("file", file);
                })

                //注意： 在FormData对象中使用getAll来获取某个键名下的所有值，组成一个数组显示出来
                console.log(formdata.getAll("fileList"));
                this.loader.post("/file/upload", formdata, {"Content-Type": "multipart/form-data"}).then(value => {
                    this.$message({
                        message: '文件批量上传成功',
                        type: 'success'
                    });
                    this.$refs.upload.clearFiles();

                    this.loader.get("/file/getImageFiles").then(value => {
                        let arr = []
                        for(let key in value.data) {
                            let obj = {
                                name: key,
                                buffer: value.data[key]
                            }
                            arr.push(obj);
                        }
                        this.imageList = arr;
                    })

                    this.loader.get("/file/getVideoFiles").then(value => {
                        let arr = []
                        for(let key in value.data) {
                            let obj = {
                                name: key,
                                buffer: value.data[key]
                            }
                            arr.push(obj);
                        }
                        this.videoList = arr;
                    })
                })
            },
            handleChange(file) {
                this.fileList.push(file.raw);
            },
            // 点击图片资源列表触发此事件
            toggleImageClick() {
                this.imageClick = !this.imageClick;
                this.showImageList = !this.showImageList;
            },
            toggleVideoClick() {
                this.videoClick = !this.videoClick;
                this.showVideoList = !this.showVideoList;
            },
            previewImage(item) {
                this.$alert(`<img src="http://localhost:8888/res/${item.name}" style="width: 400px;height: 300px"/ >`, '图片预览展示', {
                    dangerouslyUseHTMLString: true,
                    callback() {
                        document.getElementsByTagName("video")[0].pause();
                    }
                });
                
            },
            previewVideo(item) {
                this.$alert(`<video src="http://localhost:8888/res/${item.name}" controls width="400" height="300"></video>`, '视频预览展示', {
                    dangerouslyUseHTMLString: true,
                    callback() {
                        if(document.getElementsByTagName("video")) {
                            document.getElementsByTagName("video")[0].pause();
                        }
                    }
                })
            }
        },
        computed: {
            imageSvgClass() {
                return {
                    'svg_rotate': this.imageClick
                }
            },
            videoSvgClass() {
                return {
                    'svg_rotate': this.videoClick
                }
            }
        },
        created() {
            this.loader.get("/file/getImageFiles").then(value => {
                for(let key in value.data) {
                    let obj = {
                        name: key,
                        buffer: value.data[key]
                    }
                    this.imageList.push(obj);
                }
            })
            this.loader.get("/file/getVideoFiles").then(value => {
                for(let key in value.data) {
                    let obj = {
                        name: key,
                        buffer: value.data[key]
                    }

                    this.videoList.push(obj);
                }
            })
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
        h1 {
            text-align: center;
        }
        .hospital_upload-resourcesList {
            transition: height .5s ease;
            .hospital_upload {
                display: flex;
                align-items: center;
                font-size: 16px;
                cursor: pointer;
                border-radius: 5px;
                &:hover {
                    background: #C0C4CC;
                }
                .arrow {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    svg {
                        transition: transform .5s ease;
                    }
                }

                .content {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span {
                        font-size: 18px;
                        font-weight: 600;
                        margin-left: 10px;
                    }

                    
                }
            }    
            .hospital_upload-imageList {
                margin-left: 50px;
                // max-height: 1000px;
                .image-item {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    border-radius: 5px;
                    &:hover {
                        background: #C0C4CC;
                        
                    }
                    .icon {
                        display: flex;
                        align-items: center;
                    }
                    span {
                        font-size: 16px;
                    }
                    .name {
                        margin-left: 10px;
                    }
                }
            }      
            .hospital_upload-videoList {
                margin-left: 50px;
                // max-height: 1000px;
                .video-item {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    border-radius: 5px;
                    &:hover {
                        background: #C0C4CC;
                        
                    }
                    .icon {
                        display: flex;
                        align-items: center;
                    }
                    span {
                        font-size: 16px;
                    }
                    .name {
                        margin-left: 10px;
                    }
                }
            } 
        }
    }
}

.svg_rotate {
    transform: rotate(90deg);
}

.imageList-enter-active,.imageList-leave-active {
    transition: all .5s ease;

}

.imageList-enter,.imageList-leave-to {
    opacity: 0;
}

/deep/ .image-show {
    width: 500px;
    height: 300px;
}

/deep/ .el-message-box {
    width: 620px!important;
}

</style>