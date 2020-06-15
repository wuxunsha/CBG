<template>
  <div class="headerBg">

    <div class="flex align between" v-if="proInfo">

      <div class="dataGroup style2">
        <div class="marginB10">{{typeObj[proInfo.inNumber]}}{{$t('feature.miningDetail.text_mining')}} {{proInfo.inNumber}} TB</div>
        <div>{{$t('feature.miningDetail.text_unlockNumber')}} <b>≈&nbsp;${{proInfo.unlockNumber}}</b></div>
        <div>{{$t('feature.miningDetail.text_dayProportion')}} <b>≈&nbsp;${{toFixed_4 ( parseFloat(proInfo.dayProportion)*0.9*0.05 * parseFloat(proInfo.inNumber) )}}</b></div>
      </div>
      <!-- dataGroup -->

      <div class="state textRight">
        <div class="headerBtn" @click="gopage(`/assetsDetail_v2?type=9`)">{{$t('feature.miningDetail.text_assetsDetail')}}</div>
        <div class=" font12 marginT10">{{$t('feature.miningDetail.text_statue')}}：
          <b v-if="parseFloat(proInfo.unlockNumber) < parseFloat(proInfo.expandNumber)">{{$t('feature.miningDetail.text_ing')}}</b>
          <b v-else>{{$t('feature.miningDetail.text_over')}}</b>
        </div>
      </div>
      <!-- state -->

    </div>
    <!-- flex -->
    

  </div>

</template>

<script>
  import {
    banner_list,
    notice
  } from '../../../data/wallet';
  export default {
    props: ['user'],
    data() {
      return {
        proInfo:null,
        typeObj:{
          2000: 'T1',
          20000:'T2',
          100000: 'T3',
          200000: 'T4'
        }
      }
    },
    methods: {
      
    },
    mounted() {
      this.proInfo = this.$route.query;
      console.log(this.proInfo)
    }
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../../styles/walletVal";
</style>
