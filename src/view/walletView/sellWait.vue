<template>
    <div class="people-stock">
        <!-- <div class="navBox">
            <van-nav-bar :title="`发布买入`"
                         fixed
                         left-arrow
                         @click-left="goback()" />
        </div> -->
        <div class="search">
            <img src="../../assets/wallet/deal/图层 5@2x (2).png">
        </div>
        <div class="search2">
            <img src="../../assets/wallet/deal/刷新@2x.png">
        </div>
        <div class="issue-info">
            <h3 @click="$router.go(-1)">
                <van-icon name="arrow-left"
                          size="22"
                          color="#fff" />
            </h3>
            <div>
                <img src="../../assets/wallet/deal/图层 4@2x (1).png">
                <p>待对方支付</p>
            </div>
            <p>请在15:26前确认收款 </p>
        </div>
        <div class="sell">
            <div class="sell-top">
                <h3>订单金额</h3>
                <p style="color:#556BF3;font-size:18px">190.05 CNY <img src="../../assets/wallet/deal/图层 7@2x (2).png"></p>
                <p>单价<span style="color:#353535;margin:0 0 0 50px">0.33-0.36</span></p>
                <p>数量<span style="color:#353535;margin:0 0 0 50px">500.00 CBK</span></p>
            </div>
        </div>
        <div class="line">

        </div>
        <div class="buy-num">
            <div class="total">
                <p>用户名</p>
                <p style="font-size:12px">18030313795</p>
            </div>
            <div class="total">
                <p>订单号</p>
                <p style="font-size:12px">215487531214564</p>
            </div>
            <div class="total">
                <p>下单时间</p>
                <p style="font-size:12px">18030313795</p>
            </div>
        </div>
        <div class="issue-tip">
            <h3>温馨提示</h3>
            <div class="dot">
                <div class="tip-dot">
                    <span></span>
                </div>
                <p>当前参加买卖CBK的用户只可同时交易1单；</p>
            </div>
            <div class="dot">
                <div class="tip-dot">
                    <span></span>
                </div>
                <p>发布求购CBK单笔数量为500至3000整数，500整数倍；</p>
            </div>
            <div class="dot">
                <div class="tip-dot">
                    <span></span>
                </div>
                <p>当天产出CBK，需等第二天才能交易;</p>
            </div>
            <div class="dot">
                <div class="tip-dot">
                    <span></span>
                </div>
                <p>支付倒计时为30分钟，买方未及时点已付款，卖币方可点联系平台申诉，要求系统退回CBK；</p>
            </div>
            <div class="dot">
                <div class="tip-dot">
                    <span></span>
                </div>
                <p>核对金额倒计时为30分钟，卖方未及时点已到帐,买方可点申诉，要求系统协助CBK到账；</p>
            </div>
            <div class="dot">
                <div class="tip-dot">
                    <span></span>
                </div>
                <p>卖方手续费=CBK数量*2%，不足1CBK的收1CBK；</p>
            </div>
        </div>

        <div class="go-buy"
             @click="$router.push('/sellAwait')">
            确认已收款
        </div>
    </div>
</template>

<script>
import chooseCards from '../../components/wallet/chooseCard'
import {
    quan_detail
} from '../../data/wallet';
import { Popup } from 'vant';
export default {
    data() {
        return {

            checked: false
        }
    },
    components: {
        chooseCards
    },
    mounted() {

    },
    methods: {
        chooseCoin() {

        },
        afterRead() {

        }
    },

    watch: {

    }
}

</script>
<style lang='scss' scoped>
.search {
    position: absolute;
    right: 15px;
    top: 15px;
    img {
        width: 18px;
        height: 18px;
    }
}
.search2 {
    position: absolute;
    right: 45px;
    top: 15px;
    img {
        width: 18px;
        height: 18px;
    }
}
.issue-info {
    padding: 0 15px;
    width: 100%;
    height: 150px;
    line-height: 40px;
    background: #556bf3;
    overflow: hidden;
    h3 {
        margin: 20px 0 0;
    }
    div {
        margin: 20px 0 0;
        display: flex;
        align-items: center;
        img {
            width: 18px;
            height: 18px;
        }
        p {
            margin-left: 15px;
            font-size: 18px;
            color: #fff;
        }
    }
    p {
        color: #fff;
    }
}
.sell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ebebeb;
    padding: 15px 15px 0;
    .sell-top {
        p {
            margin-bottom: 10px;
        }
        img {
            width: 12px;
            height: 12px;
            margin: -3px 0 0 25px;
        }
    }
    .sell-right {
        display: flex;
        align-items: center;
        img {
            width: 14px;
            height: 14px;
        }
        p {
            margin: 0 20px;
        }
    }
}
.line {
    width: 100%;
    height: 10px;
    background-color: #f7f5fb;
}

.buy-num {
    // padding: 15px 15px 0;
    .num {
        display: flex;
        border-bottom: 1px solid #ebebeb;
        justify-content: space-between;
        padding: 8px 15px;
        div {
            display: flex;
            align-items: center;
            img {
                width: 14px;
                height: 14px;
            }
            p {
                margin: 0 10px;
            }
        }
        span {
            color: #a5abad;
            font-size: 12px;
        }
    }
    .total {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ebebeb;
        padding: 8px 15px;
        p {
            color: #a5abad;
            font-size: 12px;
            span {
                width: 70px;
                height: 70px;
                display: inline-block;
                background-color: blue;
            }
        }
        img {
            width: 12px;
            height: 12px;
            margin: -3px 0 0 8px;
        }
    }
}
.issue-tip {
    padding: 0 15px;
    h3 {
        margin: 15px 0 8px;
    }
    .dot {
        overflow: hidden;
        .tip-dot {
            display: inline-block;
            width: 20px;
            height: 20px;
            line-height: 15px;
            float: left;
            span {
                display: inline-block;
                width: 6px;
                height: 6px;
                background: rgba(165, 171, 173, 1);
                border-radius: 50%;
                margin: -3px 0 0 0;
            }
        }
        p {
            font-size: 12px;
        }
    }
}
.read {
    display: flex;
    padding: 15px 15px;
    border-bottom: 1px solid #ebebeb;
    p {
        margin-left: 20px;
    }
}
.go-buy {
    width: 90%;
    margin: 10px auto;
    height: 33px;
    line-height: 33px;
    text-align: center;
    color: #a5acae;
    background-color: #ebebeb;
}
</style>