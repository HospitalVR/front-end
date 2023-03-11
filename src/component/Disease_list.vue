<template>
    <div id="disease_list">
        <Disease_group v-for="item in disease_data" :key="item.disease_group" :disease_group="item.disease_group" :disease_name_list="item.disease_name_list"></Disease_group>
    </div>
</template>

<script>
import Disease_group from '@/component/Disease_group.vue'
export default {
    name: "Disease_list",
    data() {
        return {
            disease_data: [
                { disease_group: "A类病", disease_name_list: ["A1病", "A2病", "A3病", "A4病", "A5病"] },
                { disease_group: "B类病", disease_name_list: ["B1病", "B2病"] },
                { disease_group: "C类病", disease_name_list: ["C1病", "C2病", "C3病"] },
                { disease_group: "D类病", disease_name_list: ["D1病"] }
            ]
        };
    },
    methods: {
        
    },
    components: { Disease_group }
}
</script>

<style scoped lang="less">
#disease_list {
    width: 100vw;
    height: wrap-content;
    background: rgb(127, 60, 199);
    padding: 0;
    margin: 0;
}
</style>