<template>
    <div style="height:100%;width:100%">
    <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 80vw" max-height="400">
        <el-table-column v-for="label in labels" :label="label" :key="label" :prop="switch_label(label)" :width="switch_width(label)" ></el-table-column>
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
    <el-button type="primary" icon="el-icon-plus" style="width:80vw" size="small" @click="handleAdd()"></el-button>
    <PopUpDialog ref="child" :select-data="selectData" :labels="labels" :keys="keyslist" :url="this.$props.url" :get_data="this.get_data" :config="this.$props.config"></PopUpDialog>
    <PopUpDialogForAdd ref="child2" :labels="labels.slice(1)" :keys="keyslist.slice(1)" :url="this.$props.url" :get_data="this.get_data" :config="configs.slice(1)"></PopUpDialogForAdd>
    </div>
</template>

<script>
import PopUpDialog from './PopUpDialog.vue';
import PopUpDialogForAdd from './PopUpDialogForAdd.vue';
import { NetLoader } from '@/net';

export default {
    name: "Table",
    data() {
        return {
            labels: this.$props.label,
            tableData: [],
            widthlist: this.$props.width,
            keyslist: this.$props.keys,
            selectData: {},
            search: "",
            configs: this.$props.config
        };
    },
    methods: {
        handleEdit(index, row) {
            this.selectData= Object.assign({},row)
            this.$refs.child.dialogFormVisible = true
        },
        handleAdd() {
            this.$refs.child2.dialogFormVisible = true
        },
        handleDelete(index, row) {
            let loader = new NetLoader("test")
            this.$confirm('这将会永久删除数据，确定继续删除吗？', '警告', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url = "http://127.0.0.1:8888" + this.$props.url + "/deleteByName?name=" + row.name
                loader.get(url).then((value) => {
                    this.get_data()
                    this.$message({
                        message: '删除成功',
                        type: "success"
                    });
                })
            }).catch(() => {
            });
        },
        get_data() {
            this.tableData = []
            let url = "http://127.0.0.1:8888"+ this.$props.url +"/findAll"
            let loader = new NetLoader("test")
            loader.get(url).then((value) => {
                for (let index in value.data) {
                    let count=0
                    for (let key in value.data[index]) {
                        if (this.configs[count] == 'date') {
                            value.data[index][key]= this.formatDate(new Date(value.data[index][key]))
                        }
                        count=count+1
                    }
                    this.tableData.push(value.data[index])
                }
            })
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
        },
        formatDate: function (date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
        }
    },
    props: {
        label: Array,
        width: Array,
        keys: Array,
        url: String,
        config:Array
    },
    components: { PopUpDialog, PopUpDialogForAdd },
    created() {
        this.get_data()
    }
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