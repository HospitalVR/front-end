<template>
    <div class="test-container">
        <div class="header">
            <h1>测试结果</h1>
        </div>
        <span class="score">您的得分是：{{score}}</span>
        <ul class="list">
            <li v-for="(q, i) in questionsList" :key="q.id">
                <el-card class="box-card">
                    <div slot="header">
                        <span style="font-size: large;">{{ i+1 }}. {{ q.content }}</span>
                    </div>
                    <el-radio-group v-model="usrSelected[i]" style="display:flex; flex-flow:column nowrap; align-items: flex-start;">
                        <el-radio label="A">A. {{q.a_choice}}</el-radio>
                        <el-radio label="B">B. {{q.b_choice}}</el-radio>
                        <el-radio label="C">C. {{q.c_choice}}</el-radio>
                        <el-radio label="D">D. {{q.d_choice}}</el-radio>
                    </el-radio-group>
                    <div>正确答案：{{q.answer}}</div>
                    <div :class="[q.answer === usrSelected[i] ? 'bluee' : 'redd']">
                        <span style="display: inline-block;margin-right: 40px">您的选择：{{usrSelected[i]}}</span>
                        得分{{q.answer === usrSelected[i] ? q.score : ' 0'}}
                    </div>
                </el-card>
            </li>
        </ul>
        <el-button class="subBtn" @click="back">返回</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            questionsList: this.$route.query.questionsList,
            usrSelected: this.$route.query.usrSelected,
            score: 0
        }
    },
    methods: {
        cal_score: function() {
            for(let i=0; i<this.usrSelected.length; i++) {
                if (this.usrSelected[i] === this.questionsList[i].answer) {
                    this.score += this.questionsList[i].score
                }
            }
        },
        back() {
            this.$router.go(-1)
        }
    },
    created() {
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

.subBtn{
  display: block;
  width: 15%;
  margin: 20px auto;
}
</style>

