<template>
    <div class="people-stock">
        <div class="navBox">
            <van-nav-bar :title="`发布售出`"
                         fixed
                         left-arrow
                         @click-left="goback()" />
        </div>
        <div class="issue-info">
            <h3>出售数量</h3>
            <div>
                <input type="text"
                       placeholder="请输入出售的数量">
                <div class="sell-all">
                    <span>CBK</span>
                    <p>全部</p>
                </div>
            </div>
            <div class="use-num">
                <p>可用：1000CBK</p>
                <span>手续费:２％</span>
            </div>
        </div>
        <div class="sell">
            <div class="sell-top">
                <p>单价(CNY)<span style="color:#353535;margin:0 0 0 30px">0.36</span></p>
                <p>数量(CKB)<span style="color:#353535;margin:0 0 0 30px">0.33-0.36</span></p>
                <p>限额(CNY)<span style="color:#353535;margin:0 0 0 30px">0.33-0.36</span></p>
                <p>金额(CNY)<span style="color:#353535;margin:0 0 0 30px">0.33-0.36</span></p>
            </div>

        </div>
        <div class="buy-num">
            <div class="total">
                <p>用户名</p>
                <p style="font-size:12px">孙小姐</p>
            </div>
            <div class="total">
                <p>认证情况</p>
                <p style="font-size:12px">已实名</p>
            </div>
            <div class="num">
                <span>支付方式</span>
                <div>
                    <img src="../../assets/wallet/deal/支付宝@2x.png">
                    <img src="../../assets/wallet/deal/支付宝@2x.png">
                    <img src="../../assets/wallet/deal/支付宝@2x.png">
                    <!-- <img src="../../assets/wallet/deal/图层 5 拷贝@2x (1).png"> -->
                </div>
            </div>

            <div class="total">
                <p>联系方式</p>
                <p style="font-size:12px">18612345698</p>
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

        <div class="read">
            <van-checkbox v-model="checked"
                          shape="square"></van-checkbox>
            <p @click="$router.push('/issueRules')">我已阅读并遵守交易规则</p>
        </div>

        <div class="go-buy"
             @click="$router.push('/sellWait')">
            发布出售
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

        }
    },

    watch: {

    }
}

</script>
<style lang='scss' scoped>
.issue-info {
    padding: 0 15px;
    h3 {
        margin: 15px 0 0;
    }
    div {
        display: flex;
        justify-content: space-between;
        margin: 8px 0 10px 0;
        border-bottom: 1px solid #ebebeb;
        input {
            border: none;
        }
        .sell-all {
            border-bottom: none;
            span {
                color: #a5abad;
            }
            p {
                margin: 0 0 0 10px;
                padding: 0 0px 0 10px;
                border-left: 1px solid #ebebeb;

                color: #556bf3;
            }
        }
    }
    .use-num {
        display: flex;
        justify-content: space-between;
        border: none;
    }
}
.sell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ebebeb;
    padding: 0 15px 8px;
    .sell-top {
        p {
            margin-bottom: 10px;
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
                margin-left: 5px;
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
    color: #fff;
    background-color: #556bf3;
}
</style>