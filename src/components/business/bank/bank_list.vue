<template>

  <div class="mylist">

    <div class=" flex align between">
      <div class="listTitle">{{$t('feature.bank.text_listTitle')}}</div>
      <div style="margin-bottom:20px;" @click="gopage('/bankOrder')" class="flex align font_link"><span>{{$t('feature.bank.text_order')}}</span>&nbsp;<van-icon name="arrow" />&nbsp;&nbsp;</div>
    </div>

    <div v-if="dataList.length">
      <div class="list_type1 flex align between animated fadeIn" v-for="(item,index) in dataList" :key="index"
        @click="gopage(`/bankBuy?${qsParams(item)}`)" v-if="item.cycles.length">

        <div class="item flex align">
          <div>
            <img :src="setImgUrl( setIcon(item.coinName) )" alt="" class="icon">
          </div>
          <div>
            <b class=" text_color_dark font16">{{item.coinName}}</b>
            <span class="font12 color-gray2">{{item.cycles[0].productMin}} USDT {{$t('feature.bank.text_mini')}}</span>
          </div>
        </div>
        <!-- item -->

        <div class="state textRight">
          <div class=" font-bold font18 them_color">{{toFixed_4( parseFloat(item.cycles[0].productRate)*100 )}}%</div>
          <div class=" font12 color-gray2">{{$t('feature.bank.text_productRate')}}</div>
        </div>
        <!-- state -->

      </div>
      <!-- list_type1 -->
    </div>
    <!-- end if -->


  </div>

</template>

<script>
import {
    mapMutations,
    mapState,
    mapActions
  } from 'vuex'
  import {
    bankList
  } from '../../../data/business';
  export default {
    props: ['user'],
    data() {
      return {
        dataList: []
      }
    },
    methods: {
      getList() { //获取产品列表
        bankList().then(v => {
          console.log(v);
          this.dataList = v.data;
        })
      }, //getList
      setIcon(coinName){//设置币种图标
        let coin = this.userInfo.balanceModels.filter(x=>x.coin.coinName==coinName)
        return coin[0].coin.coinImg;
      }//setIcon
    },
     computed: {
      ...mapState(['userInfo']),
     },
    mounted() {
      this.getList();
    }
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../../styles/walletVal";

  .mylist {
    padding: 10px;
  }

  .icon {
    display: block;
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 100px;
    overflow: hidden;
    background: rgba(0,0,0,0.1);
  }

</style>
