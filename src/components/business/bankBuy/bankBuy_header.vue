<template>
  <div class="headerBg">

    <div class="flex align" style="margin:20px 0;">
      <div>
        <img :src="setImgUrl(usdtInfo.coin.coinImg)" alt="" class="icon">
      </div>
      <div class="dataGroup">
        <div class="font17">{{usdtInfo.coin.coinName}}</div>
        <div class="font13">{{$t('feature.bankBuy.text_header')}}{{usdtInfo.amount}}</div>
      </div>
      <!-- dataGroup -->

    </div>
    <!-- flex -->

  </div>

</template>

<script>
  import {
    mapMutations,
    mapState,
    mapActions
  } from 'vuex'
  export default {
    props: ['proInfo'],
    data() {
      return {

      }
    },
    methods: {
      
    },
    computed: {
      ...mapState(['userInfo']),
      usdtInfo(){
        let balanceModels = this.userInfo.balanceModels.filter(x=>x.coin.coinName==this.proInfo.coinName)
        return balanceModels[0];
      }//usdtInfo
    },
    mounted() {

    }
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../../styles/walletVal";
  .icon{
    display: block;
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 100px;
    overflow: hidden;
    background: white;
  }
</style>
