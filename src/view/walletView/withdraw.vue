<template>
    <div id="funds">

        <!-- <van-nav-bar :title="$t('wallet.withdraw.Withdraw')"
                     left-arrow
                     fixed
                     @click-left="goback()" @click-right="gopage('/rechargeList')"> -->
        <van-nav-bar :title="$t('wallet.withdraw.Withdraw')"
                     left-arrow
                     fixed
                     @click-left="goback()">
            <!-- <template #right>
                <van-icon name="orders-o"
                          size="18" />
            </template> -->
        </van-nav-bar>

        <div class="item_box">

            <div class="remind-box">
                <p class="remind">{{$t('wallet.withdraw.Toast_prompt')}}</p>
            </div>

            <div class="currency-select"
                 @click="popup = true">
                <div class="currency-select-left">
                    <img :src="coinId === '1004' ? require('./../../assets/wallet/asstes/BTC.png') : coinId === '1002' ? require('./../../assets/wallet/asstes/CBK.png') : coinId === '1003' ? require('./../../assets/wallet/asstes/CBG.png') : require('./../../assets/wallet/asstes/USDT.png')" alt="">
                    <span>
                        {{currCoin}}
                    </span>
                </div>
                <div class="currency-select-right">
                    <van-icon name="arrow" />
                </div>
            </div>

            <div class="content-box">

                <!-- 可用数量 -->
                <div class="available-quantity"
                     v-if="currCoin">
                    <p>
                        <span>{{$t('wallet.withdraw.text_able')}}</span>
                        <span>{{balance}} {{currCoin}}</span>
                    </p>
                </div>

                <div class="withdraw_form">

                    <div class="input_group">
                        <input type="text"
                               :placeholder="$t('wallet.withdraw.input_addr')"
                               v-model="withrawInfo.address"
                               @blur="blur_event()">
                    </div>

                    <div class="input_group">
                        <input type="text"
                               :placeholder="$t('wallet.withdraw.input_num')"
                               v-model="withrawInfo.amount"
                               @blur="blur_event()">
                    </div>

                    <div class="extract-state"
                         v-if="currCoin">
                        <div>
                            <span>{{$t('wallet.withdraw.Toast_Handling')}}：{{serviceNumber}} {{currCoin}}</span>
                        </div>
                        <div @click="extractAll">
                            <img src="../../assets/wallet/deal/ti.png"
                                 alt="">
                            {{$t('wallet.withdraw.text_allin')}}
                        </div>
                    </div>

                    <ul class="withdraw-detail"
                        v-if="currCoin">
                        <li>{{$t('wallet.withdraw.Toast_Handling')}}: 2%/{{$t('wallet.withdraw.pen')}}</li>
                        <li>{{$t('wallet.withdraw.Actually_Arrived')}}：{{arrivalAmount}}&nbsp;&nbsp;{{currCoin}}</li>
                    </ul>

                    <!-- 温馨提示 -->
                    <div class="warm-prompt">
                        <p>{{$t('wallet.withdraw.Tips')}}</p>
                        <ul>
                            <li>{{$t('wallet.withdraw.Tips_1')}}</li>
                            <li>{{$t('wallet.withdraw.Tips_2')}}</li>
                            <li>{{$t('wallet.withdraw.Tips_3')}}</li>
                        </ul>
                    </div>

                    <!-- <div class="input_group" v-if="currCoinInfo">
            <div class="lable font12 text_color_dark">{{$t('feature.withdraw.text_num')}}</div>
            <div class="input flex align">
              <input type="number" :placeholder="`${$t('feature.withdraw.text_min')}${currCoinInfo.coin.minWithdraw}`" v-model="withrawInfo.amount"  @blur="blur_event()">
              <div class="unit font-bold them_color_gray font15">{{currCoinInfo.coin.coinName}}</div>
              <div class="do font-bold text_color_dark textRight" @click="withrawInfo.amount = currCoinInfo.balance.amount">{{$t('wallet.withdraw.text_allin')}}</div>
              <hr>
            </div>

            <div class="lable font12 text_color_dark"><span class="them_color_gray"> {{$t('wallet.withdraw.text_able')}} {{currCoinInfo.balance.amount}} {{currCoinInfo.coin.coinName}}</span></div>

          </div>

          <div class="input_group" v-if="currCoinInfo">
            <div class="lable font12 text_color_dark">{{$t('feature.withdraw.text_fee')}}</div>
            <div class="input flex align">
              <input type="number" v-model="currCoinInfo.coin.withdrawFree" disabled  @blur="blur_event()">
              <div class="unit font-bold them_color_gray font15">{{currCoinInfo.coin.coinName}}</div>
              <hr>
            </div>
          </div> -->

                    <div class="submit-box">
                        <van-button class="submit"
                                    @click="next()">{{$t('wallet.withdraw.confirm')}}</van-button>
                    </div>

                </div>
            </div>

        </div>

        <!-- <div>
      <p class="info them_color_gray font12 bg_color_gray padding20 radius2" v-html="$t('feature.withdraw.text_p')">
      </p>
    </div> -->

        <van-popup v-model="show_popup"
                   closeable
                   position="bottom">
            <div class="main">
                <div class="popup_title">{{$t('feature.cpopupCode.text_title')}}</div>

                <div class="them_form"
                     style="padding:10px 20px;">
                    <!-- <div class="input_gorup">
                        <input type="number"
                               :placeholder="$t('feature.cpopupCode.text_input')"
                               v-model="withrawInfo.code"
                               @blur="blur_event"
                               style="padding-right:100px;">
                        <getCode :codeData="{type:1, token_: $store.state.newToken}" />
                    </div> -->
                    <div class="input_gorup">
                        <input type="number"
                               style="-webkit-text-security:disc"
                               :placeholder="`${$t('feature.transfer.input_pass')}`"
                               v-model="withrawInfo.transactionPwd"
                               @blur="blur_event">
                    </div>
                    <div class="space20"></div>
                    <van-button class="submit"
                                type="info"
                                @click="submitWithdraw()">{{$t('feature.cpopupCode.text_btn')}}</van-button>
                    <div class="space20"></div>
                </div>

            </div>
        </van-popup>

        <!-- 币种选择弹窗 -->
        <van-popup v-model="popup"
                   position="bottom"
                   :style="{ height: '30%' }">
            <van-picker :columns="coins"
                        show-toolbar
                        @change="currencyChange"
                        @cancel="popup=false"
                        @confirm="onChange"
                        :title=" `${$t('feature.transfer.text_pickerTitle')}`"
                        :confirm-button-text="`${$t('feature.bankBuy.text_ok')}`"
                        :cancel-button-text="`${$t('feature.bankBuy.text_cancel')}`" />
        </van-popup>

    </div>
</template>

<script>
import {
    mapMutations,
    mapState
} from 'vuex'
import {
    withdraw, log, TBListfund
} from '../../data/wallet';
// import chooseCoins from '../../components/wallet/chooseCoins'
import getCode from '../../components/wallet/forgetGetCode'
import { Toast } from 'vant'
export default {
    data() {
        return {
            currCoinInfo: null, //当前币种信息
            currCoin: null, // 当前币种
            inputCode: false, //显示验证码
            withrawInfo: {
                address: null, // 收款地址
                amount: null,  // 金额
                code: null, // 验证码
                coinId: null, // 币种id
                transactionPwd: null //支付密码
            },
            popup: false, // 币种选择弹窗
            show_popup: false, //显示弹窗
            // 币种列表
            // coins: [],
            balance: null,
            coinId: null,
            coins: []
        }
    },
    components: {
        getCode
    },
    computed: {
        ...mapState(['userInfo']),
        // 设置周期
        // coins() {
        //     // let res = this.userInfo.balanceModels.map(v => {
        //     //     v.text = `${v.coin.coinName}(${this.$t('feature.transfer.text_balance')}${v.amount})`
        //     //     return v;
        //     // }).filter(v => v.coin.transfer == 'Y');
        //     // this.currCoin = res[0];
        //     // this.withrawInfo.coinId = res[0].coin.id
        //     let res = []
        //     this.currCoin = 'USDT';
        //     this.withrawInfo.coinId = this.userInfo.id
        //     return res;
        // },
        // 手续费
        serviceNumber() {
            if (this.withrawInfo.amount) {
                return (this.withrawInfo.amount * 0.02).toFixed(2)
            }
            return '0.00'
        },
        arrivalAmount() {
            if (this.withrawInfo.amount) {
                return (this.withrawInfo.amount - this.withrawInfo.amount * 0.02).toFixed(2)
            }
            return '0.00'
        }
    },
    methods: {
        ...mapMutations(['setUserInfo']),
        //当前币种选择
        chooseCoin(item) {
            this.currCoinInfo = item;
        },
        // 币种改变
        currencyChange() {
            this.currCoinInfo = null
        },
        onChange(value, index) {
            this.currCoin = value.text
            this.balance = value.lastBalance
            this.coinId = value.coinId
            this.withrawInfo.amount = null
            this.withrawInfo.coinId = value.coinId
            this.popup = false;
        },
        // 提取全部
        extractAll() {
            this.withrawInfo.amount = this.balance
        },
        next() {
            if (!this.withrawInfo.address) {
                Toast(this.$t('wallet.withdraw.Toast_address'));
                return;
            }
            if (!this.withrawInfo.amount) {
                Toast(this.$t('wallet.withdraw.Toast_amount'));
                return;
            }
            this.show_popup = true;
        },
        // 申请提现
        submitWithdraw() {
            console.log(111);
            if (!this.withrawInfo.transactionPwd) {
                Toast(this.$t('feature.transfer.input_pass'));
                return;
            }

            let data = {
                address: this.withrawInfo.address, // 收款地址
                amount: this.withrawInfo.amount,  // 金额
                coinId: this.coinId, // 币种id
                userPayPwd: this.withrawInfo.transactionPwd, //支付密码
            }
            withdraw(data).then(res => {

            }).catch((e) => {
                if (e.code === 1000) {
                    Toast.success('提现申请成功')
                    this.balance -= this.withrawInfo.amount;
                    this.show_popup = false;
                    this.withrawInfo = {
                        address: null,
                        amount: null,
                        code: null,
                        coinId: null,
                        transactionPwd: null
                    }
                } else {
                    Toast(e.msg)
                }
            })
        },
        // 获取资产列表信息
        getBalanceAll() {
            TBListfund({ token_: this.$store.state.newToken }).then(res => {
                if (res.code === '200') {
                    res.data.forEach(item => {
                        if (item.coinId === '1001') {
                            item.text = 'USDT'
                        } else if (item.coinId === '1002') {
                            item.text = 'CBK'
                        } else if (item.coinId === '1003') {
                            item.text = 'CBG'
                        } else if (item.coinId === '1004') {
                            item.text = 'BTC'
                        }
                    })
                    // console.log(res.data);

                    this.coins = res.data
                    this.currCoin = res.data[0].text
                    this.coinId = res.data[0].coinId
                    this.balance = res.data[0].lastBalance
                    // console.log(this.balance);

                }
            })
        },
    },
    mounted() {
        this.getBalanceAll()
        // setTimeout(this.currCoinInfo = this.userInfo.balances.find(x=>x.coins.coinName=='GSHT'), 50);
    }
};

</script>
<style rel="stylesheet/scss" scoped lang="scss">
@import "../../styles/walletVal";
#funds {
    .item_box {
        padding-top: 46px;
        .remind-box {
            background: #eef0ff;
            .remind {
                width: 100%;
                line-height: 28px;
                font-size: 12px;
                font-weight: 500;
                color: #566bf3;
                padding: 0 20px;
            }
        }

        .currency-select {
            display: flex;
            width: 100%;
            height: 48px;
            line-height: 48px;
            background: #f7f6fb;
            padding: 0 20px;
            justify-content: space-between;
            .currency-select-left {
                img {
                    width: 24px;
                    vertical-align: sub;
                }
                span {
                    font-size: 16px;
                    font-weight: bold;
                    color: rgba(53, 53, 53, 1);
                    margin-left: 6px;
                }
            }
            .currency-select-right {
                .van-icon {
                    font-size: 20px;
                }
            }
        }

        .content-box {
            .available-quantity {
                width: 100%;
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid #ebebeb;
                p {
                    padding: 0 20px;
                    font-size: 12px;
                    font-weight: 500;
                    > span:nth-child(1) {
                        color: rgba(175, 175, 175, 1);
                    }
                    > span:nth-child(2) {
                        margin-left: 18px;
                        color: #566bf3;
                    }
                }
            }
            .token_choose {
                margin-bottom: 20px;

                & > div {
                    background: $them_color_bgGray;
                    padding: 10px 10px;
                    border-radius: 2px;
                    -webkit-border-radius: 2px;
                    color: $text_color_dark;
                    font-size: 14px;
                    font-weight: bold;
                }

                .token_name {
                    flex: 1;
                    margin-left: 15px;

                    small {
                        .van-icon {
                            margin-top: -2px;
                            display: inline-block;
                            vertical-align: middle;
                        }
                    }
                }
            }

            .code_box {
                background: $them_color_bgGray;
                padding: 20px;
                border-radius: 2px;

                .qrcode {
                    width: 180px;
                    margin: 10px auto;
                    background: white;
                    padding: 10px;
                }

                .copy {
                    display: inline-block;
                    margin: 20px auto;
                    padding: 5px 10px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 2px;
                }

                p {
                    font-size: 12px;
                    line-height: 1.8em;
                    text-align: center;
                }
            }
        }
    }
}
.withdraw_form {
    .input_group {
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ebebeb;
        input {
            flex: 1;
            outline: none;
            border-radius: 0;
            background: none;
            border: none;
            padding: 15px 0 15px 20px;
            font-size: 15px;
            padding-right: 10px;
            font-weight: bold;
            color: $text_color_dark;
            &:focus ~ hr {
                border: none;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 1px;
                background: $them_color;
            }
            &::-webkit-input-placeholder {
                font-weight: normal;
                font-size: 12px;
                color: #afafaf;
            }
            &:disabled {
                opacity: 1;
                color: black;
            }
        }
    }

    .extract-state {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        margin-top: 16px;
        > div {
            font-size: 12px;
            font-weight: 500;
            color: rgba(175, 175, 175, 1);
        }
        > div:nth-child(2) {
            color: #566bf3;
            img {
                width: 13px;
                height: 13px;
                margin-right: 4px;
            }
        }
    }

    .withdraw-detail {
        padding: 0 20px;
        margin-top: 26px;
        > li {
            line-height: 28px;
            font-size: 12px;
            font-weight: 500;
            color: rgba(52, 59, 58, 1);
        }
        li::before {
            content: "●";
            margin-right: 10px;
        }
    }

    .warm-prompt {
        padding: 0 20px;
        margin-top: 26px;
        > p {
            font-size: 14px;
            font-weight: bold;
            color: rgba(52, 59, 58, 1);
        }
        > ul {
            margin-top: 10px;
            li {
                font-size: 12px;
                font-weight: 500;
                color: rgba(175, 175, 175, 1);
            }
            li::before {
                content: "●";
                margin-right: 10px;
                color: #afafaf;
            }
        }
    }

    .submit-box {
        padding: 0 20px;
        margin-top: 40px;
        .submit {
            display: block;
            margin: 20px auto;
            width: 100%;
            background: #566bf3;
            font-size: 14px;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
        }
    }
}
.info {
    >>> span {
        display: block;
        margin-bottom: 5px;
    }
}
.van-popup {
    .popup_title {
        text-align: center;
        font-size: 16x;
        font-weight: bold;
        margin-bottom: 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        padding: 15px;
        position: relative;
        .close {
            position: absolute;
            right: 0;
            height: 100%;
            top: 0;
            line-height: 40px;
            padding: 0 20px;
            font-size: 19px;
            opacity: 0.6;
        }
    }
    .them_form {
        padding: 20px;
        input {
            border: 1px solid red;
        }
    }
}
</style>
