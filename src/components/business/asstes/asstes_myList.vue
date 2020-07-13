<template>

    <div class="mylist">

        <p class="asset-list-title">{{$t('feature.assets.text_list')}}</p>

        <div class="asset-list">
            <ul>
                <li v-for="(item, index) in balanceList"
                    :key="index"
                    @click="assetsDetail(item.coinId)">
                    <div class="asset-list-top">
                        <img :src="item.coinId === '1001' ? require('./../../../assets/wallet/asstes/USDT.png') : item.coinId === '1002' ? require('./../../../assets/wallet/asstes/CBK.png') : item.coinId === '1003' ? require('./../../../assets/wallet/asstes/CBG.png') : require('./../../../assets/wallet/asstes/BTC.png')"
                             alt="">
                        <span>{{item.coinId === '1001' ? 'USDT' : item.coinId === '1002' ? 'CBK' : item.coinId === '1003' ? 'CBG' : 'BTC'}}</span>
                        <div class="bot-box">
                            <span v-if="item.coinId === '1001'"
                                  :disabled="item.has === 0 ? false : true"
                                  @click="item.has === 0 ? receive($event) : ''"
                                  :class="item.has === 0 ? 'receive-btn received' : 'receive-btn unclaimed'">{{item.has === 0 ? $t('feature.assets.text_lq') : $t('feature.assets.text_ylq')}}</span>
                        </div>
                    </div>
                    <div class="list-name">
                        <p>{{$t('feature.assets.text_available')}}</p>
                        <p>{{$t('feature.assets.text_freeze')}}</p>
                        <p>{{$t('feature.assets.text_crowdfunding')}}</p>
                    </div>
                    <div class="asset-sum">
                        <p>{{financial(item.lastBalance)}}</p>
                        <p>{{financial(item.freezemoney)}}</p>
                        <p>{{financial(item.zcfund)}}</p>
                    </div>
                </li>
            </ul>
        </div>

    </div>

</template>

<script>
import {
    mapMutations,
    mapState
} from 'vuex'
import {
    TBListfund,
    qmlcgFanli
} from '../../../data/wallet'
import { Toast } from 'vant'
export default {
    props: ['user'],
    data() {
        return {
            token: null,
            // 资产列表
            balanceList: null
        }
    },
    created() {

    },
    methods: {
        // 获取资产列表信息
        getBalanceAll() {
            TBListfund({ token_: this.$store.state.newToken }).then(res => {
                if (res.code === '200') {
                    this.balanceList = res.data
                }
            })
        },
        // 领取
        receive(event) {
            event.stopPropagation()
            qmlcgFanli({ token_: this.$store.state.newToken }).then(res => {
                if (res.code === '200') {
                    this.getBalanceAll()
                } else {
                    console.log(11);
                    this.$layer.open({
                        content: res.msg,
                        skin: 'msg',
                        time: 2 //2秒后自动关闭
                    })
                }
            }).catch(i => {
                if (i.code === '200') {
                    this.getBalanceAll()
                } else {
                    console.log(11);
                    this.$layer.open({
                        content: i.msg,
                        skin: 'msg',
                        time: 2 //2秒后自动关闭
                    })
                }

            })
        },
        // 跳转资产明细页面
        assetsDetail(coinId) {
            this.$router.push({
                path: '/assetsDetail_v2',
                query: {
                    coinId: coinId
                }
            })
        },
        // 保留小数点
        financial(x) {
            return Number.parseFloat(x).toFixed(3)
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    mounted() {
    },
    activated() {
        console.log(this.userInfo);

        this.getBalanceAll()
    }
};

</script>
<style rel="stylesheet/scss" scoped lang="scss">
@import "../../../styles/walletVal";
.mylist {
    padding-bottom: 50px;
    .asset-list-title {
        width: 100%;
        height: 54px;
        line-height: 54px;
        padding-left: 15px;
        font-size: 16px;
        font-weight: bold;
        color: rgba(53, 53, 53, 1);
        border-bottom: 8px solid #f3f4f6;
    }
    .asset-list {
        width: 100%;
        background: #fff;
        margin-top: 6px;
        padding: 0 15px 8px;
        > ul {
            li {
                padding: 10px 0;
                border-bottom: 1px solid #ebebeb;
            }
        }
        .asset-list-top {
            width: 100%;
            height: 38px;
            img {
                display: inline-block;
                height: 24px;
                width: 24px;
                vertical-align: middle;
            }
            span {
                font-size: 14px;
                font-weight: bold;
                color: rgba(53, 53, 53, 1);
            }
            .bot-box {
                float: right;
                line-height: 32px;
                .receive-btn {
                    padding: 6px 10px;
                    border-radius: 5px;
                    font-size: 12px;
                    font-weight: 400;
                    border: none;
                }
                .received {
                    background: rgba(86, 107, 243, 1);
                    color: rgba(255, 255, 255, 1);
                }
                .unclaimed {
                    background: #f7f6fb;
                    color: #353535;
                }
            }
        }
        .list-name {
            display: flex;
            justify-content: space-between;
            margin-top: 14px;
            p {
                flex: 1;
                font-size: 12px;
                font-weight: 500;
                color: rgba(200, 205, 211, 1);
            }
            p:nth-child(2) {
                text-align: center;
            }
            p:nth-child(3) {
                text-align: right;
            }
        }
        .asset-sum {
            display: flex;
            justify-content: space-between;
            margin-top: 12px;
            p {
                flex: 1;
                font-size: 14px;
                font-weight: bold;
                color: rgba(53, 53, 53, 1);
            }
            p:nth-child(2) {
                text-align: center;
            }
            p:nth-child(3) {
                text-align: right;
            }
        }
    }
}
</style>
