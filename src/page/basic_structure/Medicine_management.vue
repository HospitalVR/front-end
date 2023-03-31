<template>
    <div id="medicine_management">
        <h1 style="textAlign: center">药品管理</h1>
        <Table :label="labels" :data="tableData" :width="widthList" :keys="keys" url="/drug"></Table>
    </div>
</template>

<script>
import Table from '@/component/Table.vue'
import { NetLoader } from '@/net';
export default {
    name: "Medicine_management",
    data() {
        return {
            labels: ["编号", "药物名称", "价格", "介绍"],
            keys: ["id","name","price","description"],
            widthList:[60,120,90,570],
            tableData: [],
        }
    },
    methods: {
        get_data: function () {
            this.tableData=[]
            let url = "http://127.0.0.1:8888/drug/findAll"
            let loader = new NetLoader("test")
            loader.get(url).then((value) => {
                for (let index in value.data) {
                    this.tableData.push(value.data[index])
                }
            })
        }
    },
    components: { Table },
    created() {
        this.get_data();
    }
}
</script>

<style lang="less" scoped>
#medicine_management {
    width: 100%;
}
</style>