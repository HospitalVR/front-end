<template>
    <div>
        <el-table :data="exams" border style="width: 100%;margin-top: 20px;"
        :header-cell-style="{background: 'rgb(242, 243, 244)',color:'#515a6e'}">
            <el-table-column prop="id" label="考试名称">
                <template slot-scope="scope">
                    考试{{ scope.row.id }}
                </template>
            </el-table-column>
            <el-table-column prop="testpaper.period" label="考试时间">
            </el-table-column>
            <el-table-column prop="testpaper.total_score" label="总分">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="show_paper(scope.row)">参加考试</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- <el-menu class="exam-nav">
            <el-menu-item :key="item.id" v-for="item in exams" v-on:click="show_paper(item.testpaper)">考试{{ item.id }}</el-menu-item>
        </el-menu> -->
        
        
    </div>
</template>

<script>
import { NetLoader } from '@/net';
export default {
    data() {
        return {
            loader: new NetLoader("test"),
            count: 0,
            exams: [],
            currentUserName: ""
        }
    },
    methods: {
        show_paper: function(row) {
            let users = row.users
            let flag = false
            for(let i=0; i<users.length; i++) {
                if (users[i].userName === this.currentUserName) {
                    flag = true
                }
            }
            if (flag === true) {
                this.$router.push({
                    path: '/home/testPaper', query: { questions: row.testpaper.questions, period: row.testpaper.period }
                })
            }
            else {
                this.$message('抱歉，您没有权限参加本考试')
            }
        },
    },
    created() {
        this.loader.get("/test/findAll").then((value) => {
            this.exams = value.data
        })
        this.loader.get("/user/verify").then(value => {
            this.currentUserName = value.data.userName
        })
    }
}
</script>

<style>
.exam-nav {
    min-height: calc(100vh - 60px);
    text-align: center
}
</style>