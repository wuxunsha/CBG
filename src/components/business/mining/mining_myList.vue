<template>

  <div class="mylist">
      <div class="listTitle">{{$t('feature.mining.text_title')}}</div>

       <div class="listBox">

         <div class="list_type1 flex align between animated fadeIn" v-for="(item,index) in dataList" :key="index" @click="gopage(`/miningDetail?${qsParams(item)}`)">

          <div class="item">
            <!-- <b class=" text_color_dark font16 marginB10">{{item.inNumber}} TB</b> -->
            <b class=" text_color_dark font16 marginB10">{{item.ttype}} 矿池</b>
            <span class="font12 color-gray2">{{$t('feature.mining.text_addTime')}}&nbsp;{{item.addTime}}</span>
          </div>
          <!-- item -->

          <div class="state">
            <span class="color_green font13" v-if="parseFloat(item.unlockNumber) < parseFloat(item.expandNumber)">{{$t('feature.mining.text_ing')}}</span>
            <span class="color_red font13" v-else>{{$t('feature.mining.text_over')}}</span>
            </div>
            <!-- state -->

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
    orderList as getList,
    newOrderList as getOrderList
  } from '../../../data/business';
  import load_statueController from "../../common/load_statueController";
  import {
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    props: ['user'],
    computed: {
      ...mapState(['userInfo']),
      // dataList () {
      //   return [...this.newDataList,...this.oldDataList]
      // }
    },
    data() {
      return {
        query:{
          pageSize:20,
          pageNum:1
        },
        // dataList:[],
        oldDataList:[],
        dataList:[]
      }
    },
    components: {
      load_statueController
    },
    methods: {
      getData(){//获取公告列表
        // getList(this.query).then(v=>{
        //   let {list} = v.data;
        //   list.forEach(v=>this.oldDataList.push(v));
        //   setTimeout(() => {
        //     this.$refs.load_statueController.listen()
        //   }, 10);
        // })
        getOrderList({pageSize:20,pageNum:1,userId:this.userInfo.user.id}).then(v=>{
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
      this.oldDataList = [];
      this.dataList = [];
      this.query.pageNum = 1;
      this.$refs.load_statueController.load_reset()
      this.getData();
    }
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../../styles/walletVal";
  .mylist{
    padding: 10px;
  }
</style>
