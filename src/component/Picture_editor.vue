<template>
    <div id="picture_editor">
        <h3 style="color:#606266">疾病图片</h3>
        <div class="pic_video_button">
            <template v-if="component_type!=2">
                <template v-if="image_url != null">
                    <div class="box-card"><img id="img" :src="image_url"></div>
                    <input style="margin-left:10px" class="button1" type="file" ref="file">
                </template>
                <template v-else>
                    <template v-if="component_type == 1"><p style="color:#909399; width:405px">请导入图片资源</p></template>
                    <template v-else><p style="color:#909399; width:405px">不存在图片资源</p></template>
                    <input style="margin-left:10px" type="file" ref="file">
                </template>
            </template>
            <template v-else>
                <template v-if="disease_picture != null">
                    <div class="box-card">
                        <img id="img" :src="disease_picture">
                    </div>
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
    name: "Picture_editor",
    data() {
        return {
            image_url: this.disease_picture,
            image: null
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
            this.image = e.target.files[0]
            this.image_url = window.URL.createObjectURL(new Blob([this.image]))
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
.button1 {
    margin-top: 250px;
    height: 30px;
}
</style>