<template>
    <div id="user"
         class="full-screen">

        <div class="navBox opacity">
            <van-nav-bar :title="`${$t('feature.home.nav_title')}`"
                         left-arrow
                         @click-left="goback()"
                         fixed />
        </div>

        <div class="earnings">
            <div>
                <p>总收益</p>
                <p>{{totalIncome}}</p>
                <p @click="gopage(`/shareExtract`)">提取</p>
            </div>
            <div>
                <div>
                    <span>团队等级:</span>
                    <span>{{user.userLevelId === 1 ? '青铜' : user.userLevelId === 2 ? '白银' : user.userLevelId === 3 ? '黄金' : user.userLevelId === 4 ? '铂金' : user.userLevelId === 5 ? '钻石' : '无'}}</span>
                </div>
                <div>
                    <img :src="user.userLevelId === 1 ? require('../../assets/business/user/qt.png') : user.userLevelId === 2 ? require('../../assets/business/user/by.png') : user.userLevelId === 3 ? require('../../assets/business/user/hj.png') : user.userLevelId === 4 ? require('../../assets/business/user/bj.png') : user.userLevelId === 5 ? require('../../assets/business/user/zsh.png') : ''"
                         alt="">
                </div>
            </div>
        </div>

        <div class="separate"></div>

        <div class="team-list">
            <div class="summary">
                <div>
                    <p>团队总人数</p>
                    <p>{{incomeList.sxchildNumber}}</p>
                </div>
                <div>
                    <p>推荐收益(USDT)</p>
                    <p>{{incomeList.ztTotal}}</p>
                </div>
                <div>
                    <p>团队收益(USDT)</p>
                    <p>{{incomeList.teamTotal}}</p>
                </div>
            </div>
            <div class="summary-title">
                <div>
                    <p>昵称</p>
                </div>
                <div>
                    <p>业绩(USDT)</p>
                </div>
                <div>
                    <p>贡献收益(USDT)</p>
                </div>
            </div>
            <ul v-if="teamInfoList.length > 0">
                <li v-for="(item, index) in teamInfoList"
                    :key="index">
                    <p>{{item.gxAccount}}</p>
                    <p>{{item.yeji}}</p>
                    <p>{{item.gx}}</p>
                </li>
            </ul>
            <p v-else
               class="no-data">
                暂无数据
            </p>

        </div>

    </div>
</template>
<script>
import {
    getUserTDtotalIncome,
    getUserTeamInfo,
    getUser
} from '../../data/wallet';
export default {
    data() {
        return {
            user: {},
            // 收益
            // income: {
            //     ztTotal: 0,
            //     teamTotal: 0
            // },
            incomeList: [],
            // 总收益
            totalIncome: 0,
            teamInfoList: [],
            // 团队总人数
            totalpeople: 0
        }
    },
    methods: {
        // 获取用户信息
        getUserInfo() {
            this.$http.get('http://trex.top/payservice/user/getUserInfo').then(res => {
                if (res.code == 1000) {
                    this.user = res.data
                } else {
                    this.$layer.open({
                        content: res.msg,
                        skin: 'msg',
                        time: 2 //2秒后自动关闭
                    })
                }
            })
        },
        // 获取团队总收益
        getUserTotalIncome() {
            getUserTDtotalIncome({ token_: this.$store.state.newToken }).then(res => {
                if (res.code === '200') {
                    this.incomeList = res.data[0]
                }
            })
        },
        // 获取团队信息下面贡献列表
        getUserTeamInfoList() {
            getUserTeamInfo({ token_: this.$store.state.newToken }).then(res => {
                console.log(res);

                if (res.code == 200) {
                    console.log(res.data.length);

                    if (res.data.length > 0) {
                        this.teamInfoList = res.data
                        this.totalpeople = res.data.length
                    } else {
                        this.totalpeople = 0
                    }

                }
            }).catch(e => {

            })
        }
    },
    created() {
        this.getUserInfo()
        this.getUserTotalIncome()
        this.getUserTeamInfoList()
    },
    mounted() {

    }
}
</script>
<style rel="stylesheet/scss" scoped lang="scss">
.earnings {
    display: flex;
    width: 100%;
    height: 150px;
    margin-top: 46px;
    > div:nth-child(1) {
        flex: 0.8;
        padding: 25px 15px 0;
        > p:nth-child(1) {
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(53, 53, 53, 1);
            margin-bottom: 10px;
        }
        > p:nth-child(2) {
            font-size: 25px;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(86, 107, 243, 1);
            margin-bottom: 10px;
        }
        > p:nth-child(3) {
            width: 112px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            background: linear-gradient(
                -61deg,
                rgba(34, 239, 185, 1),
                rgba(86, 107, 243, 1)
            );
            box-shadow: 0px 4px 9px 0px rgba(68, 22, 238, 0.15);
            border-radius: 2px;
            font-size: 12px;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
        }
    }
    > div:nth-child(2) {
        flex: 1;
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
        > div:nth-child(1) {
            flex: 1;
            margin-right: 6px;
            span {
                font-size: 14px;
                font-weight: bold;
                color: rgba(175, 175, 175, 1);
            }
            span:nth-child(2) {
                color: #566bf3;
            }
        }
        > div:nth-child(2) {
            flex: 0.8;
            img {
                width: 56px;
            }
        }
    }
}

.separate {
    width: 100%;
    height: 5px;
    background: rgba(247, 246, 251, 1);
}

.team-list {
    width: 100%;
    .summary {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #ebebeb;
        > div {
            flex: 1;
            text-align: center;
            > p:nth-child(1) {
                font-size: 12px;
                font-weight: 500;
                color: rgba(200, 205, 211, 1);
            }
            > p:nth-child(2) {
                font-size: 12px;
                font-weight: 500;
                color: rgba(52, 59, 58, 1);
            }
        }
        > div:nth-child(2) {
            border-left: 1px solid #ebebeb;
            border-right: 1px solid #ebebeb;
        }
    }
    .summary-title {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #ebebeb;
        padding: 0 15px;
        > div {
            flex: 1;
            > p {
                font-size: 12px;
                font-weight: 500;
                color: rgba(200, 205, 211, 1);
            }
        }
        > div:nth-child(2) {
            text-align: center;
        }
        > div:nth-child(3) {
            text-align: right;
        }
    }
    ul {
        > li {
            padding: 0 15px;
            display: flex;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #ebebeb;
            > p {
                flex: 1;
                font-size: 12px;
                font-weight: 500;
                color: rgba(53, 53, 53, 1);
            }
            > p:nth-child(2) {
                text-align: center;
            }
            > p:nth-child(3) {
                text-align: right;
            }
        }
    }
    .no-data {
        text-align: center;
        margin-top: 20px;
        font-size: 12px;
    }
}
</style>
