<template>
    <div>
        <div class="navBox">
            <van-nav-bar :title="`我的订单`"
                         fixed
                         left-arrow
                         @click-left="goback()" />
        </div>
        <div class="content">
            <div class="detail-tab">
                <div class="tab-bar"
                     v-for="(t,index) in tab"
                     :key="index"
                     :class="{'avtive':index == tabNum}"
                     @click="demoClick(index)">{{t}}</div>
            </div>
        </div>
        <div v-if="tabNum == 0">
            <div class="main">
                <div class="sell"
                     v-for="(i,index) in issueList"
                     :key="index"
                     @click="goBuy(i)">
                    <div class="sell-top">
                        <p><span style="color:#2CB392">{{i.type == 0?'买入':'出售'}}</span><span>{{format(i.buyTime)}}</span></p>

                        <p v-if="i.state == '0'"
                           style="color:#3507DF">未交易</p>
                        <p v-if="i.state == '1'"
                           style="color:#3507DF">待付款</p>
                        <p v-if="i.state == '4'"
                           style="color:#3507DF">已付款未确认</p>
                    </div>
                    <div class="sell-center">
                        <div>
                            <p>价格(CNY)</p>
                            <p>{{i.price}}</p>
                        </div>
                        <div>
                            <p>数量(CNY)</p>
                            <p>{{i.totalNum}}</p>
                        </div>
                        <div style="text-align: right;">
                            <p>实际成交(CNY)</p>
                            <p>{{i.price * i.totalNum}}</p>
                        </div>
                    </div>

                </div>

                <div class="nodata">
                    没有更多
                </div>
            </div>
        </div>

        <div v-if="tabNum== 1">
            <div class="main">
                <div class="sell"
                     v-for="(i,index) in sellList"
                     :key="index">
                    <div class="sell-top">
                        <p><span style="color:#2CB392">{{i.type == 0?'买入':'出售'}}</span><span>15:40 04/03</span></p>
                        <p style="color:#3507DF">已完成</p>
                    </div>
                    <div class="sell-center">
                        <div>
                            <p>价格(CNY)</p>
                            <p>{{i.price}}</p>
                        </div>
                        <div>
                            <p>数量(CNY)</p>
                            <p>{{i.totalNum}}</p>
                        </div>
                        <div style="text-align: right;">
                            <p>实际成交(CNY)</p>
                            <p>{{i.price * i.totalNum}}</p>
                        </div>
                    </div>
                </div>

                <div class="nodata">
                    没有更多
                </div>
            </div>
        </div>

        <div v-if="tabNum== 2">
            <div class="main">
                <div class="sell"
                     v-for="(i,index) in awaitList"
                     :key="index">
                    <div class="sell-top">
                        <p><span style="color:#2CB392">{{i.type == 0?'买入':'出售'}}</span><span>15:40 04/03</span></p>
                        <p style="color:#3507DF">已取消</p>
                    </div>
                    <div class="sell-center">
                        <div>
                            <p>价格(CNY)</p>
                            <p>{{i.price}}</p>
                        </div>
                        <div>
                            <p>数量(CNY)</p>
                            <p>{{i.totalNum}}</p>
                        </div>
                        <div style="text-align: right;">
                            <p>实际成交(CNY)</p>
                            <p>{{i.price * i.totalNum}}</p>
                        </div>
                    </div>

                </div>

                <div class="nodata">
                    没有更多
                </div>
            </div>
        </div>
        <myFooter :footerNavActive="activeType"></myFooter>
    </div>
</template>

<script>
import myFooter from "../../components/wallet/footer.vue";
export default {
    props: ['footerNavActive'],
    data() {
        return {
            activeType: "deal",
            tab: ["未完成", "已完成", '已取消'],
            tabNum: 0,
            issueList: [],
            sellList: [],
            awaitList: []
        }
    },
    components: {
        myFooter
    },
    mounted() {
        this.getDealList()
    },
    methods: {
        demoClick(index) {
            console.log(index);
            this.tabNum = index;
        },
        getDealList() {
            this.$http.post(this.$lib.newHosts + '/order/selectOrderByUser').then(res => {
                if (res.code == 1000) {
                    // console.log(res);
                    this.issueList = res.data.filter(e => {
                        if (e.state == 0 || e.state == 1 || e.state == 4) {
                            return e
                        }
                    })
                    console.log(this.issueList);

                    this.sellList = res.data.filter(e => {
                        if (e.state == 2) {
                            return e
                        }
                    })
                    this.awaitList = res.data.filter(e => {
                        if (e.state == 3) {
                            return e
                        }
                    })
                }
            })
        },
        goBuy(i) {
            if (i.type == 0) {


                if (i.state == 1) {
                    this.$router.push({ path: '/issueWait', query: { item: i } })
                } else if (i.state == 0) {
                    this.$router.push({ path: '/deal', query: { item: '' } })
                } else {
                    this.$router.push({ path: '/issueAwait', query: { item: i } })
                }

            } else {
                if (i.state == 1) {
                    this.$router.push({ path: '/sellWait', query: { item: i } })
                } else if (i.state == 0) {
                    this.$router.push({ path: '/deal', query: { item: '' } })
                } else {
                    this.$router.push({ path: '/sellAWait', query: { item: i } })
                }
            }

        }
    },
    computed: {
        format() {
            return function (shijianchuo) {
                var time = new Date(shijianchuo);
                var y = time.getFullYear();
                var m = time.getMonth() + 1;
                var d = time.getDate();
                var h = time.getHours();
                var mm = time.getMinutes();
                var s = time.getSeconds();
                var value = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
                return value
            }
        }
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
    font-size: 13px;
    color: #a5acae;
}
.avtive {
    font-size: 16px;
    color: #353535;
}
.main {
    padding: 10px 0 0 0px;
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
        padding: 8px 15px 0;
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
                margin-bottom: 6px;
            }
            p:nth-child(2) {
                color: #353535;
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
    margin: 20px 0 0 0;
    text-align: center;
    color: #a5acae;
    font-size: 14px;
}
</style>