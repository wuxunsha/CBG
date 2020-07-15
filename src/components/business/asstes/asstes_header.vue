<template>
    <div>
        <!-- 顶部 -->
        <div class="header">
            <p class="property-title">
                <span>{{$t('feature.assets.nav_title')}}</span>
                <i :class="isHiddenFlag ? 'show' : 'hidden'"
                   @click="isShowIcon"></i>
            </p>

            <p class="property-number">
                <!-- <span>$&nbsp;&nbsp;{{sumAmount}}</span> -->
                <span>$&nbsp;&nbsp;{{isHide(sumAmount)}}</span>
            </p>

            <div class="property-box">
                <div @click="gopage('/recharge')">
                    <span>{{$t('feature.assets.text_deposit')}}</span>
                </div>
                <div @click="gopage('/withdraw')">
                    <span>{{$t('feature.assets.text_withdraw')}}</span>
                </div>
                <div @click="gopage('/transfer')">
                    <span>{{$t('feature.assets.text_transfer')}}</span>
                </div>
            </div>
        </div>
        <!-- 
    <div class="">

      <div class="dataGroup flex align">
        <span>{{$t('feature.assets.text_balance')}}</span>&nbsp;&nbsp;<b>≈&nbsp;${{sumAmount}}</b>
      </div>

      <div class="btnBox flex align">
        <div class="headerBtn"  @click="gopage('/transfer')">{{$t('feature.transfer.text_title')}}</div>
        <div class="headerBtn" @click="gopage('/withdraw')">{{$t('feature.assets.text_withdraw')}}</div>
        <div class="headerBtn"  @click="gopage('/recharge')">{{$t('feature.assets.text_recharge')}}</div>
      </div>

    </div> -->

    </div>

</template>

<script>
import {
    mapMutations,
    mapState
} from 'vuex'
import {
    getTotalFund
} from '../../../data/wallet'
export default {
    props: ['user'],
    data() {
        return {
            isHiddenFlag: true,
            sumAmount: 0
        }
    },
    computed: {

        // ...mapState(['userInfo']),
        // sumAmount() {//设置总额
        //     let num = 0;
        //     console.log(this.userInfo);

        //     this.userInfo.balanceModels.forEach(v => {
        //         num += parseFloat(v.coin.coinPrice) * parseFloat(v.amount);
        //     })
        //     return num;
        // },
        isHide(value) {
            return function (value) {
                if (this.isHiddenFlag) {
                    return value
                } else {
                    let str = value.toString()
                    return str.replace(/[0-9]/g, '*')
                }
            }
        },
    },
    methods: {
        // 图标切换
        isShowIcon() {
            this.isHiddenFlag = !this.isHiddenFlag
        },
        getNum() {
            getTotalFund().then(res => {
                if(res.code === 1000) {
                    this.sumAmount = res.data.totalAmount
                }
            })
            // this.$http.post('http://trex.top/payservice/order/getTotalFund').then(res => {
            //     console.log(res);
            //     this.sumAmount = res.data.totalAmount
            //     console.log(this.sumAmount);

            // })
        },
    },
    mounted() {
        this.getNum()
    }
};

</script>
<style rel="stylesheet/scss" scoped lang="scss">
@import "../../../styles/walletVal";
.header {
    width: 100%;
    height: 200px;
    background: url("../../../assets/wallet/asstes/qbdb.png") no-repeat;
    background-size: 100% 100%;
    padding: 15px;
    .property-title {
        display: flex;
        font-size: 12px;
        color: #fff;
        margin-top: 28px;
        .show {
            display: block;
            width: 16px;
            height: 18px;
            line-height: 18px;
            margin-left: 18px;
            background: url("../../../assets/wallet/asstes/kxsbs2x.png")
                no-repeat center center;
            background-size: 100%;
        }
        .hidden {
            display: block;
            width: 16px;
            height: 18px;
            line-height: 18px;
            margin-left: 18px;
            background: url("../../../assets/wallet/asstes/bxsbs2x.png")
                no-repeat center center;
            background-size: 100%;
        }
    }
    .property-number {
        font-size: 26px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        margin-top: 24px;
    }
    .property-box {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        > div {
            width: 105px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            background: url("../../../assets/wallet/asstes/qban.png")
                no-repeat;
            background-size: 100%;
            span {
                display: block;
                font-size: 13px;
                height: 28px;
                line-height: 28px;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
            }
        }
    }
}
</style>
