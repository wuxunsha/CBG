<template>

  <div class="mylist">
      <div class="listTitle">{{$t('feature.miningPro.text_listTitle')}}</div>

      <div class="listBox">

        <div class="list_type1 list_pro flex align between animated fadeIn" style="padding-top:25px;" v-for="(item,index) in dataList" :key="index" @click="gopage(`/miningBuy?${qsExchange(item)}`)">

         <div class="item">
           <div class="font15 marginB10">
             <span>T{{item.id}}{{$t('feature.miningPro.text_mining')}}</span>&nbsp;&nbsp;<b>{{item.number}}&nbsp;TB</b>
           </div>
           <!-- <span class="font12 color-gray2">{{$t('feature.miningPro.text_proportion')}}&nbsp;&nbsp;<b class="font16 them_color">{{toFixed_4(parseFloat(item.proportion)*100)}}%</b></span> -->
         </div>
         <!-- item -->

         <div class="state">
           <span class="them_btn" style="padding:5px 15px;">{{$t('feature.miningPro.btn_submit')}}</span>
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
    getPoolList as getList
    // poolList as getList
  } from '../../../data/business';
  import load_statueController from "../../common/load_statueController";
  import qs from 'qs';
  import {
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    props: ['user'],
    computed:{
      ...mapState(['userInfo']),
    },
    data() {
      return {
        query:{
          pageSize:20,
          pageNum:1,
          userId:''
        },
        dataList:[]
      }
    },
    components: {
      load_statueController
    },
    methods: {
      getData(){//获取公告列表
        this.query.userId = this.userInfo.user.id
        getList(this.query).then(v=>{
          let list = v.data.list;
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
      qsExchange(params){
        return qs.stringify(params)
      }//qsExchange
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
  }
</style>
