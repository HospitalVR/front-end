<template>
    <div style="height:100%;width:100%">
    <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 80vw" max-height="400">
        <el-table-column v-for="label in labels" :label="label" :prop="switch_label(label)" :width="switch_width(label)" ></el-table-column>
        <el-table-column align="right" fixed="right" width="180">
            <template v-if="tableData.length!==0" slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="输入检索信息" />
            </template>
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <PopUpDialog ref="child" :select-data="selectData" :labels="labels"></PopUpDialog>
    </div>
</template>

<script>
import PopUpDialog from './PopUpDialog.vue';
export default {
    name: "Table",
    data() {
        return {
            labels: this.$props.label,
            tableData: this.$props.data,
            widthlist: this.$props.width,
            selectData:{},
            search: "",
        };
    },
    methods: {
        handleEdit(index, row) {
            this.selectData= Object.assign({},row)
            this.$refs.child.dialogFormVisible = true
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        switch_label: function (label) {
            let res = "";
            for (let i = 0; i < this.labels.length; i++) {
                if (this.labels[i] == label) {
                    let j = 0;
                    for (let key in this.tableData[0]) {
                        if (j == i) {
                            res = key;
                        }
                        j = j + 1;
                    }
                }
            }
            return res;
        },
        switch_width: function (label) {
            let res = 0;
            for (let i = 0; i < this.labels.length; i++) {
                if (this.labels[i] == label) {
                    res = this.widthlist[i];
                }
            }
            return res;
        }
    },
    props: {
        label: Array,
        data: Array,
        width: Array
    },
    components: { PopUpDialog }
}
</script>

<style scoped lang="less">
#table {
    width: wrap-content;
    height: wrap-content;
    //background: rgb(175, 240, 211);
    padding: 0;
    margin: 0;
}
</style>