<template>
    <div id="login"
         class="login_form padding20  full-screen">

        <walletNav :title="$t('wallet.forgetPass.change_pass')"
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
                <input type="text"
                       :placeholder="`${$t('wallet.login.form_mail')}`"
                       v-model="form.userAccount"
                       :disabled="exist"
                       @blur="blur_event"
                       v-if="!exist">
            </div>

            <div class="input_gorup">
                <input type="number"
                       pattern="\d*"
                       :placeholder="`请输入验证码`"
                       v-model="form.yzCode"
                       @blur="blur_event">
                <forgetGetCode :codeData="{phone:form.userAccount}" />
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
    forgetUserPwd
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
import forgetGetCode from '../../components/wallet/noLoginCode'
export default {
    data() {
        return {
            show: false,
            form: {
                "userAccount": null,
                "yzCode": null,
                "newuserPwd": null
            },
            // phone: '',
            loginPwd_re: null,
            payPwd_re: null,
            exist: false//已登录成功
        }
    },
    components: {
        forgetGetCode
    },
    methods: {
        ...mapMutations(['setUserInfo', 'setToken']),
        verifynfo() { //登陆验证
            if (!this.form.userAccount) {
                Toast(`请输入用户账号`)
                return false;
            }
            if (!this.form.yzCode) {
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
        }, //verifyLoginInfo
        change_pwd: function () { //提交

            if (!this.verifynfo()) {
                return;
            }
            forgetUserPwd(this.form).then(data => {
                Toast(data.msg)
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
                    // setTimeout

                }, 1000);
            }).catch(e => {
                console.error(e);
                Toast(e.msg);
            })
        }, //submitLogin
        onSelect(item) {
            this.set_lang(item.type);
            this.show = false;
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    mounted() {
        // if (this.userInfo) {
        //     this.exist = true;
        //     this.form.phone = this.userInfo.user.id;
        // }
    } //mounted
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
