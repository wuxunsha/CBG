<template>
  <div>

    <div>
      <van-nav-bar :title="$t('wallet.share.nav_title')"  left-arrow @click-left="goback()" />
    </div>

    <div class="codeBox">
      <!-- 分享二维码 -->
      <div class="codeimg">
        <div class="qr_box">
          <div class="qrcode" ref="qrCodeUrl"></div>
        </div>
      </div>
    </div>

    <!-- 邀请码 -->
    <div class="invitation-code">
      <h2 v-if="area=='left'">{{userInfo.user.userInvitation}}</h2>
      <h2 v-else>{{userInfo.user.userInvitationRight}}</h2>
    </div>

    <!-- 复制按钮 -->
    <div class="copycode" :data-clipboard-text="code_text">
      <span @click="copy">
        {{$t('feature.bankShare.text_copy')}}
      </span>
    </div>
  </div>
</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex'

  import QRCode from 'qrcodejs2'
  import Clipboard from 'clipboard';

  export default {
    data() {
      return {
        code_text: null,
        chilData: null, //邀请数据
        area:'left'//默认区域
      }
    },
    methods: {
      ...mapMutations(['setUserInfo']),
      changeType(name, title){//修改类型
        this.area = name;
        this.qrcode();
      },
      qrcode() { //生成二维码
        this.$refs.qrCodeUrl.innerHTML="";//先移除
        // this.code_text = `${window.location.protocol}//${window.location.host}/#/register?invitation=${this.area=='left' ? this.userInfo.user.userInvitation : this.userInfo.user.userInvitationRight}`;
        this.code_text = `http://tb.njmall.store/#/register?invitation=${this.area=='left' ? this.userInfo.user.userInvitation : this.userInfo.user.userInvitationRight}`;
        console.log(this.code_text);
        var qrcode = new QRCode(this.$refs.qrCodeUrl, {
          text: this.code_text,
          colorDark: "#2b3b4b",
          width: 200,
          height: 200,
          correctLevel: QRCode.CorrectLevel.H
        })
      },
      copy() { //复制
        var clipboard = new Clipboard('.copycode')
        clipboard.on('success', e => {
          Toast(this.$t('wallet.common.toast_copy_ok'))
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          Toast(this.$t('wallet.common.toast_copy_fail'))
          clipboard.destroy()
        })
      },
    },
    computed: {
      ...mapState(['userInfo'])
    },
    mounted() {
      this.qrcode();
    }
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
@import "../../styles/walletVal";

.codeBox {
  position: relative;
  width: 100%;
  height: 400px;
  background: url('../../assets/business/sharebg.png') no-repeat;
  background-size: 100% 100%;
  .codeimg {
    position: absolute;
    bottom: -75px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 150px;
    padding: 5px;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.invitation-code {
  margin-top: 95px;
      text-align: center;
  h2 {
    display: inline-block;
    line-height: 25px;
    padding: 4px 20px;
    border: 1px solid rgba(235,235,235,1);
    border-radius: 2px;
  }
}
.copycode {
  margin-top: 15px;
  text-align: center;
  span {
    display: inline-block;
    padding: 6px 22px;
    background: #566BF3;
    font-size: 12px;
    color: #fff;
    border-radius: 2px;
  }
}
</style>
