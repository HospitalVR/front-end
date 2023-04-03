<template>
    <div>
        <el-menu class="exam-nav">
            <el-menu-item :key="item.id" v-for="item in exams" v-on:click="show_paper(item.testpaper)">考试{{ item.id }}</el-menu-item>
        </el-menu>
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
                path: '/home/testPaper', query: { questions: testpaper.questions }
            })
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