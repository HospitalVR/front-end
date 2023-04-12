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
                    <el-button type="primary" size="mini" @click="show_paper(scope.row.testpaper)">参加考试</el-button>
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
            count: 0,
            exams: [],
        }
    },
    methods: {
        show_paper: function(testpaper) {
            this.$router.push({
                path: '/home/testPaper', query: { questions: testpaper.questions, period: testpaper.period }
            })
        },
        joinExamination: function(row) {

        }
    },
    created() {
        let loader = new NetLoader("test")
        loader.get("/test/findAll").then((value) => {
            this.exams = value.data
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