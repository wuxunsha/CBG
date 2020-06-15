<template>
  <div>
    <!-- {{`dataLength:${dataLength},pageSize:${pageSize},pageNum:${pageNum},reset:${reset},skeletonArr:${skeletonArr}`}} -->
   
    <div class="noData animated fadeIn"  v-if="loadStatue.nullData"><van-icon name="bookmark-o" />{{$t('wallet.loadController.text_nullData')}}</div>
    <div class="nomore_text animated fadeIn" v-else-if="loadStatue.nomore">{{$t('wallet.loadController.text_nomore')}}</div>
    <div class="moreLoading padding10 animated fadeIn textCenter" v-else-if="loadStatue.moreLoading"><van-loading /></div>
    <div class="skeleton_box" v-else-if="loadStatue.load"><van-skeleton v-for="(item,index) in van_list" :key="index"  :row="3" class="skeleton"/></div>
    <div class="loadmore animated fadeIn" v-else @click="loadmore()">{{$t('wallet.loadController.text_load')}}</div>
  </div>
  <!-- index -->
</template>

<script>
  export default {
    props: ['dataLength','pageSize','pageNum','reset','skeletonArr'],
    data() {
      return{
        loadStatue:{
          nullData:false,
          nomore:false,//没有更多
          load:true,//加载中
          moreLoading:false
        },
        van_list:[1,2]//骨架图数量
      }
    },
    methods: {
      listen(){//监听变化
        // console.log(this.dataLength,this.pageSize)
        if(this.dataLength==0){
          //console.log('//')
          this.loadStatue.nullData = true;
        }
        if( this.dataLength < (this.pageSize * this.pageNum) ){
          this.loadStatue.nomore = true;
        }
        this.loadStatue.load = false;
        this.loadStatue.moreLoading = false;
      },//listen
      loadmore(){//加载更多
        this.$emit('loadData');
        this.loadStatue.moreLoading = true;
      },//loadmore
      load_reset(){//监听重置状态
        //console.log('rest====')
        this.loadStatue = {
            nullData:false,
            nomore:false,//没有更多
            load:true,//加载中
            moreLoading:false
          }
      }//load_reset
    },
    mounted(){
      if(this.skeletonArr)
        this.van_list = this.skeleton_arr;
    },
    watch:{
      data_length(){//监听数据变化
        //this.listen();
      }//data_length
    }//watch
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
.skeleton_box{
  padding-bottom: 20px;
}

.nomore_text,.loading,.loadmore,.noData {
    text-align: center;
    padding: 20px;
    font-weight: normal;
    color: #9e9e9e;
    font-size: 12px;
}

.more_loading {
    text-align: center;
}

.noData {
    text-align: center;
    padding: 20px;
    color: #8f9eab;
    .van-icon {
        opacity: 0.6;
        display: block;
        font-size: 50px;
        margin-top: 30px;
        margin-bottom: 10px;
        &::after {
            display: block;
            font-size: 14px;
            margin-top: 20px;
        }
        &.zh_cn::after {
            content: '暂无数据';
        }
        &.zh_en::after {
            content: 'No Data';
        }
        &.zh_hk::after {
            content: '暫無數據';
        }
    }
    &.table_null {
        margin-top: 20px;
    }
}
.skeleton {
  margin-bottom: 20px;
}
</style>
