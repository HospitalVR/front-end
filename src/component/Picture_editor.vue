<template>
    <div id="picture_editor">
        <h3>疾病图片</h3>
        <div class="pic_video_button">
            <template v-if="component_type!=2">
                <div class="pic_video">
                    <template v-if="image_url != null">
                        <img id="img" :src="image_url">
                    </template>
                    <template v-else>
                        <div style="margin-top:100px;">
                            <template v-if="component_type == 1"><h1>请导入图片资源</h1></template>
                            <template v-else><h1>不存在图片资源</h1></template>
                        </div>
                    </template>
                </div>
                <input class="button1" type="file" ref="file">
            </template>
            <template v-else>
                <div class="pic_video">
                    <template v-if="disease_picture != null">
                        <img id="img" :src="disease_picture">
                    </template>
                    <template v-else>
                        <div style="margin-top:100px;">
                            <template v-if="component_type == 1"><h1>请导入图片资源</h1></template>
                            <template v-else><h1>不存在图片资源</h1></template>
                        </div>
                    </template>
                </div>
                <div style="display: none;">
                    <input class="button1" type="file" ref="file">
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: "Picture_editor",
    data() {
        return {
            image_url: this.disease_picture
        }
    },
    methods: {
        
    },
    props: {
        disease_picture: String,
        component_type: Number
    },
    mounted() {
        let file = this.$refs.file;
        file.addEventListener("change", (e) => {
            console.log(e.target.files)
            let image = e.target.files[0]
            this.image_url = window.URL.createObjectURL(new Blob([image]))
        })
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

#img {
    width: 100%;
    height: 100%;
}
.button1 {
    margin-top: 250px;
    height: 30px;
}
</style>