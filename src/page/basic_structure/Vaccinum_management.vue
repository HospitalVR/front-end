<template>
    <div>
        <el-page-header @back="goBack" :content="title"></el-page-header>
        <Table :label="labels" :width="widthList" :keys="keys" :url="url" :config="config"></Table>
    </div>
</template>

<script>
import Table from '@/component/Table.vue'
export default {
    name: "Vaccinum_management",
    data() {
        return {
            labels: ["编号", "疫苗名称", "作用动物", "疫苗类型", "注射方式", "接种时间", "有效时间", "副作用","价格"],
            keys: ["id", "name", "animal", "type", "method", "time", "protection", "side_effects","price"],
            widthList: [60, 220, 80, 120, 120, 450, 80, 550,120],
            url: "/vaccine",
            title: "疫苗管理",
            config: ["uneditable_text", "uneditable_text", "text", "text", "text", "text", "text", "text","float"]
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    },
    components: { Table }
}
</script>

<style lang="less" scoped>
</style>