<template>
    <el-dialog title="添加内容" :visible.sync="dialogFormVisible">
      <el-form style="height:270px; overflow-y: scroll;">
        <el-form-item v-for="value,key,index in label" :label="value" :label-width="formLabelWidth" :key="index">
          <el-input v-model="data[key]" autocomplete="off" ref="inputs"></el-input>
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
            configs: this.$props.config
        }
    },
    methods: {
        confirm: function () {
            let formData = new FormData();
            formData.append("id", 0)
            for (let index in this.keyslist) {
                formData.append(this.keyslist[index], this.$refs.inputs[index].value)
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
        }
    },
    props:{
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
        }
    }
}
</script>

<style scoped lang="less">
</style>