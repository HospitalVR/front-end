<template>
    <div class="role_progress-container">
        <div class="role_progress-progress">
            <el-steps :active="active" finish-status="success">
                <el-step v-for="(item,index) in progress" :key="index" :title="item.title">
                    
                </el-step>
            </el-steps>
            <el-button type="primary" @click="enterNext" v-if="progress.length > 0">
                <template>
                    <span v-if="active === 5">重新开始</span>
                    <span v-else>下一步</span>
                </template>
            </el-button>
        </div>
        <div class="role_progress-detail">
            <div>
                
            </div>
        </div>
    </div>  
</template>

<script>
    export default {
        name: "RoleProgress",
        props: {
            progress: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                active: 0
            }
        },
        methods: {
            enterNext() {
                this.active = (++this.active)%(this.progress.length+1);
                
            }
        }
    }
</script>

<style lang="less" scoped>
.role_progress-container {
    padding: 10px;
}
</style>