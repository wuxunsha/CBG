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
                <input type="number"
                       v-model="sellNum"
                       placeholder="请输入出售的数量">
                <div class="sell-all">
                    <span>USDT</span>
                    <p @click="all">全部</p>
                </div>
            </div>
            <div class="use-num">
                <p>可用：{{total}}&nbsp;&nbsp;&nbsp;&nbsp;USDT</p>
                <span>手续费:5％</span>
            </div>
        </div>
        <div class="sell">
            <div class="sell-top">
                <p>起售(USDT)<span style="color:#353535;margin:0 0 0 30px"><input type="number"
                               v-model="minNum"
                               placeholder="请输入起售"></span></p>
                <p>限额最小(CNY)<span style="color:#353535;margin:0 0 0 30px"><input type="number"
                               v-model="minPrice"
                               placeholder="请输入限额"></span></p>
                <p>限额最大(CNY)<span style="color:#353535;margin:0 0 0 30px"><input type="number"
                               v-model="maxPrice"
                               placeholder="请输入限额"></span></p>
                <p>金额(CNY)<span style="color:#353535;margin:0 0 0 30px"><input type="number"
                               v-model="price"
                               placeholder="请输入金额"></span></p>
            </div>

        </div>
        <div class="buy-num">
            <div class="total">
                <p>用户名</p>
                <p style="font-size:12px">{{userList.userAccount}}</p>
            </div>
            <div class="total">
                <p>认证情况</p>
                <p v-if="userList.isrz == 1"
                   style="font-size:12px">已实名</p>
                <p v-else
                   style="font-size:12px">未实名</p>
            </div>
            <div class="num">
                <span>支付方式</span>
                <div>
                    <img v-if="userList.zfbpay == 1"
                         src="../../assets/wallet/deal/zfb.png">
                    <img v-if="userList.wxpay == 1"
                         src="../../assets/wallet/deal/wx.png">
                    <img v-if="userList.bankbpay == 1"
                         src="../../assets/wallet/deal/ying.png">
                    <!-- <img src="../../assets/wallet/deal/kao.png"> -->
                </div>
            </div>

            <div class="total">
                <p>联系方式</p>
                <p style="font-size:12px">{{userList.userName}}</p>
            </div>

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
             @click="goAdd()">
            发布出售
        </div>
    </div>
</template>

<script>
import {
    mapMutations,
    mapState
} from 'vuex'
import chooseCards from '../../components/wallet/chooseCard'
import {
    quan_detail,
    getUserInfo
} from '../../data/wallet';

import { Popup } from 'vant';
export default {
    data() {
        return {
            checked: false,
            sellNum: "",
            minNum: '',
            minPrice: '',
            maxPrice: '',
            price: '',
            userList: {},
            total: ''
        }
    },
    components: {
        chooseCards
    },
    computed: {
        ...mapState(['userInfo'])
    },
    mounted() {
        this.getUserInfo()
        this.getTotal()
    },
    methods: {
        all() {
            this.sellNum = this.total
        },
        chooseCoin() {

        },
        goAdd() {
            if (this.checked == false) {
                this.$layer.open({
                    content: '请勾选阅读规则',
                    skin: 'msg',
                    time: 2 //2秒后自动关闭
                })
                return
            }
            if (this.totalNum <= 0) {
                this.$layer.open({
                    content: '请输入出售数量',
                    skin: 'msg',
                    time: 2 //2秒后自动关闭
                })
                return
            }
            if (this.minNum <= 0) {
                this.$layer.open({
                    content: '请输入最小出售数量',
                    skin: 'msg',
                    time: 2 //2秒后自动关闭
                })
                return
            }
            if (this.minAmount <= 0) {
                this.$layer.open({
                    content: '请输入最小限额',
                    skin: 'msg',
                    time: 2 //2秒后自动关闭
                })
                return
            }
            if (this.maxAmount <= 0) {
                this.$layer.open({
                    content: '请输入最大限额',
                    skin: 'msg',
                    time: 2 //2秒后自动关闭
                })
                return
            }
            if (this.price <= 0) {
                this.$layer.open({
                    content: '请输入交易单价',
                    skin: 'msg',
                    time: 2 //2秒后自动关闭
                })
                return
            }

            let data = {
                token_: this.$store.state.newToken,
                type: '1',
                totalNum: this.sellNum,
                minNum: this.minNum,
                minAmount: this.minPrice,
                maxAmount: this.maxPrice,
                price: this.price,
            }
            this.$http.post(this.$lib.host + 'otc/add', this.qsParams(data)).then(res => {
                if (res.code == 200) {
                    console.log(res);
                    this.$router.push('/deal')
                    this.$layer.open({
                        content: '发布成功',
                        skin: 'msg',
                        time: 2 //2秒后自动关闭
                    })

                }
            })

        },
        getUserInfo() {
            this.$http.get(this.$lib.host + 'cguser/getUserInfo', {
                params: {
                    token_: this.$store.state.newToken
                }
            }).then(res => {
                if (res.code == 200) {
                    console.log(res);

                    this.userList = res.data
                }
            })
        },
        getTotal() {
            this.$http.get(this.$lib.host + 'tb/listfund', {
                params: {
                    token_: this.$store.state.newToken
                }
            }).then(res => {
                if (res.code == 200) {
                    let totalList = res.data
                    totalList.forEach(e => {
                        if (e.coinId == '1002') {
                            this.total = e.lastBalance
                        }
                    });
                }
            })
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
        font-size: 16px;
    }
    div {
        display: flex;
        justify-content: space-between;
        margin: 8px 0 10px 0;
        border-bottom: 1px solid #ebebeb;
        input {
            border: none;
            font-size: 14px;
        }
        .sell-all {
            border-bottom: none;
            span {
                color: #a5abad;
                font-size: 14px;
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
        font-size: 14px;
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
            input {
                width: 80px;
                border: none;
                border-bottom: 1px solid #ccc;
            }
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
        font-size: 16px;
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
    font-size: 14px;
}
</style>