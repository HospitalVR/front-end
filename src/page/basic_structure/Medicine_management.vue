<template>
    <div id="medicine_management">
        <h1 style="textAlign: center">药品管理</h1>
        <Table :label="labels" :data="tableData" :width="widthList" :keys="keys"></Table>
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
            widthList:[120,120,90,400],
            tableData: [{
                id:"10240000-132A",
                name: "老鼠药",
                price: "80.00",
                description: "毒死老鼠的专用药物，人类误食会引发腹泻"
            }, {
                id: "10240000-132B",
                name: "蟑螂药",
                price: "100.00",
                description: "毒死蟑螂的专用药物，人类误食会引发腹泻"
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