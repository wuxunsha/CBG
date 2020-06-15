<template>
  <div class="hisLisox border-bottom activeBg" @click="goDetail(data)">
        <div class="subTitle flex align between">
            <b class="font-bold text_color_dark font15">
              <span  v-if="data.type=='reward'">>{{$t('wallet.book.text_reward')}}</span>
              <span  v-else-if="data.type=='exchange'">{{$t('wallet.book.text_exchange')}}</span>
              <span  v-else-if="data.type=='buy'" >{{$t('wallet.book.text_buy')}}</span>
              <span  v-else-if="data.type=='mining'" >{{$t('wallet.book.text_mining')}}</span>
              <span  v-else-if="data.type=='recharge'" >{{$t('wallet.book.text_recharge_status')}}</span>
              <span  v-else-if="data.type=='withdraw'">{{$t('wallet.book.text_withdraw_status')}}</span>
              <span  v-else>{{$t('wallet.book.text_unknown')}}</span>
              <small> / {{data.coin_name}}</small>
            </b>
            <small class="more"><van-icon name="weapp-nav" /></small>
        </div>

        <div class=" flex align between">

            <div class="item">
                <small class=" font12 them_color_gray dispayblock font12">{{$t('wallet.hisList.text_amount')}}</small>
                <span class=" dispayblock text_color_dark font14">{{data.amount}}</span>
            </div>

            <div class="item">
                <small class=" font12 them_color_gray dispayblock font12">{{$t('wallet.hisList.text_state')}}</small>
                <span class=" dispayblock text_color_dark font14" v-if="data.state=='success'" >{{$t('wallet.hisDetail.text_success')}}</span>
                <span class=" dispayblock text_color_dark font14" v-else-if="data.state=='application'" style="color:#2254c7;">{{$t('wallet.hisDetail.text_application')}}</span>
                <span class=" dispayblock text_color_dark font14" v-else-if="data.state=='withdrawal'"  style="color:#893aef;">{{$t('wallet.hisDetail.text_withdrawal')}}</span>
                <span class=" dispayblock text_color_dark font14" v-else-if="data.state=='fail'" style="color:#f73434;">{{$t('wallet.hisDetail.text_fail')}}</span>
                <span class=" dispayblock text_color_dark font14" v-else>{{$t('wallet.book.text_unknown')}}</span>
            </div>

            <div class="item textRight">
                <small class=" font12 them_color_gray dispayblock font12">{{$t('wallet.hisList.text_add_time')}}</small>
                <span class=" dispayblock text_color_dark font14">{{timerMD(data.add_time)}}</span>
            </div>

        </div>
        <!-- flex -->
  </div>
</template>


<script>
import {
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    props:['data'],
    data() {
      return {

      }
    },
    methods: {
      ...mapMutations(['setLogDtail']),
      goDetail(item){
        this.setLogDtail(item);
        this.gopage('/wallet/hisDetail');
      }//goDetail
    },
    computed: {

    },
    mounted() {
    },

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/scss" lang="scss">
@import "../../styles/walletVal";
.hisLisox{
    padding: 10px 20px;
    .subTitle{
        margin-bottom: 10px;
        .more{
            display: block;
            padding: 5px 5px;
            font-size: 20px;
            color: $them_color_gray;
            opacity: 0.6;
        }
        *{
          font-weight: bold;
        }
    }
    .item{
        span{
            font-weight: 400;
            height: 25px;
            line-height: 25px;
        }
    }
}
</style>
