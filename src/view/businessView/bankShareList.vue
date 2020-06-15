<template>
  <div id="user" class="full-screen">

    <div class="navBox opacity">
      <van-nav-bar
        :title="`${$t('feature.bankShareList.nav_title')}`"
        left-arrow @click-left="goback()" fixed
      />
    </div>

    <div class="earnings">
      <div>
        <p>总收益</p>
        <p>4531.00</p>
        <p @click="gopage(`/shareExtract`)">提取</p>
      </div>
      <div>
        <div>
          <span>团队等级:</span>
          <span>钻石</span>
        </div>
        <div>
          <img src="../../assets/business/user/图层 1 拷贝 5@2x.png" alt="">
        </div>
      </div>
    </div>

    <div class="separate"></div>

    <div class="team-list">
      <div class="summary">
        <div>
          <p>团队总人数</p>
          <p>12</p>
        </div>
        <div>
          <p>推荐收益(USDT)</p>
          <p>4588</p>
        </div>
        <div>
          <p>团队收益(USDT)</p>
          <p>4588</p>
        </div>
      </div>
      <div class="summary-title">
        <div>
          <p>昵称</p>
        </div>
        <div>
          <p>业绩(USDT)</p>
        </div>
        <div>
          <p>贡献收益(USDT)</p>
        </div>
      </div>
      <ul>
        <li>
          <p>阿凡达</p>
          <p>1000000</p>
          <p>200000</p>
        </li>
        <li>
          <p>阿凡达</p>
          <p>1000000</p>
          <p>200000</p>
        </li>
      </ul>

    </div>

    <!-- <div class="user_info flex align between animated fadeIn" v-if="topInfo" style="padding-top:60px;">
        <div class="item">
          <div class=" font18">{{team.myYeJi || '--'}}</div>
          <div class=" font12">{{$t('feature.bankShareList.text_amount')}}</div>
        </div>
        <div class="item">
          <div class=" font18">{{team.total || '--'}}</div>
          <div class=" font12">{{$t('feature.bankShareList.text_number')}}</div>
        </div>
    </div>

    <div class="shareList" v-if="teamList.length">

        <div class=" flex align border-bottom animated fadeIn" v-for="(item,index) in teamList" :key="index">

          <div class="icon">
            <img src="../../assets/business/nav_user.png" alt="">
          </div>

          <div class="info">
            <div class=" font12" style="margin-bottom:5px;">{{item.userName}}
            </div>
            <div class=" font12 color-gray2">{{item.addTime}}</div>
          </div>

          <div class="amout font12">{{$t('feature.bankShareList.text_amount')}}：{{item.userYeji}}</div>

        </div>

    </div> -->

    <!-- <load_statueController 
      :dataLength="teamList.length" 
      :pageSize="query.pageSize"
      v-on:loadData="loadmore" 
      :pageNum="currentPage"
      ref="load_statueController"
      class="loadController"
    /> -->

  </div>
</template>
<script>
import load_statueController from "../../components/common/load_statueController.vue";
  import {
    mapMutations,
    mapState
  } from 'vuex'
  import {
    childList,
    childInfo,
    getTeamInfo
  } from '../../data/business';

  export default {
    computed: {
      ...mapState(['userInfo'])
    },
    data() {
      return {
        child:[],
        topInfo:null,
        query:{
          pageSize:20,
          pageNum:1,
        },
        team:{},
        teamList:[],
        currentPage:1
      }
    },
    components: {
      load_statueController
    },
    methods: {
      getChild(){//获取列表
        childList(this.query).then(v=>{
          v.data.list.forEach((v, k) => {
            this.child.push(v);
          });
          setTimeout(() => {
            // this.$refs.load_statueController.listen()
          }, 10);
        })
      },//getChild
      getTeam (page) {
        getTeamInfo({
          pageSize:20,
          pageNum:page,
          userId: this.userInfo.user.id
        }).then(v=>{
          this.team = v.data
          this.teamList = v.data.list
        })
      },
      getChildInfo(){//获取头部数据
        childInfo().then(v=>{
          this.topInfo = v.data;
        })
      },//getChildInfo
      loadmore() { //加载更多
        // ++this.query.pageNum;
        // this.getChild();
        this.currentPage++
        this.getTeam(this.currentPage)
      }, //loadmore
    },
    created () {
      this.getTeam(1)
    },
    mounted() {
      this.getChild();
      this.getChildInfo();
    } //mounted
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../styles/walletVal";

  #user {
    box-sizing: border-box;
  }

.earnings {
  display: flex;
  width: 100%;
  height: 150px;
  margin-top: 46px;
  > div {
    flex: 1;
  }
  > div:nth-child(1) {
    padding: 25px 15px 0;
    > p:nth-child(1) {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(53,53,53,1);
      margin-bottom: 10px;
    }
    > p:nth-child(2) {
      font-size: 25px;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(86,107,243,1);
      margin-bottom: 10px;
    }
    > p:nth-child(3) {
      width: 112px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      background: linear-gradient(-61deg,rgba(34,239,185,1),rgba(86,107,243,1));
      box-shadow: 0px 4px 9px 0px rgba(68,22,238,0.15);
      border-radius: 2px;
      font-size: 12px;
      font-weight: bold;
      color: rgba(255,255,255,1);
    }
  }
  > div:nth-child(2) {
    width: 100%;
    display: flex;
    height: 100%;
    align-items:center;
    justify-content:center;
    > div:nth-child(1) {
      flex: 1;
      span {
        font-size: 14px;
        font-weight:bold;
        color:rgba(175,175,175,1);
      }
      span:nth-child(2) {
        color:#566BF3;
      }
    }
    > div:nth-child(2) {
      flex: 0.8;
      
      img {
        width:74px;
      }
    }
  }
}

.separate {
  width: 100%;
  height: 5px;
  background: rgba(247,246,251,1);
}

.team-list {
  width: 100%;
  .summary {
    width: 100%;
    height: 60px;
    display: flex;
    align-items:center;
    justify-content:center;
    border-bottom: 1px solid #EBEBEB;
    > div {
      flex: 1;
      text-align: center;
      > p:nth-child(1) {
        font-size: 12px;
        font-weight: 500;
        color: rgba(200,205,211,1);
      }
      > p:nth-child(2) {
        font-size: 12px;
        font-weight: 500;
        color: rgba(52,59,58,1);
      }
    }
    > div:nth-child(2) {
      border-left: 1px solid #EBEBEB;
      border-right: 1px solid #EBEBEB;
    }
  }
  .summary-title {
    width: 100%;
    height: 60px;
    display: flex;
    align-items:center;
    justify-content:center;
    border-bottom: 1px solid #EBEBEB;
    padding: 0 15px;
    > div {
      flex: 1;
      > p {
        font-size: 12px;
        font-weight: 500;
        color: rgba(200,205,211,1);
      }
    }
    > div:nth-child(2) {
      text-align: center;
    }
    > div:nth-child(3) {
      text-align: right;
    }
  }
  ul {
    > li {
      padding: 0 15px;
      display: flex;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #EBEBEB;
      > p {
        flex: 1;
        font-size: 12px;
        font-weight:500;
        color:rgba(53,53,53,1);
      }
      > p:nth-child(2) {
        text-align: center;
      }
      > p:nth-child(3) {
        text-align: right;
      }
    }
  }
}

  // .user_info {
  //   margin-top: 0;
  //   padding: 20px 10px;
  //   position: relative;
  //   background: $them_color_dark;
  //   padding-bottom: 60px;

  //   * {
  //     color: white;
  //   }
  //   >div{
  //     width: 50%;
  //     text-align: center;
  //     .data{
  //       margin-bottom: 10px;
  //     }
  //   }
  // }
  // .shareList{
  //   padding: 20px;
  //   position: relative;
  //   margin-top: -50px;
  //   border-top-right-radius: 20px;
  //   border-top-left-radius: 20px;
  //   background: white;
  //   >.flex{
  //     padding: 15px 0;
  //   }
  //   .icon{
  //     width: 45px;
  //     height: 45px;
  //     border-radius: 100px;
  //     margin-right: 10px;
  //     overflow: hidden;
  //     background: rgba(0,0,0,0.1);
  //     img{
  //       display: block;
  //       width: 100%;
  //       height: 100%;
  //     }
  //   }
  //   .info{
  //     flex: 1;
  //   }
  // }
</style>
