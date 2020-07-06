<template>
    <div class="login_form padding20  full-screen">

        <walletNav :title="$t('wallet.forgetPass.nav_title')"
                   left-arrow
                   @clickLeft="goback()">
            <div class="rightText"
                 @click="show = true"
                 v-if="!exist">
                <small v-if="$i18n.locale=='en'">English</small>
                <small v-if="$i18n.locale=='zh_hk'">繁體中文</small>
                <small v-if="$i18n.locale=='zh_cn'">简体中文</small>
                <van-icon name="arrow-down" />
            </div>
        </walletNav>

        <div class="input_gorup">
            <div class="captcha">
                <div>
                        <input type="password"
                           placeholder="原密码"
                           v-model="form.olduserPwd"
                           class="set-password-input"
                           ref="olduserPwd">
                </div>
                <p>
                    <i :class="isOlduserPwdFlag ? 'show' : 'hidden'"
                       @click="isShowOlduserPwdIcon"></i>
                </p>
            </div>
        </div>

        <div class="input_gorup">
            <div class="captcha">
                <div>
                    <input type="password"
                           :placeholder="`${$t('feature.register.input_payPass')}`"
                           v-model="form.newuserPwd"
                           @blur="blur_event"
                           class="set-password-input"
                           ref="pass">
                </div>
                <p>
                    <i :class="isPasswordFlag ? 'show' : 'hidden'"
                       @click="isShowPassIcon"></i>
                </p>
            </div>
        </div>

        <div class="input_gorup">
            <div class="captcha">
                <div>
                    <input type="password"
                           :placeholder="`${$t('feature.register.input_payPass_re')}`"
                           v-model="loginPwd_re"
                           @blur="blur_event"
                           class="set-password-input"
                           ref="newPass">
                </div>
                <p>
                    <i :class="isHiddenFlag ? 'show' : 'hidden'"
                       @click="isShowIcon"></i>
                </p>
            </div>
        </div>

        <div class="submit-btn">
            <van-button type="info"
                        @click="change_pwd()">{{$t('wallet.forgetPass.form_btn_back')}}</van-button>
        </div>

    </div>
</template>

<script>
import {
    change_password
} from '../../data/wallet';
import {
    mapMutations,
    mapState
} from 'vuex'
export default {
    data() {
        return {
            isOlduserPwdFlag: false,
            isPasswordFlag: false,
            isHiddenFlag: false,
            show: false,
            form: {
                "token_": this.$store.state.newToken,
                "olduserPwd": null,
                "newuserPwd": null
            },
            loginPwd_re: null,
            payPwd_re: null,
            exist: false//已登录成功
        }
    },
    methods: {
        ...mapMutations(['setUserInfo', 'setToken']),
        verifynfo() { //登陆验证
            if (!this.form.olduserPwd) {
                Toast('请输入原密码')
                return false;
            }
            if (!this.form.newuserPwd) {
                Toast(this.$t('feature.register.input_payPass'))
                return false;
            }
            if (!this.loginPwd_re) {
                Toast(this.$t('feature.register.input_payPass_re'))
                return false;
            }
            if (this.loginPwd_re != this.form.newuserPwd) {
                Toast(this.$t('feature.register.toast_payPass_fail'))
                return false;
            }
            return true;
        }, //verifyLoginInfo
        change_pwd: function () { //提交

            if (!this.verifynfo()) {
                return;
            }
            change_password(this.form).then(data => {
                Toast.success('修改登录密码成功!')
                setTimeout(() => {
                    this.gopage_re('/login')
                    setTimeout(() => {
                        this.setUserInfo(null);
                        this.setToken(null);
                        try {
                            setTimeout(() => {
                                this.setUserInfo(null);
                                this.setToken(null);
                                localStorage.removeItem('vuex');
                                location.reload();
                            }, 500);
                        } catch (error) {
                            console.error(error)
                        }
                        location.reload();
                    }, 500);
                }, 1000);
            }).catch(e => {
                Toast(e.msg)
            })
        }, //submitLogin
        onSelect(item) {
            this.set_lang(item.type);
            this.show = false;
        },
        isShowOlduserPwdIcon() {
            this.isOlduserPwdFlag = !this.isOlduserPwdFlag
            if (this.isOlduserPwdFlag) {
                this.$refs.olduserPwd.setAttribute("type", "text")
            } else {
                this.$refs.olduserPwd.setAttribute("type", "password")
            }
        },
        isShowPassIcon() {
            this.isPasswordFlag = !this.isPasswordFlag
            if (this.isPasswordFlag) {
                this.$refs.pass.setAttribute("type", "text")
            } else {
                this.$refs.pass.setAttribute("type", "password")
            }
        },
        isShowIcon() {
            this.isHiddenFlag = !this.isHiddenFlag
            if (this.isHiddenFlag) {
                this.$refs.newPass.setAttribute("type", "text")
            } else {
                this.$refs.newPass.setAttribute("type", "password")
            }
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    mounted() {

    }
};

</script>
<style rel="stylesheet/scss" scoped lang="scss">
.prompt {
    margin-top: 26px;
    padding: 0 15px;
    > p:nth-child(1) {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(53, 53, 53, 1);
        line-height: 35px;
    }
    > p:nth-child(2) {
        margin-top: 15px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(165, 172, 174, 1);
    }
}
.input_gorup {
    padding: 0 15px;
    margin-top: 30px;
    .captcha {
        width: 100%;
        height: 41px;
        line-height: 40px;
        border-bottom: 1px solid #ebebeb;
        display: flex;
        overflow: hidden;
        > div:nth-child(1) {
            flex: 1;
            width: 100%;
            height: 75%;
            input {
                font-size: 12px;
                width: 100%;
                height: 100%;
                border: none;
            }
        }
        > div:nth-child(1) {
            width: 130px;
        }
    }
}
.set-password {
    display: flex;
    border-bottom: 1px solid #e7eaed;
    > div {
        flex: 1;
    }
    input {
        font-size: 12px;
        border-bottom: none !important;
    }
}
.set-password-input {
    width: 90% !important;
}
.submit-btn {
    margin-top: 50px;
    padding: 0 15px;
    .van-button {
        display: block;
        width: 100%;
    }
}
.show {
    display: block;
    width: 16px;
    height: 47px;
    line-height: 47px;
    background: url("../../assets/wallet/user/show.png") no-repeat center center;
    background-size: 100%;
}
.hidden {
    display: block;
    width: 16px;
    height: 47px;
    line-height: 47px;
    background: url("../../assets/wallet/user/unshow.png") no-repeat center
        center;
    background-size: 100%;
}
</style>
