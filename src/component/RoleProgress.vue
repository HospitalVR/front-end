<template>
    <div class="role_progress-container">
        <div class="role_progress-progress">
            <el-steps :active="active" finish-status="success">
                <el-step v-for="(item,index) in progress" :key="index" :title="item.title">
                    
                </el-step>
            </el-steps>
            <el-button type="primary" @click="enterNext" v-if="progress.length > 0">
                <template>
                    <span v-if="active === progress.length">重新开始</span>
                    <span v-else>下一步</span>
                </template>
            </el-button>
        </div>
        <div class="role_progress-detail" v-if="active < progress.length">
            <h1>步骤具体描述：</h1>
            <div class="role_progress-image" v-if="progress[active].image !== undefined">
                <img :src="progress[active].image" alt="">
            </div>
            <div class="role_progress-desc">
                <p v-for="(item,index) in progress[active].desc" :key="index">{{ item }}</p>
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
                this.active = (this.active + 1)%(this.progress.length + 1);
                
            }
        },
        watch: {
            progress() {
                this.active = 0;
            }
        }
    }
</script>

<style lang="less" scoped>
.role_progress-container {
    padding: 10px;

    .role_progress-progress {
        border-bottom: 1px solid #dcdfe6;
        padding: 20px;
    }
    .role_progress-detail {
        padding: 10px;
        margin-top: 30px;
        // overflow-y: scroll;

        .role_progress-image {
            img {
                width: 320px;
                height: auto;
                border-radius: 10px;
            }
        }
    }
}
</style>