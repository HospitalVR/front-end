<template>
    <div class="hospital_roleDetail-cotainer">
        <div class="hospital_roleDetail-nav">
            <RoleNav :navObj="knowledge" :handleClick="handleClick"/>
        </div>
        <div class="hospital_roleDetail-main">
            <RoleProgress v-if="progress" :progress="progress"/>
        </div>
    </div>
</template>

<script>
import {roles} from "./roles"
import RoleNav from "@/component/RoleNav.vue"
import RoleProgress from "@/component/RoleProgress.vue"
    export default {
        components: {
            RoleNav,RoleProgress
        },
        data() {
            return {
                knowledge: null,
                progress: null
            }
        },
        methods: {
            handleClick(index) {
                let indexes = index.split("-").map(item=>parseInt(item));
                let obj = this.knowledge;
                for(let i = 0;i<indexes.length;i++) {
                    let index = indexes[i] - 1;
                    let j = 0;
                    for(let key in obj) {
                        if(j === index) {
                            obj = obj[key];
                            break;
                        }
                        j++;
                    }
                }
                this.progress = obj;
            }
        },
        beforeRouteLeave(from,to,next) {
            // 销毁组件
            this.$destroy();
            next();
        },
        beforeRouteEnter(from,to,next) {
            console.log(1)
            next();   
        },
        created() {
            this.knowledge = roles[this.$router.currentRoute.query.role].knowledge;          
        },

    }
</script>

<style lang="less" scoped>
.hospital_roleDetail-cotainer {
    display: flex;
    .hospital_roleDetail-main {
        flex: 1;
        height: calc(100vh - 60px);
    }
}
</style>