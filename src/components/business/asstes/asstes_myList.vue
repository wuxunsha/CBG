<template>

  <div class="mylist">

    <p class="asset-list-title">{{$t('feature.assets.text_list')}}</p>

    <div class="asset-list">
      <ul>
        <li v-for="(item, index) in balanceList" :key="index">
          <div class="asset-list-top">
            <img :src="item.coinId === '1001' ? require('./../../../assets/wallet/asstes/USDT.png') : item.coinId === '1002' ? require('./../../../assets/wallet/asstes/CBK.png') : item.coinId === '1003' ? require('./../../../assets/wallet/asstes/CBG.png') : require('./../../../assets/wallet/asstes/BTC.png')" alt="">
            <span>{{item.coinId === '1001' ? 'USDT' : item.coinId === '1002' ? 'CBK' : item.coinId === '1003' ? 'CBG' : 'BTC'}}</span>
            <span>领取</span>
          </div>
          <div class="list-name">
            <p>{{$t('feature.assets.text_available')}}</p>
            <p>{{$t('feature.assets.text_freeze')}}</p>
            <p>{{$t('feature.assets.text_crowdfunding')}}</p>
          </div>
          <div class="asset-sum">
            <p>{{financial(item.lastBalance)}}</p>
            <p>{{financial(item.freezemoney)}}</p>
            <p>{{financial(item.zcfund)}}</p>
          </div>
        </li>
      </ul>
    </div>

  </div>

</template>

<script>
import {
  mapMutations,
  mapState
} from 'vuex'
import {
  TBListfund
} from '../../../data/wallet';
export default {
  props: ['user'],
  data() {
    return {
      token: null,
      // 资产列表
      balanceList: null
    }
  },
  created() {
    this.getToken()
  },
  methods: {
    getToken() {
      this.$http.get(this.$lib.host + 'util/gettoken', {
        params: {
          token_: this.$store.state.newToken
        }
      }).then(res => {
        if (res.code == 200) {
          this.getNewToken(res.data.token_)
        }
      })
    },
    getNewToken(token) {
      let data = {
        account: this.$store.state.user.uid,
        password: this.$store.state.user.password,
        token_: token
      }
      this.$http.post(this.$lib.host + 'otc/login', this.qsParams(data)).then(res => {
        if (res.code == 200) {
          this.token = res.data.token_
          this.getBalanceAll()
        }
      })
    },
    // 获取资产列表信息
    getBalanceAll() {
      // let res = this.userInfo.balanceModels.map(v=>{
      //     v.text = `${v.coin.coinName}(${this.$t('feature.transfer.text_balance')}${v.amount})`
      //     return v;
      // }).filter(v=>v.coin.transfer=='Y');
      // this.balanceList = res
      // console.log(this.balanceList)
      TBListfund({token_: this.token}).then(res => {
        if (res.code === '200') {
          this.balanceList = res.data
        }
      })
    },
    // 保留小数点
    financial(x) {
      return Number.parseFloat(x).toFixed(3)
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted() {
    // console.log(this.$store.state.user)
  }
};

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../../styles/walletVal";
  .mylist{
    .asset-list-title {
      width: 100%;
      height: 54px;
      line-height: 54px;
      padding-left: 15px;
      font-size: 16px;
      font-weight: bold;
      color: rgba(53,53,53,1);
      border-bottom: 8px solid #f3f4f6;
    }
    .asset-list {
      width: 100%;
      background: #fff;
      margin-top: 6px;
      padding: 0 15px 8px;
      > ul {
          li {
          padding: 10px 0;
          border-bottom: 1px solid #EBEBEB;
        }
      }
      .asset-list-top {
        width: 100%;
        height: 24px;
        img {
          display: inline-block;
          height: 24px;
          width: 24px;
          vertical-align: bottom;
        }
        span {
          font-size: 14px;
          font-weight: bold;
          color: rgba(53,53,53,1);
        }
        > span:nth-child(3) {
          float: right;
          display: inline-block;
          padding: 4px 10px;
          background:rgba(86,107,243,1);
          box-shadow: 0px 4px 9px 0px rgba(68,22,238,0.15);
          border-radius: 5px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255,255,255,1);
        }
      }
      .list-name {
        display: flex;
        justify-content: space-between;
        margin-top: 14px;
        p {
          flex: 1;
          font-size: 12px;
          font-weight: 500;
          color: rgba(200,205,211,1);
        }
        p:nth-child(2)  {
          text-align: center;
        }
        p:nth-child(3)  {
          text-align: right;
        }
      }
      .asset-sum {
        display: flex;
        justify-content: space-between;
        margin-top: 14px;
        p {
          flex: 1;
          font-size: 14px;
          font-weight: bold;
          color: rgba(53,53,53,1);
        }
         p:nth-child(2)  {
          text-align: center;
        }
        p:nth-child(3)  {
          text-align: right;
        }
      }
    }
  }
</style>
