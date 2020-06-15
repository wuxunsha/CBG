<template>
  <div class="headerBg animated fadeIn"   v-if="data">

    <div class=" flex align between" >

      <div class="dataGroup">
        <span>{{$t('feature.mining.text_allTotal')}}</span>
        <b>≈&nbsp;${{data.totalNum}}</b>
      </div>
      <!-- dataGroup -->

      <div class="headerBtn"  @click="gopage('/miningPro')">{{$t('feature.mining.text_btn')}}</div>

    </div>
    <!-- flex -->

    <div class="space10"></div>

    <div class=" flex align">

       <div class="dataGroup">
          <span>{{$t('feature.mining.text_dayIncome')}}</span>
          <b>≈&nbsp;${{data.dayIncome}}</b>
        </div>
        <!-- dataGroup -->
         <div class="dataGroup">
          <span>{{$t('feature.mining.text_allNumber')}}</span>
          <b>≈&nbsp;${{data.allNumber}}</b>
        </div>
        <!-- dataGroup -->

    </div>
    <!-- flex -->
    

  </div>

</template>

<script>
  import {
    poolHeader,
    newPoolHeader
  } from '../../../data/business';
  import {
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    props: ['user'],
    computed: {
      ...mapState(['userInfo']),
    },
    data() {
      return {
        data:{}
      }
    },
    methods: {
      getData(){
        // Promise.all(
        //   poolHeader(),
        //   newPoolHeader(()))
        poolHeader().then(v=>{
          newPoolHeader({userId:this.userInfo.user.id}).then(newData=>{
            this.$set(this.data,'allTotal',v.data.allTotal)
            this.$set(this.data,'allNumber', newData.data.allNumber)
            this.$set(this.data,'dayIncome', newData.data.dayIncome)
            this.$set(this.data,'totalNum', newData.data.totalNum)
          })
        })
      }//getData
    },
    created() {
      this.getData();
    }
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../../styles/walletVal";
</style>
