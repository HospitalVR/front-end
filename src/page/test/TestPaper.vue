<template>
    <div class="test-container">
        <div class="header">
            <h1>试卷</h1>
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
            selected: []
        }
    },
    methods: {
        present: function() {
            this.$router.push({
                path: '/home/testResult', query: { questionsList: this.questions, usrSelected: this.selected }
            })
        }
    },
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
