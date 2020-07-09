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
        <div v-if="tabNum == 0">
            <div class="info">
                <div class="info-left">
                    <p><span>昨日价格</span><span>{{priceList.昨日价格}}</span></p>
                    <p><span>今日价格</span><span>{{priceList.今日价格}}</span></p>
                </div>
                <div class="info-right">
                    <p v-if="priceList.今日价格 > priceList.昨日价格">+{{(priceList.今日价格/priceList.昨日价格).toFixed(2)}}%</p>
                    <p style=""
                       v-else>-{{(priceList.今日价格/priceList.昨日价格).toFixed(2)}}%</p>
                </div>
            </div>
            <div class="main">
                <div class="search">
                    <img src="../../assets/wallet/deal/se.png"
                         @click="search">
                    <input type="text"
                           placeholder="昵称搜索"
                           v-model="serach">
                </div>

                <div class="sell"
                     v-for="(i,index) in issueList"
                     :key="index">
                    <div class="sell-top">
                        <p><i></i><span>{{i.creatorId}}</span></p>
                        <p>515 / 99.81%</p>
                    </div>
                    <div class="sell-center">
                        <p><span>需求(TB)</span><span style="color:#353535">{{i.totalNum}}</span><span style="margin:0 0 0 10px">起售(TB)</span><span style="color:#353535">{{i.minNum}}</span></p>
                        <p>单价</p>
                    </div>
                    <div class="sell-center">
                        <p><span>限额(CNY)</span><span style="color:#353535">{{i.minAmount}}~{{i.maxAmount}} CNY</span></p>
                        <p style="font-size:18px;font-weight:800;color:rgba(33,239,185,1);">{{i.price}}CNY</p>
                    </div>
                    <div class="sell-footer">
                        <p>
                            <span v-if="i.userInfo">
                                <img v-if="i.userInfo.zfbPayAccount"
                                     src="../../assets/wallet/deal/zfb.png">
                                <img v-if="i.userInfo.wxPayAccount"
                                     src="../../assets/wallet/deal/wx.png">
                                <img v-if="i.userInfo.bankPayAccount"
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
                    <p class="go-buy"
                       @click="$router.push('/issue')">发布买单</p>
                </div>
            </div>
        </div>

        <div v-if="tabNum== 1">
            <div class="info">
                <div class="info-left">
                    <p><span>昨日价格</span><span>{{priceList.昨日价格}}</span></p>
                    <p><span>今日价格</span><span>{{priceList.今日价格}}</span></p>
                </div>
                <div class="info-right">
                    <p v-if="priceList.今日价格 > priceList.昨日价格">+{{(priceList.今日价格/priceList.昨日价格).toFixed(2)}}%</p>
                    <p style=""
                       v-else>-{{(priceList.今日价格/priceList.昨日价格).toFixed(2)}}%</p>
                </div>
            </div>
            <div class="main">
                <div class="search">
                    <img src="../../assets/wallet/deal/se.png"
                         @click="search">
                    <input type="text"
                           placeholder="昵称搜索"
                           v-model="serach">
                </div>
                <div class="sell"
                     v-for="(i,index) in sellList"
                     :key="index">
                    <div class="sell-top">
                        <p><i></i><span>{{i.creatorId}}</span></p>
                        <p>515 / 99.81%</p>
                    </div>
                    <div class="sell-center">
                        <p><span>需求(TB)</span><span style="color:#353535">{{i.totalNum}}</span><span style="margin:0 0 0 10px">起售(TB)</span><span style="color:#353535">{{i.minNum}}</span></p>
                        <p>单价</p>
                    </div>
                    <div class="sell-center">
                        <p><span>限额(CNY)</span><span style="color:#353535">{{i.minAmount}}~{{i.maxAmount}} CNY</span></p>
                        <p style="font-size:18px;font-weight:800;color:rgba(33,239,185,1);">{{i.price}}CNY</p>
                    </div>
                    <div class="sell-footer">
                        <p>
                            <span v-if="i.userInfo">
                                <img v-if="i.userInfo.zfbPayAccount"
                                     src="../../assets/wallet/deal/zfb.png">
                                <img v-if="i.userInfo.wxPayAccount"
                                     src="../../assets/wallet/deal/wx.png">
                                <img v-if="i.userInfo.bankPayAccount"
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
                    <p class="go-buy"
                       @click="$router.push({path:'/sell',query:{item:''}})">发布卖单</p>
                </div>
            </div>
        </div>
        <myFooter :footerNavActive="activeType"></myFooter>
    </div>
</template>

<script>
import myFooter from "../../components/wallet/footer.vue";
import { log } from '../../data/wallet';
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
    mounted() {
        this.getPrice()
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
        getDealList() {
            this.$http.get(this.$lib.host + 'otc/listOrder', {
                params: {
                    token_: this.$store.state.newToken,
                }
            }).then(res => {
                if (res.code == 200) {
                    console.log(res);
                    this.issueList = res.data.filter(e => {
                        if (e.type == 0) {
                            return e
                        }
                    })
                    console.log(this.issueList);

                    this.sellList = res.data.filter(e => {
                        if (e.type == 1) {
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
    .go-buy {
        margin: 36px auto;
        width: 40%;
        height: 33px;
        line-height: 33px;
        background: linear-gradient(
            -61deg,
            rgba(34, 239, 185, 1),
            rgba(86, 107, 243, 1)
        );
        box-shadow: 0px 4px 9px 0px rgba(68, 22, 238, 0.15);
        border-radius: 5px;
        color: #fff;
    }
}
</style>