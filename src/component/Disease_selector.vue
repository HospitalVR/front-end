<template>
    <div id="disease_selector">
      <el-card class="box-card">
        <div slot="header">
          <span style="font-size: large;">病例检索</span>
        </div>
        <el-input placeholder="在此输入检索病例" v-model="input" size="small" style="width:225px" clearable> </el-input>
        <el-button type="primary" icon="el-icon-search" size="small" v-on:click="search"></el-button>
        <p id="select">选择检索方式：</p>
        <el-radio-group v-model="radio" style="display:flex; flex-flow:column nowrap; align-items: flex-start;">
          <el-radio :label="1">疾病名称检索</el-radio>
          <el-radio :label="2">关键字检索</el-radio>
          <el-radio :label="3">模糊检索</el-radio>
        </el-radio-group>
        <p id="select">检索结果：</p>
        <el-tag id="tag" v-for="item in result" :key="item" v-on:click="show_data(item)">{{ item }}</el-tag>
      </el-card>
    </div>
</template>

<script>
import { NetLoader } from '@/net';
export default {
    name: "Disease_selector",
    data() {
        return {
            input: '',
            radio: 3,
            result:[]
        };
    },
    methods: {
        search: function () {
            let loader = new NetLoader("test")
            loader.get("/case/findAllByName?name=" + this.input).then((value) => {
                this.result = value.data
            })
        },
        show_data: function (name) {
            this.$router.push({
                path: '/home/disease_view', query: { disease_name: name }
            })
        }
    },
    components: {  } 
}
</script>

<style scoped lang="less">
#disease_selector {
    width: 29%;
    float:right;
    height: wrap-content;
    //background: rgb(148, 254, 0);
    padding: 0;
    margin-top: 15px;
}
 .box-card {
    width: 86%;
  }
#select{
    font-size: 14px;
    margin-top: 10px;
    margin-bottom:5px;
}
#tag{
    margin-left:5px;
    margin-right:5px;
    margin-top:10px;
}
</style>