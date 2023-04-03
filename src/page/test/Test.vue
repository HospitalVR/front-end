<template>
    <div class="test_wrapper">
        <div class="test_container">
            <div class="test_box">
                <img :src="imgTest" alt="" @click="$router.push('/home/exams')">
                <div class="test_info">
                    <span>考试</span>
                </div>
            </div>
            <!-- <div class="test_box">
                <img :src="imgSetting" alt="" @click="$router.push('/home/testManage')">
                <div class="test_info">
                    <span>测试管理</span>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import imgSetting from "@/assets/test/setting.png"
import imgTest from "@/assets/test/test.png"
export default {
        data() {
            return {
                imgSetting: imgSetting,
                imgTest: imgTest,
            }
        },
    }

</script>

<style lang="less" scoped>
.test_wrapper {
    padding-top: 60px;
    h1 {
        background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff);
        background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
        font-size: 34px;
        font-weight: 600;
    }
    .test_container {
        
        display: flex;
        justify-content: space-around;
        margin-top: 30px;
        .test_box {
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
            .test_info {
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