<template>
  <div class="new full-height">

    <div class="navBox">
      <van-nav-bar
        :title="`${$t('wallet.news.nav_title')}`"
        fixed
        left-arrow
        @click-left="goback()"
      />
    </div>

    <div class="listBox">
      <div class="search">
        <!-- <van-search v-model="searchValue" placeholder="搜索" @search="onSearch"
    @cancel="onCancel"/> -->
        <van-search
          v-model="query.searchValue"
          show-action
          placeholder="搜索" @clear="clear"
        >
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
      </div>
      <newsItem  v-for="(item,index) in newData" :key="index" :item="item"/>
    </div>


    <load_statueController 
      :dataLength="newData.length" 
      :pageSize="query.pageSize"
      v-on:loadData="loadmore" 
      :pageNum="query.pageNum"
      ref="load_statueController"
      class="loadController"
    />


    <div class="space40"></div>


  </div>
  <!-- index -->
</template>

<script>
  import newsItem from "../../components/wallet/news_item";
  import load_statueController from "../../components/common/load_statueController.vue";
  import {
    mapMutations,
    mapState
  } from 'vuex'
  import {
    notice
  } from '../../data/wallet';

  export default {
    data() {
      return {
        query:{
          pageSize:20,
          pageNum:1,
          type:'notice',
          searchValue: ''
        },
        newData:[]
      }
    },
    components: {
      newsItem,load_statueController
    },
    methods: {
      getNotice(){//获取公告列表
        notice(this.query).then(v=>{
          let {list} = v.data;
          list.forEach(v=>this.newData.push(v));
          setTimeout(() => {
            this.$refs.load_statueController.listen()
          }, 10);
        })
      },
      //加载更多
      loadmore() {
        ++this.query.pageNum;
        this.getNotice();
      },
      onSearch() {
        console.log('开始搜索')
      },
      clear() {
        console.log('删除关键字')
      }
    },
    mounted() {
      this.getNotice();
    } //mounted
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../styles/walletVal";
  .listBox {
    padding: 0 15px;
    .search {
      .van-search {
        padding: 15px 0;
        .van-search__content {
          background: none;
          border: 1px solid #E8E8E8;
          border-radius:4px;
        }
      }

    }
  }
  .loadController{
    margin-top: 40px;
  }
</style>
