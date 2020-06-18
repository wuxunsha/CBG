<template>
  <div>

    <div class="navBox">
      <van-nav-bar fixed left-arrow @click-left="goback()"/>
    </div>

    <div class="prompt">
      <p>{{$t('feature.setPayPass.text_title')}}</p>
      <p>{{$t('feature.setPayPass.text_prompt')}}</p>
    </div>

    <!-- <div class="input_gorup">
      <div class="captcha">
        <div>
          <input type="number" pattern="\d*" :placeholder="$t('wallet.register.form_input_code')" v-model="form.code"  @blur="blur_event">
        </div>
        <div>
          <getCode :codeData="{type:'changePay',phone:userInfo.user.id}"/>
        </div>
      </div>
    </div> -->

    <div class="input_gorup">
      <div class="captcha">
        <div>
          <input type="password" :placeholder="`${$t('feature.register.input_payPass')}`" v-model="form.newPassword"  @blur="blur_event" class="set-password-input" ref="pass">
        </div>
        <p>
          <i :class="isPasswordFlag ? 'show' : 'hidden'" @click="isShowPassIcon"></i>
        </p>
      </div>
    </div>

    <div class="input_gorup">
      <div class="captcha">
        <div>
          <input type="password" :placeholder="`${$t('feature.register.input_payPass_re')}`" v-model="loginPwd_re"  @blur="blur_event" class="set-password-input" ref="newPass">
        </div>
        <p>
          <i :class="isHiddenFlag ? 'show' : 'hidden'" @click="isShowIcon"></i>
        </p>
      </div>
    </div>

    <div class="submit-btn">
      <van-button type="info" @click="change_pwd()">{{$t('feature.setPayPass.btn_text')}}</van-button>
    </div>
  
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

    } //mounted
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
    color: rgba(53,53,53,1);
    line-height: 35px;
  }
  > p:nth-child(2) {
    margin-top: 15px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(165,172,174,1);
  }
}
.input_gorup {
  padding: 0 15px;
  margin-top: 30px;
  .captcha {
    width: 100%;
    height: 41px;
    line-height: 40px;
    border-bottom: 1px solid #EBEBEB;
    display: flex;
    > div:nth-child(1) {
      flex: 1;
      width: 100%;
      height: 80%;
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
    border-bottom: none!important;
  }
}
.set-password-input {
  width: 90%!important;
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
