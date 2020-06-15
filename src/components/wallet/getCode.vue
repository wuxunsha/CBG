<template>
  <div>
    <a class="btn_border_them getCode" v-if="second">{{second}} {{$t('wallet.getCode.text_timer')}}</a>
    <a class="btn_border_them getCode" v-else @click="getCode()">{{$t('wallet.getCode.text_get')}}</a>
  </div>
</template>


<script>
  let timer;
  import {
    send_message
  } from '../../data/wallet';
  import {
    validatePhoneNum
  } from '../../util';
  export default {
    props: ['codeData'],
    data() {
      return {
        second: null, //倒计时
      }
    },
    methods: {

      getCode() { //获取验证码
        if (!this.codeData.phone) {
          Toast(this.$t('wallet.getCode.Toast_email'))
          return false;
        }
        let params = {
          "to": this.codeData.phone,
          "func": this.codeData.type
        }
        send_message(params).then(v => {
          Toast(v.message);
          this.setGetCodeStatue();
        })
      }, //getCode
      setGetCodeStatue() { //设置获取验证码状态
        this.second = 60;
        timer = setInterval(() => {
          if (this.second > 1) {
            --this.second;
          } else {
            this.second = null;
            clearInterval(timer);
          }
        }, 1000)
      }, //setGetCodeStatue

    },
    mounted() {
      
    },
    beforeDestroy(){
      clearInterval(timer);
    },

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/scss" lang="scss">
  @import "../../styles/walletVal";

</style>
