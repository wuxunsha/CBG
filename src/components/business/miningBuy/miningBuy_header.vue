<template>
  <div class="headerBg">

    <div class="flex align" style="margin:20px 0;">

      <div class="dataGroup textLeft">
        <div class="font14">T{{$route.query.id}}{{$t('feature.miningBuy.text_mining')}}</div>
        <div class="space10"></div>
        <div class="font17">{{info.number}} TB</div>
      </div>
      <!-- dataGroup -->

      <div class="dataGroup textRight">
        <!-- <div class="font14">{{$t('feature.miningBuy.text_proportion')}}</div>
        <div class="space10"></div>
        <div class="font17">{{toFixed_4(parseFloat(info.proportion)*100)}}%</div> -->
      </div>
      <!-- dataGroup -->

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
    props: ['info'],
    data() {
      return {

      }
    },
    methods: {
      
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
  }
</style>
