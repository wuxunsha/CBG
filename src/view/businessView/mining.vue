<template>
  <div class="full-height bg_color_gray">

    <div class="navBox">
      <van-nav-bar
        :title="`${$t('feature.mining.nav_title')}`"
        fixed
      />
    </div>
    
    <mining_header/>

    <mining_myList/>


    <myFooter :footerNavActive="activeType"></myFooter>

   

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
  import myFooter from "../../components/wallet/footer.vue";
  import mining_header from "../../components/business/mining/mining_header.vue";
  import mining_myList from "../../components/business/mining/mining_myList.vue";

  export default {
    data() {
      return {
        activeType: "mining",
        showForm:false
      }
    },
    components: {
      myFooter,mining_header,mining_myList
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapMutations(['setUserInfo']),
      ...mapActions(['actionUserInfo'])
    },
    mounted() {
      // this.actionUserInfo();
    } //mounted
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../styles/walletVal";
</style>
