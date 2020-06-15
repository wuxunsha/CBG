<template>
    <div v-if="currCoin">

        <div class="token_choose">
            <div class="token_name flex between align"
                 @click="showList = true">
                <b class="font16 font-bold">
                    <!-- <img :src="currCoin.coin.coinName === 'USDT' ? require('../../assets/wallet/asstes/USDT.png') : currCoin.coin.coinName === 'CBK' ? require('../../assets/wallet/asstes/CBK.png') : currCoin.coin.coinName === 'CBG' ? require('../../assets/wallet/asstes/CBG.png') : require('../../assets/wallet/asstes/BTC.png')" alt=""> -->
                    {{currCoin.coin.coinName}}
                </b>
                <small class="them_color_gray">
                    <van-icon name="arrow" /></small>
            </div>
        </div>
        <!-- token_choose -->

        <!-- <div class="token_choose flex align">
      <div class="token_type active">{{netWorkType(currCoin.coin.netWork)}}</div>
    </div> -->
        <!-- token_choose -->

        <van-popup v-model="showList"
                   position="right">
            <div class="coinsList">
                <div class="item border-bottom"
                     :class="item.coin.coinName==currCoin.coin.coinName?'active':''"
                     v-for="(item,index) in coinsArr"
                     :key="index"
                     @click="chooseCoin(item)">{{item.coin.coinName}}</div>
            </div>
        </van-popup>
        <!-- showList -->

    </div>
</template>


<script>
import {
    recharge_address
} from '../../data/wallet';
import { Swipe } from 'vant';
export default {
    props: ['defaultId', 'type'],
    data() {
        return {
            currSys: null,
            currCoin: null,
            showList: false,
            coinsArr: null//币种列表
        }
    },
    methods: {
        netWorkType(netWork) {
            let netWorkType = netWork.toUpperCase();
            let type;
            switch (netWorkType) {
                case 'EOS':
                    type = 'EOS'
                    break;
                case 'ETH':
                    type = 'ERC-20'
                    break;
                case 'BTC':
                    type = 'Omni'
                    break;
                case 'USDT':
                    type = 'Omni'
                    break;
                default:
                    type = netWork
                    break;
            }
            return type;
        },
        filterType(data) {//筛选不可充提币种
            let resdata;
            if (this.type == 'recharge') {
                resdata = data.filter(x => Boolean(x.coin.closeRecharge == 'N'));
            } else {
                resdata = data.filter(x => Boolean(x.coin.closeWithdraw == 'N'));
            }
            return resdata;
        },//filterType
        async getCoinsInfo() {
            let { data } = await recharge_address();
            this.coinsArr = this.filterType(data);

            if (this.defaultId) {//如果存在默认id
                this.currCoin = this.coinsArr.find(x => x.coin.id == this.defaultId);

                if (!this.currCoin) {//若当前币种不支持充提
                    Dialog.alert({
                        title: '提示',
                        message: `当前${this.$route.query.coinName}暂未开放${this.type == 'recharge' ? '充值' : '提现'}`
                    }).then(() => {
                        this.$router.go(-1);
                    });//Dialog
                    return;
                }//end if

            } else {
                this.currCoin = this.coinsArr[0];
            }
            this.$emit('chooseCoin', this.currCoin)
        },
        chooseCoin(item) {//选择币种
            this.showList = false;
            this.currCoin = item;
            this.$emit('chooseCoin', item)
        }//chooseCoin
    },
    mounted() {
        this.getCoinsInfo()
    },

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/scss" lang="scss">
@import "../../styles/walletVal";
.token_choose {
    margin-bottom: 20px;

    & > div {
        background: $them_color_bgGray;
        padding: 10px 20px;
        border-radius: 2px;
        -webkit-border-radius: 2px;
        color: $text_color_dark;
        font-size: 14px;
        font-weight: bold;
    }

    .token_type {
        margin-right: 10px;
        min-width: 100px;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid white;
        padding: 5px 10px;
        &.active {
            border: 1px solid $them_color;
            color: $them_color;
            background: url("../../assets/wallet/checked.png") no-repeat;
            background-size: 20px;
            background-position: 102% 120%;
        }
    }

    .token_name {
        flex: 1;
        .font16 {
            img {
                width: 24px;
                height: 24px;
                vertical-align: top;
            }
        }
        small {
            .van-icon {
                margin-top: -2px;
                display: inline-block;
                vertical-align: middle;
            }
        }
    }
}
.coinsList {
    height: 100vh;
    background: white;
    min-width: 200px;
    width: 50vw;
    overflow-y: auto;
    .item {
        padding: 20px;
        font-weight: bold;
        &.active {
            color: $them_color;
        }
    }
}
</style>
