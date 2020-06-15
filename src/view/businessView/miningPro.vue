<template>
  <div class="full-height bg_color_gray">

    <div class="navBox">
      <van-nav-bar
        :title="`${$t('feature.miningPro.nav_title')}`"
        fixed
        left-arrow @click-left="goback()"
      />
    </div>
    
    <mining_header/>

    <mining_myList/>


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
  import mining_header from "../../components/business/miningPro/mining_header.vue";
  import mining_myList from "../../components/business/miningPro/mining_myList.vue";

  export default {
    data() {
      return {
        activeType: "mining",
        showForm:false
      }
    },
    components: {
      mining_header,mining_myList
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
