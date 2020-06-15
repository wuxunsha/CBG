<template>
  <div class="full-height bg_color_gray">

    <div class="navBox">
      <van-nav-bar
        :title="`${$t('feature.bank.nav_title')}`"
        fixed
        left-arrow @click-left="goback()"
      />
    </div>
    
    <bank_header/>
    
    <bank_list/>


   

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
  import bank_header from "../../components/business/bank/bank_header.vue";
  import bank_list from "../../components/business/bank/bank_list.vue";

  export default {
    data() {
      return {
        activeType: "mining",
        showForm:false
      }
    },
    components: {
      bank_header,bank_list
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
