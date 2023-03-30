<template>
    <div id="disease_list">
        <Disease_group v-for="item in disease_data" :refresh="get_data" :key="item.disease_group" :disease_group="item.disease_group" :disease_name_list="item.disease_name_list"></Disease_group>
    </div>
</template>

<script>
import Disease_group from '@/component/Disease_group.vue'
import { NetLoader } from '@/net';
export default {
    name: "Disease_list",
    data() {
        return {
            loader: new NetLoader("test"),
            disease_data: []
        };
    },
    methods: {
        get_data() {
            this.disease_data=[]
            this.loader.get("/case/findAllByType").then((value) => {
                for (let key in value.data) {
                    let disease = { disease_group: key, disease_name_list: value.data[key] }
                    this.disease_data.push(disease)
                }
            })
        }
    },
    components: { Disease_group },
    created() {
        this.get_data();
    }
}
</script>

<style scoped lang="less">
#disease_list {
    width: 70%;
    float:left;
    height: wrap-content;
    padding: 0;
    margin: 0;
}
</style>