<template>
    <div>
        <el-menu class="exam-nav">
            <el-menu-item 
            v-for="item in exams" 
            :key="item.id" 
            v-on:click="show_paper(item.paper_id)">考试{{ ++count }}</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import { NetLoader } from '@/net';
import { exams } from './exams.js';
export default {
    data() {
        return {
            count: 0,
            exams: []
        }
    },
    methods: {
        show_paper: function(id) {
            this.$router.push({
                path: '/home/testPaper', query: { paper_id: id }
            })
        }
    },
    created() {
        let loader = new NetLoader("test")
        loader.get("/test/findAll").then((value) => {
            exams = value.data
        })
        
        //this.exams = exams
    }
}
</script>

<style>
.exam-nav {
    min-height: calc(100vh - 60px);
    text-align: center
}
</style>