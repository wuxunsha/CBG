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
                <img src="../../assets/wallet/deal/图层 11@2x.png">
                <img src="../../assets/wallet/deal/图层 12@2x.png">
            </div>
        </div>
        <div v-if="tabNum == 0">
            <div class="info">
                <div class="info-left">
                    <p><span>昨日价格</span><span>0.3600</span></p>
                    <p><span>今日价格</span><span>0.3651</span></p>
                </div>
                <div class="info-right">
                    <p>+0.514%</p>
                </div>
            </div>
            <div class="main">
                <div class="search">
                    <img src="../../assets/wallet/deal/矢量智能对象@2x.png">
                    <input type="text"
                           placeholder="昵称搜索">
                </div>
                <div class="nodata">
                    <img src="../../assets/wallet/deal/图层 7 拷贝@2x.png">
                    <p>暂无买单</p>
                    <p class="go-buy"
                       @click="$router.push('/issue')">发布买单</p>
                </div>
            </div>
        </div>

        <div v-if="tabNum== 1">
            <div class="info">
                <div class="info-left">
                    <p><span>昨日价格</span><span>0.3600</span></p>
                    <p><span>今日价格</span><span>0.3651</span></p>
                </div>
                <div class="info-right">
                    <p>+0.514%</p>
                </div>
            </div>
            <div class="main">
                <div class="search">
                    <img src="../../assets/wallet/deal/矢量智能对象@2x.png">
                    <input type="text"
                           placeholder="昵称搜索">
                </div>
                <div class="sell">
                    <div class="sell-top">
                        <p><i></i><span>孙小姐</span></p>
                        <p>515 / 99.81%</p>
                    </div>
                    <div class="sell-center">
                        <p><span>需求(TB)</span><span style="color:#353535">3744.699</span><span style="margin:0 0 0 10px">需求(TB)</span><span style="color:#353535">3744.699</span></p>
                        <p>单价</p>
                    </div>
                    <div class="sell-center">
                        <p><span>限额(CNY)</span><span style="color:#353535">36.00~180.00 CNY</span></p>
                        <p style="font-size:18px;font-weight:800;color:rgba(33,239,185,1);">0.381CNY</p>
                    </div>
                    <div class="sell-footer">
                        <p>
                            <img src="../../assets/wallet/deal/支付宝@2x.png">
                            <img src="../../assets/wallet/deal/微信@2x.png">
                        </p>
                        <p class="trad"><span>出售</span> </p>
                    </div>
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
            tab: ["我要买", "我要卖"],
            tabNum: 0,

        }
    },
    components: {
        myFooter
    },
    methods: {
        demoClick(index) {
            console.log(index);
            this.tabNum = index;
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