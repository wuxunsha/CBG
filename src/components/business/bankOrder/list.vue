<template>

  <div class="mylist">

       <div class="listBox">

         <div class="list_type1 animated fadeIn" v-for="(item,index) in dataList" :key="index">

            <div class=" flex align between">
             <div class="font14 color-gray2">{{$t('feature.bankOrder.text_amount')}}</div>
             <div class="font18 color_red font-bold">{{item.amount}} {{item.coinName}}</div>
           </div>

           
           <div class=" flex align between">
             <div class="font14 color-gray2">{{$t('feature.bankOrder.text_lockDay')}}</div>
             <div class="font14">{{item.lockDay}}{{$t('feature.bankOrder.text_day')}}</div>
           </div>

           <div class=" flex align between">
             <div class="font14 color-gray2">{{$t('feature.bankOrder.text_productRate')}}</div>
             <div class="font14">{{toFixed_4( parseFloat(item.productRate) )}}%</div>
           </div>

           <div class=" flex align between">
             <div class="font14 color-gray2">{{$t('feature.bankOrder.text_statue')}}</div>
             <div class="font14 color_green" v-if="parseFloat(item.unlockAmount)<=0">{{$t('feature.bankOrder.text_ing')}}</div>
             <div class="font14 color_red" v-else>{{$t('feature.bankOrder.text_over')}}</div>
           </div>

            <div class=" flex align between" v-if="parseFloat(item.unlockAmount)>0">
             <div class="font14 color-gray2">{{$t('feature.bankOrder.text_unlockAmount')}}</div>
             <div class="font18 font-bold color_green">{{toFixed_4 ( parseFloat(item.unlockAmount) ) }}</div>
           </div>

           <div class=" flex align between">
             <div class="font14 color-gray2">{{$t('feature.bankOrder.text_addTime')}}</div>
             <div class="font14">{{item.addTime}}</div>
           </div>


        </div>
        <!-- list_type1 -->

       </div>
       <!-- listBox -->
       

       <load_statueController 
      :dataLength="dataList.length" 
      :pageSize="query.pageSize"
      v-on:loadData="loadmore" 
      :pageNum="query.pageNum"
      ref="load_statueController"
      class="loadController"
    />

  </div>

</template>

<script>
  import {
    bankOrderList as getList
  } from '../../../data/business';
  import load_statueController from "../../common/load_statueController";
  export default {
    props: ['user'],
    data() {
      return {
        query:{
          pageSize:20,
          pageNum:1
        },
        dataList:[]
      }
    },
    components: {
      load_statueController
    },
    methods: {
      getData(){//获取公告列表
        getList(this.query).then(v=>{
          let {list} = v.data;
          list.forEach(v=>this.dataList.push(v));
          setTimeout(() => {
            this.$refs.load_statueController.listen()
          }, 10);
        })
      },//getNotice
      loadmore() { //加载更多
        ++this.query.pageNum;
        this.getData();
      }, //loadmore
    },
    mounted() {
      this.getData();
    }
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../../styles/walletVal";
  .mylist{
    padding: 10px;
    .list_type1{
      >div{
        margin-bottom: 5px;
      }
    }
  }
</style>
