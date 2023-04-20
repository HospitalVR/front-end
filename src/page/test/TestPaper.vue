<template>
    <div class="test-container">
        <div class="header">
            <h1>试卷</h1>
        </div>
        <div id="timer">
            距离考试结束还有：
            <div style="color:red;">{{djs}}</div>
        </div>
        <ul class="list">
            <li v-for="(q, i) in questions" :key="q.id">
                <el-card class="box-card">
                    <div slot="header">
                        <span style="font-size: large;">{{ i+1 }}. {{q.content}}</span>
                    </div>
                    <el-radio-group v-model="selected[i]" style="display:flex; flex-flow:column nowrap; align-items: flex-start;">
                        <el-radio label="A">A. {{q.a_choice}}</el-radio>
                        <el-radio label="B">B. {{q.b_choice}}</el-radio>
                        <el-radio label="C">C. {{q.c_choice}}</el-radio>
                        <el-radio label="D">D. {{q.d_choice}}</el-radio>
                    </el-radio-group>
                </el-card>
            </li>
        </ul>
        <el-button type="primary" class="subBtn" @click="present()">提交试卷</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            questions: this.$route.query.questions,
            period: this.$route.query.period,
            selected: [],
            timer: null,
            djs: "",
            seconds: 0
        }
    },
    methods: {
        present: function() {
            this.$router.replace({
                path: '/home/testResult', query: { questionsList: this.questions, usrSelected: this.selected }
            })
            clearInterval(this.timer);
        },
        countDown() {
            let m = parseInt(this.seconds / 60);
            m = m < 10 ? "0" + m : m
            let s = parseInt(this.seconds % 60);
            s = s < 10 ? "0" + s : s
            this.djs = m + '分钟' + s + '秒'
        },
    },
    created() {
        if (this.questions[0] === "[object Object]") {
            this.$router.replace('/home/exams')
        }
        this.seconds = this.period * 60;
        //考试时间倒计时监听器
        this.timer=setInterval(() => {
            if (this.seconds < 1) {
                this.present();
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: '时间到，考试结束'
                });
            } else {
                this.seconds = this.seconds - 1;
                this.countDown();
            }
        }, 1000);
    },
    destroyed() {
        clearInterval(this.timer);
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
#timer {
  /* position: fixed; */
  width: 160px;
  left: 20px;
  padding-left: 20px;
  font-size: 17px;
  background:white;
}
</style>
