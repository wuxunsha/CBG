<template>
  <div>

    <div class="banner">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in bannerArr" :key="index" @click="openLink(item.bcontent)"
          class=" animated fadeIn">
          <img :src="setImgUrl(item.img)" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- banner -->

    <div class="notes border-bottom" v-show="noticeArr.length">

      <van-swipe :autoplay="3000" vertical style="height: 25px;" :show-indicators="false">
         <van-swipe-item v-for="(item,index) in noticeArr" :key="index" class=" animated fadeIn">
          <div class="flex align"  @click="gopage(`/newsDetail?id=${item.id}`)">
            <!-- <div class="title">{{$t('feature.home.text_notes')}}</div> -->
            <div class="note_item ellipse">{{item.title}}</div>
          </div>
          <!-- note_item -->
        </van-swipe-item>
      </van-swipe>

    </div>
    <!-- notes -->

  </div>
</template>

<script>
  import {
    banner_list,
    notice
  } from '../../../data/wallet';
  export default {
    props: ['user'],
    data() {
      return {
        bannerArr: [],
        query: {
          pageSize: 30,
          pageNum: 1,
          type: 'notice'
        },
        noticeArr: []
      }
    },
    methods: {
      geanner() { //获取广告
        banner_list().then(v => {
          this.bannerArr = v.data.list;
        })
      }, //geanner
      arrTrans(num, arr) { //数组转换
        const newArr = [];
        while (arr.length > 0) {
          newArr.push(arr.splice(0, num));
        }
        return newArr;
      }, //arrTrans
      getNotice() {
        notice(this.query).then(v => {
          let {
            list
          } = v.data;
          this.noticeArr = list;
        })
      } //getNotice
    },
    activated() {
        this.geanner();
        this.getNotice();
    }
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../../styles/walletVal";

  .banner {
    min-height: 150px;
    background: rgba(0,0,0,0.05);
    .van-swipe {
      .van-swipe-item {
        img {
          width: 100%;
          height: 100%;
          display: block;
          background: rgba(0, 0, 0, 0.05);
        }
      }
    }
  }

  .notes {
    padding: 15px;

    .title {
      color: $text_color_dark;
      font-size: 12px;
      margin-right: 10px;
    }

    .note_item {
      flex: 1;
      padding: 8px 20px;
      position: relative;
      font-size: 13px;
      color: $them_color_gray;

      &::after {
        content: '';
        position: absolute;
        width: 15px;
        height: 100%;
        left: 0;
        top: 0;
        background: url('../../../assets/wallet/home/首页-公告@2x.png') no-repeat center;
        background-size: 100%;
      }

      // &::before {
      //   content: '';
      //   position: absolute;
      //   width: 20px;
      //   height: 100%;
      //   right: 0;
      //   top: 0;
      //   background: url('../../../assets/net/row.png') no-repeat center;
      //   background-size: 8px;
      //   opacity: 0.5;
      // }
    }
  }

</style>
