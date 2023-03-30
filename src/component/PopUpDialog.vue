<template>
    <el-dialog title="修改内容" :visible.sync="dialogFormVisible">
      <el-form :model="data" style="height:270px; overflow-y: scroll;">
        <el-form-item v-for="value,key,index in data" :label="label[index]" :label-width="formLabelWidth" :key="index">
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
            this.dialogFormVisible = false
            for (let i in this.$refs.inputs) {
                console.log(this.$refs.inputs[i].value)
            }
        }
    },
    props:{
        selectData: Object,
        labels: Array,
        keys: Array
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