<template>
    <div class="hospital_login-container">
        <div class="hospital_login-box">
            <div class="hospital_login-title">后台系统登录页面</div>
            <div class="hospital_login-username">
                <svg t="1679019720900" class="icon" viewBox="0 0 1024 1024" ref="svgUsername" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2740"><path d="M388.401619 550.487623c-7.982012-5.966042-14.843472-11.870684-22.41615-16.639424C263.69292 469.449738 211.241893 351.812282 234.09296 237.582531c23.270634-116.332704 115.698236-209.47664 234.113426-227.594783 177.374626-27.133723 311.610573 93.26162 334.30814 244.710058 21.930065 146.347114-89.009664 296.178684-238.549583 318.108749-44.351332 6.503293-90.759566 3.412822-133.667996 14.556938-182.117783 47.293419-279.60066 173.567821-317.453815 352.139749-4.042173 19.069845-4.103573 39.127207-9.522131 57.700735-2.394604 8.207145-13.574537 13.84572-20.76858 20.650897-5.894409-9.148613-17.831609-19.044261-16.803158-27.328157 24.314436-195.840704 110.576445-348.404577 302.175426-425.84544 4.72269-1.908519 9.41468-3.944956 13.948054-6.252576C383.233778 557.732834 384.021746 555.911298 388.401619 550.487623zM517.352041 536.232569c137.167801-0.332584 247.75448-110.351312 247.386079-246.101794-0.363284-134.18478-111.40023-243.860691-246.946045-243.922091C379.391156 46.152401 270.421346 153.889092 270.252496 290.944326 270.088762 427.794893 379.662339 536.570269 517.352041 536.232569z" p-id="2741"></path><path d="M958.317254 987.441363c-9.348164 11.865567-15.416539 27.374207-24.396302 29.303193-17.273892 3.709589-20.164813-11.747884-21.704932-26.652756-9.547714-92.494119-31.810363-180.751631-91.21495-255.342507-12.070234-15.160706-26.304822-28.878509-41.010143-41.567861-11.266917-9.721681-22.165432-18.854944-10.038915-33.355599 11.6609-13.948054 24.897736-6.702843 35.806486 2.532754 48.398621 40.96921 85.458692 91.051217 105.490471 150.849788C929.986229 869.13874 942.332764 927.218108 958.317254 987.441363z" p-id="2742"></path></svg>
                <input type="text"  v-model="username" placeholder="请输入用户名" ref="username">
            </div>
            <div class="hospital_login-password">
                <svg t="1679020061270" class="icon" viewBox="0 0 1024 1024" ref="svgPassword" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4319"><path d="M888.7 402.3h-61.9v-89.7C826.8 128.4 659.9 0 510.1 0 356.3 0 197.2 116.7 197.2 312.1v90.2h-61.9C60.7 402.3 0 461.5 0 534.3V892c0 72.8 60.7 132 135.3 132h753.4c74.6 0 135.3-59.2 135.3-132V534.3c0-72.8-60.7-132-135.3-132z m-647-90.2c0-167.5 136.5-267.5 268.4-267.5 128.8 0 272.2 110.1 272.2 268v89.7H241.7v-90.2zM979.5 892c0 48.2-40.7 87.5-90.8 87.5H135.3c-50 0-90.8-39.2-90.8-87.5V534.3c0-48.2 40.7-87.5 90.8-87.5h753.4c50 0 90.8 39.2 90.8 87.5V892z" fill="" p-id="4320"></path><path d="M512 579.6c-12.3 0-22.3 10-22.3 22.3v222.6c0 12.3 10 22.3 22.3 22.3s22.3-10 22.3-22.3V601.8c0-12.3-10-22.2-22.3-22.2z" fill="" p-id="4321"></path></svg>
                <input type="password"  v-model="password" placeholder="请输入密码" ref="password">
            </div>
            <div class="hospital_login-info">
                <span>没有账户？<a>点击注册</a></span>
                <span><a>忘记密码？</a></span>
            </div>
            <div class="hospital_login-button">
                <div class="button" @click="login">点击登录</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                username: "",
                password: ""
            }
        },
        methods: {
            //TODO 将用户名和密码作为请求体向后端发送请求进行登录，这部分还需要和后端对接
            login() {
                console.log(this.password,this.username);
                this.$router.push("/admin")
            }
        },
        mounted() {
            this.$refs.username.addEventListener("focus",(e) => {
                this.$refs.svgUsername.classList.add("svg-selected")
                e.target.parentNode.classList.add("input-selected")
            })

            this.$refs.username.addEventListener("blur",(e) => {
                this.$refs.svgUsername.classList.remove("svg-selected")
                e.target.parentNode.classList.remove("input-selected")
            })

            this.$refs.password.addEventListener("focus",(e) => {
                this.$refs.svgPassword.classList.add("svg-selected")
                e.target.parentNode.classList.add("input-selected")
            })

            this.$refs.password.addEventListener("blur",(e) => {
                this.$refs.svgPassword.classList.remove("svg-selected")
                e.target.parentNode.classList.remove("input-selected")
            })
        }
    }
</script>

<style lang="less" scoped>
.hospital_login-container {
    width: 100vw;
    height: 100vh;
    background-image: url("@/assets/login/login_background.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;

    .hospital_login-box {
        position: absolute;
        top: 230px;
        right: 350px;
        width: 300px;
        box-sizing: border-box;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .hospital_login-title {
            background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff);
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-align: center;
            font-size: 22px;
            font-weight: 500;
        }

        .hospital_login-username ,.hospital_login-password {
            display: flex;
            align-items: center;
            height: 22px;
            width: 100%;
            margin-top: 20px;
            border-bottom: 2px solid black;
            padding-bottom: 10px;
            svg {
                height: 20px;
                width: 20px;
            }
            input {
                height: 100%;
                flex: 1;
                margin-left: 15px;
                background: transparent;
                border: none;
                vertical-align: baseline;
                padding: 0;
                outline: none;
            }
            
        }
        .hospital_login-info {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 13px;

            width: 100%;

            span {
                cursor: pointer;

                a {
                    color: blue;
                }
            }

        }
        .hospital_login-button {
            width: 100%;
            margin-top: 20px;
            
            .button {
                width: 100%;padding: 5px 0px;
                background: skyblue;
                color: #000;
                font-size: 20px;
                text-align: center;
                border-radius: 10px;
                cursor: pointer;
            }
        }
    }
}
.input-selected {
    border-bottom: 2px solid blue!important;
}

.svg-selected {
    fill: blue;
}
</style>