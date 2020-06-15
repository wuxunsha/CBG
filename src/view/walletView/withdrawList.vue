<template>
  <div class="assetsbg full-height">

    <div class="navBox">
      <van-nav-bar
        :title="`提现明细`"
        fixed
        left-arrow
        @click-left="goback()"
      />
    </div>

    <div class="space10"></div>


    <div class="assetsBox">

         <div class="list_type1 border-bottom" v-for="(item,index) in logData" :key="index">

            <div class=" flex align between">
             <div class="font14 color-gray2">提现金额</div>
             <div class="font18 color_red font-bold">{{item.amount}} {{item.coinName}}</div>
           </div>

           <div class=" flex align between">
             <div class="font14 color-gray2">收益状态</div>
             <div class="font14 color_green" v-if="item.state == 'application'">申请中</div>
             <div class="font14 color_red" v-else-if="item.state == 'withdrawal'">提现中</div>
             <div class="font14 color_red" v-else-if="item.state == 'fail'">提现失败</div>
             <div class="font14 color_green" v-else-if="item.state == 'success'">已完成</div>
             <div class="font14 color_red" v-else>未知状态</div>
           </div>

            <div class=" flex align between">
             <div class="font14 color-gray2">手续费</div>
             <div class="font14">{{item.fee}}</div>
           </div>

            <div class=" flex align between">
             <div class="font14 color-gray2">备注信息</div>
             <div class="font14">{{item.msg || '--'}}</div>
           </div>

           <div class=" flex align between">
             <div class="font14 color-gray2">TXID</div>
             <div class="font14 copycode" :data-clipboard-text="item.txId" @click="copy" >{{item.txId || '--'}} &nbsp;&nbsp;<i class="copyIcon"></i></div>
           </div>


           <div class=" flex align between">
             <div class="font14 color-gray2">提现时间</div>
             <div class="font14">{{item.addTime}}</div>
           </div>

            <div class=" flex align between">
             <div class="font14 color-gray2">确认时间</div>
             <div class="font14">{{item.handleTime}}</div>
           </div>

        </div>
        <!-- list_type1 -->
        
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
import Clipboard from 'clipboard';
  import {
    mapMutations,
    mapState
  } from 'vuex'
  import {
    withdrawList as log
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
        return this.userInfo.balanceModels.filter(x=>x.coin.id==id)[0].coin.coinName;
      },//getCoinName
      copy() { //复制
        var clipboard = new Clipboard('.copycode')
        clipboard.on('success', e => {
          Toast(this.$t('wallet.common.toast_copy_ok'))
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          Toast(this.$t('wallet.common.toast_copy_fail'))
          clipboard.destroy()
        })
      }//copy
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
