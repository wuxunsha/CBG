<template>
    <div id="login" class="login_form padding20  full-screen">
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

        <div class="item_box them_form">

            <div class="input_gorup">
                <input type="password"
                       placeholder="原密码"
                       v-model="form.olduserPwd"
                       @blur="blur_event">
            </div>

            <div class="input_gorup">
                <input type="password"
                       :placeholder="$t('wallet.register.form_input_loginPwd')"
                       v-model="form.newuserPwd"
                       @blur="blur_event">
            </div>

            <div class="input_gorup">
                <input type="password"
                       :placeholder="$t('wallet.register.form_input_loginPwd_re')"
                       v-model="loginPwd_re"
                       @blur="blur_event">
            </div>

            <div class="space20"></div>
            <van-button @click="change_pwd()">{{$t('wallet.forgetPass.form_btn_back')}}</van-button>
            <div class="space30"></div>

            <div class="space20"></div>

        </div>

        <van-action-sheet v-model="show"
                          :title="$t('wallet.common.exchange_lang')"
                          :actions="lang_actions"
                          @select="onSelect" />

    </div>
</template>

<script>
import {
    change_password
} from '../../data/wallet';
import {
    validatePhoneNum
} from '../../util';
import {
    mapMutations,
    mapState
} from 'vuex'
import {
    secret
} from "@/util/secret";
import {
    Dialog, Toast
} from 'vant';
import getCode from '../../components/wallet/getCode'
export default {
    data() {
        return {
            show: false,
            form: {
                "token_": this.$store.state.newToken,
                "olduserPwd": null,
                "newuserPwd": null
            },
            // oldpassword: '',
            loginPwd_re: null,
            payPwd_re: null,
            exist: false//已登录成功
        }
    },
    components: {
        getCode
    },
    methods: {
        ...mapMutations(['setUserInfo', 'setToken']),
        verifynfo() {
            if (!this.form.olduserPwd) {
                Toast(this.$t('wallet.register.form_input_code'))
                return false;
            }
            if (!this.form.newuserPwd) {
                Toast(this.$t('wallet.register.form_input_loginPwd'))
                return false;
            }
            if (!this.loginPwd_re) {
                Toast(this.$t('wallet.register.form_input_loginPwd_re'))
                return false;
            }
            if (this.loginPwd_re != this.form.newuserPwd) {
                Toast(this.$t('wallet.register.check_login_pass_login'))
                return false;
            }
            return true;
        },
        change_pwd: function () { //提交

            if (!this.verifynfo()) {
                return;
            }
            change_password(this.form).then(data => {
                Toast(data.message)
                setTimeout(() => {
                    this.gopage_re('/login');

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
                console.error(e);
            })
        },
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
<style rel="stylesheet/scss" scoped scoped>
.van-button {
    display: block;
    width: 100%;
    background: #1b8db2;
    color: #fff;
}
.reset {
    width: 100%;
    height: 34px;
    line-height: 34px;
    background: linear-gradient(
        -61deg,
        rgba(34, 239, 185, 1),
        rgba(86, 107, 243, 1)
    );
    box-shadow: 0px 4px 9px 0px rgba(68, 22, 238, 0.15);
    border-radius: 4px;
    color: #fff;
}
</style>
