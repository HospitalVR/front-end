<template>
    <div id="medicine_management">
        <h1 style="textAlign: center">药品管理</h1>
        <Table :label="labels" :data="tableData" :width="widthList"></Table>
    </div>
</template>

<script>
import Table from '@/component/Table.vue'
export default {
    name: "Medicine_management",
    data() {
        return {
            labels: ["编号", "药物名称", "介绍"],
            widthList:[250,250,200],
            tableData: [{
                date: "10240000-132A",
                name: "老鼠药",
                addreas: "毒死老鼠的专用药物，人类误食会引发腹泻"
            }, {
                date: "10240000-132B",
                name: "蟑螂药",
                addreas: "毒死蟑螂的专用药物，人类误食会引发腹泻"
            }],
        }
    },
    methods: {

    },
    components: {Table}
}
</script>

<style lang="less" scoped>
#medicine_management {
    width: 100%;
}
</style>