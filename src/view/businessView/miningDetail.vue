<template>
  <div class="full-height bg_color_gray">

    <div class="navBox">
      <van-nav-bar
        :title="`${$t('feature.miningDetail.nav_title')}`"
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
    resonance
  } from '../../data/business';
  import mining_header from "../../components/business/miningDetail/mining_header.vue";
  import mining_myList from "../../components/business/miningDetail/mining_myList.vue";

  export default {
    data() {
      return {

      }
    },
    components: {
      mining_header,mining_myList
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
    },
    mounted() {
    } //mounted
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../styles/walletVal";
</style>
