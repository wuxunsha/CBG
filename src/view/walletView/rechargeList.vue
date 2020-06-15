<template>
  <div class="assetsbg full-height">

    <div class="navBox">
      <van-nav-bar
        :title="`充值明细`"
        fixed
        left-arrow
        @click-left="goback()"
      />
    </div>

    <div class="space10"></div>


    <div class="assetsBox" v-if="logData.length">

        <div class="list flex align between border-bottom" v-for="(item,index) in logData" :key="index">
            <div class="item">
                <div class="font14" style="margin-bottom:5px;">{{item.coinName}}&nbsp;充值</div>

                <div class="font12 them_color_gray">{{item.addTime}}</div>
            </div>
            <div class="item them_color_yellow font-bold font16">{{item.payAmount}}</div>
        </div>
        <!-- list -->
        
    </div>
    <!-- assetsBox -->

    <load_statueController 
      :dataLength="logData.length" 
      :pageSize="query.pageSize"
      v-on:loadData="loadmore" 
      :pageNum="query.pageNum"
      ref="load_statueController"
      class="loadController"
    />

  </div>
  <!-- index -->
</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex'
  import {
    rechargeList as log
  } from '../../data/wallet';

  import load_statueController from "../../components/common/load_statueController.vue";

  export default {
    data() {
      return {
        query:{
          pageSize:20,
          pageNum:1,
          type:'',
          coinId:null,
          startTime:'',
          endTime:''
        },
        logData:[]
      }
    },
    components: {
      load_statueController
    },
    computed: {
      ...mapState(['userInfo','logTypeArr'])
    },
    methods: {
      getLog(){
        log(this.query).then(v=>{
          let {list} = v.data;
          console.log(list);
          list.forEach(v=>this.logData.push(v));
          console.log(this.logData)
          setTimeout(() => {
            this.$refs.load_statueController.listen()
          }, 10);

        })
      },//getLog
      loadmore() { //加载更多
        ++this.query.pageNum;
        this.getLog();
      }, //loadmore
      getCoinName(id){//获取币种名称
        return this.userInfo.balanceModels.filter(x=>x.coin.id==id)[0].coin.coinName;
      }//getCoinName
    },
    async mounted() {
      this.getLog()
    } //mounted
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../styles/walletVal";
  .loadController{
    margin-top: 30px;
  }
  .assetsBox{
   .list {
       padding: 10px 20px;
       &::after{
           left: 20px;
       }
   }   
  }
</style>
