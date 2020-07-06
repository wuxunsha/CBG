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
        <div class="issue-info">
            <h3 @click="$router.go(-1)">
                <van-icon name="arrow-left"
                          size="22"
                          color="#fff" />
            </h3>
            <div>
                <img src="../../assets/wallet/deal/shi.png">
                <p>待支付</p>
            </div>
            <p>请在{{time(count)}}前付钱给对方 </p>
        </div>
        <div class="sell">
            <div class="sell-top">
                <h3>请向对方支付</h3>
                <p style="color:#556BF3;">{{infoList.price}}CNY <img src="../../assets/wallet/deal/fufufu.png"
                         v-clipboard:copy="infoList.price"
                         v-clipboard:success="onCopy"
                         v-clipboard:error="onError"></p>
                <p>单价<span style="color:#353535;margin:0 0 0 50px">{{infoList.price}}</span></p>
                <p>数量<span style="color:#353535;margin:0 0 0 50px">{{infoList.totalNum}}USDT</span></p>
            </div>
        </div>
        <div class="line">

        </div>
        <div class="buy-num">

            <div class="num">
                <span>支付方式</span>
                <div>
                    <img :src="typeImg">
                    <p>{{mode}}</p>
                    <img @click="chooseType"
                         src="../../assets/wallet/deal/kao.png">
                </div>
            </div>
            <div class="total">
                <p>用户名</p>
                <p style="font-size:12px">{{infoList.creatorId}}<img v-clipboard:copy="infoList.creatorId"
                         v-clipboard:success="onCopy"
                         v-clipboard:error="onError"
                         src="../../assets/wallet/deal/fufufu.png"></p>
            </div>
            <div class="total">
                <p>二维码</p>
                <p v-if="typeId == 1&&infoList.userInfo"
                   style="font-size:12px"><span>
                        <img :src="infoList.userInfo.zfbPayPath"></span></p>
                <p v-else-if="typeId == 2&&infoList.userInfo"
                   style="font-size:12px"><span>
                        <img :src="infoList.userInfo.wxPayPath"></span></p>
                <p v-else-if="typeId == 0&&infoList.userInfo"
                   style="font-size:12px"><span>
                        <img :src="infoList.userInfo.bankPayPath"></span></p>
            </div>
            <div class="total">
                <p v-if="typeId == 1">支付宝账号</p>
                <p v-else-if="typeId == 2">微信账号</p>
                <p v-else-if="typeId == 0">银行卡账号</p>
                <div v-if="infoList.userInfo">
                    <p v-if="typeId == 1"
                       style="font-size:12px">{{infoList.userInfo.zfbPayAccount}}<img v-clipboard:copy="infoList.userInfo.zfbPayAccount"
                             v-clipboard:success="onCopy"
                             v-clipboard:error="onError"
                             src="../../assets/wallet/deal/fufufu.png"></p>
                    <p v-else-if="typeId == 2"
                       style="font-size:12px">{{infoList.userInfo.wxPayAccount}}<img v-clipboard:copy="infoList.userInfo.wxPayAccount"
                             v-clipboard:success="onCopy"
                             v-clipboard:error="onError"
                             src="../../assets/wallet/deal/fufufu.png"></p>
                    <p v-else-if="typeId == 0"
                       style="font-size:12px">{{infoList.userInfo.bankPayAccount}}<img v-clipboard:copy="infoList.userInfo.bankPayAccount"
                             v-clipboard:success="onCopy"
                             v-clipboard:error="onError"
                             src="../../assets/wallet/deal/fufufu.png"></p>
                </div>
            </div>
            <div class="total">
                <p>订单号</p>
                <p style="font-size:12px">{{infoList.id}}<img v-clipboard:copy="infoList.id"
                         v-clipboard:success="onCopy"
                         v-clipboard:error="onError"
                         src="../../assets/wallet/deal/fufufu.png"></p>
            </div>
            <div class="total">
                <p>下单时间</p>
                <p style="font-size:12px">14:56 04/26/2020</p>
            </div>
        </div>

        <div class="issue-tip">
            <h3>上传付款截图</h3>
            <div>
                <van-uploader v-model="fileList"
                              :after-read="afterRead"
                              max-count="1" />
            </div>
            <p>可上传3张,支持JPG/PNG/JPEG格式文件，且不超过2M</p>
        </div>

        <div class="go-buy">
            <p @click="cancel">取消订单</p>
            <span @click="configBuy">标记为已付款</span>
        </div>

        <div class="pop">
            <van-popup v-model="showPop"
                       :class="'popPop'">
                <div class="pop-main">
                    <h3>标记为已付款</h3>
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
            fileList: [],
            infoList: [],
            mode: '支付宝',
            typeImg: require('../../assets/wallet/deal/zfb.png'),
            checked: false,
            typeId: 1,
            zfbPayAccount: '',
            actEndTime: '0:0',
            count: '',
            img: '',
            showPop: false,
            newPassword: '',
        }
    },
    components: {
        chooseCards
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
    created() {

    },
    mounted() {
        this.typeId = 1
        this.infoList = this.$route.query.item
        // this.img = this.$route.query.item.userInfo.zfbPayPath
        // console.log(this.img);
        // this.img = require(this.img)
        this.countDown()
    },
    computed: {
        time() { //这个函数是每秒把时间重新计算下
            return function (time) {
                // console.log(time);
                if (time >= 0) {
                    let day = parseInt(time / 60 / 60 / 24)
                    let hr = parseInt(time / 60 / 60 % 24)
                    let min = parseInt(time / 60 % 60)
                    let sec = parseInt(time % 60)
                    day = day > 9 ? day : '0' + day
                    hr = hr > 9 ? hr : '0' + hr
                    min = min > 9 ? min : '0' + min
                    sec = sec > 9 ? sec : '0' + sec
                    return day = min + '分' + sec + '秒'
                }
            }
        },
    },
    methods: {
        countDown() {
            const TIME_COUNT = (new Date().getTime() + 900000 - new Date().getTime()) / 1000
            if (!this.timer) {
                this.count = TIME_COUNT
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--
                    } else {
                        clearInterval(this.timer)
                        this.timer = null
                    }
                }, 1000)
            }
        },
        chooseType() {
            this.typeId++
            if (this.typeId == 1) {
                this.mode = '支付宝'
                this.typeImg = require('../../assets/wallet/deal/zfb.png')
            } else if (this.typeId == 2) {
                this.mode = '微信'
                this.typeImg = require('../../assets/wallet/deal/wx.png')
            } else if (this.typeId == 3) {
                this.mode = '银行卡'
                this.typeImg = require('../../assets/wallet/deal/ying.png')
                this.typeId = 0
            }

        },
        chooseCoin() {

        },
        afterRead(file) {
            let param = new FormData()
            console.log(file);

            param.append('fileName', file.file)
            param.append('type', 1)
            param.append('orderId', this.infoList.id)
            param.append('token_', this.$store.state.newToken)

            this.$http.post(this.$lib.host + '/imageUpload', param).then(res => {
                if (res.code == 200) {
                    console.log(res);
                    this.img = res.data.relativePath
                    this.$layer.open({
                        content: res.data.result_msg,
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
        cancel() {
            let data = {
                token_: this.$store.state.newToken,
                orderId: this.infoList.id,
            }
            this.$http.post(this.$lib.host + 'otc/quxiao', this.qsParams(data)).then(res => {
                if (res.code == 200) {
                    console.log(res);
                    this.$router.push('/deal')
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
        configBuy() {
            if (!this.img) {
                this.$layer.open({
                    content: '请上传合适截图',
                    skin: 'msg',
                    time: 2 //2秒后自动关闭
                })
                this.showPop = false
                return
            }

            let data = {
                token_: this.$store.state.newToken,
                orderId: this.infoList.id,
            }
            this.$http.post(this.$lib.host + 'otc/updateYzf', this.qsParams(data)).then(res => {
                if (res.code == 200) {
                    this.$router.push({ path: '/orderList', query: { item: this.infoList, img: this.img } })
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
        //复制地址
        onCopy: function (e) {
            console.log(11);

            this.$layer.open({ time: 3, skin: 'msg', content: '复制成功' });
        },
        onError: function (e) {
            this.$layer.open({ time: 3, skin: 'msg', content: '复制失败' });
        },
        passwordFocus() {
            this.$refs.newPsd.focus();
        },
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
.issue-info {
    padding: 0 15px;
    width: 100%;
    height: 150px;
    line-height: 40px;
    background: #556bf3;
    overflow: hidden;
    h3 {
        margin: 0;
        margin-top: 16px;
        font-size: 12px;
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
        h3 {
            font-size: 12px;
            font-weight: bold;
            color: rgba(53, 53, 53, 1);
        }
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
                    margin: 0;
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
        font-size: 12px;
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
        font-size: 14px;
        width: 160px;
        height: 33px;
        line-height: 33px;
        background: rgba(247, 245, 251, 1);
        border: 1px solid rgba(235, 235, 235, 1);
        border-radius: 2px;
    }
    span {
        font-size: 14px;
        width: 160px;
        height: 33px;
        line-height: 33px;
        background: #556bf3;
        color: #fff;
    }
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