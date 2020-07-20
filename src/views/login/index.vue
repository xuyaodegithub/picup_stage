<template>
    <div class="login">
        <!--        :style="{backgroundImage:`url(${back})`}"-->
        <video src="@/assets/123456.mp4" muted ref="videoss" loop autoplay style="object-fit: fill;">
            <source src="@/assets/123456.mp4" type="video/mp4">
            <!--                            <source :src="item" type="video/ogg">-->
            <!--                            <source :src="item" type="video/webm">-->
            你的游览器暂不支持视频播放，换一个试试吧！
        </video>
        <div class="zhezhao"></div>
        <div class="content">
            <img src="../../assets/images/logo_p.jpg" alt=""
                 style="display:block;width: 60px;margin: 0 auto 20px;border-radius: 15px">
            <h2><span>PicUp</span> 后台管理平台</h2>
            <div class="border">
                <img src="../../assets/images/pand.png" alt="" v-show="showeyes">
                <img src="../../assets/images/pand2.png" alt="" v-show="!showeyes">
            </div>
            <div class="write">
                <el-input
                        placeholder="请输入用户名"
                        prefix-icon="el-icon-user"
                        clearable
                        size="medium "
                        v-model="userName">
                </el-input>
                <el-input
                        placeholder="请输入密码"
                        type="password"
                        clearable
                        prefix-icon="el-icon-key"
                        v-model="userpass"
                        show-password
                        size="medium "
                        @focus="showeyes=false"
                        @blur="showeyes=true">
                </el-input>
                <el-button type="primary" @click="login">登录</el-button>
                <el-checkbox v-model="checked">记住密码</el-checkbox>
            </div>

        </div>
    </div>
</template>

<script>
    import back from '../../assets/images/login_back.png'
    import {setToken, removeToken} from "../../utils/auth";
    import {userLogin} from '@/apis/login.js'

    export default {
        name: "index",
        data() {
            return {
                back,
                userName: '',
                userpass: '',
                checked: true,
                showeyes: true
            }
        },
        methods: {
            async login() {
                if (!this.userName || !this.userpass) {
                    this.$notify( {
                        title: '警告',
                        message: '用户名或密码不可为空',
                        type: 'warning'
                    } );
                    return;
                }
                const data = {
                    username: this.userName,
                    password: this.userpass
                };
                const res = await userLogin( data );
                if (!res.code) {
                    if (this.checked) localStorage.setItem( 'user_count', JSON.stringify( {
                        a: this.userName,
                        b: this.userpass
                    } ) );
                    else localStorage.removeItem( 'user_count' );
                    setToken( res.data.token );
                    this.$store.commit('GET_SELLERINFO',res.data);
                    this.$router.replace( '/user' );
                }
            },
            userCount() {
                const count = JSON.parse( localStorage.getItem( 'user_count' ) );
                if (count) {
                    this.userName = count.a;
                    this.userpass = count.b;
                }
            }
        },
        mounted() {
            this.userCount()
        }
    }
</script>

<style scoped lang="scss">
    .login {
        position: relative;
        background-size: cover;
        background-position: center;
        height: 100%;

        video {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
        }

        .zhezhao {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .8);
        }

        .content {
            position: absolute;
            width: 20%;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -65%);
            color: #fff;

            .el-icon-caret-top {
                color: rgba(255, 255, 255, .2);
                font-size: 48px;
            }

            .write {
                background-color: rgba(255, 255, 255, .2);
                padding: 25px;
                border-radius: 10px;

                .el-input {
                    margin-bottom: 30px;
                }

                .el-button {
                    display: block;
                    width: 100%;
                    margin-bottom: 10px;
                }

                .el-checkbox {
                    color: #ccc;
                }
            }

            h2 {
                font-size: 28px;
                margin: 30px 0 120px;
                text-align: center;
                color: #fff;
                font-weight: 500;

                span {
                    color: $co;
                    font-family: "PingFang SC";
                    font-weight: 600;
                }
            }

            .border {
                position: relative;

                img {
                    position: absolute;
                    width: 30%;
                    left: 50%;
                    top: 0;
                    transform: translate(-50%, -85%);
                }

                /*width: 0;*/
                /*border: 20px solid #fff;*/
                /*<!--border-color: $op $op rgba(255, 255, 255, .2) $op;-->*/
                /*border-bottom-width: 30px;*/
                /*margin: 0 auto;*/
            }
        }
    }
</style>
