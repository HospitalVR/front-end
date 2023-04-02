<template>
  <div class="hospital_user-container">
    <el-table :data="userData" style="width: 100%">
      <el-table-column label="用户ID" prop="id"></el-table-column>
      <el-table-column label="用户名" prop="userName"> </el-table-column>
      <el-table-column label="昵称" prop="nickName"> </el-table-column>
      <el-table-column label="密码" prop="password"> </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <div class="hospital_user-addBtn" @click="addUser">
        <svg t="1680230985100" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1537" width="70" height="70"><path d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z" p-id="1538"></path>
        </svg>
    </div>
  </div>
</template>

<script>
import { NetLoader } from "@/net";
export default {
  name: "User",
  data() {
    return {
      loader: new NetLoader("test"),
      search: "",
      userData: [
        
      ],
      form: {
        userName: "",
        password: "",
        nickName: "",
        id: ""
      },
      formLabelWidth: '120px',
      dialogTableVisible: false,
      dialogFormVisible: false,
      title: "修改用户信息",
      status: "change"
    };
  },
  methods: {
    getUser() {
      this.loader.get("/user/findAll").then((value) => {
        for(let item of value.data) {
            let user = {
                id: item.id,
                userName: item.userName,
                password: item.password,
                nickName: item.nickName
            }
            this.userData.push(user);
        }
      });
    },
    // 处理编辑逻辑
    handleEdit(index, row) {
      this.title = "修改用户信息"
      this.status = "change"
      this.dialogFormVisible = true;
      this.form.userName = row.userName;
      this.form.password = row.password;
      this.form.nickName = row.nickName;
      this.form.id = row.id;
    },
    // 处理删除逻辑
    handleDelete(index, row) {
      console.log(index, row);
      this.form.userName = row.userName;
      this.form.password = row.password;
      this.form.nickName = row.nickName;
      this.form.id = row.id;
      this.$confirm("是否删除该用户？？",'提示' , {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.loader.get("/user/delete", {name: this.form.userName}).then(val => {
          this.$message({
            message: "删除成功",
            type: "success"
          })
          this.loader.get("/user/findAll").then(val => {
              this.userData = [];
              for(let item of val.data) {
                  let user = {
                      id: item.id,
                      userName: item.userName,
                      password: item.password,
                      nickName: item.nickName
                  }
                  this.userData.push(user);
              }
          })
        }, err => {
          this.$message.error("删除信息失败")
        })
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
      });
    },

    confirm() {
        let confirmTitle = this.status === "change" ? "是否确认修改用户信息？" : "是否确认添加该新用户";
        this.$confirm(confirmTitle, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.loader.post("/user/save", this.form).then(val => {
                this.loader.get("/user/findAll").then(val => {
                    this.userData = [];
                    for(let item of val.data) {
                        let user = {
                            id: item.id,
                            userName: item.userName,
                            password: item.password,
                            nickName: item.nickName
                        }
                        this.userData.push(user);
                    }
                })
                this.dialogFormVisible = false;
                this.$message({
                    type: 'success',
                    message: "操作成功"
                });
            }, err => {
              if(this.status === "change") {
                this.dialogFormVisible = false;
                this.$message.error("修改用户信息发生错误")
              } else if(this.status === "create") {
                this.dialogFormVisible = false;
                this.$message.error("该用户名已经存在，无法重复创建！！！")
              }
            })
            

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
    },

    addUser() {
        // alert("添加用户");
        this.form = {
          userName: "",
          password: "",
          nickName: "",
          id: null
        },
        this.title = "创建新用户";
        this.status = "create"
        this.dialogFormVisible = true;
    }
  },
  created() {
    this.getUser();
  },
};
</script>

<style lang="less" scoped>
.hospital_user-container {
    .hospital_user-addBtn {
        position: fixed;
        bottom: 30px;
        right: 40px;
        border-radius: 100%;
        background: transparent;
        svg {
            fill: #409EFF;
            // box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }
        
    }
}
</style>