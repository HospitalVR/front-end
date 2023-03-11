<template>
    <div id="case_list">
        <div id="header">
            <h1>病例总览</h1>
            <button v-on:click="return_to_home">返回上一页</button>
        </div>
        <Disease_list />
    </div>
</template>

<script>
import Disease_list from '@/component/Disease_list.vue';
export default {
    name: "Case_list",
    data() {
        return {};
    },
    methods: {
        return_to_home: function (event) {
            this.$router.replace('/home')
        }
    },
    components: { Disease_list }
}
</script>

<style scoped lang="less">
#case_list {
    width: 100vw;
    height: wrap-content;
    //background: rgb(114, 239, 139);
    padding: 0;
    margin: 0;
}

#header {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>