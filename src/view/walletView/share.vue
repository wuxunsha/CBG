<template>
  <div id="share" class="share_box full-height">

      <van-nav-bar
        :title="$t('wallet.share.nav_title')"
        left-arrow
        fixed
        @click-left="goback()"
        :right-text="$t('wallet.share.text_list')"
        @click-right="gopage('/wallet/shareList')"
        :class="'shareStyle'"
      />

    <div class="space50"></div>

    <div class="shareMain">

        <div class="space10"></div>
      
        <div class="item_box num flex align between">
          <div class="item textCenter">
            <b class="font-bold font20 dispayblock text_color_dark">
              <span class="font-bold" v-if="chilData">{{chilData.child_count}}</span>
              <span v-else>--</span>
            </b>
            <small class="font12 text_color_dark">{{$t('wallet.share.text_td_user')}}</small>
          </div>
          <div class="item textCenter">
            <b class="font-bold font20 dispayblock text_color_dark">
              <span class="font-bold" v-if="chilData">{{chilData.reward}}</span>
              <span v-else>--</span>
            </b>
            <small class="font12 text_color_dark">{{$t('wallet.share.text_td_amount')}}</small>
          </div>
      </div>
      <!-- item_box -->

      <div class="item_box textCenter">
          <div class="qr_box"><div class="qrcode" ref="qrCodeUrl"></div></div>
          <div class="code"><b class="font-bold font20 dispayblock text_color_dark">{{userInfo.invitation}}</b><small>{{$t('wallet.share.text_code')}}</small></div>
          <van-button plain type="info"  class="copycode" :data-clipboard-text="code_text" @click="copy">{{$t('wallet.share.text_copy')}}</van-button>
          <div class="space10"></div>
      </div>
      <!-- item_box -->

    </div>
    <!-- shareMain -->

  </div>
  <!-- share -->
</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex'
  import {
    child_detail
  } from '../../data/wallet';
  import QRCode from 'qrcodejs2'
  import Clipboard from 'clipboard';
  
  export default {
    data() {
      return {
        code_text: null,
        chilData:null//邀请数据
      }
    },
    methods: {
      ...mapMutations(['setUserInfo']),
      qrcode() { //生成二维码
        this.code_text = window.location.protocol+'//'+window.location.host+'/#/register?invitation='+this.userInfo.invitation;
        // console.log(this.code_text);
        var qrcode = new QRCode(this.$refs.qrCodeUrl, {
            text: this.code_text,
            colorDark : "#2b3b4b",
            width: 200,
            height: 200,
            correctLevel: QRCode.CorrectLevel.H
        })
      },//qrcode
      copy() {//复制
        var clipboard = new Clipboard('.copycode')
        clipboard.on('success', e => {
          Toast(this.$t('wallet.common.toast_copy_ok'))
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          Toast(this.$t('wallet.common.toast_copy_fail'))
          clipboard.destroy()
        })
      },//copy
      child_detail(){//获取邀请人信息
        child_detail().then(v=>{
          this.chilData = v.data;
        })
      }//child_detail
    },
    computed: {
      ...mapState(['userInfo'])
    },
    mounted() {
      this.qrcode();
      this.child_detail();
    } //mounted
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../styles/walletVal";
// 分享样式
.share_box {
    background: url('../../assets/wallet/shareBg.jpg') center;
    background-size: cover;
    .shareMain{
      background: rgba(255,255,255,0.92);
      margin: 30px;
      padding: 20px 10px;
      border-radius: 4px;
    }
    .share_img {
        display: block;
        width: 150px;
        height: 150px;
        margin: 0 auto;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(0, 0, 0, 0.15);
        margin-bottom: 10px;
    }
    .code {
        small {
            display: block;
            font-size: 11px;
            font-weight: bold;
        }
    }
    .btn_them_border {
        display: block;
        width: 60%;
        margin: 0 auto;
        margin-top: 10px;
        border: 1px solid $them-color;
        padding: 10px;
        color: $them-color;
    }
    .code {
        font-weight: normal;
        padding: 10px 0;
        small{
          opacity: 0.6;
        }
    }
    .qr_box {
      width: 180px;
      margin: 10px auto;
      background: white;
      padding: 10px;
    }
    .item_box{
      margin-bottom: 20px;
      .item{
        width: 50%;
      }
    }
}
.shareStyle{
  background: rgba(0, 0, 0, 0.4);
  border-bottom: none;
  &::after{
    border-bottom: 1px solid rgba(0, 0, 0, 0.3) !important;
  }
}
</style>
