<template>
    <div id="funds">
        <div class="navBox"
             style="padding:0 20px">
            <van-nav-bar :title="$t('wallet.recharge.nav_title')"
                         fixed
                         left-arrow
                         @click-left="goback()">
            </van-nav-bar>
        </div>
        <div class="actionForm">
            <div class="currency-select"
                 @click="popup = true">
                <div class="currency-select-left">
                    <img src="../../assets/wallet/asstes/USDT@2x.png"
                         alt="">
                    <span>
                        {{currCoin}}
                    </span>
                </div>
                <div class="currency-select-right">
                    <van-icon name="arrow" />
                </div>
            </div>
        </div>

        <div class="item_box"
             style="padding:0 20px">

            <div>
                <div style="color:#AFAFAF;font-size:12px">{{$t('wallet.recharge.text_addr')}}</div>
                <div class="addr font-bold font12 copy-address">
                    <div>{{copyText}}</div>
                    <van-button plain
                                type="default"
                                class="copycode"
                                size="small"
                                :data-clipboard-text="copyText"
                                @click="copy"><img src="../../assets/wallet/copy.png"></van-button>
                </div>

            </div>

            <div class="code_box">
                <div style="color:#AFAFAF;font-size:12px">{{$t('wallet.recharge.text_recharge')}}</div>
                <div class="qr">
                    <div class="qr_box">
                        <div class="qrcode"
                             ref="qrCodeUrl"
                             id="qrCodeUrl">
                            <img :src="addressInfo.qrImg"
                                 alt="">
                        </div>
                    </div>
                </div>

            </div>
            <!-- code_box -->

        </div>
        <!-- item_box -->

        <div class="space20"></div>

        <div style="padding:0 20px"
             v-if="currRechargeInfo">
            <h3>{{$t('wallet.recharge.tip')}}</h3>
            <p class="info them_color_gray font12 dot"
               v-html="$t('feature.recharge.text_p',{coinName:currRechargeInfo.coin.coinName,minRecharge:currRechargeInfo.coin.minRecharge})">
                <!-- <span>*请勿向上述地址充值非{{currRechargeInfo.coin.coinName}}资产，网络节点确认后到账</span>
        <span>*最小充值数量{{currRechargeInfo.coin.minRecharge}}，小于最小数量将不会上账且无法退回</span>
        <span>*请务必确认电脑及浏览器安全，防止信息被篡改或泄露</span> -->
            </p>
        </div>

        <div style="height:10px;background:rgba(247,246,251,1);width:100%"></div>
        <div class="rechargeList">
            <h3>{{$t('wallet.recharge.list')}}</h3>
            <div v-if="rechargeList.length === 0">
                <img src="../../assets/wallet/deal/no.png"
                     alt="">
                <p>{{$t('wallet.recharge.text_zwshj')}}</p>
            </div>
            <ul v-else>
                <li v-for="(item, index) in rechargeList"
                    :key="index">
                    <div>{{item.coinId === '1001' ? 'USDT' : item.coinId === '1002' ? 'CBK' : item.coinId === '1003' ? 'CBG' :  'BTC'}}</div>
                    <div>{{item.amount}}</div>
                    <div>{{item.addTime}}</div>
                </li>
            </ul>
        </div>

        <div class="space20"></div>

        <!-- 币种选择弹窗 -->
        <van-popup v-model="popup" position="bottom" :style="{ height: '30%' }">
            <van-picker :columns="coins" show-toolbar  @cancel="popup=false" @confirm="onChange" :title=" `${$t('feature.transfer.input_recharge')}`" :confirm-button-text="`${$t('feature.bankBuy.text_ok')}`" :cancel-button-text="`${$t('feature.bankBuy.text_cancel')}`" />
        </van-popup>

    </div>
    <!-- index -->
</template>

<script>
import {
    TBListCZinfo,
    TBListfund
} from '../../data/wallet';
import {
    mapMutations,
    mapState
} from 'vuex'
import QRCode from 'qrcodejs2'
import Clipboard from 'clipboard'

export default {
    data() {
        return {
            currRechargeInfo: null,//当前币种信息
            copyText: null,
            addressInfo: {},
            // 充值记录
            rechargeList: [],
            currCoin: null, // 当前币种名称
            currCoinId: null, // 当前币种id
            // 币种列表
            coins: [],
            // 余额
            balance: '',
            popup: false, // 币种选择弹窗
            coins: []
        }
    },
    methods: {
        // 获取资产列表信息
        getBalanceAll() {
            TBListfund({ token_: this.$store.state.newToken }).then(res => {
                if (res.code === '200') {
                    const currList = []
                    res.data.map(item => {
                        if (item.coinId === '1001') {
                            item.text = 'USDT'
                            currList.push(item)
                        } else if (item.coinId === '1002') {
                            item.text = 'CBK'
                            currList.push(item)
                        }
                    })
                    this.coins = currList
                    this.currCoin = currList[0].text
                    this.currCoinId = currList[0].coinId
                    this.balance = currList[0].lastBalance
                    this.getRechargeList()
                }
            })
        },
        // 获取充值列表
        getRechargeList() {
            TBListCZinfo({ token_: this.$store.state.newToken, coinId: this.currCoinId }).then(res => {
                if (res.code === '200') {
                    res.data.forEach(item => {
                        item.addTime = this.getDate(item.addTime)
                    })
                    this.rechargeList = res.data
                }
            })
        },
        onChange(value, index) {
            this.currCoin = value.text
            this.balance = value.lastBalance
            this.currCoinId = value.coinId
            this.popup = false
            this.getRechargeList()
        },
        async qrcode(address) { //生成二维码
            console.log(address);

            this.$refs.qrCodeUrl.innerHTML = "";//先移除
            var qrcode = new QRCode(this.$refs.qrCodeUrl, {
                text: address,
                colorDark: "#2b3b4b",
                width: 200,
                height: 200,
                correctLevel: QRCode.CorrectLevel.H
            })
        }, //qrcode
        copy() { //复制

            var clipboard = new Clipboard('.copycode')

            clipboard.on('success', e => {

                Toast(this.$t('wallet.common.toast_copy_ok'))
                clipboard.destroy()
            })
            clipboard.on('error', e => {
                Toast(this.$t('wallet.common.toast_copy_fail'))
                clipboard.destroy()
            })
        },
        // 时间戳转时间、
        getDate(timeStamp) {
            const dt = new Date(timeStamp)
            const year = dt.getFullYear()
            const month = (dt.getMonth() + 1 + '').padStart(2, '0')
            const date = (dt.getDate() + '').padStart(2, '0')

            const hours = (dt.getHours() + '').padStart(2, '0')
            const minutes = (dt.getMinutes() + '').padStart(2, '0')
            const second = (dt.getSeconds() + '').padStart(2, '0')
            let resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
            return resStr
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    created() {
        console.log(this.userInfo);
        this.copyText = this.userInfo.czAddress
        this.getBalanceAll()
    },
    mounted() {

        /*if(this.$route.query.coinName=='GSHT'){
          Dialog.confirm({
            title: this.$t('wallet.common.Dialog'),
            message: this.$t('wallet.common.text_none_coin'),
            showCancelButton:false,
            closeOnClickOverlay:false
          }).then(() => {
            this.goback();
          })
          return;
        }
        setTimeout(() => {
          this.qrcode();
        }, 50);*/
        setTimeout(() => {
            this.qrcode(this.copyText);
        }, 50);
    } //mounted
};

</script>
<style rel="stylesheet/scss" scoped lang="scss">
@import "../../styles/walletVal";
#funds {
    .item_box {
        .code_box {
            // background: $them_color_bgGray;
            // padding: 20px;
            // border-radius: 2px;
            .qrcode {
                width: 90px;
                margin: 10px 0;
                background: white;
                // padding: 10px;
                height: 90px;
                overflow: hidden;
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
.info {
    >>> span {
        display: block;
        margin-bottom: 5px;
    }
    >>> span::before {
        content: "";
        width: 5px;
        background-color: #a5acae;
        height: 5px;
        display: inline-block;
        border-radius: 50%;
        margin-right: 5px;
    }
}
.addr {
    word-break: break-all;
    line-height: 1.6em;
}
.copy-address {
    display: flex;
    align-items: center;
    span {
        img {
            width: 14px;
            height: 14px;
            margin-left: 10px;
        }
    }
}
/deep/ .van-button--default {
    border: none;
    img {
        width: 14px;
        height: 14px;
    }
}
.dot {
    span {
        color: red;
        display: inline-block;
    }
}
.rechargeList {
    padding: 10px 20px 0;
    > div {
        margin-top: 20px;
        text-align: center;
        img {
            width: 50%;
        }
        p {
            margin-top: 20px;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(200, 205, 211, 1);
        }
    }
    > ul {
        margin-top: 18px;
        li {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 12px;
            > div:nth-child(1) {
                flex: 0.5;
            }
            > div:nth-child(2) {
                flex: 1;
                text-align: center;
            }
            > div:nth-child(3) {
                flex: 1;
                text-align: right;
            }
        }
    }
}
h3 {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(53, 53, 53, 1);
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
</style>
