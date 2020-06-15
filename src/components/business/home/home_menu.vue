<template>
  <div class="menu flex align between">
    <div>
      <i class="menu_1" @click="gopage('/mining')"></i><div class=" text_color_dark textCenter">{{$t('feature.home.text_mining')}}</div>
    </div>
    <div>
      <i class="menu_2" @click="gopage('/bank')"></i><div class=" text_color_dark textCenter">{{$t('feature.home.text_bank')}}</div>
    </div>
    <div  @click="gopage('/recharge')">
      <i class="menu_3"></i><div class=" text_color_dark textCenter">{{$t('feature.home.text_recharge')}}</div>
    </div>
    <div @click="gopage('/withdraw')">
      <i class="menu_4"></i><div class=" text_color_dark textCenter">{{$t('feature.home.text_withdraw')}}</div>
    </div>
  </div>
</template>

<script>

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../../styles/walletVal";

  .menu{
    padding: 10px 0;
    >div{
      width: 25%;
      text-align: center;
      i{
        display: block;
        width: 40px;
        height: 40px;
        margin: 5px auto;
        background-size:100% !important; 
        &.menu_1{
          background: url('../../../assets/business/home_menu1.png') no-repeat center;
        }
        &.menu_2{
          background: url('../../../assets/business/home_menu2.png') no-repeat center;
        }
        &.menu_3{
          background: url('../../../assets/business/home_menu3.png') no-repeat center;
        }
        &.menu_4{
          background: url('../../../assets/business/home_menu4.png') no-repeat center;
        }
      }
      div{
        font-size: 12px;
      }
    }
  }

</style>
