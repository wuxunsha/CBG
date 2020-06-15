<template>
  <div class="full-height">

    <!-- <div class="navBox">
      <van-nav-bar
        :title="`${$t('feature.assets.nav_title')}`"
        fixed
      />
    </div> -->
    
    <asstes_header/>

    <asstes_myList/>


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
  import asstes_header from "../../components/business/asstes/asstes_header.vue";
  import asstes_myList from "../../components/business/asstes/asstes_myList.vue";

  export default {
    data() {
      return {
        activeType: "assets",
        showForm:false
      }
    },
    components: {
      myFooter,asstes_header,asstes_myList
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapMutations(['setUserInfo']),
      ...mapActions(['actionUserInfo'])
    },
    activated() {
      this.actionUserInfo();
    } //mounted
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../styles/walletVal";
</style>
