<template>
  <div class="orderList full-height" :style="{minHeight:state?'auto':''}">

     <div style="padding:10px 20px;" v-if="!state">
       <walletNav :title="$t('wallet.book.text_withdraw')" left-arrow @clickLeft="goback()" v-if="$route.query.type=='withdraw'"/>
       <walletNav :title="$t('wallet.book.text_recharge')" left-arrow @clickLeft="goback()" v-else-if="$route.query.type=='recharge'"/>
       <walletNav :title="`${$route.query.coinName} ${$t('wallet.book.text_coinName_list')}`" left-arrow @clickLeft="goback()" v-else-if="$route.query.coinName"/>
       <walletNav :title="$t('wallet.book.text_book_list')" left-arrow @clickLeft="goback()" v-else>
         <div class="rightText" @click="showFilter = true"><van-icon name="filter-o" size="20px" />{{$t('wallet.book.text_filter')}}</div>
       </walletNav>
     </div>

      <div class="hisList">

        <HisList v-for="(item,index) in logList" :key="index" :data="item"/>

      </div>
      <!-- hisList -->

       <LoadStatueController
        :dataLength="this.logList.length" 
        :pageSize="this.query.pageSize"
        v-on:loadData="loadmore"
        :pageNum="this.query.pageNum"
        ref="load_statueController"
      />

      <van-popup v-model="showFilter" position="right">
        <div class="filter">
          
          <div class="scroll_box">
              <div class="list_box">
              <div class="f_title font13 them_color_gray">{{$t('wallet.book.text_type_type')}}</div>
              <div class="item_box">
                <span  :class="currType=='reward'?'active':''" @click="setType('reward')">{{$t('wallet.book.text_reward')}}</span>
                <span  :class="currType=='exchange'?'active':''" @click="setType('exchange')">{{$t('wallet.book.text_exchange')}}</span>
                <span  :class="currType=='buy'?'active':''" @click="setType('buy')">{{$t('wallet.book.text_buy')}}</span>
                <span  :class="currType=='mining'?'active':''" @click="setType('mining')">{{$t('wallet.book.text_mining')}}</span>
                <span  :class="currType=='recharge'?'active':''" @click="setType('recharge')">{{$t('wallet.book.text_recharge_status')}}</span>
                <span  :class="currType=='withdraw'?'active':''" @click="setType('withdraw')">{{$t('wallet.book.text_withdraw_status')}}</span>
                <span  :class="currType=='withdraw_return'?'active':''" @click="setType('withdraw_return')">{{$t('wallet.book.text_withdraw_return')}}</span>             
              </div>
            </div>
            <!-- list_box -->

            <div class="list_box">
              <div class="f_title font13 them_color_gray">{{$t('wallet.book.text_choose_coin')}}</div>
              <div class="item_box" v-if="coins">
                <span :class="currCoinId==item.id?'active':''" v-for="(item,index) in coins" :key="index" @click="setCurrCoinId(item.id)">{{item.coinName}}</span>
              </div>
            </div>
            <!-- list_box -->
          </div>
          <!-- scroll_box -->

          <div class="btn_bottom flex align">
            <div class="item" @click="reset()">{{$t('wallet.book.btn_reset')}}</div>
            <div class="item" @click="confirm()">{{$t('wallet.book.btn_confirm')}}</div>
          </div>

         

        </div>
      </van-popup>



  </div>
  <!-- index -->
</template>

<script>
  import {
    log_record
  } from '../../data/wallet';

  import HisList from '../../components/wallet/hisList'
  import LoadStatueController from '../../components/common/load_statueController'
  import {
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    props:['state'],
    data() {
      return {
        showFilter:false,//显示筛选
        logList:[],//记录列表
        query:{
          type:'',
          coinId:'',
          pageSize:30,
          pageNum:1
        },
        currType:null,//当前type
        currCoinId:null,//当前币种
      }
    },
    components:{
      HisList,LoadStatueController
    },
    computed:{
      ...mapState(['userInfo']),
      coins(){
        return this.userInfo.coins
      }
    },
    methods: {
      async getList(){//获取列表

        let {data} = await log_record(this.query);
        // console.log(data);
        if(!data.list) data.list=[];
        data.list.forEach(item=>{this.logList.push(item)})
        setTimeout(() => {
          this.$refs.load_statueController.listen();
        }, 10);

      },//getList
      loadmore(){//加载更多
        ++this.query.pageNum;
        this.getList();
      },//loadmore
      setType(type){//设置当前类型
        //this.currType = type;
        this.currType = this.currType == type? null : type;
      },//setType
      setCurrCoinId(id){//设置当前币种
        this.currCoinId = this.currCoinId == id? null : id;
      },//setCurrCoinId
      reset(){//重置条件
        this.currType = this.currCoinId = null;
      },//reset
      confirm(){//确认筛选
          this.showFilter = false;
          this.logList = [];
          this.query.pageNum = 1;
          this.query.coinId = this.currCoinId ? this.currCoinId : -1;
          this.query.type = this.currType ? this.currType : 'all';
          this.$refs.load_statueController.load_reset();
          this.getList();
      }//confirm
    },
    mounted() {
      if(this.$route.query.type){
        this.query.type = this.$route.query.type;
        this.currType = this.$route.query.type;
      }
      if(this.$route.query.coinId){
        this.query.coinId = this.currCoinId = this.$route.query.coinId
      }
      this.getList();
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
.filter{
  background: white;
  padding: 20px;
  height: 100vh;
  max-width: 70vw;
  min-width: 200px;
  position: relative;
  .btn_bottom{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    .item{
      width: 50%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      &:nth-child(1){
        background: $them_color_gray;
        color: white;
      }
      &:nth-child(2){
        background: $them_color_dark;
        color: white;
      }
    }
  }
  .scroll_box{
    height: calc(100vh - 100px);
    overflow-y: auto;
  }
  .list_box{
    margin-bottom: 10px;
    padding: 20px 0;
    .f_title{
      margin-bottom: 20px;
    }
    .item_box{
      span{
        display: inline-block;
        min-width: 90px;
        padding: 5px 0;
        text-align: center;
        border: 1px solid $them_color_gray_light;
        margin-bottom: 20px;
        color: $them_color_gray;
        font-size: 12px;
        margin-right: 10px;
        border-radius: 2px;
        &.active{
          border: 1px solid $them_color;
          //color: $them_color;
          background: $them_color;
          color: white;
        }
      }
    }
  }
}
</style>
