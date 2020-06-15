<template>
  <div id="assetsDetail">

    <div  class="padding20" style="padding-bottom:0;">
      <walletNav :title="$route.query.coinName" left-arrow @clickLeft="goback()" textColor="#3d80cd"/>
    </div>

    <div class="flex align between topInfo">

      <div class="item">
        <div class="font12 them_color_gray_light">可用</div>
        <div class="font14 text_color_dark">0.2002</div>
      </div>

      <div class="item">
        <div class="font12 them_color_gray_light">冻结</div>
        <div class="font14 text_color_dark">0.2002</div>
      </div>

      <div class="item">
        <div class="font12 them_color_gray_light textRight">折合(CNY)</div>
        <div class="font14 them_color_gray textRight">0.2002</div>
      </div>
    </div>
    <!-- topInfo -->

    <div class="space10 bg_color_gray"></div>

    <div class="list_box">
      <div class=" padding20 font16 font-bold text_color_dark">财务记录</div>
      <book state="assetsDetail" :query="{coinName:$route.query.coinName}" class="log_box"/>
    </div>
    <!-- list_box -->

    <div class="actions flex align between">
      <div class="item"><i></i>充币</div>
      <div class="item"><i></i>提币</div>
    </div>
    <!-- actions -->

  </div>
  <!-- index -->
</template>

<script>
  import book from './book';
  import {
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        currRechargeInfo: null//当前币种信息
      }
    },
    components:{
      book
    },
    methods: {
      
    },
    computed: {
    },
    mounted() {

    } //mounted
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
 @import "../../styles/walletVal";
  .topInfo{
    padding: 15px 20px;
    padding-top: 0;
    &>.item{
      width: 33%;
      >div:nth-child(1){
        margin-bottom: 2px;
      }
    }
  }
  .log_box{
    padding-top: 10px;
    height: calc(100vh - 320px);
  }
  .actions{
    padding: 10px;
    .item{
      width: 50%;
      text-align: center;
      color: $them_color;
      font-weight: bold;
      font-size: 14px;
      padding: 10px;
      box-shadow: 0px 0px 15px #dee2e6;
      border-radius: 4px;
      i{
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-right: 10px;
        background-size:100% !important;
        background-position:center !important;  
      }
      &:nth-child(1){
        margin-right: 10px;
        i{
          background: url('../../assets/wallet/recharge.png');
        }
      }
      &:nth-child(2){
        margin-left: 10px;
        i{
          background: url('../../assets/wallet/withdraw.png');
        }
      }
    }
  }
</style>
