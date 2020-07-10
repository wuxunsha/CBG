<template>
    <div class="people-stock">
        <div class="navBox">
            <van-nav-bar :title="$t('wallet.peopleStock.text_title')"
                         fixed
                         left-arrow
                         @click-left="goback()" />
        </div>
        <div class="people-header">
            <img src="../../assets/wallet/people/p-header.png">
            <div class="tip">
                <div @click="$router.push('/myProperty')"><img src="../../assets/wallet/people/changye.png"></div>
                <div @click="gopage('/rule')"><img src="../../assets/wallet/people/rule.png"></div>
            </div>
        </div>
        <div class="main"
             @click="goDetail(item)"
             v-for="(item,index) in list"
             :key="index">
            <div class="people-main">
                <div class="left-main">
                    <img :src="item.level === '农业' ? require('../../assets/wallet/people/nongye.png') : item.level === '水产业' ? require('../../assets/wallet/people/shui.png') : item.level === '建筑业' ? require('../../assets/wallet/people/jian.png') : require('../../assets/wallet/people/tu.png')">
                </div>
                <div class="right-main">
                    <h3>{{item.level}}</h3>
                    <p>
                        <span>{{$t('wallet.peopleStock.text_industrial')}}(USDT)</span>
                        <span>{{item.minAmount}}-{{item.maxAmount}}</span>
                    </p>
                    <p>
                        <span>{{$t('wallet.peopleStock.text_cgsj')}}</span>
                        <span>{{item.cycle}}{{$t('wallet.peopleStock.text_tian')}}</span>
                    </p>
                    <p>
                        <span>{{$t('wallet.peopleStock.text_cyshy')}}</span>
                        <!-- <span>1{{$t('wallet.peopleStock.text_tian')}}/{{(item.rate * 100).toFixed(2)}}%</span> -->
                        <span>{{item.cycle === 1 ? 5: item.cycle === 5 ? 12 : item.cycle === 10 ? 20 : 25}}%</span>
                    </p>
                    <p>
                        <span>{{$t('wallet.peopleStock.text_cysl')}}</span>
                        <span>{{item.number}}</span>
                    </p>
                    <div class="btn"
                         @click.stop="goBuy(item)">
                        {{$t('wallet.peopleStock.text_yychg')}}
                    </div>
                </div>
            </div>
        </div>

        <div class="pop">
            <van-popup v-model="showPop"
                       :class="'popPop'">
                <div class="pop-main">
                    <h3>{{$t('wallet.peopleStock.text_zfcyyj')}}</h3>
                    <div class="pop-content">
                        <div class="pop-left">
                            <p>{{poType}}：<span style="color:#343B3A;margin: 0 0 0 15px">{{IndustryInformation.level}}</span></p>
                            <p>{{poNum}}：<span style="margin: 0 0 0 15px">{{IndustryInformation.bzjcbk}}CBK({{IndustryInformation.baozjl*IndustryInformation.maxAmount}}U)</span></p>
                        </div>
                    </div>
                    <div class="input-focus">
                        <input ref="newPsd"
                               v-model="newPassword"
                               type="number"
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
                             @click="showPop=false">{{$t('wallet.peopleStock.text_qx')}}</div>
                        <div class="config-on"
                             @click="config">{{$t('wallet.peopleStock.text_qd')}}</div>
                    </div>
                </div>
            </van-popup>
        </div>

    </div>
</template>

<script>
import {
    quan_detail
} from '../../data/wallet';
import { Popup } from 'vant';
export default {
    data() {
        return {
            list: [],
            showPop: false,
            password: '',
            newPassword: '',
            // 产业详情
            IndustryInformation: {},
            poType: '',
            poNum: '',

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
        this.getList()
    },
    methods: {
        passwordFocus() {
            this.$refs.newPsd.focus();
        },
        goDetail(item) {
            this.$router.push({ path: 'peopleDetail', query: { item: item } })
        },
        goBuy(item) {
            if (item.number > 0) {
                this.poType = '持股者'
                this.poNum = '转让金额'
            } else {
                this.poType = '类型'
                this.poNum = '金额'
            }

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
        //产业列表
        getList() {
            this.$http.get(this.$lib.host + 'qmlcg/listConfig', {
                params: {
                    token_: this.$store.state.newToken
                }
            }).then(res => {
                if (res.code == 200) {
                    this.list = res.data
                }
            })
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
                cyId: this.IndustryInformation.id,
                payPassWord: this.newPassword,
                token_: this.$store.state.newToken
            }
            this.$http.post(this.$lib.host + 'qmlcg/payYuyue', this.qsParams(data)).then(res => {
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
        newPassword: function (newV, oldV) {
            if (newV.length > 6) {
                this.$layer.open({
                    content: '密码长度为6位',
                    skin: 'msg',
                    time: 2 //2秒后自动关闭
                })
                return
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
    }
}

</script>
<style lang='scss' scoped>
.people-stock {
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.people-header {
    width: 100%;
    height: 200px;
    position: relative;
    img {
        width: 100%;
        height: 100%;
    }
    .tip {
        position: absolute;
        top: 15px;
        right: 15px;
        img {
            display: block;
            width: 30px;
            height: 30px;
            margin-bottom: 10px;
        }
    }
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
        h3 {
            font-size: 16px;
            font-weight: bold;
            color: rgba(53, 53, 53, 1);
        }
        p {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin: 0 0 8px 0;
            font-size: 12px;
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
            background-color: #566bf3;
        }
    }
}
.line {
    width: 100%;
    height: 5px;
    background-color: #f7f6fb;
}
.popPop {
    height: 264px;
    width: 90%;
    border-radius: 10px;
}
.pop-main {
    h3 {
        text-align: center;
        padding: 8px 0;
        border-bottom: 1px solid #ebebeb;
        font-size: 16px;
        font-weight: 500;
        color: rgba(51, 59, 57, 1);
    }
    .pop-content {
        margin: 20px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        .pop-left {
            p {
                font-size: 12px;
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
                font-size: 12px;
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
        .config-on {
            width: 120px;
            height: 32px;
            line-height: 32px;
            background-color: #566bf3;
            color: #fff;
            border-radius: 2px;
            margin: 0 8px;
            font-size: 14px;
        }
        .cancel {
            width: 120px;
            height: 32px;
            line-height: 32px;
            background: #f7f6fb;
            color: #343b3a;
            border-radius: 2px;
            margin: 0 8px;
            font-size: 14px;
        }
    }
}
</style>