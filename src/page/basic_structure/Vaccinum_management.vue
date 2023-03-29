<template>
    <div id="vaccinum_management">
        <h1 style="textAlign: center">疫苗管理</h1>
        <Table :label="labels" :data="tableData" :width="widthList"></Table>
    </div>
</template>

<script>
import Table from '@/component/Table.vue'
export default {
    name: "Vaccinum_management",
    data() {
        return {
            labels: ["编号", "疫苗名称", "作用动物", "类型","方式","时间","有效时间","副作用"],
            widthList: [120, 120, 90, 120, 180, 90, 120, 180],
            tableData: [{
                id: "10240000-132A",
                name: "老鼠药",
                price: "80.00",
                description: "哈哈",
                id2: "10240000-132A",
                name3: "老鼠药",
                pri4ce: "80.00",
                desc5ription: "哈哈"
            }, {
                id: "10240000-132A",
                name: "老鼠药BBB",
                price: "80.00",
                description: "哈哈",
                id2: "10240000-132A",
                name3: "老鼠药",
                pri4ce: "80.00",
                desc5ription: "哈哈"
            }],
        }
    },
    methods: {

    },
    components: { Table }
}
</script>

<style lang="less" scoped>
#vaccimum_management {
    width: 100%;
}
</style>