<template>
    <div class="people-stock">
        <!-- <div class="navBox">
            <van-nav-bar :title="`发布买入`"
                         fixed
                         left-arrow
                         @click-left="goback()" />
        </div> -->
        <div class="search">
            <img src="../../assets/wallet/deal/dian.png">
        </div>
        <div class="search2">
            <img src="../../assets/wallet/deal/dianhua.png">
        </div>
        <div class="issue-info">
            <h3 @click="$router.push({path:'/deal',query:{item:''}})">
                <van-icon name="arrow-left"
                          size="22"
                          color="#fff" />
            </h3>
            <div>
                <img src="../../assets/wallet/deal/true.png">
                <p>已完成</p>
            </div>
        </div>
        <div class="sell">
            <div class="sell-top">
                <h3 style="font-size:12px">订单金额</h3>
                <p style="color:#556BF3;font-size:18px">{{infoList.price}} CNY</p>
                <p>单价<span style="color:#353535;margin:0 0 0 50px">{{infoList.price}}</span> </p>
                <p>数量<span style="color:#353535;margin:0 0 0 50px">{{infoList.totalNum}} CBK</span></p>
            </div>
        </div>
        <div class="line">

        </div>
        <div class="buy-num">
            <div class="num">
                <span>支付方式</span>
                <div>
                    <img src="../../assets/wallet/deal/zfb.png">
                    <p>支付宝</p>
                    <!-- <img src="../../assets/wallet/deal/kao.png"> -->
                </div>
            </div>
            <div class="total">
                <p>用户名</p>
                <p style="font-size:12px">{{infoList.creatorId}}</p>
            </div>

            <div class="total">
                <p>支付宝账号</p>
                <p style="font-size:12px">18030313795</p>
            </div>
            <div class="total">
                <p>订单号</p>
                <p style="font-size:12px">{{infoList.id}}</p>
            </div>
            <div class="total">
                <p>下单时间</p>
                <p style="font-size:12px">14:56 04/26/2020</p>
            </div>
            <div class="total">
                <p>支付时间</p>
                <p style="font-size:12px">14:56 04/26/2020</p>
            </div>
            <div class="total">
                <p>放付时间</p>
                <p style="font-size:12px">14:56 04/26/2020</p>
            </div>
        </div>

    </div>
</template>

<script>
import chooseCards from '../../components/wallet/chooseCard'
import {
    quan_detail
} from '../../data/wallet';
import { Popup } from 'vant';
export default {
    data() {
        return {
            infoList: [],
            checked: false
        }
    },
    components: {
        chooseCards
    },
    mounted() {
        this.infoList = this.$route.query.item
    },
    methods: {
        chooseCoin() {

        }
    },

    watch: {

    }
}

</script>
<style lang='scss' scoped>
.search {
    position: absolute;
    right: 15px;
    top: 15px;
    img {
        width: 18px;
        height: 18px;
    }
}
.search2 {
    position: absolute;
    right: 45px;
    top: 15px;
    img {
        width: 18px;
        height: 18px;
    }
}
.issue-info {
    padding: 30px 15px 0;
    width: 100%;
    height: 130px;
    line-height: 40px;
    background: #556bf3;
    overflow: hidden;
    h3 {
        font-size: 12px;
    }
    div {
        margin: 30px 0 0;
        display: flex;
        align-items: center;
        img {
            width: 18px;
            height: 18px;
        }
        p {
            margin-left: 15px;
            font-size: 18px;
            color: #fff;
        }
    }
    p {
        color: #fff;
    }
}
.sell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ebebeb;
    padding: 15px 15px 0;
    .sell-top {
        p {
            margin-bottom: 10px;
        }
        img {
            width: 12px;
            height: 12px;
            margin: -3px 0 0 25px;
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
.line {
    width: 100%;
    height: 10px;
    background-color: #f7f5fb;
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
        margin: 10px 0;
    }
    div {
        display: flex;
        justify-content: space-between;
    }
    p {
        color: #c7cdd3;
        font-size: 12px;
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
    color: #a5abad;
    background-color: #ebebeb;
}
</style>