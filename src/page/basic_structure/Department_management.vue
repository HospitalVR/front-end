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
            labels: ["编号", "科室名称", "介绍", "权限"],
            keys: ["id", "name",  "description","head"],
            widthList: [60, 90, 600, 250],
            url: "/department",
            title: "科室管理",
            config: ["uneditable_text", "uneditable_text", "text", "text"]
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

<style lang="less" scoped></style>