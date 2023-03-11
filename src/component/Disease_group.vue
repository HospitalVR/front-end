<template>
    <div id="disease_group">
        <div id="header">
            <h2>{{ disease_group }}</h2>
            <button v-on:click="add_disease">添加疾病</button>
        </div>
        <div class="item_div" v-for="item in disease_name_list" v-on:click="show_data(item)">
            <h3>{{item}}</h3>
            <button v-on:click.stop="delete_disease(item)">删除该病</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Disease_group",
    data() {
        return {};
    },
    methods: {
        show_data: function (name) {
            alert("展示疾病 " + name)
            this.$router.push({
                path: '/disease_view', query: {disease_name: name}
            })
        },
        delete_disease: function (name) {
            alert("删除疾病 "+name)
        },
        add_disease: function () {
            this.$router.push({
                path: '/add_disease', query: { disease_group: this.disease_group }
            })
        }
    },
    props: {
        disease_group: String,
        disease_name_list: Array
    }
}
</script>

<style scoped lang="less">
#disease_group {
    width: 100vw;
    height: wrap-content;
    background: rgb(227, 81, 171);
    padding: 0;
    margin: 0;
    margin-top:30px;
}
.item_div{
    width:27%;
    height:30px;
    background: rgb(86, 201, 221);
    padding: 0;
    margin-top:10px;
    margin-bottom:10px;
    margin-left:20px;
    margin-right:20px;
    display: inline-flex;
    justify-content: center;
}
#header{
    display: flex;
    flex-direction: row;
    justify-content: left;
}
</style>