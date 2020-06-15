<template>
    <div id="funds">
        <div class="navBox"
             style="padding:0 20px">
            <van-nav-bar :title="$t('wallet.recharge.nav_title')"
                         fixed
                         left-arrow
                         @click-left="goback()"
                         @click-right="gopage('/assetsDetail_v2')">
                <template #right>
                    <van-icon name="orders-o"
                              size="18" />
                </template>
            </van-nav-bar>
        </div>
        <!-- <walletNav :title="$t('wallet.recharge.nav_title')"
                   left-arrow
                   @clickLeft="goback()" /> -->
        <!-- <div class="rightText" @click="gopage('/wallet/book?type=recharge')"><van-icon name="todo-list-o" size="20px"/>{{$t('wallet.recharge.text_list')}}</div>
    </walletNav> -->
        <chooseCoins v-on:chooseCoin="chooseCoin"
                     :defaultId="$route.query.coinId"
                     type="recharge" />

        <div class="item_box"
             style="padding:0 20px">

            <div>
                <div style="color:#AFAFAF;font-size:12px">{{$t('wallet.recharge.text_addr')}}</div>
                <div class="addr font-bold font12 copy-address">
                    <div>{{addressInfo.address}}</div>
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
                <img src="../../assets/wallet/deal/数据暂无.png"
                     alt="">
                <p>暂无数据</p>
            </div>
            <ul v-else>
                <li v-for="(item, index) in rechargeList"
                    :key="index">
                    <div>{{item.coinId === 1 ? 'USDT' : item.coinId === 2 ? 'TB' : item.coinId === 3 ? 'OKB' : item.coinId === 4 ? 'BNB' : 'HT'}}</div>
                    <div>{{item.amount}}</div>
                    <div>{{item.addTime}}</div>
                </li>
            </ul>
        </div>

        <div class="space20"></div>

    </div>
    <!-- index -->
</template>

<script>
import {
    checkTbAddress,
    TBListCZinfo
} from '../../data/wallet';
import {
    mapMutations,
    mapState
} from 'vuex'
import QRCode from 'qrcodejs2'
import Clipboard from 'clipboard';
import chooseCoins from '../../components/wallet/chooseCoins'

export default {
    data() {
        return {
            token: null,
            currRechargeInfo: null,//当前币种信息
            copyText: null,
            addressInfo: {},
            // 充值记录
            rechargeList: []
        }
    },
    components: {
        chooseCoins
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
                    if (this.currRechargeInfo) {
                        this.getRechargeList()
                    }
                }
            })
        },
        // 获取充值列表
        getRechargeList() {
            TBListCZinfo({ token_: this.token, coinId: this.currRechargeInfo.coin.id }).then(res => {
                if (res.code === '200') {
                    res.data.forEach(item => {
                        item.addTime = this.getDate(item.addTime)
                    })
                    this.rechargeList = res.data
                }
            })
        },
        chooseCoin(item) {//当前币种选择
            // console.log(item)
            // this.qrcode(item.rechargeAddress.address);
            this.currRechargeInfo = item;
            // console.log(this.currRechargeInfo)
            // this.copyText = item.rechargeAddress.address;

        },//chooseCoin
        async qrcode(address) { //生成二维码
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
        checkTbAddress({
            userId: this.userInfo.user.id
        }).then(v => {
            this.addressInfo = v.data
            this.copyText = this.addressInfo.address;
        })
    },
    mounted() {
        this.$nextTick(() => {
            this.getToken()
        })
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
</style>
