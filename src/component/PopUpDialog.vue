<template>
    <el-dialog title="修改内容" :visible.sync="dialogFormVisible">
      <el-form :model="data" style="height:270px; overflow-y: scroll;">
        <el-form-item v-for="value,key,index in data" :label="label[index]" :label-width="formLabelWidth" :key="index">
          <template v-if="(index==0)|(index==1)">
            <el-input v-model="data[key]" autocomplete="off" ref="inputs" :disabled="true"></el-input>
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
            formLabelWidth: '120px'
        }
    },
    methods: {
        confirm: function () {
            let formData = new FormData();
            for (let index in this.keyslist) {
                formData.append(this.keyslist[index], this.$refs.inputs[index].value)
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
        }
    },
    props:{
        selectData: Object,
        labels: Array,
        keys: Array,
        url: String,
        get_data:Function
    },
    watch: {
        dialogFormVisible(val, newval) {
            if (val) {
                for (let key in this.$props.selectData) {
                    this.$set(this.data, key, this.$props.selectData[key])
                }
            }
        }
    }
}
</script>

<style scoped lang="less">
</style>