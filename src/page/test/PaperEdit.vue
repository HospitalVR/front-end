<template>
    <div>
        <h1 style="textAlign: center">试卷编制</h1>
        <el-card class="box-card" shadow="never" style="width:60%;margin-left:20%;">
            <el-form :rules="rules" :model="paper" ref="paper">
                <el-form-item label="考试时间(分钟)：" label-width="150px" prop="period">
                    <el-input-number v-model="paper.period" :min="1" :max="300"></el-input-number>
                    <el-button style="margin-left:20px" @click="periodEdit()" >确认</el-button>
                </el-form-item>
                <el-button size="mini" @click="add_question()" style="margin-bottom:10px;float:right;">添加试题</el-button>
                <el-table :data="paper.questions" :header-cell-style="{ background: 'rgb(242, 243, 244)', color: '#515a6e' }">
                    <el-table-column prop="type" label="类别">
                    </el-table-column>
                    <el-table-column prop="content" label="题干">
                    </el-table-column>
                    <el-table-column prop="score" label="分数">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" @click="delete_question(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <div style="margin-top:20px;text-align:right;">
                <el-button @click="back()" >返回</el-button>
            </div>
            <el-dialog title="添加试题" :visible.sync="dialogFormVisible">
                <el-card class="box-card">
                    <div slot="header">
                        <span style="font-size: large;">试题检索</span>
                    </div>
                    <el-input placeholder="在此输入检索试题" v-model="input" size="small" style="width:80%" clearable> </el-input>
                    <el-button type="primary" icon="el-icon-search" size="small" v-on:click="search"></el-button>
                    <el-radio-group id="select" v-model="radio" style="display:flex; flex-flow:row nowrap; align-items: flex-start;">
                        <el-radio :label="1">内容检索</el-radio>
                        <!-- <el-radio :label="2">ID检索</el-radio> -->
                        <el-radio :label="3">类别检索</el-radio>
                    </el-radio-group>
                    <el-button style="margin-top:10px" type="primary" size="mini" @click="get_data">全部试题</el-button>
                </el-card>
                <el-table ref="questionTable" :data="questionsList" border style="width: 100%;margin-top: 20px;"
                    :header-cell-style="{ background: '#f8f8f9', color: '#515a6e' }">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column fixed prop="id" label="ID" v-if="false">
                    </el-table-column>
                    <el-table-column prop="type" label="类别">
                    </el-table-column>
                    <el-table-column prop="content" label="题干">
                    </el-table-column>
                    <el-table-column prop="score" label="分数">
                    </el-table-column>
                </el-table>
                <div style="margin-top:20px;text-align:center;">
                    <el-button @click="dialogFormVisible = false" style="margin-right:200px;">取 消</el-button>
                    <el-button type="primary" @click="get_table_data()">确 定</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
import { NetLoader } from '@/net';


export default {
    data() {
        return {
            loader: new NetLoader('test'),
            paper: this.$route.query.selectedPaper,
            questionsList: [],
            // rules: {
            //      period: [
            //          { min: 1, message: "考试时间应介于1-300分钟之间", trigger: "blur" },
            //      ],
            // },
            input: "",
            radio: 3,
            dialogFormVisible: false,

        }
    },
    methods: {
        get_data() {
            this.loader.get("/question/findAll").then((value) => {
                this.questionsList = value.data
            })
        },
        search() {
            if (this.radio === 1) {
                this.loader.get("/question/findAllByContent?content=" + this.input).then((value) => {
                    this.questionsList = value.data
                })
            }
            else if (this.radio === 2) {
                this.loader.get("/question/findById?id=" + this.input).then((value) => {
                    this.questionsList = value.data
                })
            }
            else if (this.radio === 3) {
                this.loader.get("/question/findAllByType?type=" + this.input).then((value) => {
                    this.questionsList = value.data
                })
            }
        },
        add_question() {
            this.dialogFormVisible = true
        },
        async delete_question(row) {
            await this.loader.get("/paper/deleteQuestions?paper_id="+this.paper.id+"&question_id="+row.id).then((value) => {
            })
            this.$message("删除成功");
            this.loader.get("/paper/findById?id="+this.paper.id).then((value) => {
                this.paper = value.data
            })
        },
        async get_table_data() {
            let question_id = []
            for (var i = 0; i < this.$refs.questionTable.selection.length; i++) {
                question_id.push(this.$refs.questionTable.selection[i].id)
            }
            let formData = new FormData();
            formData.append("paper_id",this.paper.id)
            formData.append("question_id",question_id)
            
            let url = "http://127.0.0.1:8888/paper/addQuestions"
            await this.loader.post(url,formData).then((value) => {
            })
            this.$message("添加成功");
            this.dialogFormVisible = false
            this.loader.get("/paper/findById?id="+this.paper.id).then((value) => {
                this.paper = value.data
            })
        },
        periodEdit() {
            let formData = new FormData()
            formData.append("id",this.paper.id)
            formData.append("period",this.paper.period)
            let url = "http://127.0.0.1:8888/paper/save"
            this.loader.post(url,formData).then((value) => {
                this.$message("修改成功");
            })
        },
        back() {

            this.$router.replace({
                path: '/admin/paper_management'
            });
        },

    },
    created() {
        this.get_data()
    }
}
</script>

<style>
#select{
    font-size: 14px;
    margin-top: 10px;
    margin-bottom:5px;
}
</style>