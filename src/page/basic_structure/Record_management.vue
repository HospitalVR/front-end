<template>
    <div>
        <el-page-header @back="goBack" :content="title"></el-page-header>
        <Table :label="labels" :width="widthList" :keys="keys" :url="url" :config="config"></Table>
    </div>
</template>

<script>
import Table from '@/component/Table.vue'
export default {
    name: "Record_management",
    data() {
        return {
            labels: ["编号", "宠物名称", "宠物种类", "宠物年龄", "宠物性别", "宠物颜色", "宠物主人", "手机号","住院原因", "主治医生", "收费项目", "使用药品", "使用疫苗", "化验项目", "是否住院", "主要责任部门"],
            keys: ["id","name","breed","age", "gender", "color", "owner", "phone","disease","doctor","charge","drug","vaccine","assay","inpatient","department"],
            widthList: [60, 90, 90, 90,90, 90, 90, 150, 180, 90, 270, 270, 270, 270,90,120],
            url: "/record",
            title: "档案管理",
            config: ["uneditable_text", "uneditable_text", "text", "num", "pet_sex", "text", "text", "text", "disease", "text", "text", "text","text", "text", "bool", "text"]
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    },
    components: { Table },
}
</script>

<style lang="less" scoped>
</style>