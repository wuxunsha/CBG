<template>
    <div class="people-detail">
        <div class="navBox">
            <van-nav-bar :title="`详情`"
                         fixed
                         left-arrow
                         @click-left="goback()" />
        </div>
        <div class="main">
            <div class="people-main">
                <div class="left-main">
                    <img src="../../assets/wallet/people/农业@2x.png">
                </div>
                <div class="right-main">
                    <h3>{{list.level}}</h3>
                    <p>
                        <span>产业价值(USDT)</span>
                        <span>{{list.maxAmount}}-{{list.minAmount}}</span>
                    </p>
                    <p>
                        <span>持股时间</span>
                        <span>{{list.cycle}}</span>
                    </p>
                    <p>
                        <span>产业收益</span>
                        <span>1天/{{list.rate * 100}}%</span>
                    </p>
                    <p>
                        <span>产业数量</span>
                        <span>{{list.number}}</span>
                    </p>
                    <div class="btn"
                         @click="goBuy(list)">
                        预约持股
                    </div>
                </div>
            </div>
            <div class="line"></div>
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
        <!-- <div class="line"></div> -->

        <div v-if="tabNum == 0">
            <div class="content-line"
                 v-for="(i,index) in  orderList"
                 :key="index">
                <div class="order"
                     style="margin:10px 0 0 0">
                    <h3>{{i.orderclass}}</h3>
                    <div class="order-walth">
                        <p>
                            <span>产业价值:</span>
                            <span>50-10</span>
                        </p>
                        <p>
                            <span>状态:</span>
                            <span class="status">预约中</span>
                        </p>
                    </div>
                    <p>
                        <span>产业收益:</span>
                        <span>1天/{{i.rate * 100}}%</span>
                    </p>
                    <div class="order-walth">
                        <p>
                            <span>持股时间:</span>
                            <span>{{i.cycle}}天</span>
                        </p>
                        <p>
                            <span>{{getLocalTime(i.createTime)}}</span>
                        </p>
                    </div>

                </div>
            </div>

            <div class="no-data"
                 v-if="orderList.length == 0">
                暂无数据
            </div>
        </div>

        <div v-if="tabNum== 1">
            <div class="content-line"
                 v-for="(i,index) in  volumeList"
                 :key="index">
                <div class="order"
                     style="margin:10px 0 0 0">
                    <!-- <h3>
                        <img src="../../assets/wallet/people/time.png">
                        <span>付款倒计时56:30</span>
                    </h3> -->
                    <div class="order-center">
                        <p>
                            <span>股权编号:</span>
                            <span>{{i.id}}</span>
                        </p>
                        <p>
                            <span>周期:</span>
                            <span>{{i.cycle}}天</span>
                        </p>
                    </div>
                    <div class="order-center">
                        <p>
                            <span>产业价值:</span>
                            <span>{{i.cyFW}}</span>
                        </p>
                        <p>
                            <span>股份金额:</span>
                            <span>{{i.amount}}U</span>
                        </p>
                    </div>
                    <div class="order-center">
                        <p>
                            <span>产业收益:</span>
                            <span>1天/{{i.rate * 100}}%</span>
                        </p>
                        <p>
                            <span>到期收益:</span>
                            <span>{{i.amount*(1+i.cycle*i.rate)}}U</span>
                        </p>
                    </div>
                    <div class="order-center">
                        <p>
                            <span>TGB:</span>
                            <span>{{i.amount*i.cycle*i.rate}}*{{(i.otherRate *100).toFixed(2)}}%={{i.amount*i.cycle*i.rate*i.otherRate *100}}</span>
                        </p>
                    </div>
                    <!-- <div class="go-buy"
                         @click="showPopup">
                        预约成功,去付款
                    </div> -->
                </div>
            </div>
            <div class="no-data"
                 v-if="volumeList.length == 0">
                暂无数据
            </div>
        </div>
        <div v-if="tabNum== 2">
            <div class="content-line"
                 v-for="(i,index) in  connectList"
                 :key="index">
                <div class="order"
                     style="margin:10px 0 0 0">
                    <!-- <h3>
                        <img src="../../assets/wallet/people/time.png">
                        <span>付款倒计时56:30</span>
                    </h3> -->
                    <div class="order-center">
                        <p>
                            <span>股权编号:</span>
                            <span>{{i.id}}</span>
                        </p>
                        <p>
                            <span>周期:</span>
                            <span>{{i.cycle}}天</span>
                        </p>
                    </div>
                    <div class="order-center">
                        <p>
                            <span>产业价值:</span>
                            <span>{{i.cyFW}}</span>
                        </p>
                        <p>
                            <span>股份金额:</span>
                            <span>{{i.amount}}U</span>
                        </p>
                    </div>
                    <div class="order-center">
                        <p>
                            <span>产业收益:</span>
                            <span>1天/{{i.rate * 100}}%</span>
                        </p>
                        <p>
                            <span>到期收益:</span>
                            <span>{{i.amount*(1+i.cycle*i.rate)}}U</span>
                        </p>
                    </div>
                    <div class="order-center">
                        <p>
                            <span>TGB:</span>
                            <span>{{i.amount*i.cycle*i.rate}}*{{(i.otherRate *100).toFixed(2)}}%={{i.amount*i.cycle*i.rate*i.otherRate *100}}</span>
                        </p>
                    </div>
                    <!-- <div class="go-buy">
                        收益增值,众筹
                    </div> -->

                </div>
            </div>
            <div class="no-data"
                 v-if="connectList.length == 0">
                暂无数据
            </div>
        </div>
        <div v-if="tabNum == 3">

            <div class="content-line"
                 v-for="(i,index) in crowdList"
                 :key="index">
                <div class="order"
                     style="margin:10px 0 0 0">
                    <!-- <h3>
                        <img src="../../assets/wallet/people/time-lv.png">
                        <span>付款倒计时56:30</span>
                    </h3> -->
                    <div class="order-center">
                        <p>
                            <span>股权编号:</span>
                            <span>{{i.id}}</span>
                        </p>
                        <p>
                            <span>周期:</span>
                            <span>{{i.cycle}}天</span>
                        </p>
                    </div>
                    <div class="order-center">
                        <p>
                            <span>产业价值:</span>
                            <span>50-100U</span>
                        </p>
                        <p>
                            <span>股份金额:</span>
                            <span>{{i.amount}}U</span>
                        </p>
                    </div>
                    <div class="order-center">
                        <p>
                            <span>产业收益:</span>
                            <span>1天/{{i.rate * 100}}%</span>
                        </p>
                        <p>
                            <span>到期收益:</span>
                            <span>{{i.amount*(1+i.cycle*i.rate)}}U</span>
                        </p>
                    </div>
                    <div class="order-center">
                        <p>
                            <span>TGB:</span>
                            <span>5*1.1%=0.055</span>
                        </p>
                        <p>
                            <span>到期时间:</span>
                            <span>{{(getLocalTime(i.endTime)).substring(0,9)}}</span>
                        </p>
                    </div>

                </div>
            </div>
            <div class="no-data"
                 v-if="crowdList.length == 0">
                暂无数据
            </div>
        </div>
        <!-- <div v-if="tabNum== 4">
            <div class="content-line">
                <div class="order"
                     style="margin:10px 0 0 0">
                    <h3>
                        <img src="../../assets/wallet/people/time-lv.png">
                        <span>已转出</span>
                    </h3>
                    <div class="order-center">
                        <p>
                            <span>股权编号:</span>
                            <span>202000132456</span>
                        </p>
                        <p>
                            <span>周期:</span>
                            <span>1天</span>
                        </p>
                    </div>
                    <div class="order-center">
                        <p>
                            <span>产业价值:</span>
                            <span>50-100U</span>
                        </p>
                        <p>
                            <span>股份金额:</span>
                            <span>50U</span>
                        </p>
                    </div>
                    <div class="order-center">
                        <p>
                            <span>产业收益:</span>
                            <span>1天/5%</span>
                        </p>
                        <p>
                            <span>到期收益:</span>
                            <span>55U</span>
                        </p>
                    </div>
                    <div class="order-center">
                        <p>
                            <span>TGB:</span>
                            <span>5*1.1%=0.055</span>
                        </p>
                        <p>
                            <span>到期时间:</span>
                            <span>2020/04/12</span>
                        </p>
                    </div>

                </div>
            </div>
            <div class="content-line">
                <div class="order"
                     style="margin:10px 0 0 0">
                    <h3>
                        <img src="../../assets/wallet/people/time-lv.png">
                        <span>已转出</span>
                    </h3>
                    <div class="order-center">
                        <p>
                            <span>股权编号:</span>
                            <span>202000132456</span>
                        </p>
                        <p>
                            <span>周期:</span>
                            <span>1天</span>
                        </p>
                    </div>
                    <div class="order-center">
                        <p>
                            <span>产业价值:</span>
                            <span>50-100U</span>
                        </p>
                        <p>
                            <span>股份金额:</span>
                            <span>50U</span>
                        </p>
                    </div>
                    <div class="order-center">
                        <p>
                            <span>产业收益:</span>
                            <span>1天/5%</span>
                        </p>
                        <p>
                            <span>到期收益:</span>
                            <span>55U</span>
                        </p>
                    </div>
                    <div class="order-center">
                        <p>
                            <span>TGB:</span>
                            <span>5*1.1%=0.055</span>
                        </p>
                        <p>
                            <span>到期时间:</span>
                            <span>2020/04/12</span>
                        </p>
                    </div>

                </div>
            </div>
            <div class="content-line">
                <div class="order"
                     style="margin:10px 0 0 0">
                    <h3>
                        <img src="../../assets/wallet/people/seccess.png">
                        <span>转让中</span>
                    </h3>
                    <div class="order-center">
                        <p>
                            <span>股权编号:</span>
                            <span>202000132456</span>
                        </p>
                        <p>
                            <span>周期:</span>
                            <span>1天</span>
                        </p>
                    </div>
                    <div class="order-center">
                        <p>
                            <span>产业价值:</span>
                            <span>50-100U</span>
                        </p>
                        <p>
                            <span>股份金额:</span>
                            <span>50U</span>
                        </p>
                    </div>
                    <div class="order-center">
                        <p>
                            <span>产业收益:</span>
                            <span>1天/5%</span>
                        </p>
                        <p>
                            <span>到期收益:</span>
                            <span>55U</span>
                        </p>
                    </div>
                    <div class="order-center">
                        <p>
                            <span>TGB:</span>
                            <span>5*1.1%=0.055</span>
                        </p>
                        <p>
                            <span>到期时间:</span>
                            <span>2020/04/12</span>
                        </p>
                    </div>

                </div>
            </div>
        </div> -->

        <div class="pop">
            <van-popup v-model="showPop"
                       :class="'popPop'">
                <div class="pop-main">
                    <h3>支付产业押金</h3>
                    <div class="pop-content">
                        <div class="pop-left">
                            <p>类型：<span style="color:#343B3A;margin: 0 0 0 15px">{{IndustryInformation.level}}</span></p>
                            <p>金额：<span style="margin: 0 0 0 15px">{{IndustryInformation.maxAmount * IndustryInformation.baozjl}}TB</span></p>
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
                             @click="config">确定</div>
                    </div>
                </div>
            </van-popup>
        </div>
    </div>
</template>

<script>
import { Popup } from 'vant';
import { log } from '../../data/wallet';
export default {
    data() {
        return {
            // tab: ["预约", "交接中", "量产中", "众筹", "转让"],
            tab: ["预约", "交接中", "量产中", "众筹"],
            tabNum: 0,
            show: false,
            showPop: false,
            password: '',
            newPassword: '',
            list: [],
            // 预约列表
            orderList: [],
            volumeList: [],
            connectList: [],
            crowdList: [],
            IndustryInformation: {}
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
    mounted() {
        this.list = this.$route.query.item
        this.getNewList()
    },
    methods: {
        demoClick: function (index) {
            this.tabNum = index;
        },
        passwordFocus() {
            this.$refs.newPsd.focus();
        },
        password1GetFocus() {
            this.$refs.setPsd.focus();
        },
        getNewList() {
            this.$http.get(this.$lib.host + 'qmlcg/selectForClass', {
                params: {
                    token_: this.$store.state.newToken,
                    orderclass: this.list.level
                }
            }).then(res => {
                if (res.code == 200) {
                    //预约产业
                    this.orderList = res.data.filter(e => {
                        if (e.state == 0) {
                            return e
                        }
                    })
                    //0-预售状态 6-交接中 1-量产中 3-众筹中 4-众筹成功 5-众筹失败
                    this.volumeList = res.data.filter(e => {
                        if (e.state == 6) {
                            return e
                        }
                    })
                    this.connectList = res.data.filter(e => {
                        if (e.state == 1) {
                            return e
                        }
                    })
                    this.crowdList = res.data.filter(e => {
                        if (e.state == 3) {
                            return e
                        }
                    })

                }
            })
        },
        goBuy(item) {
            if (item.state == 0) {
                this.$http.get(this.$lib.host + 'qmlcg/selectConfigById', {
                    params: {
                        id: item.id,
                        token_: this.$store.state.newToken
                    }
                }).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.showPop = true
                        this.IndustryInformation = res.data
                    }
                })
            }
        },
        // 支付弹窗
        config() {
            if (this.newPassword.length < 6) {
                this.$layer.open({
                    content: '请输入交易密码',
                    skin: 'msg',
                    time: 2 //2秒后自动关闭
                })
                return
            }
            let data = {
                orderId: 4,
                payPassWord: this.newPassword,
                token_: this.$store.state.newToken
            }
            this.$http.post(this.$lib.host + 'qmlcg/yuyue', this.qsParams(data)).then(res => {
                if (res.code == 200) {
                    this.showPop = false
                    this.$layer.open({
                        content: '预约成功',
                        skin: 'msg',
                        time: 2 //2秒后自动关闭
                    })
                } else {
                    this.showPop = false
                    this.$layer.open({
                        content: '预约失败',
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
    computed: {
        //时间戳转日期
        getLocalTime() {
            return function (nS) {
                return new Date(parseInt(nS)).toLocaleString('zh', {
                    hour12: false
                });
            }
        },
    }
}

</script>
<style lang='scss' scoped>
.people-detail {
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.people-main {
    display: flex;
    align-items: flex-end;
    padding: 15px;
    .left-main {
        width: 159px;
        height: 159px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .right-main {
        width: 50%;
        margin-left: 18px;
        p {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin: 0 0 8px 0;
            span:nth-child(1) {
                // float: left;
                color: #c8cdd3;
            }
            span:nth-child(2) {
                // float: right;
                color: #353535;
            }
        }
        .btn {
            float: right;
            font-size: 12px;
            display: inline;
            padding: 4px 22px;
            color: #fff;
            background-color: #566BF3;
        }
    }
}
.line {
    width: 100%;
    height: 5px;
    background-color: #f7f6fb;
}
.content {
    padding: 0 15px;
    border-bottom: 1px solid #ebebeb;
}
.detail-tab {
    display: flex;
    height: 40px;
    line-height: 40px;
    width: 100%;
}
.tab-bar {
    margin-right: 20px;
    font-size: 14px;
    color: #a5acae;
}
.avtive {
    color: #353535;
}
.content-line {
    padding: 0 15px;
    border-bottom: 1px solid #ebebeb;
    .order {
        width: 100%;
        h3 {
            margin: 10px 0 6px;
            display: flex;
            align-items: center;
            img {
                width: 18px;
                height: 18px;
                margin-right: 10px;
            }
            span {
                color: #566BF3;
                font-size: 12px;
            }
        }
        .order-walth {
            width: 100%;
            display: flex;
            justify-content: space-between;
            span:nth-child(1) {
                color: #c8cdd3;
            }
            .status {
                background: rgba(246, 246, 246, 1);
                border-radius: 2px;
                color: #566BF3;
                padding: 2px 16px;
            }
        }
        .order-center {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            p:nth-child(1) {
                width: 60%;
            }
            span:nth-child(1),
            span:nth-child(2) {
                width: 60px;
                color: #c8cdd3;
            }
            span:nth-child(2) {
                color: #353535;
            }
        }
        p {
            display: flex;
            justify-content: flex-start;
            margin: 0 0 8px 0;
            span:nth-child(1) {
                color: #c8cdd3;
            }
            span:nth-child(2) {
                margin-left: 10px;
                color: #353535;
            }
        }
        .go-buy {
            text-align: center;
            background-color: #566BF3;
            color: #fff;
            font-size: 12px;
            height: 32px;
            line-height: 32px;
            margin-bottom: 15px;
            border-radius: 2px;
        }
    }
}
.popPop {
    height: 38%;
    width: 90%;
    border-radius: 10px;
}
.pop-main {
    h3 {
        text-align: center;
        color: #343b3a;
        padding: 8px 0;
        border-bottom: 1px solid #ebebeb;
    }
    .pop-content {
        margin: 20px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        .pop-left {
            p {
                margin-bottom: 10px;
                span {
                    color: #566BF3;
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
                color: #566BF3;
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
        .config-on {
            width: 120px;
            height: 33px;
            background-color: #566BF3;
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
.no-data {
    margin-top: 25px;
    text-align: center;
}
</style>