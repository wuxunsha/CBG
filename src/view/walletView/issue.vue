<template>
    <div class="people-stock">
        <div class="navBox">
            <van-nav-bar :title="`发布买入`"
                         fixed
                         left-arrow
                         @click-left="goback()" />
        </div>
        <div class="issue-info">
            <p>交易大厅开放时间(工作日) <span style="color:#353535;margin:0 0 0 10px">9:00-18:00</span> </p>
        </div>
        <div class="sell">
            <div class="sell-top">
                <p>昨日均价(CNY) <span style="color:#353535;margin:0 0 0 10px">{{priceList.昨日价格}}</span></p>
                <p>交易单价(CNY)<span style="color:#353535;margin:0 0 0 10px">{{(priceList.昨日价格 * 0.7).toFixed(2)}}-{{(priceList.昨日价格 * 1.3).toFixed(2)}}</span></p>
                <p>最低500USDT起售，整数倍</p>
            </div>
            <div class="sell-right">
                <img @click="reduce"
                     src="../../assets/wallet/deal/tian.png">
                <p>
                    <input type="number"
                           placeholder=""
                           v-model="issuePrice">
                </p>
                <img @click="add"
                     src="../../assets/wallet/deal/tian.png">
            </div>
        </div>
        <div class="buy-num">
            <h3>购买数量</h3>
            <div class="num">
                <input type="number"
                       placeholder="请输入购买的数量"
                       v-model="num">
                <p>USDT</p>
            </div>
            <div class="total">
                <p>总价</p>
                <p style="font-size:12px">{{totleCny}}CNY</p>
            </div>
        </div>
        <!-- <chooseCards v-on:chooseCoin="chooseCoin"
                     :defaultId="$route.query.coinName"
                     type="recharge" /> -->
        <div class="issue-me">
            <p>支付方式</p>
            <van-checkbox-group v-model="result"
                                direction="horizontal">
                <van-checkbox name="2"
                              icon-size="12px"
                              style="font-size:12px">微信</van-checkbox>
                <van-checkbox name="3"
                              icon-size="12px"
                              style="font-size:12px">银行卡</van-checkbox>
                <van-checkbox name="1"
                              icon-size="12px"
                              style="font-size:12px">支付宝</van-checkbox>
            </van-checkbox-group>
        </div>

        <div class="issue-tip">
            <h3>温馨提示</h3>
            <div class="dot">
                <div class="tip-dot">
                    <span></span>
                </div>
                <p>当前参与买卖USDT的用户只可同时交易1单；</p>
            </div>
            <div class="dot">
                <div class="tip-dot">
                    <span></span>
                </div>
                <p>支付倒计时为30分钟，买方未及时点击已付款，卖方可联系平台申诉，要求协助完成订单交易；</p>
            </div>
            <div class="dot">
                <div class="tip-dot">
                    <span></span>
                </div>
                <p>核对金额倒计时为30分钟，卖方未及时点击已到账，买方可联系平台申诉，要求协助完成订单；</p>
            </div>
            <div class="dot">
                <div class="tip-dot">
                    <span></span>
                </div>
                <p>每笔订单需扣除卖方交易总币量*5%的手续费；</p>
            </div>
        </div>

        <div class="read">
            <van-checkbox v-model="checked"
                          shape="square"></van-checkbox>
            <p @click="$router.push('/issueRules')">我已阅读并遵守交易规则</p>
        </div>

        <div class="go-buy"
             @click="goAdd">
            发布买入
        </div>
    </div>
</template>

<script>
import chooseCards from '../../components/wallet/chooseCard'
import {
    quan_detail
} from '../../data/wallet';
import { Popup, Checkbox, CheckboxGroup } from 'vant';
// import { } from 'vant';
export default {
    data() {
        return {
            issuePrice: 0,
            checked: false,
            priceList: [],
            num: 0,
            totleCny: 0,
            result: []
        }
    },
    components: {
        chooseCards
    },
    mounted() {
        this.priceList = this.$store.state.assetsList
        console.log(this.priceList);

    },
    methods: {
        reduce() {
            if (this.issuePrice == 0) {
                return
            } else {
                this.issuePrice--
            }
        },
        add() {
            this.issuePrice++
        },
        chooseCoin() {
            console.log(11);

        },
        goAdd() {
            if (this.result.length == 0) {
                this.$layer.open({
                    content: '请选择支付方式',
                    skin: 'msg',
                    time: 2 //2秒后自动关闭
                })
                return
            }

            if (this.checked == false) {
                this.$layer.open({
                    content: '请勾选阅读规则',
                    skin: 'msg',
                    time: 2 //2秒后自动关闭
                })
                return
            }
            console.log(this.issuePrice, this.priceList.昨日价格 * 0.7);

            if (this.issuePrice < this.priceList.昨日价格 * 0.7 || this.issuePrice > this.priceList.昨日价格 * 1.3) {
                this.$layer.open({
                    content: '请输入合理交易单价',
                    skin: 'msg',
                    time: 2 //2秒后自动关闭
                })
                return
            }
            if (this.num <= 0) {
                this.$layer.open({
                    content: '请输入购买数量',
                    skin: 'msg',
                    time: 2 //2秒后自动关闭
                })
                return
            }

            let str = JSON.stringify(this.result)
            str = str.substring(1, str.length - 1)
            str = str.replace(/"/g, "");

            let data = {
                type: 0,
                totalNum: Number(this.num),
                minNum: 0,
                minAmount: 0,
                maxAmount: 0,
                price: Number(this.issuePrice),
                payType: str
            }
            this.$http.post(this.$lib.newHosts + '/order/addOtc', data).then(res => {
                if (res.code == 1000) {
                    console.log(res);
                    this.$router.push('/deal')
                    this.$layer.open({
                        content: '发布成功',
                        skin: 'msg',
                        time: 2 //2秒后自动关闭
                    })

                }
            })

        }
    },
    computed: {

    },
    watch: {
        num(oldValue, newValue) {
            this.totleCny = Number(oldValue) * Number(this.issuePrice)
        },
        issuePrice(oldValue, newValue) {
            this.totleCny = Number(oldValue) * Number(this.num)
        }
    }
}

</script>
<style lang='scss' scoped>
@import "../../styles/walletVal";
.issue-info {
    padding: 0 15px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: rgba(247, 246, 251, 1);
    p {
        color: #556bf3;
    }
}
.sell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ebebeb;
    padding: 15px;
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
            input {
                text-align: center;
                border: none;
                border-bottom: 1px solid #ccc;
                width: 30px;
            }
        }
    }
}
.buy-num {
    padding: 15px 15px 0;
    h3 {
        font-size: 12px;
        font-weight: bold;
        color: rgba(53, 53, 53, 1);
    }
    .num {
        display: flex;
        border-bottom: 1px solid #ebebeb;
        justify-content: space-between;
        padding: 8px 0;
        input {
            font-size: 12px;
            border: none;
        }
        p {
            color: #353535;
        }
    }
    .total {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        p {
            color: #353535;
        }
    }
}
.issue-tip {
    padding: 0 15px;
    h3 {
        font-size: 14px;
        font-weight: bold;
        color: rgba(53, 53, 53, 1);
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
    font-size: 14px;
    height: 33px;
    line-height: 33px;
    text-align: center;
    color: #fff;
    background-color: #556bf3;
}
.issue-me {
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    height: 35px;
    line-height: 35px;
    background-color: #e5e5e5;
}
/deep/ van-checkbox-group {
    display: flex;
}
</style>