<template>
  <div class="assetsbg full-height">

    <div class="navBox">
      <van-nav-bar
        :title="`${$t('feature.assetsDetail_v2.nav_title')}`"
        fixed
        left-arrow
        @click-left="goback()"
      />
    </div>

    <div class="space10"></div>


    <div class="assetsBox">

        <div class="list flex align between border-bottom" v-for="(item,index) in logData" :key="index">
            <div class="item">
                <div class="font14" style="margin-bottom:5px;">{{logTypeArr[item.type]}}</div>

                <div class="font12 them_color_gray">{{item.addTime}}</div>
            </div>
            <div class="item textRight">
              <div :class="item.type === 1 ? 'them_color_LightGreen font-bold font16' : item.type === 2 ? 'them_color_dark font-bold font16' : 'them_color_yellow font-bold font16'">{{item.amount>0?`+${item.amount}`:item.amount}} {{getCoinName(item.coinId)}}</div>
              <div class="font12" v-if="item.type==3 && item.amount>0" style="margin-top:10px;">{{$t('feature.assetsDetail_v2.text_out')}}: {{item.producer}}</div>
              <div class="font12" v-if="item.type==3 && item.amount<0" style="margin-top:10px;">
                <div style="margin-bottom:5px;">{{$t('feature.assetsDetail_v2.text_in')}}: {{item.producer.split('|')[0]}}</div>
                <div>{{$t('feature.assetsDetail_v2.text_fee')}}: {{item.producer.split('|')[1]}} {{getCoinName(item.coinId)}}</div>
              </div>
            </div>
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
    log,
    logType
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
       ...mapMutations(['setLogTypeArr']),
      getLog(){
        log(this.query).then(v=>{
          // console.log(v);
          let {list} = v.data;
          list.forEach(v=>this.logData.push(v));
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
        let coin = this.userInfo.balanceModels.filter(x=>x.coin.id==id)
        return coin[0].coin.coinName;
      }//getCoinName
    },
    async mounted() {
      // console.log(this.$route.query)
      if(this.$route.query.id)
        this.query.coinId = this.$route.query.id;

      if(this.$route.query.type)
        this.query.type = this.$route.query.type;
        
      if(!this.logTypeArr){
        let {data} =  await logType();
        this.setLogTypeArr(data);
      }

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
