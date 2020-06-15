<template>
  <div class="hisDetail full-height">


      <div style="padding:10px 20px;"> <walletNav :title="$t('wallet.hisDetail.nav_title')" left-arrow @clickLeft="goback()"/> </div>

      <div class="lisox">

        <div class="num font-bold font20 them_color">{{logDtail.amount}} {{logDtail.coin_name}}</div>

        <div class=" flex align between border-bottom">
          <div class="item title them_color_gray font13">{{$t('wallet.hisDetail.text_type')}}</div>

          <div  class="item font13 text_color_dark" v-if="logDtail.type=='reward'">{{$t('wallet.book.text_reward')}}</div>
          <div  class="item font13 text_color_dark" v-else-if="logDtail.type=='exchange'">{{$t('wallet.book.text_exchange')}}</div>
          <div  class="item font13 text_color_dark" v-else-if="logDtail.type=='buy'" >{{$t('wallet.book.text_buy')}}</div>
          <div  class="item font13 text_color_dark" v-else-if="logDtail.type=='mining'" >{{$t('wallet.book.text_mining')}}</div>
          <div  class="item font13 text_color_dark" v-else-if="logDtail.type=='recharge'" >{{$t('wallet.book.text_recharge_status')}}</div>
          <div  class="item font13 text_color_dark" v-else-if="logDtail.type=='withdraw'">{{$t('wallet.book.text_withdraw_status')}}</div>
          <div  class="item font13 text_color_dark" v-else>{{$t('wallet.hisDetail.text_unknown')}}</div>

        </div>

        <div class=" flex align between border-bottom">
          <div class="item title them_color_gray font13">{{$t('wallet.hisDetail.text_exchange_statue')}}</div>

           <div class="item font13 text_color_dark" v-if="logDtail.state=='success'">{{$t('wallet.hisDetail.text_success')}}</div>
           <div class="item font13 text_color_dark" v-else-if="logDtail.state=='application'">{{$t('wallet.hisDetail.text_application')}}</div>
           <div class="item font13 text_color_dark" v-else-if="logDtail.state=='withdrawal'">{{$t('wallet.hisDetail.text_withdrawal')}}</div>
           <div class="item font13 text_color_dark" v-else-if="logDtail.state=='fail'">{{$t('wallet.hisDetail.text_fail')}}</div>
          <div class="item font13 text_color_dark" v-else>{{$t('wallet.hisDetail.text_unknown')}}</div>
          
        </div>

         <div class=" flex align between border-bottom">
          <div class="item title them_color_gray font13">{{$t('wallet.hisDetail.text_timer')}}</div>
          <div class="item font13 text_color_dark">{{logDtail.add_time}}</div>
        </div>

        <div class=" flex align between border-bottom" v-for="(item,index) in JSON.parse(logDtail.desc)" :key="index">
          <div class="item title them_color_gray font13">
            
            <span v-if="item.key=='log.info.desc.usdt'">USDT</span>
            <span v-else-if="item.key=='log.info.desc.to.price'">{{$t('wallet.hisDetail.text_price')}}</span>
            <span v-else-if="item.key=='log.info.desc.static.release.proportion'">{{$t('wallet.hisDetail.text_proportion')}}</span>
            <span v-else-if="item.key=='log.info.desc.withdraw.address'">{{$t('wallet.hisDetail.text_withdraw_address')}}</span>
            <span v-else-if="item.key=='log.info.desc.withdraw.fee'">{{$t('wallet.hisDetail.text_fee')}}</span>
            <span v-else-if="item.key=='log.info.desc.withdraw.amount'">{{$t('wallet.hisDetail.text_amount')}}</span>
            <span v-else-if="item.key=='log.info.desc.recharge.tx.id'">{{$t('wallet.hisDetail.text_txid')}}</span>
            <span v-else-if="item.key=='log.info.desc.recharge.address'">{{$t('wallet.hisDetail.text_recharge_address')}}</span>
            <span v-else-if="item.key=='log.info.desc.recharge.token.symbol'">{{$t('wallet.hisDetail.text_symbol')}}</span>
            <span v-else-if="item.key=='log.info.desc.recharge.token.contract'">{{$t('wallet.hisDetail.text_contract')}}</span>
            <span v-else>{{$t('wallet.hisDetail.text_other')}}</span>
          </div>
          <div class="item font13 them_color_gray">{{item.value}}</div>
        </div>
      
      </div>
      <!-- lisox -->

  </div>
  <!-- index -->
</template>

<script>
  import HisList from '../../components/wallet/hisList'
  import {
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    data() {
      return {

      }
    },
    components:{
      HisList
    },
    methods: {
      
    },
    computed: {
      ...mapState(['logDtail'])
    },
    mounted() {
    } //mounted
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
 @import "../../styles/walletVal";
  .lisox{
    padding: 20px;
    >.flex{
      padding: 20px 0;
    }
  }
</style>
