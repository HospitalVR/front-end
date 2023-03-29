<template>
    <el-dialog title="修改内容" :visible.sync="dialogFormVisible">
      <el-form :model="data">
        <el-form-item v-for="value,key,index in data" :label="label[index]" :label-width="formLabelWidth" :key="index">
          <el-input v-model="data[key]" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="this.confirm">Confirm</el-button>
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
        labels: Array
    },
    watch: {
        dialogFormVisible(val, newval) {
            for (let key in this.$props.selectData) {
                this.$set(this.data, key, this.$props.selectData[key])
            }
        }
    }
}
</script>

<style scoped lang="less">
</style>