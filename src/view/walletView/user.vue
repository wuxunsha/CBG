<template>
  <div id="user" class="full-screen">

    <div class="space20"></div>

    <div class="user_info">

      <div class="main flex align">
        <div class="header">
          <img src="../../assets/wallet/user_icon.png" alt="">
        </div>
        <div class="text">
          <b class="font-bold font14">{{userInfo.username}}</b>
          <div class="font12" style="opacity: .5;">{{userInfo.email}}</div>
        </div>
        <div class="share_qr" @click="gopage('/wallet/share')">{{$t('wallet.user.text_share')}}&nbsp;&nbsp;<van-icon name="qr" />
        </div>
      </div>
      <!-- main -->

    </div>
    <!-- user_info -->

    <div class="menu_item_box">

      <!-- <div class="flex align menu_list right_row border-bottom" @click="gopage('/wallet/ticket')">
        <div class="icon">
          <img src="../../assets/wallet/zk.png" alt="" srcset="">
        </div>
        <div class="title font12 text_color_dark  font-bold">我的折扣券</div>
        <van-icon name="arrow" />
      </div> -->
      <!-- menu_list -->

      <div class="flex align menu_list right_row border-bottom" @click="editName">
        <div class="icon">
          <img src="../../assets/wallet/edit.png" alt="" srcset="">
        </div>
        <div class="title font12 text_color_dark  font-bold">{{$t('wallet.user.text_name')}}</div>
         <van-icon name="arrow" />
      </div>
      <!-- menu_list -->

      <div class="flex align menu_list right_row border-bottom" @click="gopage('/wallet/forgetPass')">
        <div class="icon">
          <img src="../../assets/wallet/pass.png" alt="" srcset="">
        </div>
        <div class="title font12 text_color_dark  font-bold">{{$t('wallet.user.text_setpass')}}</div>
         <van-icon name="arrow" />
      </div>
      <!-- menu_list -->

      <div class="flex align menu_list right_row border-bottom" @click="showLang = true">
        <div class="icon">
          <img src="../../assets/wallet/lang.png" alt="" srcset="">
        </div>
        <div class="title font12 text_color_dark  font-bold">{{$t('wallet.user.text_lang')}} <i class="un_read" v-if="check_read"></i></div>
         <van-icon name="arrow" />
      </div>
      <!-- menu_list -->

      <div class="flex align menu_list right_row border-bottom" @click="gopage('/wallet/newDetail')">
        <div class="icon">
          <img src="../../assets/wallet/about.png" alt="" srcset="">
        </div>
        <div class="title font12 text_color_dark  font-bold">{{$t('wallet.user.text_about')}} <i class="un_read" v-if="check_read"></i></div>
         <van-icon name="arrow" />
      </div>
      <!-- menu_list -->
      
      <div class="flex align menu_list right_row border-bottom" @click="gopage('/wallet/feedback')">
        <div class="icon">
          <img src="../../assets/wallet/feedback.png" alt="" srcset="">
        </div>
        <div class="title font12 text_color_dark  font-bold">{{$t('wallet.user.text_feedback')}} <i class="un_read" v-if="check_read"></i></div>
         <van-icon name="arrow" />
      </div>
      <!-- menu_list -->

    </div>
    <!-- menu_item_box -->

    <div class="space20"></div>

    <div class="login_out" @click="login_out()">{{$t('wallet.user.text_loginout')}}</div>

    <div class="space20"></div>

    <van-dialog
      v-model="showEdit"
      :title="$t('wallet.user.dialog_edit')"
      show-cancel-button
      :closeOnClickOverlay="true"
      :beforeClose="dialogConfirm"
    >
      <div class="dialogMain">
        <van-field v-model="newName" border clickable :placeholder="$t('wallet.user.input_name')" />
      </div>
    </van-dialog>

    <!-- <van-popup v-model="showEdit">内容</van-popup> -->

     <van-action-sheet v-model="showLang" :title="$t('wallet.common.exchange_lang')" :actions="lang_actions" @select="onSelect"/>

    <myFooter :footerNavActive="activeType"></myFooter>


  </div>
  <!-- index -->
</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex'
  import myFooter from "../../components/wallet/footer.vue";
  import {
    Toast
  } from 'vant';
  import {
    change_nickname
  } from '../../data/wallet';
  export default {
    data() {
      return {
        activeType: "user",
        showLang: false,
        show_change_input: false, //显示修改账户名
        newName: null,
        showEdit:false
      }
    },
    components: {
      myFooter
    },
    methods: {
      ...mapMutations(['setUserInfo', 'setToken']),
      changeName(done){//修改用户名
        change_nickname({"newNick":this.newName}).then(v=>{
           Toast(v.message);
           let newInfo = this.userInfo;
           newInfo.username = this.newName;
           this.setUserInfo(newInfo);
           done;
        })
      },//changeName
      dialogConfirm(action, done){//确定编辑用户名
        if (action === 'confirm') {
          if(this.newName.length<3 || this.newName.length>10){
            Toast(this.$t('wallet.user.Toast_name'))
            done(false);
          }else{
            setTimeout(()=>{
              this.changeName(done());
            },2000);
          }
        } else {
          this.newName = null;
          done();
        }
      },//dialogConfirm
      editName(){//编辑账户名
        this.showEdit = true;
        this.newName = this.userInfo.username;
      },//editName
      login_out() { //退出登录
        Dialog.confirm({
          message: this.$t('wallet.user.text_confirm'),
          confirmButtonText: this.$t('wallet.common.text_confirmButtonText'),
          cancelButtonText: this.$t('wallet.common.text_cancelButtonText')
        }).then(() => {
          
        })
      }, //login_out
      get_loginout() {
        this.gopage_re('login');
        setTimeout(() => {
          this.setUserInfo(null);
          this.setToken(null);
          localStorage.removeItem('vuex');
          location.reload();
        }, 500);
      }, //get_loginout
      onSelect(item) {//设置语言
        this.set_lang(item.type);
        this.show = false;
      }//onSelect
    },
    computed: {
      ...mapState(['userInfo', 'check_read'])
    },
    mounted() {

    } //mounted
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../styles/walletVal";

  #user {
    box-sizing: border-box;
  }

  .user_info {
    margin-top: 0;
    padding: 30px 20px;
    background: white;
    // background: url('../../assets/wallet/userBg.jpg') center;
    background-size: 150%;
    position: relative;
    margin: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    -webkit-border-radius: 8px;
    overflow: hidden;

    * {
      color: white;
    }

    .main,
    .number-info,
    .btn-row {
      position: relative;
      z-index: 11;
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: $them_color_dark;
      opacity: 0.85;
    }

    .header {
      margin-right: 10px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 100px;
        -webkit-border-radius: 100px;
        overflow: hidden;
        background: white;
        padding: 5px;
      }
    }

    .text {
      color: white;
      flex: 1;
    }

    .share_qr {
      color: white;

      .van-icon {
        font-size: 20px;
        vertical-align: middle;
        margin-top: -2px;
      }
    }
  }

  .menu_item_box{
    margin-top: 20px;
    .menu_list {
      padding: 20px;
      position: relative;
      &:active{
        background: $them_color_bgGray;
      }
      &::after{
        left: 50px;
      }
      .van-icon-arrow{
       color:$them_color_gray_light;
       font-size: 10px;
       display: block;
       width: 16px;
       height: 16px;
       text-align: right;
       position: absolute;
       right: 20px;
       top: 50%;
       margin-top: -8px;
       opacity: 0.5;
      }
      .icon{
        width: 25px;
        height: 25px;
        margin-right: 10px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .login_out {
    color: white;
    font-weight: bold;
    text-align: center;
    font-size: 13px;
    text-align: center;
    margin: 20px auto;
    margin-top: 40px;
    padding: 15px;
    margin: 10px 20px;
    border-radius: 2px;
    -webkit-border-radius: 2px;
    background: $them_color_gray_light;
  }

</style>
