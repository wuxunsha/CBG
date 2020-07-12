<template>
    <div>
        <div class="navBox">
            <van-nav-bar :title="`${$t('wallet.payment.payment_title')}`"
                         fixed
                         left-arrow
                         @click-left="goback()" />
        </div>

        <div class="content-box">
            <div class="no-data"
                 v-if="payInfoList.length == 0">
                <p>{{$t('wallet.payment.payment_information')}}</p>
                <img src="../../assets/wallet/deal/nodata.png"
                     alt="">
                <p>{{$t('wallet.payment.payment_no')}}</p>
            </div>

            <div class="with-data"
                 v-else>
                <div v-for="(t,index) in payInfoList"
                     :key="index">
                    <div class="the-way"
                         v-if="t.payType==1">
                        <div>
                            <img src="../../assets/wallet/deal/zfb.png"
                                 alt="">
                        </div>
                        <div>
                            <p>{{t.payAccount}}</p>
                        </div>
                        <div>
                            <span @click="editWxPay(t)">{{$t('wallet.payment.payment_edit')}}</span>
                        </div>
                    </div>
                    <div class="the-way"
                         v-if="t.payType==2">
                        <div>
                            <img src="../../assets/wallet/deal/wx.png"
                                 alt="">
                        </div>
                        <div>
                            <p>{{t.payAccount}}</p>
                        </div>
                        <div>
                            <span @click="editWxPay(t)">{{$t('wallet.payment.payment_edit')}}</span>
                        </div>
                    </div>
                    <div class="the-way"
                         v-if="t.payType==3">
                        <div>
                            <img src="../../assets/wallet/deal/ying.png"
                                 alt="">
                        </div>
                        <div>
                            <p>{{t.payAccount}}</p>
                        </div>
                        <div>
                            <span @click="editWxPay(t)">{{$t('wallet.payment.payment_edit')}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 添加按钮 -->
        <div class="add-btn">
            <span @click="popup = true">{{$t('wallet.payment.payment_add')}}</span>
        </div>

        <!-- 收款方式选择弹窗 -->
        <van-popup v-model="popup"
                   position="bottom"
                   :style="{ height: '30%' }">
            <van-picker :columns="columns"
                        show-toolbar
                        @cancel="popup=false"
                        @confirm="onChange"
                        :title=" `${$t('wallet.payment.popup_title')}`"
                        :confirm-button-text="`${$t('feature.bankBuy.text_ok')}`"
                        :cancel-button-text="`${$t('feature.bankBuy.text_cancel')}`" />
        </van-popup>

    </div>
</template>

<script>
import {
    mapState
} from 'vuex'
import {
    getUserPayInfo
} from '../../data/wallet'
export default {
    data() {
        return {
            hidden: true,
            // 收款方式弹窗开关
            popup: false,
            columns: ['支付宝', '微信', '银行卡'],
            payInfoList: []
        }
    },
    methods: {
        // 获取用户收款方式
        getUserPayInfoList() {
            this.$http.post('http://trex.top/payservice/user/getUserPayType').then(res => {
                if (res.code == 1000) {
                    this.payInfoList = res.data
                } else {
                    this.$layer.open({
                        content: res.msg,
                        skin: 'msg',
                        time: 2 //2秒后自动关闭
                    })
                }
            })
        },
        onChange(value, index) {
            this.gopage('/addPayment?type=' + (index + 1) + "&mode=1")
        },
        // 编辑微信收款方式
        editWxPay(t) {
            this.$router.push({
                path: '/addPayment',
                query: {
                    type: t.payType,
                    mode: '2',
                    item: t
                    // account: this.payInfoList.wxPayAccount,
                    // name: this.payInfoList.wxPayName,
                    // path: this.payInfoList.wxPayPath,
                    // phone: this.payInfoList.wxPayPhone,
                }
            })
        },
        // 编辑支付宝收款方式
        editZfb() {
            this.$router.push({
                path: '/addPayment',
                query: {
                    type: 2,
                    mode: '2',
                    account: this.payInfoList.zfbpayAccount,
                    name: this.payInfoList.zfbPayName,
                    path: this.payInfoList.zfbPayPath,
                    phone: this.payInfoList.zfbPayPhone,
                }
            })
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    created() {
        this.getUserPayInfoList()
    }
};

</script>

<style rel="stylesheet/scss" scoped lang="scss">
.content-box {
    .no-data {
        width: 50%;
        margin: 110px auto;
        > p {
            font-size: 12px;
            font-weight: 500;
            color: rgba(53, 53, 53, 1);
            margin-bottom: 38px;
            text-align: center;
        }
        img {
            width: 100%;
            margin-bottom: 18px;
        }
        > p:nth-child(3) {
            color: rgba(200, 205, 211, 1);
        }
    }
    .with-data {
        .the-way {
            display: flex;
            padding: 0 15px;
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #ebebeb;
            > div:nth-child(1) {
                width: 18px;
                margin-right: 16px;
                img {
                    width: 100%;
                    vertical-align: unset;
                }
            }
            > div:nth-child(2) {
                flex: 1;
                p {
                    font-size: 12px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(53, 53, 53, 1);
                }
            }
            > div:nth-child(3) {
                width: 60px;
                text-align: center;
                span {
                    // display: inline-block;
                    padding: 4px 14px;
                    background: #566bf3;
                    font-size: 12px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 1);
                    border-radius: 4px;
                }
            }
        }
    }
}
.add-btn {
    position: fixed;
    bottom: 0;
    height: 62px;
    line-height: 62px;
    padding: 0 15px;
    width: 100%;
    border-top: 1px solid rgba(235, 235, 235, 1);
    text-align: center;
    span {
        display: inline-block;
        width: 100%;
        height: 34px;
        line-height: 34px;
        background: rgba(86, 107, 243, 1);
        border-radius: 4px;
        cursor: pointer;
        color: #fff;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
    }
}
</style>
