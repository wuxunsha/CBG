<template>
  <div class="full-height bg_color_gray">

    <div class="navBox">
      <van-nav-bar
        :title="`${$t('feature.bankOrder.nav_title')}`"
        fixed
        left-arrow @click-left="goback()"
      />
    </div>

    <List/>
  

  </div>
  <!-- index -->
</template>

<script>
  import {
    mapMutations,
    mapState,
    mapActions
  } from 'vuex'
  import {
    userInfo
  } from '../../data/wallet';
  import List from "../../components/business/bankOrder/list.vue";

  export default {
    data() {
      return {

      }
    },
    components: {
      List
    },
    mounted() {

    } //mounted
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../styles/walletVal";
</style>
