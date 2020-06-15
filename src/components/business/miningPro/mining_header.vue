<template>
  <div class="headerBg">
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
  .headerBg{
    background: url('../../../assets/business/mining_bg.jpg');
    height: 150px;
    background-size: 100% 100%;
  }
</style>
