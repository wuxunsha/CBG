<template>
  <div class="full-height bg_color_gray">

    <div class="navBox">
      <van-nav-bar
        :title="`${$t('feature.bankBuy.nav_title')}`"
        fixed
        left-arrow @click-left="goback()"
      />
    </div>
    
    <bankBuy_header :proInfo="this.$route.query"/>
    
    <bankBuy_form :proInfo="this.$route.query"/>


   

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
  import bankBuy_header from "../../components/business/bankBuy/bankBuy_header.vue";
  import bankBuy_form from "../../components/business/bankBuy/bankBuy_form.vue";

  export default {
    data() {
      return {
        activeType: "mining",
        showForm:false,
        proInfo:null,//产品信息
      }
    },
    components: {
      bankBuy_header,bankBuy_form
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapMutations(['setUserInfo']),
      ...mapActions(['actionUserInfo'])
    },
    mounted() {
    } //mounted
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../styles/walletVal";
</style>
