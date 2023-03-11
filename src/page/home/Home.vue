<template>
    <div>
        <h1>这是主页</h1>
        <router-link to="/vr">医院导览模块</router-link>
        <router-link to="/case_list">病例管理模块</router-link>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style lang="less" scoped>

</style>