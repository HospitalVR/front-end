<template>
    <div id="edit_disease">
        <div class="header">
            <h1>修改疾病</h1>
        </div>
        <Case_editor ref="name" title="疾病名称" :text="disease_data.name.text" :disease_picture="disease_data.name.image" :disease_video="disease_data.name.video" :component_type="component_type"></Case_editor>
        <Case_editor ref="treat" title="接诊" :text="disease_data.treat.text" :disease_picture="disease_data.treat.image" :disease_video="disease_data.treat.video" :component_type="component_type"></Case_editor>
        <Case_editor ref="check" title="病例检查" :text="disease_data.check.text" :disease_picture="disease_data.check.image" :disease_video="disease_data.check.video" :component_type="component_type"></Case_editor>
        <Case_editor ref="result" title="诊断结果" :text="disease_data.result.text" :disease_picture="disease_data.result.image" :disease_video="disease_data.result.video" :component_type="component_type"></Case_editor>
        <Case_editor ref="plan" title="治疗方案" :text="disease_data.plan.text" :disease_picture="disease_data.plan.image" :disease_video="disease_data.plan.video" :component_type="component_type"></Case_editor>
        <div class="header" style="margin-top: 20px;">
            <el-button type="primary" v-on:click="confirm" size="medium">保存</el-button>
            <el-button type="primary" v-on:click="back" size="medium" style="margin-left: 150px;">返回</el-button>
        </div>
    </div>
</template>

<script>
import Case_editor from '@/component/Case_editor.vue';
import { NetLoader } from '@/net';

export default {
    name: "Edit_disease",
    data() {
        return {
            disease_name: this.$route.query.disease_name,
            disease_group: this.$route.query.disease_group,
            disease_data: this.$route.query.disease_data,
            component_type:3
        };
    },
    methods: {
        confirm: async function () {
            let loader = new NetLoader("test")
            let formData = new FormData();
            formData.append("type", this.$route.query.disease_group)
            for (let key in this.$refs) {
                formData.append(key + 1, this.$refs[key].case_text)
                if (this.$refs[key].$refs.pic.image != null) {
                    formData.append(key + 2, this.$refs[key].$refs.pic.image)
                } else {
                    if ((this.$refs[key].$refs.pic.image_url == null)&(this.disease_data[key].image!=null)) {
                        formData.append(key + 2, "delete")
                    }
                }
                if (this.$refs[key].$refs.vid.video != null) {
                    formData.append(key + 3, this.$refs[key].$refs.vid.video)
                } else {
                    if((this.$refs[key].$refs.vid.video_url == null)& (this.disease_data[key].video != null)) {
                        formData.append(key + 3, "delete")
                    }
                }
            }
            
            let url = "http://127.0.0.1:8888/case/save"
            await loader.post(url, formData).then((value) => {
                this.$router.replace('/admin/case_list')
                this.$message({
                    message: '修改成功',
                    type: "success"
                });
            }).catch(e => {
                this.$message({
                    message: '修改失败',
                    type: "error"
                });
            })
        },
        back: function () {
            this.$router.go(-1)
        }
    },
    components: { Case_editor }
}
</script>

<style scoped lang="less">
#edit_disease {
    width: 100%;
    height: wrap-content;
    //background: rgb(34, 218, 188);
    padding-top: 60px;
    margin: 0;
    margin-left:2%;
}
.header{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>