<template>
    <div>
        <el-page-header @back="goBack" :content="title"></el-page-header>
        <Table :label="labels" :width="widthList" :keys="keys" :url="url" :config="config"></Table>
    </div>
</template>

<script>
import Table from '@/component/Table.vue'
export default {
    name: "Medicine_management",
    data() {
        return {
            labels: ["编号", "药物名称", "价格", "介绍"],
            keys: ["id","name","price","description"],
            widthList: [60, 120, 90, 570],
            url: "/drug",
            title: "药品管理",
            config: ["uneditable_text", "uneditable_text", "float", "text"]
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