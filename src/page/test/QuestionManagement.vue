<template>
    <div>
        <h1 style="textAlign: center">试题管理</h1>
        <div id="question_selector">
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
                <el-button type="primary" size="mini" @click="add">添加</el-button>
            </el-card>
        </div>

        <el-table :data="questionsList" border style="width: 100%;margin-top: 20px;"
            :header-cell-style="{ background: 'rgb(242, 243, 244)', color: '#515a6e' }">
            <el-table-column fixed prop="id" label="ID">
            </el-table-column>
            <el-table-column prop="type" label="类别">
            </el-table-column>
            <el-table-column prop="content" label="题干">
            </el-table-column>
            <el-table-column prop="score" label="分数">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="dialog">
            <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
                <el-form :rules="dialogRules" :model="question" ref="question">
                    <el-form-item style="display:none;" label="id" label-width="100px">
                        <el-input v-model="question.id"></el-input>
                    </el-form-item>
                    <el-form-item label="类别：" label-width="100px" prop="type">
                        <el-input v-model="question.type" placeholder="请输入类别">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="题干：" label-width="100px" prop="content">
                        <el-input v-model="question.content" type="textarea" :rows="5" placeholder="请输入题干">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="A选项：" label-width="100px" prop="a">
                        <el-input v-model="question.a_choice" placeholder="请输入A选项">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="B选项：" label-width="100px" prop="b">
                        <el-input v-model="question.b_choice" placeholder="请输入B选项">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="C选项：" label-width="100px" prop="c">
                        <el-input v-model="question.c_choice" placeholder="请输入C选项">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="D选项：" label-width="100px" prop="d">
                        <el-input v-model="question.d_choice" placeholder="请输入D选项">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="答案：" label-width="100px" prop="answer">
                        <el-radio v-model="question.answer" label="A">A</el-radio>
                        <el-radio v-model="question.answer" label="B">B</el-radio>
                        <el-radio v-model="question.answer" label="C">C</el-radio>
                        <el-radio v-model="question.answer" label="D">D</el-radio>
                    </el-form-item>
                    <el-form-item label="分值：" label-width="100px" prop="score">
                        <el-input v-model="question.score" placeholder="请输入分值">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submit()">确 定
                    </el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { NetLoader } from '@/net'
export default {
    name: "Question_management",
    data() {
        return {
            loader: new NetLoader("test"),
            radio: 3,
            input: "",
            question: {
                id: "",
                content: "",
                a_choice: "",
                b_choice: "",
                c_choice: "",
                d_choice: "",
                answer: "",
                type: "",
                score: ""
            },
            questionsList: [],
            dialogTitle: "",
            dialogFormVisible: false,
            dialogRules: {
                content: [
                    { required: true, message: '题干不能为空', trigger: 'blur' },
                    { max: 100, message: "题干长度不能超过100个字符", trigger: "blur" }
                ],
                type: [
                    { required: true, message: '类型不能为空', trigger: 'blur' },
                    { max: 10, message: "类型长度不能超过10个字符", trigger: "blur" }
                ],
                answer: [
                    { required: true, message: '答案不能为空', trigger: 'blur' },
                    { max: 50, message: "答案长度不能超过50个字符", trigger: "blur" }
                ]
            }
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
        add() {
            this.question.id = ""
            this.question.type = ""
            this.question.content = ""
            this.question.a_choice = ""
            this.question.b_choice = ""
            this.question.c_choice = ""
            this.question.d_choice = ""
            this.question.answer = ""
            this.question.score = ""
            this.dialogTitle = "添加试题"
            this.dialogFormVisible = true
        },
        edit(row) {
            this.question.id = row.id
            this.question.type = row.type
            this.question.content = row.content
            this.question.a_choice = row.a_choice
            this.question.b_choice = row.b_choice
            this.question.c_choice = row.c_choice
            this.question.d_choice = row.d_choice
            this.question.answer = row.answer
            this.question.score = row.score
            this.dialogTitle = "编辑试题"
            this.dialogFormVisible = true
        },
        async submit() {
            let url = "http://127.0.0.1:8888/question/save"
            await this.loader.post(url,this.question).then((value) => {
            })
            this.$message(this.dialogTitle === "添加试题" ? '添加成功':'编辑成功');
            this.dialogFormVisible = false
            this.loader.get("/question/findAll").then((value) => {
            this.questionsList = value.data
            })
        },
        del(row) {
            this.loader.delete("/question/deleteById?id="+row.id).then((value) => {
                this.$message("删除成功");
                this.loader.get("/question/findAll").then((value) => {
                this.questionsList = value.data
                })
            }).catch(() => {
                this.$alert( '删除失败，请先将该试题从所有试卷中移除' )
            })
            // let url = "http://127.0.0.1:8888" + this.$props.url + "/save"
            // let loader = new NetLoader("test")
            // loader.post(url, formData).then((value) => {
            //     this.dialogFormVisible = false
            //     this.$props.get_data()
            //     this.$message({
            //         message: '添加成功',
            //         type: "success"
            //     });
            // }).catch(() => {
            //     this.$message({
            //         message: '添加失败',
            //         type: "error"
            //     });
            // })
        }
    },
    created() {
        this.get_data()
    },
}
</script>

<style lang="less" scoped>
#question_selector {
    //width: 50%;
    //float:right;
    height: wrap-content;
    //background: rgb(148, 254, 0);
    padding: 0;
    margin-top: 15px;
}
 .box-card {
    width: 40%;
  }
#select{
    font-size: 14px;
    margin-top: 10px;
    margin-bottom:5px;
}
</style>