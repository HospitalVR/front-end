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
            labels: ["编号", "宠物名称", "宠物种类", "宠物年龄", "宠物性别", "宠物颜色", "宠物主人", "手机号"],
            keys: ["id","name","breed","age", "gender", "color", "owner", "phone"],
            widthList: [60, 90, 90, 90,90, 90, 90, 150],
            url: "/record",
            title: "档案管理",
            config: ["uneditable_text", "uneditable_text", "text", "text", "text", "text", "text", "text"]
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