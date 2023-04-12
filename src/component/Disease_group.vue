<template>
    <div id="disease_group">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ disease_group }}</span>
            <template v-if="this.$store.state.type == 'admin'"><el-button style="float: right; padding: 3px 0" type="text" v-on:click="add_disease">添加疾病</el-button></template>
          </div>
          <template v-if="this.$store.state.type == 'admin'">
            <el-tag id="tag" v-for="(item, index) in disease_name_list" :key="index" v-on:click="show_data(item)" closable :disable-transitions="false" @close="delete_disease(item)">{{ item }}</el-tag>
          </template>
          <template v-else>
            <el-tag id="tag" v-for="(item, index) in disease_name_list" :key="index" v-on:click="show_data(item)" :disable-transitions="false">{{ item }}</el-tag>
          </template>
        </el-card>
    </div>
</template>

<script>
import { NetLoader } from '@/net';
export default {
    name: "Disease_group",
    data() {
        return {};
    },
    methods: {
      show_data: function (name) {
          let usr = "home"
          if (this.$store.state.type == "admin") {
            usr = "admin"
          }
          this.$router.push({
            path: '/'+usr+'/disease_view', query: {disease_name: name, disease_group: this.disease_group }
          })
        },
      delete_disease: function (name) {
        let loader = new NetLoader("test")
        this.$confirm('这将会永久删除数据，确定继续删除吗？', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          loader.get("/case/deleteByName?name=" + name + "").then((value) => {
          this.$message({
              message: '删除成功',
              type: "success"
          });
            this.$props.refresh();
          })
        }).catch(() => {
        });
      },
        add_disease: function () {
            this.$router.push({
                path: '/admin/add_disease', query: { disease_group: this.disease_group }
            })
        }
    },
    props: {
        disease_group: String,
      disease_name_list: Array,
        refresh:Function
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