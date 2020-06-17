<template>
    <div class="people-stock">
        <!-- <div class="navBox">
            <van-nav-bar :title="`发布买入`"
                         fixed
                         left-arrow
                         @click-left="goback()" />
        </div> -->
        <div class="search">
            <img src="../../assets/wallet/deal/图层 5@2x (2).png">
        </div>
        <div class="issue-info">
            <h3 @click="$router.go(-1)">
                <van-icon name="arrow-left"
                          size="22"
                          color="#fff" />
            </h3>
            <div>
                <img src="../../assets/wallet/deal/图层 4@2x (1).png">
                <p>待支付</p>
            </div>
            <p>请在15:26前付钱给对方 </p>
        </div>
        <div class="sell">
            <div class="sell-top">
                <h3>请向对方支付</h3>
                <p style="color:#556BF3;">190.05 CNY <img src="../../assets/wallet/deal/图层 7@2x (2).png"></p>
                <p>单价<span style="color:#353535;margin:0 0 0 50px">0.33-0.36</span></p>
                <p>数量<span style="color:#353535;margin:0 0 0 50px">500.00 CBK</span></p>
            </div>
        </div>
        <div class="line">

        </div>
        <div class="buy-num">

            <div class="num">
                <span>支付方式</span>
                <div>
                    <img src="../../assets/wallet/deal/支付宝@2x.png">
                    <p>支付宝</p>
                    <img src="../../assets/wallet/deal/图层 5 拷贝@2x (1).png">
                </div>
            </div>
            <div class="total">
                <p>总价</p>
                <p style="font-size:12px">孙小姐<img src="../../assets/wallet/deal/图层 7@2x (2).png"></p>
            </div>
            <div class="total">
                <p>二维码</p>
                <p style="font-size:12px">
                    <span></span></p>
            </div>
            <div class="total">
                <p>支付宝账号</p>
                <p style="font-size:12px">18030313795<img src="../../assets/wallet/deal/图层 7@2x (2).png"></p>
            </div>
            <div class="total">
                <p>订单号</p>
                <p style="font-size:12px">215487531214564<img src="../../assets/wallet/deal/图层 7@2x (2).png"></p>
            </div>
            <div class="total">
                <p>下单时间</p>
                <p style="font-size:12px">14:56 04/26/2020</p>
            </div>
        </div>

        <div class="issue-tip">
            <h3>上传付款截图</h3>
            <div>
                <van-uploader :after-read="afterRead" />
                <van-uploader :after-read="afterRead" />
                <van-uploader :after-read="afterRead" />
            </div>
            <p>可上传3张,支持JPG/PNG/JPEG格式文件，且不超过2M</p>
        </div>

        <div class="go-buy">
            <p @click="$router.push('/issueRules')">取消订单</p>
            <span @click="$router.push('/issueAwait')">标记为已付款</span>
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

            checked: false
        }
    },
    components: {
        chooseCards
    },
    mounted() {

    },
    methods: {
        chooseCoin() {

        },
        afterRead() {

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
.issue-info {
    padding: 0 15px;
    width: 100%;
    height: 150px;
    line-height: 40px;
    background: #556bf3;
    overflow: hidden;
    h3 {
        margin: 20px 0 0;
    }
    div {
        margin: 20px 0 0;
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
    display: flex;
    justify-content: space-around;
    text-align: center;
    margin: 10px 0;
    border-top: 1px solid #ebebeb;
    padding: 10px 0 0 0;
    p {
        width: 160px;
        height: 33px;
        line-height: 33px;
        background: rgba(247, 245, 251, 1);
        border: 1px solid rgba(235, 235, 235, 1);
        border-radius: 2px;
    }
    span {
        width: 160px;
        height: 33px;
        line-height: 33px;
        background: #556bf3;
        color: #fff;
    }
}
</style>