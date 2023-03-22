<template>
    <div id="case_list">
        <div id="header">
            <h1>病例总览</h1>
        </div>
        <Disease_list />
        <Disease_selector />
    </div>
</template>

<script>
import Disease_list from '@/component/Disease_list.vue';
import Disease_selector from '@/component/Disease_selector.vue';
export default {
    name: "Case_list",
    data() {
        return {
            
        };
    },
    methods: {
    },
    components: { Disease_list,Disease_selector }
}
</script>

<style scoped lang="less">
#case_list {
    width: 100%;
    height: wrap-content;
    margin: 0;
}

#header {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>