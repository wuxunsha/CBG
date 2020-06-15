<template>
  <div class="full-height bg_color_gray">

    <div class="navBox">
      <van-nav-bar
        :title="`${$t('feature.miningBuy.nav_title')}`"
        fixed
        left-arrow @click-left="goback()"
      />
    </div>
    
    <miningBuy_header :info="$route.query"/>
    
    <miningBuy_form :id="$route.query.id"/>


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
  import miningBuy_header from "../../components/business/miningBuy/miningBuy_header.vue";
  import miningBuy_form from "../../components/business/miningBuy/miningBuy_form.vue";

  export default {
    data() {
      return {
        activeType: "mining",
        showForm:false
      }
    },
    components: {
      miningBuy_header,miningBuy_form
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
