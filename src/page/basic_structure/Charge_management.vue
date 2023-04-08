<template>
    <div>
        <el-page-header @back="goBack" :content="title"></el-page-header>
        <Table :label="labels" :width="widthList" :keys="keys" :url="url" :config="config"></Table>
    </div>
</template>

<script>
import Table from '@/component/Table.vue'
export default {
    name: "Charge_management",
    data() {
        return {
            labels: ["编号", "收费项目", "价格", "介绍"],
            keys: ["id","name","price","description"],
            widthList: [60, 150, 90, 500],
            url: "/charge",
            title: "收费管理",
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