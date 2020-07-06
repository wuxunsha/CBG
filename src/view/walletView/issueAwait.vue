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
        <div class="search2"
             @click="$router.push('/service')">
            <img src="../../assets/wallet/deal/dianhua.png">
        </div>
        <div class="issue-info">
            <h3 @click="$router.go(-1)">
                <van-icon name="arrow-left"
                          size="22"
                          color="#fff" />
            </h3>
            <div>
                <img src="../../assets/wallet/deal/shi.png">
                <p>待放币</p>
            </div>
        </div>
        <div class="sell">
            <div class="sell-top">
                <h3 style="font-size:12px">订单金额</h3>
                <p style="color:#556BF3;font-size:18px">{{infoList.price}} CNY</p>
                <p>单价<span style="color:#353535;margin:0 0 0 50px">{{infoList.price}}</span></p>
                <p>数量<span style="color:#353535;margin:0 0 0 50px">{{infoList.totalNum}} USDT</span></p>
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
                <p>二维码</p>
                <p v-if="infoList.userInfo"
                   style="font-size:12px"><span>
                        <img :src="infoList.userInfo.zfbPayPath"></span></p>
                <p v-else-if="infoList.userInfo"
                   style="font-size:12px"><span>
                        <img :src="infoList.userInfo.wxPayPath"></span></p>
                <p v-else-if="infoList.userInfo"
                   style="font-size:12px"><span>
                        <img :src="infoList.userInfo.bankPayPath"></span></p>
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
        </div>

        <div class="issue-tip">
            <h3>付款截图</h3>
            <div>
                <van-uploader v-model="fileList"
                              :after-read="afterRead"
                              max-count="1" />
            </div>
        </div>

        <div class="go-buy"
             @click="showPop = true">
            已付款
        </div>

        <div class="pop">
            <van-popup v-model="showPop"
                       :class="'popPop'">
                <div class="pop-main">
                    <h3>支付产业押金</h3>
                    <div class="pop-content">
                        <div class="pop-left">
                            <p>付款金额<span style="color:#566BF3;margin: 0 0 0 15px">{{infoList.price}}CNY</span></p>
                        </div>
                    </div>
                    <div class="input-focus">
                        <input ref="newPsd"
                               v-model="newPassword"
                               type="text"
                               maxlength="6"
                               v-focus="true" />
                    </div>

                    <div class="box">
                        <div class="pop-box"
                             @click="passwordFocus">
                            <p v-if="newPassword.length>0"
                               class="dot"></p>
                        </div>
                        <div class="pop-box"
                             @click="passwordFocus">
                            <p v-if="newPassword.length>1"
                               class="dot"></p>
                        </div>
                        <div class="pop-box"
                             @click="passwordFocus">
                            <p v-if="newPassword.length>2"
                               class="dot"></p>
                        </div>
                        <div class="pop-box"
                             @click="passwordFocus">
                            <p v-if="newPassword.length>3"
                               class="dot"></p>
                        </div>
                        <div class="pop-box"
                             @click="passwordFocus">
                            <p v-if="newPassword.length>4"
                               class="dot"></p>
                        </div>
                        <div class="pop-box"
                             @click="passwordFocus">
                            <p v-if="newPassword.length>5"
                               class="dot"></p>
                        </div>
                    </div>

                    <div class="config">
                        <div class="cancel"
                             @click="showPop=false">取消</div>
                        <div class="config-on"
                             @click="configBuy">确认付款</div>
                    </div>
                </div>
            </van-popup>
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
            showPop: false,
            newPassword: '',
            checked: false,
            infoList: [],
            fileList: [],
            typeId: 1,
        }
    },
    directives: {
        focus: {
            inserted: function (el, { value }) {
                if (value) {
                    el.focus();
                }
            }
        }

    },
    components: {
        chooseCards
    },
    mounted() {
        this.infoList = this.$route.query.item
        this.fileList = [
            { url: this.$route.query.item.payImgPath }
        ]
        console.log(this.fileList);

    },
    methods: {
        chooseCoin() {

        },
        afterRead() {

        },
        passwordFocus() {
            this.$refs.newPsd.focus();
        },

        configBuy() {
            let data = {
                token_: this.$store.state.newToken,
                orderId: this.infoList.id,
                paypassword: this.newPassword,
            }
            this.$http.post(this.$lib.host + 'otc/agree', this.qsParams(data)).then(res => {
                if (res.code == 200) {
                    this.$router.push({ path: '/issueOlerdy', query: { item: this.infoList } })
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

        }
    },

    watch: {
        password: function (newV, oldV) {
            if (newV.length == 6) {

            }
        },
        show: function (newV, oldV) {
            if (newV == true) {
                this.$nextTick(function () {
                    this.$refs.setPsd.focus();
                })
            } else {
                this.password = ''
            }
        },
        showPop: function (newV, oldV) {
            if (newV == true) {
                this.$nextTick(function () {
                    this.$refs.newPsd.focus();
                })
            } else {
                this.newPassword = ''
            }
        },

    },
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
                // background-color: blue;
                img {
                    width: 100%;
                    height: 100%;
                }
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
        font-size: 14px;
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
    font-size: 14px;
    width: 90%;
    margin: 10px auto;
    height: 33px;
    line-height: 33px;
    text-align: center;
    color: #a5abad;
    background-color: #ebebeb;
}
.popPop {
    height: 253px;
    width: 337px;
    border-radius: 10px;
}
.pop-main {
    h3 {
        text-align: center;
        color: #343b3a;
        padding: 8px 0;
        border-bottom: 1px solid #ebebeb;
        font-size: 16px;
    }
    .pop-content {
        margin: 20px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        .pop-left {
            text-align: center;
            margin: 0 auto;
            p {
                margin-bottom: 10px;
                span {
                    color: #566bf3;
                }
            }
        }
        .pop-right {
            margin: -8px 0 0 0;
            display: flex;
            align-items: center;
            img {
                width: 18px;
                height: 18px;
                margin-right: 10px;
            }
            p {
                color: #566bf3;
            }
        }
    }
    .input-focus {
        margin: -33px 0 0 0;
        input {
            opacity: 0;
        }
    }
    .box {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        .pop-box {
            width: 32px;
            height: 32px;
            display: flex;
            border: 1px solid #afafaf;
            border-radius: 2px;
        }
        .dot {
            margin: 10px auto 0;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #000;
        }
    }
    .config {
        border-top: 1px solid #ebebeb;
        padding: 10px 0 0 0;
        margin-top: 35px;
        display: flex;
        justify-content: center;
        text-align: center;
        line-height: 33px;
        font-size: 14px;
        .config-on {
            width: 120px;
            height: 33px;
            background-color: #566bf3;
            color: #fff;
            border-radius: 2px;
            margin: 0 8px;
        }
        .cancel {
            width: 120px;
            height: 33px;
            background: #f7f6fb;
            color: #343b3a;
            border-radius: 2px;
            margin: 0 8px;
        }
    }
}
</style>