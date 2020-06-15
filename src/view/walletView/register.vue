<template>
    <div id="login"
         class="login_form padding20 full-screen">
        <div class="space30"></div>

        <div class="title flex align between">
            <div class="h2 text_color_dark"
                 style="font-size:28px">{{$t('wallet.register.title')}} <span style="color:rgba(52,59,58,1);background:linear-gradient(-61deg,rgba(33,239,185,1) 0%, rgba(85,107,243,1) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">GAME</span></div>
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
        <div class="space20"></div>

        <div class="them_form">

            <div class="input_gorup">
                <input type="text"
                       :placeholder="$t('wallet.register.form_input_userName')"
                       v-model="form.userAccount"
                       @blur="blur_event">
            </div>

            <div class="input_gorup">
                <input type="text"
                       :placeholder="$t('wallet.register.form_input_email')"
                       v-model="form.phone"
                       @blur="blur_event">
                <!-- <a class="btn_border_them getCode" v-if="second">{{second}} {{$t('wallet.register.form_input_second')}}</a>
        <a class="btn_border_them getCode" v-else @click="getCode()">{{$t('wallet.register.form_input_getCode')}}</a> -->
            </div>

            <div class="input_gorup">
                <input type="number"
                       pattern="\d*"
                       :placeholder="$t('wallet.register.form_input_code')"
                       v-model="form.code"
                       @blur="blur_event">
                <getCode :codeData="{type:'register',phone:form.phone,}" />
            </div>

            <div class="input_gorup">
                <input type="password"
                       :placeholder="$t('wallet.register.form_input_loginPwd')"
                       v-model="form.password"
                       @blur="blur_event">
            </div>

            <div class="input_gorup">
                <input type="password"
                       :placeholder="$t('wallet.register.form_input_loginPwd_re')"
                       v-model="loginPwd_re"
                       @blur="blur_event">
            </div>

            <div class="input_gorup">
                <input type="number"
                       style="-webkit-text-security:disc"
                       :placeholder="$t('feature.register.input_payPass')"
                       v-model="form.transactionPwd"
                       @blur="blur_event">
            </div>

            <div class="input_gorup">
                <input type="number"
                       style="-webkit-text-security:disc"
                       :placeholder="$t('feature.register.input_payPass_re')"
                       v-model="transactionPwd_re"
                       @blur="blur_event">
            </div>

            <div class="input_gorup">
                <input type="text"
                       :placeholder="$t('wallet.register.form_input_invitation')"
                       v-model="form.invitation"
                       :disabled="invitation_dis"
                       @blur="blur_event">
                <div class="color-warning font12 marginT10 animated fadeIn"
                     v-if="recommendreName">{{$t('feature.register.text_recommendreName')}}：{{recommendreName}}</div>
            </div>

            <!-- <div class="input_gorup flex align area">
        <div class="font14" style="margin-right:10px;">{{$t('feature.register.text_area')}} :</div>
         <van-radio-group v-model="form.area" class=" flex align">
          <van-radio name="left" style="margin-right:20px;">{{$t('feature.register.text_left')}}</van-radio>
          <van-radio name="right">{{$t('feature.register.text_right')}}</van-radio>
        </van-radio-group>
      </div> -->

            <div class="space20"></div>
            <van-button class="register"
                        @click="submitRegister()">{{$t('wallet.register.form_btn')}}</van-button>
            <div class="space30"></div>

            <div class="info flex align between">
                <div class="textLeft">
                    <span class="font14 them_color_gray">{{$t('wallet.register.old_user')}}</span>&nbsp;
                    <a @click="gopage_re('login')"
                       class="font14 font_link">{{$t('wallet.register.login_now')}}</a>
                </div>

                <a class="font14 font_link"
                   href="https://www.gscapp.cn/app/tbnpools"
                   target="_bank">{{$t('feature.register.text_download')}}</a>

            </div>
            <!-- info -->

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
    register,
    registerNew
} from '../../data/wallet';

import getCode from '../../components/wallet/getCode'
import {
    validatePhoneNum
} from '../../util';
import { Toast } from 'vant';
export default {
    data() {
        return {
            second: null,
            show: false,
            form: {
                "phone": '',
                "password": '',
                "code": '',//110112
                "username": '',
                "invitation": '',//8888
                // "area":"left",
                "transactionPwd": null
            },
            loginPwd_re: '',
            payPwd_re: null,
            transactionPwd_re: null,
            invitation_dis: false,
            recommendreName: null
        }
    },
    components: {
        getCode
    },
    methods: {
        verifynfo() { //注册验证
            /*if (!this.form.username) {
                Toast(this.$t('wallet.register.form_input_userName'))
                return false;
              }*/
            if (!this.form.phone) {
                Toast(this.$t('wallet.login.toast_mail'))
                return false;
            }
            if (!this.form.code) {
                Toast(this.$t('wallet.register.form_input_code'))
                return false;
            }
            if (!this.form.password) {
                Toast(this.$t('wallet.register.form_input_loginPwd'))
                return false;
            }
            if (!this.loginPwd_re) {
                Toast(this.$t('wallet.register.form_input_loginPwd_re'))
                return false;
            }
            if (this.form.password !== this.loginPwd_re) {
                Toast(this.$t('feature.register.toast_loginPass_fail'));
                return;
            }
            if (!this.form.transactionPwd) {
                Toast(this.$t('feature.register.input_payPass'));
                return;
            }
            if (!this.transactionPwd_re) {
                Toast(this.$t('feature.register.input_payPass_re'));
                return;
            }
            if (this.form.transactionPwd !== this.transactionPwd_re) {
                Toast(this.$t('feature.register.toast_payPass_fail'));
                return;
            }
            if (!this.form.invitation) {
                Toast(this.$t('wallet.register.form_input_invitation'))
                return false;
            }
            return true;
        }, //verifyLoginInfo
        submitRegister: function () { //提交注册

            if (!this.verifynfo()) {
                return;
            }

            let params = Object.assign({}, this.form);
            params.phoneOrEmail = this.form.phone;
            params.username = this.form.phone;
            register(params).then(data => {
                Toast(data.message)

                Dialog.alert({
                    title: data.message,
                    // message: `${this.$t('wallet.register.text_id')}${data.data}`,
                    confirmButtonText: this.$t('wallet.register.login_now')
                }).then(() => {

                    this.$router.replace({
                        path: `/login`
                    })

                });//Dialog

            }).catch(e => {
                console.error(e);
                //Toast(e.message);
            })
            // registerNew({phone:this.form.userAccount,invitation:this.form.invitation}).then(data => {
            //   console.log(JSON.stringify(data))

            // }).catch(e => {
            //   console.error(e);
            //   //Toast(e.message);
            // })
        }, //submitLogin
        onSelect(item) {
            this.set_lang(item.type);
            this.show = false;
        }
    },
    mounted() {
        if (this.$route.query.invitation) {
            this.form.invitation = this.$route.query.invitation;
            // this.form.area = this.$route.query.area;
            this.invitation_dis = true;
        }
    } //mounted
};

</script>
<style rel="stylesheet/scss" scoped scoped>
.van-button {
  display: block;
  width: 100%;
}
.register {
  width: 100%;
  height: 34px;
  line-height: 34px;
  background:linear-gradient(-61deg,rgba(34,239,185,1),rgba(86,107,243,1));
  box-shadow:0px 4px 9px 0px rgba(68,22,238,0.15);
  border-radius:4px;
  color: #fff;
}
</style>
