<template>
  <div id="feedback" class="feedback">

    <div class="padding20">
      <walletNav :title="$t('wallet.feedback.nav_title')" left-arrow @clickLeft="goback()" />
    </div>
    <!-- <van-nav-bar title="意见反馈" left-arrow fixed @click-left="goback()" />
    <div class="space60"></div> -->


    <div class="item_bg_dark form_box" style="padding:0px 20px;">
      <div class="them_form">
        <div class="input_gorup">
          <textarea name="" :placeholder="$t('wallet.feedback.input_text')" id="" cols="30" rows="3"
            v-model="feedback" @blur="blur_event()"></textarea>
        </div>
        <van-button type="info" @click="submit()">{{$t('wallet.feedback.btn_text')}}</van-button>
        <div class="space10"></div>
      </div>
      <!-- them_form -->

    </div>
    <!-- recharge_info -->

    <div class="space20 bg_color_gray"></div>

    <div class="item_box animated fadeIn padding20" v-if="feedback_list.length">
      <div class="font15 text_color_dark font-bold">{{$t('wallet.feedback.text_title')}}</div>

      <div class="space30"></div>

      <div class="list" :class="item.isReply=='N'?'':'right'" v-for="(item,index) in feedback_list" :key="index">

        <div class="title" v-if="item.isReply=='N'">
          <b class="them_color_gray">{{$t('wallet.feedback.text_my')}} </b>
          &nbsp;&nbsp;<small class="them_color_gray_light">{{item.addTime}}</small>
        </div>

        <div class="title" v-else>
          <small class="them_color_gray_light">{{item.addTime}}</small> &nbsp;&nbsp;
          <b class="them_color_gray">{{$t('wallet.feedback.text_reply')}}</b>
        </div>
        
        <div class="talk">{{item.content}}</div>

      </div>
      <!-- list -->

    </div>
    <!-- list_box -->

    <load_statueController 
      :dataLength="feedback_list.length" 
      :pageSize="query.pageSize"
      v-on:loadData="loadmore" 
      :pageNum="query.pageNum"
      ref="load_statueController"
      v-show="feedback_list.length">
    </load_statueController>

  </div>
  <!-- index -->
</template>

<script>
  import {
    mapMutations
  } from 'vuex'
  import load_statueController from "../../components/common/load_statueController.vue";
  import {
    send_feedback,
    feedback_list
  } from '../../data/wallet';
  import {
    Toast
  } from 'vant';
  export default {
    data() {
      return {
        feedback: null,
        query: {
          pageNum: 1,
          pageSize: 30
        },
        feedback_list: []
      }
    },
    components: {
      load_statueController
    },
    methods: {
      ...mapMutations(['setCheck_read']),
      submit() {
        if (!this.feedback) {
          Toast(this.$t('wallet.feedback.toast_text'))
          return false;
        }
        send_feedback({
          "content": this.feedback
        }).then(v => {
          Toast.success(v.message);
          this.feedback = null;
          setTimeout(() => {
            this.reset_query();
            this.get_list('reset');
          }, 500);
        })
      }, //submit
      get_list(reset) { //获取反馈列表
        this.feedback_list = [];
        feedback_list(this.query).then(v => {
          //console.log(v);
          v.data.list.forEach((v, k) => {
            this.feedback_list.push(v);
          });
          setTimeout(() => {
            this.$refs.load_statueController.listen()
          }, 10);
        })
      }, //get_list
      reset_query() { //重置
        this.query.pageNum = 1;
        this.feedback_list = [];
        this.$refs.load_statueController.load_reset()
      }, //reset_query
      loadmore() { //加载更多
        ++this.query.pageNum;
      }, //loadmore
      read_feedback() { //已读消息
        read_feedback().then(v => {
          this.setCheck_read(false);
        })
      }, //read_feedback
    },
    mounted() {
      this.get_list();
    }, //mounted
    watch: {
      query: {
        handler: function (newVal, oldVal) {
          this.get_list()
        },
        deep: true
      } //query
    } //watch
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../styles/walletVal";

  #feedback {
    .form_box {
      textarea {
        display: block;
        width: 100%;
        overflow: hidden;
        margin-bottom: 20px;
        background: rgba(0, 0, 0, 0.06);
        border-radius: 4px;
        outline: none;
        padding: 20px;
        border: none;
      }

      .van-button {
        width: 100%;
      }
    }
  }

  .feedback {
    .list {
      margin-bottom: 20px;

      &.right {
        text-align: right;
      }

      .talk {
        background: $them_color_bgGray;
        display: inline-block;
        padding: 8px 10px;
        border-radius: 2px;
      }

      .title {
        margin-bottom: 10px;

        b {
          font-size: 13px;
        }

        small {
          font-size: 10px;
        }
      }
    }
  }

</style>
