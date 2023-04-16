<template>
  <el-dialog title="添加内容" :visible.sync="dialogFormVisible">
    <el-form style="height:270px; overflow-y: scroll;">
      <el-form-item v-for="value, key, index in label" :label="value" :label-width="formLabelWidth" :key="key">
        <template v-if="configs[key] == 'date'">
          <el-date-picker v-model="data[key]" ref="inputs" type="date" placeholder="选择日期"></el-date-picker>
        </template>
        <template v-else-if="configs[key] == 'num'">
          <el-input-number v-model="data[key]" :min="0" ref="inputs"></el-input-number>
        </template>
        <template v-else-if="configs[key] == 'float'">
          <el-input-number v-model="data[key]" :precision="2" :step="10.00" :min="0" ref="inputs"></el-input-number>
        </template>
        <template v-else-if="configs[key] == 'sex'">
          <el-radio-group v-model="data[key]" ref="inputs">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </template>
        <template v-else-if="configs[key] == 'bool'">
          <el-radio-group v-model="data[key]" ref="inputs">
            <el-radio label="是">是</el-radio>
            <el-radio label="否">否</el-radio>
          </el-radio-group>
        </template>
        <template v-else-if="configs[key] == 'pet_sex'">
          <el-radio-group v-model="data[key]" ref="inputs">
            <el-radio label="公">公</el-radio>
            <el-radio label="母">母</el-radio>
            <el-radio label="未知">未知</el-radio>
          </el-radio-group>
        </template>
        <template v-else-if="configs[key] == 'disease'">
          <el-select v-model="data[key]" ref="inputs" placeholder="请选择疾病">
            <el-option-group v-for="group in options" :key="group.label" :label="group.label">
              <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </template>
        <template v-else>
          <el-input v-model="data[key]" autocomplete="off" ref="inputs"></el-input>
        </template>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="this.confirm">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { NetLoader } from '@/net';
export default {
  name: "PopUpDialogForAdd",
  data() {
    return {
      dialogFormVisible: false,
      data: {},
      label: this.$props.labels,
      keyslist: this.$props.keys,
      formLabelWidth: '120px',
      configs: this.$props.config,
      options: [],
    }
  },
  methods: {
    confirm: function () {
      let formData = new FormData();
      formData.append("id", 0)
      for (let index in this.keyslist) {
        if (index == 0) {
          if (this.$refs.inputs[index].value == undefined) {
            this.$alert(this.label[0] + '为必填字段，请输入。', '添加失败', {
              confirmButtonText: '确认',
              callback: action => {
                this.$message({
                  message: '添加失败',
                  type: "error"
                });
              }
            });
            return
          }
        }
        if (this.configs[index] == 'date') {
          if (this.$refs.inputs[index].value != undefined) {
            formData.append(this.keyslist[index], this.formatDate(new Date(this.$refs.inputs[index].value)))
          } else {
            formData.append(this.keyslist[index], undefined)
          }
        } else {
          formData.append(this.keyslist[index], this.$refs.inputs[index].value)
        }
      }
      let url = "http://127.0.0.1:8888" + this.$props.url + "/save"
      let loader = new NetLoader("test")
      loader.post(url, formData).then((value) => {
        this.dialogFormVisible = false
        this.$props.get_data()
        this.$message({
          message: '添加成功',
          type: "success"
        });
      }).catch(() => {
        this.$message({
          message: '添加失败',
          type: "error"
        });
      })
    },
    formatDate: function (date) {
      date.setHours(0)
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
    }
  },
  props: {
    labels: Array,
    keys: Array,
    url: String,
    get_data: Function,
    config: Array
  },
  watch: {
    dialogFormVisible(val, newval) {
      for (let key in this.data) {
        this.data[key] = ""
      }
      if (val) {
        this.options = []
        let loader = new NetLoader("test")
        let url = "http://127.0.0.1:8888/case/findAllByType"
        loader.get(url).then((value) => {
          for (let key in value.data) {
            let obj = {}
            obj.label = key
            obj.options = []
            for (let data in value.data[key]) {
              let newObject = {}
              newObject.label = value.data[key][data]
              newObject.value = value.data[key][data]
              obj.options.push(newObject)
            }
            this.options.push(obj)
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less"></style>