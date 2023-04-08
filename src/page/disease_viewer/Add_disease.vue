<template>
    <div id="add_disease">
        <div class="header">
            <h1>添加疾病</h1>
        </div>
        <h2>疾病类别</h2>
        <p>{{this.$route.query.disease_group}}</p>
        <Case_editor ref="name" title="疾病名称" :text="disease_data.name.text" :disease_picture="disease_data.name.image" :disease_video="disease_data.name.video" :component_type="component_type"></Case_editor>
        <Case_editor ref="treat" title="接诊" :text="disease_data.treat.text" :disease_picture="disease_data.treat.image" :disease_video="disease_data.treat.video" :component_type="component_type"></Case_editor>
        <Case_editor ref="check" title="病例检查" :text="disease_data.check.text" :disease_picture="disease_data.check.image" :disease_video="disease_data.check.video" :component_type="component_type"></Case_editor>
        <Case_editor ref="result" title="诊断结果" :text="disease_data.result.text" :disease_picture="disease_data.result.image" :disease_video="disease_data.result.video" :component_type="component_type"></Case_editor>
        <Case_editor ref="plan" title="治疗方案" :text="disease_data.plan.text" :disease_picture="disease_data.plan.image" :disease_video="disease_data.plan.video" :component_type="component_type"></Case_editor>
        <div class="header">
            <el-button type="primary" v-on:click="confirm">确认添加</el-button>
            <el-button type="primary" v-on:click="back">返回</el-button>
        </div>
    </div>
</template>

<script>
import Case_editor from '@/component/Case_editor.vue';
import { NetLoader } from '@/net';

export default {
    name: "Add_disease",
    data() {
        return {
            component_type: 1, 
            disease_data: {
                "name": {
                    "text": "",
                    "image": null,
                    "video": null
                },
                "treat": {
                    "text": "",
                    "image": null,
                    "video": null
                },
                "check": {
                    "text": "",
                    "image": null,
                    "video": null
                },
                "result": {
                    "text": "",
                    "image": null,
                    "video": null
                },
                "plan": {
                    "text": "",
                    "image": null,
                    "video": null
                }
            },
        };
    },
    methods: {
        confirm: async function () {
            let formData = new FormData();
            formData.append("type", this.$route.query.disease_group)
            for (let key in this.$refs) {
                formData.append(key + 1, this.$refs[key].case_text)
                if (this.$refs[key].$refs.pic.image != null) {
                    formData.append(key + 2, this.$refs[key].$refs.pic.image)
                }
                if (this.$refs[key].$refs.vid.video != null) {
                    formData.append(key + 3, this.$refs[key].$refs.vid.video)
                }
            }

            let url = "http://127.0.0.1:8888/case/save"
            let loader = new NetLoader("test")
            await loader.post(url,formData).then((value) => {
            })
            
            this.$router.replace('/admin/case_list')
            this.$message({
                message: '添加成功',
                type: "success"
            });
        },
        back: function () {
            this.$router.replace('/admin/case_list')
        }
    },
    components: { Case_editor }
}
</script>

<style scoped lang="less">
#add_disease {
    width: 100vw;
    height: wrap-content;
    //background: rgb(245, 30, 70);
    padding-top: 60px;
    margin: 0;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>