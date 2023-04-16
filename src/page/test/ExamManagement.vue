<template>
    <div>
        <h1 style="textAlign: center">考试管理</h1>
        <el-button type="primary" size="mini" @click="add">添加</el-button>
        <el-table :data="examList" border style="width: 100%;margin-top: 20px;"
            :header-cell-style="{ background: 'rgb(242, 243, 244)', color: '#515a6e' }">
            <el-table-column fixed prop="id" label="ID">
            </el-table-column>
            <el-table-column fixed prop="testpaper.id" label="对应试卷">
            </el-table-column>
            <!-- <el-table-column :formatter="dateFormat" prop="start_time" label="开始时间">
            </el-table-column>
            <el-table-column :formatter="dateFormat" prop="end_time" label="结束时间">
            </el-table-column> -->
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <!-- <el-button size="mini" @click="edit(scope.row)">编辑</el-button> -->
                    <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="dialog">
            <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
                <el-form :rules="diglogRules" :model="exam" ref="exam">
                    <el-form-item style="display:none;" label="id" label-width="100px" prop="id">
                        <el-input v-model="exam.id"></el-input>
                    </el-form-item>
                    <el-form-item label="考试试卷：" label-width="100px" prop="testpaper">
                        <el-select v-model="exam.testpaper.id" placeholder="请选择试卷" @change="changeTestPaper">
                            <el-option v-for="item in paperList" :value="item.id" :label="item.id"
                                :key="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="考试时间：" label-width="100px" prop="time">
                        <el-input :disabled="true" v-model="exam.testpaper.period"></el-input>
                    </el-form-item>
                    <el-form-item label="总分：" label-width="100px" prop="score">
                        <el-input :disabled="true" v-model="exam.testpaper.total_score"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="开放时间" label-width="100px">
                        <el-date-picker
                            v-model="dateTimeValue"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间">
                        </el-date-picker>
                    </el-form-item> -->
                    <el-form-item>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submit('exam')">确 定
                    </el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { NetLoader } from '@/net';
import { formatDate } from './dateUtil.js';
export default {
    data() {
        return {
            loader: new NetLoader("test"),
            examList: [],
            paperList: [],
            exam: {
                id: "",
                testpaper: {},
                users: [],
                start_time: "",
                end_time: ""
            },
            dialogTitle: "",
            dialogFormVisible: false,
            diglogRules: {},
            dateTimeValue: []
        }
    },
    methods: {
        get_data() {
            this.loader.get("/test/findAll").then((value) => {
                this.examList = value.data
            })
            this.loader.get("/paper/findAll").then((value) => {
                this.paperList = value.data
            })
        },
        dateFormat(row, column) {
            let date = new Date(row[column.property]);
            return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        },
        changeTestPaper() {
            this.loader.get("/paper/findById?id=" + this.exam.testpaper.id).then((value) => {
                this.exam.testpaper = value.data
            })
        },
        add() {
            this.exam.id = ""
            this.exam.testpaper = {}
            this.exam.users = []
            this.exam.start_time = ""
            this.exam.end_time = ""
            this.dateTimeValue = []
            this.dialogTitle = "增加考试";
            this.dialogFormVisible = true;
        },
        edit(row) {
            this.exam.id = row.id
            this.exam.testpaper = row.testpaper
            this.exam.users = row.users
            this.exam.start_time = row.start_time
            this.exam.end_time = row.end_time
            let newDateTimeValue = [row.start_time, row.end_time]
            this.dateTimeValue = newDateTimeValue
            this.dialogTitle = "修改考试";
            this.dialogFormVisible = true;
        },
        del(row) {
            this.loader.get("/test/deleteById?id="+row.id).then((value) => {
                alert("删除考试 " + row.id)
                this.loader.get("/test/findAll").then((value) => {
                this.examList = value.data
                })
            })
        },
        async submit() {
            // this.exam.start_time = this.dateTimeValue[0]
            // this.exam.end_time = this.dateTimeValue[1]

            let formData = new FormData();
            formData.append("paper_id", this.exam.testpaper.id)
            formData.append("user_id", 3)
            let url = "http://127.0.0.1:8888/test/addTest"
            await this.loader.post(url,formData).then((value) => {
            })
            this.$message(this.dialogTitle === "添加考试" ? '添加成功':'编辑成功')
            this.dialogFormVisible = false
            this.loader.get("/test/findAll").then((value) => {
                this.examList = value.data
            })
        },
    },
    created() {
        this.get_data()
    }
}
</script>