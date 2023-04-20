<template>
    <div>
        <h1 style="textAlign: center">试卷管理</h1>
        <el-button type="primary" size="mini" @click="add_paper">添加</el-button>
        <el-table :data="paperList" border style="width: 100%;margin-top: 20px;"
            :header-cell-style="{ background: 'rgb(242, 243, 244)', color: '#515a6e' }">
            <el-table-column fixed prop="id" label="ID">
            </el-table-column>
            <el-table-column prop="total_score" label="总分">
            </el-table-column>
            <el-table-column label="考试时间">
                <template slot-scope="scope">
                    {{ scope.row.period }} (分钟)
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { NetLoader } from '@/net';

export default {
    data() {
        return {
            loader: new NetLoader("test"),
            paper: {
                id: "",
                questions: [],
                period: "",
                total_score: "",
            },
            paperList: []
        }
    },
    methods: {
        get_data() {
            this.loader.get("/paper/findAll").then((value) => {
                this.paperList = value.data
            })
        },
        async add_paper() {
            let formData = new FormData()
            formData.append("period","1")
            formData.append("question_id","0")
            let url = "http://127.0.0.1:8888/paper/addPaper"
            await this.loader.post(url,formData).then((value) => {
            })
            this.$message("添加成功，请编辑试卷信息");
            this.loader.get("/paper/findAll").then((value) => {
                this.edit(value.data[value.data.length-1])
                this.paperList = value.data
            })
        },
        edit(row) {
            this.$router.replace({
                path: '/admin/paper_edit',
                query:{
                    selectedPaper: row
                }
            });
        },
        async del(row) {
            await this.loader.get("/paper/deleteById?id="+row.id).then((value) => {
            }).catch(() => {
                this.$alert( "删除失败，请先将该试卷从所有考试中移除" )
            })
            this.$message("删除成功");
            this.loader.get("/paper/findAll").then((value) => {
                this.paperList = value.data
            })
        },
    },
    created() {
        this.get_data()
    }
}
</script>