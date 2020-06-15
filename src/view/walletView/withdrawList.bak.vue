<template>
  <div class="orderList full-height bg_color_gray">

      <van-nav-bar
        title="提币记录"
        left-arrow
        fixed
        @click-left="goback()"
        right-text="全部"
        @click-right="select()"
      />

      <div class="space50"></div>

      <div class="padding10">
        <div class="res-list item-radius-shadow" v-for="(item,index) in [1,2,3,4,5]" :key="index">

          <div class=" flex align between marginB10">
            <div class="title them_color_gray font11">提币状态</div>
            <div class="info font12 text_color_dark"><van-tag plain type="primary">确认中</van-tag></div>
          </div>
          
          <div class=" flex align between">
            <div class="title them_color_gray font12">提币金额</div>
            <div class="info text_color_dark">
              <b class="font-bold font17 them_color">5550.00 USDT</b>
            </div>
          </div>

          <div class=" flex align between">
            <div class="title them_color_gray font12">提币时间</div>
            <div class="info  font12 them_color_gray">2019-11-11 11:11</div>
          </div>

          <div class=" flex align between">
            <div class="title them_color_gray font12">提币地址</div>
            <div class="info  font12 them_color_gray">OXHGDSHFGU545454545</div>
          </div>

        </div>
        <!-- res-list -->

      </div>



  </div>
  <!-- index -->
</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    data() {
      return {

      }
    },
    components:{

    },
    methods: {
      ...mapMutations(['setUserInfo']),
    },
    computed: {
      ...mapState(['userInfo'])
    },
    mounted() {
    } //mounted
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
 @import "../../styles/walletVal";
.res-list{
  margin-bottom: 20px;
  padding: 10px 20px;
  &>div{
    line-height: 1.8em;
  }
}
</style>
