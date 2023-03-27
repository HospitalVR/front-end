<template>
    <div class="test-container">
        <div class="header">
            <h1>试卷{{ paper_id }}</h1>
        </div>
        <ul class="list">
            <li v-for="(q, i) in questions" :key="i">
                <el-card class="box-card">
                    <div slot="header">
                        <span style="font-size: large;">{{ i+1 }}. {{q.content.split(',')[0]}}</span>
                    </div>
                    <el-radio-group v-model="selected[i]" style="display:flex; flex-flow:column nowrap; align-items: flex-start;">
                        <el-radio label="A">A. {{q.content.split(',')[1]}}</el-radio>
                        <el-radio label="B">B. {{q.content.split(',')[2]}}</el-radio>
                        <el-radio label="C">C. {{q.content.split(',')[3]}}</el-radio>
                    </el-radio-group>
                </el-card>
            </li>
        </ul>
        <el-button type="primary" class="subBtn" @click="present()">提交试卷</el-button>
    </div>
</template>

<script>
//import { questions } from './data/questions.js';
export default {
    data() {
        return {
            paper_id: this.$route.query.paper_id,
            paper: {},
            questions: [],
            selected: []
        }
    },
    methods: {
        get_questions: function () {
            let loader = new NetLoader("test")
            loader.get("/testPaper/findById?id=" + this.paper_id).then((value) => {
                this.paper = value.data
            })

            let questionIds = this.paper.questions.split(',')

            for(let i = 0; i < questionIds.length; i++) {
                loader.get("/question/findById?id=" + questionIds[i]).then((value) => {
                this.questions.push(value.data)
                })
            }
            
            //this.questions = questions
        },
        present: function() {
            this.$router.push({
                path: '/home/testResult', query: { questionsList: this.questions, usrSelected: this.selected }
            })
        }
    },
    created () {
        this.get_questions()
    }
}

</script>

<style scoped>

.header {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.list {
    list-style-type: none;
}
.subBtn{
  display: block;
  width: 15%;
  margin: 20px auto;
}
.box-card {
    height: wrap-content;
    padding: 0;
    margin-top: 15px;
}
</style>
