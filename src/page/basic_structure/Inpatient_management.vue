<template>
    <div>
        <el-page-header @back="goBack" :content="title"></el-page-header>
        <Table :label="labels" :width="widthList" :keys="keys" :url="url" :config="config"></Table>
    </div>
</template>

<script>
import Table from '@/component/Table.vue'
export default {
    name: "Inpatient_management",
    data() {
        return {
            labels: ["编号", "宠物名称", "宠物类型", "宠物主人", "手机号", "住院原因", "入院时间", "出院时间","住院时长","住院费用"],
            keys: ["id","name","breed","owner", "phone", "reason", "admission", "discharge", "day", "cost"],
            widthList: [60, 90, 120, 90,150,180,120,120,90,90],
            url: "/inpatient",
            title: "住院管理",
            config: ["uneditable_text", "uneditable_text", "text", "text", "text", "disease", "date", "date", "num", "float"]
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