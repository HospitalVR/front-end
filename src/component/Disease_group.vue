<template>
    <div id="disease_group">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ disease_group }}</span>
            <el-button style="float: right; padding: 3px 0" type="text" v-on:click="add_disease">添加疾病</el-button>
          </div>
          <el-tag id="tag" v-for="(item, index) in disease_name_list" :key="index" v-on:click="show_data(item)" closable :disable-transitions="false" @close="delete_disease(item)">{{ item }}</el-tag>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "Disease_group",
    data() {
        return {};
    },
    methods: {
        show_data: function (name) {
            this.$router.push({
                path: '/home/disease_view', query: {disease_name: name}
            })
        },
        delete_disease: function (name) {
            alert("删除疾病 "+name)
        },
        add_disease: function () {
            this.$router.push({
                path: '/admin/add_disease', query: { disease_group: this.disease_group }
            })
        }
    },
    props: {
        disease_group: String,
        disease_name_list: Array
    }
}
</script>

<style scoped lang="less">
#disease_group {
    width: 100%;
    height: wrap-content;
    //background: rgb(227, 81, 171);
    padding: 0;
    margin: 0;
    margin-top:30px;
}

#header{
    display: flex;
    flex-direction: row;
    justify-content: left;
}

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }

  #tag{
    margin-left:10px;
    margin-right:10px;
    margin-top:5px;
    margin-bottom:10px;
  }
</style>