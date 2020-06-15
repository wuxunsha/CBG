<template>
  <div id="home" class="full-height">

    <div class="navBox">
      <!-- <van-nav-bar
        :title="`${$t('feature.home.nav_title_home')}`"
        fixed=""
      /> -->
      <!-- <van-nav-bar
        title="CB GAME"
        fixed=""
      /> -->
      <img src="./../../assets/wallet/home/首页-TBGAME@2x.png" alt="">
    </div>

    <home_banner/>

    <home_quote/>

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
  import home_banner from "../../components/business/home/home_banner.vue";
  // import home_menu from "../../components/business/home/home_menu.vue";
  import home_quote from "../../components/business/home/home_quote.vue";
  

  export default {
    data() {
      return {
        activeType: "home",
        showForm:false
      }
    },
    components: {
      myFooter,home_banner,home_quote
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapMutations(['setUserInfo']),
      ...mapActions(['actionUserInfo'])
    },
    mounted() {
      this.actionUserInfo();
    } //mounted
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
@import "../../styles/walletVal";
.navBox {
  background:linear-gradient(-61deg,rgba(34,239,185,1),rgba(86,107,243,1));
  box-shadow:0px 4px 9px 0px rgba(68,22,238,0.15);
  text-align: center;
  line-height: 46px;
  img {
    width: 40%;
  }
}
</style>
