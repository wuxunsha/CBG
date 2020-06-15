<template>
  <div class="headerBg animated fadeIn" v-if="data">

    <div class=" flex align">

      <div class="dataGroup textCenter">
        <span>{{$t('feature.bank.text_totalAmount')}}</span>
        <b style="font-size:20px;">≈&nbsp;${{data.totalAmount}}</b>
      </div>
      <!-- dataGroup -->

    </div>
    <!-- flex -->

    <div class="space20"></div>

    <div class=" flex align textCenter">
       <div class="dataGroup">
          <span>{{$t('feature.bank.text_totalIncome')}}</span>
          <b style="font-size:16px;">≈&nbsp;${{data.totalIncome}}</b>
        </div>
        <!-- dataGroup -->
         <div class="dataGroup textCenter">
          <span>{{$t('feature.bank.text_dayIncome')}}</span>
          <b style="font-size:16px;">≈&nbsp;${{data.dayIncome}}</b>
        </div>
        <!-- dataGroup -->
    </div>
    <!-- flex -->
    

  </div>

</template>

<script>
  import {
    productInfo
  } from '../../../data/business';
  export default {
    props: ['user'],
    data() {
      return {
        data:null
      }
    },
    methods: {
      getData(){
        productInfo().then(v=>{
          console.log(v)
          this.data = v.data;
        })
      }//getData
    },
    mounted() {
      this.getData();
    }
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../../styles/walletVal";
</style>
