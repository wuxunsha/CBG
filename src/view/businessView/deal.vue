<template>
    <div>
        <!-- <div class="navBox opacity">
            <van-nav-bar :title="`${$t('feature.deal.nav_title')}`" />
        </div> -->
        <div class="content">
            <div class="detail-tab">
                <div class="tab-bar"
                     v-for="(t,index) in tab"
                     :key="index"
                     :class="{'avtive':index == tabNum}"
                     @click="demoClick(index)">{{t}}</div>
            </div>
            <div class="detail-pig">
                <img @click="$router.push('/myList')"
                     src="../../assets/wallet/deal/zhizhi.png">
                <img @click="$router.push('/orderList')"
                     src="../../assets/wallet/deal/zhizh.png">
            </div>
        </div>
        <div v-if="tabNum == 0"
             style="margin:0 0 50px 0">
            <div class="info">
                <div class="info-left">
                    <p><span>昨日价格</span><span>{{priceList.昨日价格}}</span></p>
                    <p><span>今日价格</span><span>{{priceList.今日价格}}</span></p>
                </div>
                <div class="info-right">
                    <p v-if="priceList.今日价格 > priceList.昨日价格">+{{((Number(priceList.今日价格)-Number(priceList.昨日价格)) / Number(priceList.昨日价格)).toFixed(2) * 100}}%</p>
                    <p style=""
                       v-else>{{((Number(priceList.今日价格)-Number(priceList.昨日价格)) / Number(priceList.昨日价格)).toFixed(2) * 100}}%</p>
                </div>
            </div>
            <div class="main">
                <div class="main-buy">
                    <div class="search">
                        <img src="../../assets/wallet/deal/se.png"
                             @click="search">
                        <input type="text"
                               placeholder="昵称搜索"
                               v-model="serach">
                    </div>
                    <p class="go-buy"
                       @click="goIssue(1)">发布买单</p>
                </div>

                <div class="sell"
                     v-for="(i,index) in issueList"
                     :key="index">
                    <div class="sell-top">
                        <p><i></i><span>{{i.creatorId}}</span></p>
                        <!-- <p>515 / 99.81%</p> -->
                    </div>
                    <div class="sell-center">
                        <p><span>需求(USDT) </span><span style="color:#353535;margin:0 0 0 5px">{{i.totalNum}}</span></p>
                        <p style="font-size:14px;font-weight:400;color:#a5acae;"><span style="font-size:14px;color:#a5acae;font-weight:400;">单价： </span> {{i.price}}CNY</p>

                    </div>
                    <div class="sell-center">
                        <p><span>总价(CNY)</span><span style="color:#353535"></span></p>
                        <p style="font-size:18px;font-weight:800;color:rgba(33,239,185,1);">{{ Number(i.totalNum) * Number(i.price)}}CNY</p>
                    </div>
                    <div class="sell-footer">
                        <p>
                            <span v-for="(item,index) in i.payTypeList"
                                  :key="index">
                                <img v-if="item.payType == 1"
                                     src="../../assets/wallet/deal/zfb.png">
                                <img v-if="item.payType == 2"
                                     src="../../assets/wallet/deal/wx.png">
                                <img v-if="item.payType == 3"
                                     src="../../assets/wallet/deal/ying.png">
                            </span>
                        </p>
                        <p class="trad"><span @click="config(i)">购买</span> </p>
                    </div>
                </div>

                <div class="nodata"
                     v-if="issueList.length == 0">
                    <img src="../../assets/wallet/deal/nodata.png">
                    <p>暂无买单</p>

                </div>
            </div>
        </div>

        <div v-if="tabNum== 1"
             style="margin:0 0 50px 0">
            <div class="info">
                <div class="info-left">
                    <p><span>昨日价格</span><span>{{priceList.昨日价格}}</span></p>
                    <p><span>今日价格</span><span>{{priceList.今日价格}}</span></p>
                </div>
                <div class="info-right">
                    <p v-if="priceList.今日价格 > priceList.昨日价格">+{{((Number(priceList.今日价格)-Number(priceList.昨日价格)) / Number(priceList.昨日价格)).toFixed(2) * 100}}%</p>
                    <p style=""
                       v-else>{{((Number(priceList.今日价格)-Number(priceList.昨日价格)) / Number(priceList.昨日价格)).toFixed(2) * 100}}%</p>
                </div>
            </div>
            <div class="main">
                <div class="main-buy">
                    <div class="search">
                        <img src="../../assets/wallet/deal/se.png"
                             @click="search">
                        <input type="text"
                               placeholder="昵称搜索"
                               v-model="serach">
                    </div>
                    <p class="go-buy"
                       @click="goIssue(2)">发布卖单</p>
                </div>
                <div class="sell"
                     v-for="(i,index) in sellList"
                     :key="index">
                    <div class="sell-top">
                        <p><i></i><span>{{i.creatorId}}</span></p>
                        <!-- <p>515 / 99.81%</p> -->
                    </div>
                    <div class="sell-center">
                        <p><span>需求(USDT) </span><span style="color:#353535;margin:0 0 0 5px">{{i.totalNum}}</span></p>
                        <p style="font-size:14px;font-weight:400;color:#a5acae;"><span style="font-size:14px;color:#a5acae;font-weight:400;">单价： </span> {{i.price}}CNY</p>

                    </div>
                    <div class="sell-center">
                        <p><span>总价(CNY)</span><span style="color:#353535"></span></p>
                        <p style="font-size:18px;font-weight:800;color:rgba(33,239,185,1);">{{ Number(i.totalNum) * Number(i.price)}}CNY</p>
                    </div>
                    <div class="sell-footer">
                        <p>
                            <span v-for="(item,index) in i.payTypeList"
                                  :key="index">
                                <img v-if="item.payType == 1"
                                     src="../../assets/wallet/deal/zfb.png">
                                <img v-if="item.payType == 2"
                                     src="../../assets/wallet/deal/wx.png">
                                <img v-if="item.payType == 3"
                                     src="../../assets/wallet/deal/ying.png">
                            </span>
                        </p>
                        <p class="trad"><span @click="config(i)">出售</span> </p>
                    </div>
                </div>
                <div class="nodata"
                     v-if="sellList.length == 0">
                    <img src="../../assets/wallet/deal/nodata.png">
                    <p>暂无卖单</p>
                </div>
            </div>
        </div>
        <myFooter :footerNavActive="activeType"></myFooter>
    </div>
</template>

<script>
import myFooter from "../../components/wallet/footer.vue";
import { log } from '../../data/wallet';
import {
    mapMutations,
    mapState
} from 'vuex'
export default {
    props: ['footerNavActive'],
    data() {
        return {
            activeType: "deal",
            tab: ["我要买", "我要卖"],
            tabNum: 0,
            issueList: [],
            sellList: [],
            priceList: [],
            serach: ''
        }
    },
    components: {
        myFooter
    },
    created() {
        this.getDealList()
    },
    computed: {
        ...mapState(['userInfo'])
    },
    mounted() {
        this.getPrice()
        console.log(this.userInfo);
    },
    methods: {
        search() {
            this.getDealList()
            setTimeout(() => {
                if (this.tabNum == 0) {
                    let list = this.issueList.filter(item => item.creatorId.indexOf(this.serach) >= 0);
                    this.issueList = list;
                } else {
                    let list = this.sellList.filter(item => item.creatorId.indexOf(this.serach) >= 0);
                    this.sellList = list;
                    console.log(this.sellList);
                }
            }, 1000)
        },
        demoClick(index) {
            console.log(index);
            this.tabNum = index;
        },
        getPrice() {
            this.$http.get(this.$lib.host + 'otc/getPriceInfo', {
                params: {
                    token_: this.$store.state.newToken
                }
            }).then(res => {
                if (res.code == 200) {
                    console.log(res);
                    this.priceList = res.data
                    this.$store.commit('setAssetsList', this.priceList)
                }
            })
        },
        goIssue(id) {
            if (this.userInfo.isrz == 1) {
                if (this.userInfo.payTypeList.length !== 0) {
                    if (id == 1) {
                        this.$router.push('/issue')
                    } else {
                        this.$router.push({ path: '/sell', query: { item: '' } })
                    }
                } else {
                    Dialog.confirm({
                        title: '支付方式',
                        message: '是否添加支付方式',
                    }).then(() => {
                        this.$router.push('/paymentMethod')
                    }).catch(() => {
                        Dialog.close
                    });
                }

            } else {
                Dialog.confirm({
                    title: '实名认证',
                    message: '是否去往实名认证',
                }).then(() => {
                    this.$router.push('/identityTwo')
                }).catch(() => {
                    Dialog.close
                });
            }

        },
        getDealList() {
            this.$http.post(this.$lib.newHosts + '/order/orderList').then(res => {
                if (res.code == 1000) {
                    console.log(res);
                    this.issueList = res.data.filter(e => {
                        if (e.type == 1) {
                            return e
                        }
                    })
                    console.log(this.issueList);

                    this.sellList = res.data.filter(e => {
                        if (e.type == 0) {
                            return e
                        }
                    })

                }
            })
        },
        config(i) {
            let data = {
                token_: this.$store.state.newToken,
                orderId: i.id,
            }
            this.$http.post(this.$lib.host + 'otc/buy', this.qsParams(data)).then(res => {
                if (res.code == 200) {
                    console.log(res);
                    if (i.type == 0) {
                        this.$router.push({ path: '/sellWait', query: { item: i } })
                    } else {
                        this.$router.push({ path: '/issueWait', query: { item: i } })
                    }
                    this.$layer.open({
                        content: res.msg,
                        skin: 'msg',
                        time: 2 //2秒后自动关闭
                    })
                } else {
                    this.$layer.open({
                        content: res.msg,
                        skin: 'msg',
                        time: 2 //2秒后自动关闭
                    })
                }
            })

        },

    }
}

</script>
<style lang='scss' scoped>
.content {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    padding: 0 0 0 15px;
    .detail-tab {
        display: flex;
        height: 40px;
        line-height: 40px;
        width: 100%;
    }
    .detail-pig {
        display: flex;
        img {
            width: 15px;
            height: 15px;
            margin: 0 15px 0 0;
        }
    }
}
.info {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    padding: 10px 15px;
    .info-left {
        p {
            span {
                margin-right: 30px;
                color: #353535;
            }
            span:nth-child(2) {
                color: #566bf3;
            }
        }
    }
    .info-right {
        p {
            background: rgba(246, 246, 246, 1);
            border-radius: 4px;
            color: #2cb392;
            padding: 2px 4px;
        }
    }
}
.tab-bar {
    margin-right: 20px;
    font-size: 16px;
    color: #a5acae;
}
.avtive {
    font-size: 20px;
    color: #353535;
}
.main {
    padding: 20px 0 0 0px;
    .search {
        display: flex;
        align-items: center;
        width: 60%;
        border: 1px solid rgba(232, 232, 232, 1);
        border-radius: 4px;
        height: 28px;
        padding: 0 0 0 10px;
        margin-left: 15px;
        img {
            width: 10px;
            height: 12px;
        }
        input {
            font-size: 12px;
            margin-left: 10px;
            border: none;
        }
    }
    .sell {
        padding: 20px 15px;
        border-bottom: 1px solid #ebebeb;
        .sell-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            p {
                display: flex;
                align-items: center;
                i {
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    background: rgba(235, 235, 235, 1);
                    border-radius: 50%;
                    margin-right: 10px;
                }
            }
        }
        .sell-center {
            margin: 10px 0 15px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            p {
                display: flex;
                align-items: center;
                span {
                    color: #a5acae;
                }
            }
        }
        .sell-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            p {
                display: flex;
                img {
                    width: 15px;
                    height: 15px;
                    margin: 0 15px 0 0px;
                }
            }
            .trad {
                font-size: 14px;
                line-height: 33px;
                width: 80px;
                height: 33px;
                background: linear-gradient(
                    -61deg,
                    rgba(33, 239, 185, 1),
                    rgba(85, 107, 243, 1)
                );
                box-shadow: 0px 2px 4px 0px rgba(67, 21, 237, 0.15);
                border-radius: 5px;
                color: #fff;
                span {
                    display: inline-flex;
                    margin-left: 24px;
                }
            }
        }
    }
}
.nodata {
    margin: 50px 0 0 0;
    text-align: center;
    img {
        width: 180px;
        height: 90px;
    }
    p {
        margin: 20px 0 0 0;
    }
}
.main-buy {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    .go-buy {
        width: 20%;
        height: 30px;
        line-height: 30px;
        background: linear-gradient(
            -61deg,
            rgba(34, 239, 185, 1),
            rgba(86, 107, 243, 1)
        );
        box-shadow: 0px 4px 9px 0px rgba(68, 22, 238, 0.15);
        border-radius: 5px;
        color: #fff;
        margin: 0 15px 0 0;
    }
}
</style>