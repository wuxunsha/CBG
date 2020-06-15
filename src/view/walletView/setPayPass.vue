<template>
  <div id="login" class="login_form padding20  full-screen">



    <walletNav :title="$t('feature.setPayPass.text_title')" left-arrow @clickLeft="goback()" />

    <div class="item_box them_form">

      <div class="input_gorup">
        <input type="number" pattern="\d*" :placeholder="$t('wallet.register.form_input_code')" v-model="form.code"  @blur="blur_event">
        <getCode :codeData="{type:'changePay',phone:userInfo.user.id}"/>
      </div>

      <div class="input_gorup">
        <input type="number" style="-webkit-text-security:disc" :placeholder="`${$t('feature.register.input_payPass')}`" v-model="form.newPassword"  @blur="blur_event">
      </div>

      <div class="input_gorup">
        <input type="number" style="-webkit-text-security:disc" :placeholder="`${$t('feature.register.input_payPass_re')}`" v-model="loginPwd_re"  @blur="blur_event">
      </div>

      <div class="space20"></div>
      <van-button type="info" @click="change_pwd()">{{$t('feature.setPayPass.btn_text')}}</van-button>
      <div class="space30"></div>

      <div class="space20"></div>

    </div>
    <!-- them_form -->
  
  </div>
  <!-- index -->
</template>

<script>
  import {
    change_pay_password
  } from '../../data/wallet';
  import {
    mapMutations,
    mapState
  } from 'vuex'
  import getCode from '../../components/wallet/getCode'
  export default {
    data() {
      return {
        show:false,
        form: {
          "newPassword": null,
          "code": null
        },
        loginPwd_re:null,
        payPwd_re:null,
        exist:false//已登录成功
      }
    },
    components: {
      getCode
    },
    methods: {
      ...mapMutations(['setUserInfo', 'setToken']),
      verifynfo() { //登陆验证
        if (!this.form.code) {
          Toast(this.$t('wallet.register.form_input_code'))
          return false;
        }
        if (!this.form.newPassword) {
          Toast(this.$t('feature.register.input_payPass'))
          return false;
        }
        if (!this.loginPwd_re) {
          Toast(this.$t('feature.register.input_payPass_re'))
          return false;
        }
        if (this.loginPwd_re != this.form.newPassword) {
          Toast(this.$t('feature.register.toast_payPass_fail'))
          return false;
        }
        return true;
      }, //verifyLoginInfo
      change_pwd: function () { //提交

        if (!this.verifynfo()) {
          return;
        }
        change_pay_password(this.form).then(data => {
          Toast(data.message)
          setTimeout(() => {
            this.goback();
          }, 1000);
        }).catch(e => {
          console.error(e);
        })
      }, //submitLogin
      onSelect(item){
        this.set_lang(item.type);
        this.show = false;
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    mounted() {

    } //mounted
  };

</script>
<style rel="stylesheet/scss" scoped scoped>
  .van-button {
    display: block;
    width: 100%;
  }

</style>
