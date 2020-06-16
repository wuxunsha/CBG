<template>
  <div>

    <walletNav :title="$t('feature.setPayPass.text_title')" left-arrow @clickLeft="goback()" fixed />

    <!-- <div class="item_box them_form">

      <div class="input_gorup">
        <input type="number" pattern="\d*" :placeholder="$t('wallet.register.form_input_code')" v-model="form.code"  @blur="blur_event">
        <getCode :codeData="{type:'changePay',phone:userInfo.user.id}"/>
      </div>

      <div class="input_gorup set-password">
        <div>
          <input type="password" :placeholder="`${$t('feature.register.input_payPass')}`" v-model="form.newPassword"  @blur="blur_event" class="set-password-input" ref="pass">
        </div>
        <p>
          <i :class="isPasswordFlag ? 'show' : 'hidden'" @click="isShowPassIcon"></i>
        </p>
      </div>

      <div class="input_gorup set-password">
        <div>
          <input type="number" style="-webkit-text-security:disc" :placeholder="`${$t('feature.register.input_payPass_re')}`" v-model="loginPwd_re"  @blur="blur_event" class="set-password-input">
        </div>
        <p>
          <i :class="isHiddenFlag ? 'show' : 'hidden'" @click="isShowIcon"></i>
        </p>
      </div>

      <div class="space20"></div>
      <van-button type="info" @click="change_pwd()">{{$t('feature.setPayPass.btn_text')}}</van-button>
      <div class="space30"></div>

      <div class="space20"></div>

    </div> -->
  
  </div>
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
        isPasswordFlag: false,
        isHiddenFlag: false,
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
      },
      isShowPassIcon() {
        this.isPasswordFlag = !this.isPasswordFlag
        if (this.isPasswordFlag) {
          this.$refs.pass.setAttribute("type", "password")
        } else {
          this.$refs.pass.setAttribute("type", "text")
        }
      },
      isShowIcon() {
        this.isHiddenFlag = !this.isHiddenFlag
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    mounted() {

    } //mounted
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
.van-button {
  display: block;
  width: 100%;
}
.set-password {
  display: flex;
  border-bottom: 1px solid #e7eaed;
  > div {
    flex: 1;
  }
  input {
    border-bottom: none!important;
  }
}
.set-password-input {
  width: 90%!important;
}
.show {
  display: block;
  width: 16px;
  height: 47px;
  line-height: 47px;
  background: url('../../assets/wallet/user/可显示@3x.png') no-repeat center center;
  background-size: 100%;
}
.hidden {
  display: block;
  width: 16px;
  height: 47px;
  line-height: 47px;
  background: url('../../assets/wallet/user/不显示@3x.png') no-repeat center center;
  background-size: 100%;
}
</style>
