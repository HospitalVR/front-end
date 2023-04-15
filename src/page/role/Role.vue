<template>
    <div class="hospital_role-wrapper">
        <div class="hospital_role-container">
            <div class="hospital_role-box hospital_role-qiantai">
                <img :src="imgQiantai" alt="">
                <div class="hospital_role-info">
                    <span>前台</span>
                    <el-button type="primary" @click="$router.push('/home/roleDetail?role=qiantai')">开始体验</el-button>
                </div>
            </div>
            <div class="hospital_role-box hospital_role-yizhu">
                <img :src="imgYizhu" alt="">
                <div class="hospital_role-info">
                    <span>医助</span>
                    <el-button type="primary"  @click="$router.push('/home/roleDetail?role=yizhu')">开始体验</el-button>
                </div>
            </div>
            <div class="hospital_role-box hospital_role-shouyi">
                <img :src="imgShouyi" alt="">
                <div class="hospital_role-info">
                    <span>兽医</span>
                    <el-button type="primary"  @click="$router.push('/home/roleDetail?role=shouyi')">开始体验</el-button>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import imgYizhu from "@/assets/role/yizhu.png"
import imgQiantai from "@/assets/role/qiantai.jpg"
import imgShouyi from "@/assets/role/shouyi.png"
    export default {
        name: "Role",
        data() {
            return {
                imgYizhu: imgYizhu,
                imgQiantai: imgQiantai,
                imgShouyi: imgShouyi,
            }
        },
    }
</script>

<style lang="less" scoped>
.hospital_role-wrapper {
    .hospital_role-container {
        
        display: flex;
        justify-content: space-around;
        margin-top: 30px;
        .hospital_role-box {
            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
            width: 400px;
            height: 480px;
            &:hover {
                box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            }
            img {
                width: 100%;
                height: auto;
                display: block;
            }
            .hospital_role-info {
                margin-top: 20px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-around;
                font-size: 24px;
                font-weight: 600;
            }
        }
    }
}

</style>