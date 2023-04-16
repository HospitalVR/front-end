<template>
  <el-dialog title="修改内容" :visible.sync="dialogFormVisible">
    <el-form :model="data" style="height:270px; overflow-y: scroll;">
      <el-form-item v-for="value, key, index in data" :label="label[index]" :label-width="formLabelWidth" :key="index">
        <template v-if="configs[index] == 'uneditable_text'">
          <el-input v-model="data[key]" autocomplete="off" ref="inputs" :disabled="true"></el-input>
        </template>
        <template v-else-if="configs[index] == 'date'">
          <el-date-picker v-model="data[key]" ref="inputs" type="date" placeholder="选择日期"></el-date-picker>
        </template>
        <template v-else-if="configs[index] == 'num'">
          <el-input-number v-model="data[key]" :min="0" ref="inputs"></el-input-number>
        </template>
        <template v-else-if="configs[index] == 'float'">
          <el-input-number v-model="data[key]" :precision="2" :step="10.00" :min="0" ref="inputs"></el-input-number>
        </template>
        <template v-else-if="configs[index] == 'sex'">
          <el-radio-group v-model="data[key]" ref="inputs">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </template>
        <template v-else-if="configs[index] == 'bool'">
          <el-radio-group v-model="data[key]" ref="inputs">
            <el-radio label="是">是</el-radio>
            <el-radio label="否">否</el-radio>
          </el-radio-group>
        </template>
        <template v-else-if="configs[index] == 'pet_sex'">
          <el-radio-group v-model="data[key]" ref="inputs">
            <el-radio label="公">公</el-radio>
            <el-radio label="母">母</el-radio>
            <el-radio label="未知">未知</el-radio>
          </el-radio-group>
        </template>
        <template v-else-if="configs[index] == 'disease'">
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
  name: "PopUpDialog",
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
      for (let index in this.keyslist) {
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
          message: '修改成功',
          type: "success"
        });
      }).catch(() => {
        this.$message({
          message: '修改失败',
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
    selectData: Object,
    labels: Array,
    keys: Array,
    url: String,
    get_data: Function,
    config: Array
  },
  watch: {
    dialogFormVisible(val, newval) {
      if (val) {
        for (let key in this.$props.selectData) {
          this.$set(this.data, key, this.$props.selectData[key])
        }
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