<template>
    <div class="test-container">
        <div class="header">
            <h1>测试结果{{ paper_id }}</h1>
        </div>
        <span class="score">您的得分是：{{score}}</span>
        <ul class="list">
            <li v-for="(q, i) in questionsList" :key="i">
                <el-card class="box-card">
                    <div slot="header">
                        <span style="font-size: large;">{{ i+1 }}. {{ q.content.split(',')[0] }}</span>
                    </div>
                    <el-radio-group v-model="usrSelected[i]" style="display:flex; flex-flow:column nowrap; align-items: flex-start;">
                        <el-radio label="A">A. {{q.content.split(',')[1]}}</el-radio>
                        <el-radio label="B">B. {{q.content.split(',')[2]}}</el-radio>
                        <el-radio label="C">C. {{q.content.split(',')[3]}}</el-radio>
                    </el-radio-group>
                    <div>正确答案：{{rightAnswers[i]}}</div>
                    <div :class="[rightAnswers[i] === usrSelected[i] ? 'bluee' : 'redd']">
                        <span style="display: inline-block;margin-right: 40px">您的选择：{{usrSelected[i]}}</span>
                        得分{{rightAnswers[i] === usrSelected[i] ? questionsList[i].score : ' 0'}}
                    </div>
                </el-card>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            questionsList: this.$route.query.questionsList,
            usrSelected: this.$route.query.usrSelected,
            rightAnswers: [],
            score: 0
        }
    },
    methods: {
        get_right_answers: function() {
            for (let i=0; i<this.questionsList.length; i++) {
                let content = this.questionsList[i].content.split(',')
                if (content[1] === content[4]) {
                    this.rightAnswers[i] = "A"
                }
                else if (content[2] === content[4]) {
                    this.rightAnswers[i] = "B"
                }
                else {
                    this.rightAnswers[i] = "C"
                }
            }
        },
        cal_score: function() {
            for(let i=0; i<this.usrSelected.length; i++) {
                if (this.usrSelected[i] === this.rightAnswers[i]) {
                    this.score += this.questionsList[i].score
                }
            }
        }
    },
    created() {
        this.get_right_answers()
        this.cal_score()
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
.score {
    color: #f35;
    display: block;
    width: 15%;
    margin: 20px;
}
.box-card {
    height: wrap-content;
    padding: 0;
    margin-top: 15px;
}
.bluee{
  color: #409EFF;
}

.redd{
    color: #f35;
}
</style>