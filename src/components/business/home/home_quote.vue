<template>
  <div class="quote">
    <h3>{{$t('feature.home.text_recommend')}}</h3>
    <div class="game-type">
      <div>
        <div class="game-image">
          <img src="../../../assets/wallet/home/全民来持股@2x.png" alt="">
        </div>
        <div class="game-box">
          <div class="game-name">
            <p>{{$t('feature.home.text_shareHolding')}}</p>
          </div>
          <div class="game-box-image">
            <!-- <img src="../../../assets/wallet/home/ＧＯ！按钮@2x.png" alt="" @click="shareHolding"> -->
            <span @click="shareHolding">GO !</span>
          </div>
        </div>
      </div>

      <!-- <div>
        <div class="game-image">
          <img src="../../../assets/wallet/home/全民猜涨跌@2x.png" alt="">
        </div>
        <div class="game-box">
          <div class="game-name">
            <p>{{$t('feature.home.text_upsAndDowns')}}</p>
          </div>
          <div class="game-box-image">
            <img src="../../../assets/wallet/home/ＧＯ！按钮@2x.png" alt="">
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex'
  import {
    get_ranks
  } from '../../../data/wallet';

  export default {
    data() {
      return {
        activeType: "quotes",
        rankInfo:[],
        coinsList:['TB','OKB','BNB','HT'],
        USDT_price:0//usdt价格
      }
    },
    methods: {
      get_data(){//获取行情数据
        get_ranks({"unit":"usd"}).catch(v=>{
            // console.log(v);
            let res = v.filter(x=>this.coinsList.indexOf(x.currency)>=0);
            this.USDT_price = v.find(x=>x.currency==='USDT').price;
            this.rankInfo = res;
            // console.log(this.rankInfo)
        })
      },//get_data
      // 跳转全民持股
      shareHolding () {
        this.$router.push('/peopleStock')
      }
    },
    computed: {
      ...mapState(['userInfo']),
      TB_price(){
        let coin = this.userInfo.balanceModels.filter(x=>x.coin.coinName=='TB')
        return coin[0].coin.coinPrice || 0;
      }
    },
    activated() {
      //console.log('//')
      this.get_data();
    } //mounted
  };
</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../../styles/walletVal";
  .quote {
    width: 100%;
    min-height: 350px;
    padding: 0 15px;
    background: #F7F6FB;
    > h3 {
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(53,53,53,1);
    }

    .game-type {
      width: 100%;
      margin-top: 18px;
      > div {
        display: flex;
        width: 100%;
        height: 82px;
        line-height: 82px;
        background: #fff;
        margin-bottom: 10px;
        text-align: center;
        .game-image {
          width: 82px;
          border-right: 1px solid #EBEBEB;
          img {
            width: 65%;
          }
        }
        .game-box {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 0 22px 0 15px;
          .game-name {
            p {
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: bold;
              color: #353535;
            }
          }
          .game-box-image {
            span {
              padding: 4px 20px;
              background: linear-gradient(-61deg,rgba(86,107,243,1),rgba(34,239,185,1));
              box-shadow: 0px 4px 9px 0px rgba(68,22,238,0.15);
              border-radius: 5px;
              font-size: 13px;
              font-family: PingFang SC;
              font-weight: bold;
              color: rgba(255,255,255,1);
            }
          }
        }
      }
    }
  }
</style>
