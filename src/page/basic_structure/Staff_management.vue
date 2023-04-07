<template>
    <div>
        <el-page-header @back="goBack" :content="title"></el-page-header>
        <Table :label="labels" :width="widthList" :keys="keys" :url="url" :config="config"></Table>
    </div>
</template>

<script>
import Table from '@/component/Table.vue'
export default {
    name: "Staff_management",
    data() {
        return {
            labels: ["编号", "姓名", "年龄", "性别", "职位", "经验", "手机号", "身份证号", "入职日期", "所在地", "学历"],
            keys: ["id","name","age","gender","position","experience","phone","idnumber","date","place","edu"],
            widthList: [60, 90, 60, 60, 120, 60, 120, 170, 100, 80, 60],
            url: "/staff",
            title: "人员管理",
            config: ["uneditable_text", "uneditable_text", "num", "sex", "text", "num", "text", "uneditable_text", "date", "text", "text"]
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    },
    components: { Table },
}
</script>

<style lang="less" scoped>
</style>