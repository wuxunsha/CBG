<template>
    <div id="login"
         class="login_form padding20 full-screen">

        <div class="space30"></div>

        <div class="title flex align between">
            <div class="h2"
                 style="font-size:28px">{{$t('wallet.login.title')}} <span style="color:rgba(52,59,58,1);background:linear-gradient(-61deg,rgba(33,239,185,1) 0%, rgba(85,107,243,1) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">GAME</span> </div>

            <div class="change_lang"
                 @click="show = true"
                 v-if="$i18n.locale=='en'">English
                <van-icon name="arrow-down" />
            </div>
            <div class="change_lang"
                 @click="show = true"
                 v-if="$i18n.locale=='zh_hk'">繁體中文
                <van-icon name="arrow-down" />
            </div>
            <div class="change_lang"
                 @click="show = true"
                 v-if="$i18n.locale=='zh_cn'">简体中文
                <van-icon name="arrow-down" />
            </div>
        </div>

        <div class="space60"></div>

        <div class="them_form">

            <div class="input_gorup">
                <input type="text"
                       :placeholder="$t('wallet.login.form_mail')"
                       v-model="phone"
                       @blur="blur_event">
            </div>

            <div class="input_gorup">
                <input type="password"
                       v-model="password"
                       ref="pass"
                       :placeholder="$t('wallet.login.form_pass')" />
                <i :class="isHiddenFlag ? 'show' : 'hidden'"
                   @click="showTip"></i>
            </div>

            <div class="space30"></div>
            <van-button @click="submitLogin()" :disabled="disabled" class="submitBtn">{{$t('wallet.login.form_btn_login')}}</van-button>

            <div class="space40"></div>

            <div class="info flex align between">
                <span class=" font_link font14"
                      style="color:#556BF3"
                      @click="gopage('forgetPass')">{{$t('wallet.login.form_btn_forget')}}</span>
                <div>
                    <span class="font14 them_color_gray"
                          style="color:#353535">{{$t('wallet.login.none_user')}}</span>&nbsp;
                    <a @click="gopage('register')"
                       class="font14 font_link"
                       style="color:#556BF3">{{$t('wallet.login.btn_register')}}</a>
                </div>
            </div>

            <div class="space20"></div>

        </div>
        <!-- them_form -->

        <van-action-sheet v-model="show"
                          :title="$t('wallet.common.exchange_lang')"
                          :actions="lang_actions"
                          @select="onSelect" />

    </div>
    <!-- index -->
</template>

<script>
import {
    login, log
} from '../../data/wallet';
import {
    validatePhoneNum
} from '../../util';
import {
    mapMutations,
    mapActions,
    setUser
} from 'vuex'
import { PasswordInput, NumberKeyboard } from 'vant';
export default {
    data() {
        return {
            phone: '',//24
            password: '',//12345678a
            disabled: false,
            show: false,
            isHiddenFlag: true,
            showKeyboard: true,
        }
    },
    components: {},
    methods: {
        ...mapMutations(['setToken']),
        ...mapActions(['actionUserInfo']),
        verifyLoginInfo() { //登陆验证
            if (!this.phone) {
                Toast(this.$t('wallet.login.toast_mail'))
                return false;
            }
            if (!this.password) {
                Toast(this.$t('wallet.login.toast_pass'))
                return false;
            }
            return true;
        }, //verifyLoginInfo
        async submitLogin() { //开始登陆
            if (!this.verifyLoginInfo()) {
                return;
            }
            let params = {
                uid: this.phone,
                password: this.password
            }
            this.$store.commit('setUser', params)
            this.disabled = true;
            login(params).then(res => {
                let { message, data } = res;
                this.setToken(data);

                if (data.is_active === 'N') {
                    Dialog.confirm({
                        message: this.$t('wallet.login.text_active'),
                        confirmButtonText: this.$t('lang.common.text_confirmButtonText'),
                        cancelButtonText: this.$t('lang.common.text_cancelButtonText')
                    })
                    return;
                }

                Toast(message);

                this.actionUserInfo().then(v => {
                    setTimeout(() => this.$router.replace({ path: "/home" }), 1000);
                })

            }).catch(e => {
                console.error(e);
                this.disabled = false;
                //Toast(e.message);
            })
        }, //submitLogin
        onSelect(item) {
            this.set_lang(item.type);
            this.show = false;
        },
        showTip() {//密码显示隐藏
            this.isHiddenFlag = !this.isHiddenFlag
            if (this.isHiddenFlag) {
                console.log(this.$refs.pass);

                this.$refs.pass.setAttribute("type", "password")
            } else {
                this.$refs.pass.setAttribute("type", "text")
            }
        }

    },
    mounted() {
        if (this.$route.query.userID) {
            this.phone = this.$route.query.userID;
        }
    }, //mounted

};

</script>
<style rel="stylesheet/scss" scoped lang="scss">
.van-button {
    display: block;
    width: 100%;
    background: linear-gradient(
        -61deg,
        rgba(214, 52, 79, 1),
        rgba(238, 124, 61, 1)
    );
    height: 33px;
}
.logo_text {
    display: block;
    text-align: center;
    font-size: 13px;
    opacity: 0.7;
    margin-top: 30px;
}
.input_gorup {
    position: relative;
    .show {
        position: absolute;
        top: 15px;
        right: 10px;
        display: block;
        width: 16px;
        height: 18px;
        line-height: 18px;
        margin-left: 18px;
        background: url("../../assets/wallet/asstes/show.png") no-repeat center
            center;
        background-size: 100%;
    }
    .hidden {
        position: absolute;
        top: 15px;
        right: 10px;
        display: block;
        width: 16px;
        height: 18px;
        line-height: 18px;
        margin-left: 18px;
        background: url("../../assets/wallet/asstes/hide.png") no-repeat center
            center;
        background-size: 100%;
    }
}
.submitBtn {
    height: 34px;
    line-height: 34px;
    background:linear-gradient(-61deg,rgba(33,239,185,1),rgba(85,107,243,1));
    box-shadow:0px 4px 9px 0px rgba(67,21,237,0.15);
    border-radius:4px;
    color: #fff;
}
</style>
