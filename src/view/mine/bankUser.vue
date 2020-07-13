<template>
    <div id="user"
         class="full-screen">
        <div>
            <van-nav-bar :title="`${$t('feature.bankUser.nav_title')}`" fixed>
                <template #right>
                    <img src="../../assets/business/user/szh2x.png"
                         alt="" @click="gopage('/setting')">
                </template>
            </van-nav-bar>
        </div>

        <div class="user-box">
            <div class="user-left">
                <div class="user_info flex align">
                    <div class="header_text">
                        <img src="../../assets/business/user/wdxzh2x.png"
                             alt="">
                    </div>
                    <div class="info">
                        <b>{{user.userAccount || user.id}}</b>
                        <!-- <span>{{$t('feature.bankUser.text_level')}}：{{userRole}}</span> -->
                        <span>{{user.userPhone}}</span>
                    </div>
                </div>
            </div>
            <div class="user-right">
                <div class="VIP-level flex align">
                    <div>
                        <img src="../../assets/business/user/ＶＩＰ@2x.png"
                             alt="">
                    </div>
                    <div>
                        <img :src="user.userLevelId === 1 ? require('../../assets/business/user/qt.png') : user.userLevelId === 2 ? require('../../assets/business/user/by.png') : user.userLevelId === 3 ? require('../../assets/business/user/hj.png') : user.userLevelId === 4 ? require('../../assets/business/user/bj.png') : user.userLevelId === 5 ? require('../../assets/business/user/zsh.png') : ''"
                             alt="">
                    </div>
                </div>
            </div>
        </div>

        <div class="bankShare">
            <div @click="gopage('/bankShare')">
                {{$t('feature.bankUser.text_bankShare')}}
            </div>
            <div @click="gopage('/bankShareList')">
                {{$t('feature.bankUser.text_shareList')}}
            </div>
        </div>

        <div class="news">
            <div class="news-box"
                 @click="gopage('/news')">
                <img src="../../assets/business/user/ggxx2x.png"
                     alt="">
                <span>{{$t('feature.bankUser.text_news')}}</span>
            </div>
        </div>

        <div class="news">
            <div class="news-box"
                 @click="user.isrz === 1 ? '' : $router.push('/identityTwo')">
                <img src="../../assets/business/user/ssrz2x.png"
                     alt="">
                <span>{{$t('feature.bankUser.text_Authentication')}}</span>
                <span v-if="user.isrz === 1">{{$t('feature.bankUser.text_verified')}}</span>
                <span v-else>{{$t('feature.bankUser.text_not_certified')}}</span>
            </div>
        </div>

        <div class="news">
            <div class="news-box bottom"  @click="gopage('/paymentMethod')">
                <img src="../../assets/business/user/skfsh2x.png"
                     alt="">
                <span>{{$t('feature.bankUser.text_payment_method')}}</span>
            </div>
        </div>

        <div class="Partition"></div>

        <div class="news">
            <div class="news-box"
                 @click="gopage('/safety')">
                <img src="../../assets/business/user/zhan2x.png"
                     alt="">
                <span>{{$t('feature.bankUser.text_account_security')}}</span>
            </div>
        </div>

        <div class="news">
            <div class="news-box bottom">
                <img src="../../assets/business/user/gywm2x.png"
                     alt="">
                <span>{{$t('feature.bankUser.text_about_us')}}</span>
            </div>
        </div>

        <div class="Partition"></div>

        <myFooter :footerNavActive="activeType"></myFooter>

    </div>
</template>

<script>
import myFooter from "../../components/wallet/footer.vue";
import {
    Toast
} from 'vant';
import {
    change_nickname,
    getUser
} from '../../data/wallet';
export default {
    data() {
        return {
            activeType: "user",
            user: {}
        }
    },
    components: {
        myFooter
    },
    methods: {
        // 获取用户信息
        getUserInfo() {
            getUser({token_: this.$store.state.newToken}).then(res => {
                if (res.code === '200') {
                    this.user = res.data
                }
            })
        }
    },
    created() {
        this.getUserInfo()
    },
    mounted() {

    }
}

</script>
<style rel="stylesheet/scss" scoped lang="scss">
@import "../../styles/walletVal";

#user {
    box-sizing: border-box;
}

.van-nav-bar {
    border-bottom: 1px solid #ebebeb;
    .van-nav-bar__title {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(53, 53, 53, 1);
    }
    img {
        width: 18px;
        height: 18px;
    }
}

.full-screen {
    .user-box {
        display: flex;
        margin-top: 47px;
        height: 72px;
        padding: 0 20px;
        border-bottom: 1px solid #ebebeb;
        .user-left {
            flex: 1;
            .user_info {
                position: relative;
                height: 100%;
                .header_text {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 15px;
                    img {
                        width: 100%;
                    }
                }
                .info {
                    b {
                        display: block;
                        margin-bottom: 5px;
                        font-size: 14px;
                        font-family: PingFang SC;
                        font-weight: bold;
                        color: rgba(53, 53, 53, 1);
                    }
                    span {
                        display: block;
                        font-size: 12px;
                        font-family: PingFang SC;
                        font-weight: bold;
                        color: rgba(34, 239, 185, 1);
                    }
                }
            }
        }
        .user-right {
            margin-right: 28px;
            .VIP-level {
                height: 72px;
                > div:nth-child(1) {
                    position: relative;
                    width: 36px;
                    height: 72px;
                    img {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translateY(-8px);
                        width: 100%;
                        height: 16px;
                    }
                }
                > div:nth-child(2) {
                    position: relative;
                    width: 54px;
                    height: 72px;
                    img {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translateY(-24px);
                        width: 100%;
                        height: 49px;
                    }
                }
            }
            // img:nth-child(1) {
            //     width: 36px;
            //     height: 16px;
            // }
            // img:nth-child(2) {
            //     width: 54px;
            //     height: 49px;
            // }
        }
    }

    .bankShare {
        display: flex;
        width: 100%;
        height: 47px;
        line-height: 42px;
        border-bottom: 5px solid #f7f6fb;
        > div {
            flex: 1;
            height: 100%;
            text-align: center;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(53, 53, 53, 1);
        }
        > div:nth-child(1) {
            border-right: 1px solid #ebebeb;
        }
    }

    .news {
        width: 100%;
        height: 45px;
        padding-left: 20px;
        .news-box {
            width: 100%;
            height: 100%;
            line-height: 45px;
            border-bottom: 1px solid #ebebeb;
            padding-right: 20px;
            span {
                font-size: 14px;
                line-height: 45px;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(53, 53, 53, 1);
            }
            > span:nth-child(3) {
                float: right;
                color: #566bf3;
            }
            img {
                width: 16px;
                margin-right: 10px;
            }
        }
        .bottom {
            border-bottom: none;
        }
    }

    .Partition {
        width: 100%;
        height: 5px;
        background: #f7f6fb;
    }
}

.menu_item_box {
    position: relative;
    margin-top: -50px;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    overflow: hidden;
    background: white;
    .menu_list {
        padding: 20px;
        position: relative;
        &:active {
            background: $them_color_bgGray;
        }
        &::after {
            left: 50px;
        }
        .van-icon-arrow {
            color: gray;
            font-size: 10px;
            display: block;
            width: 16px;
            height: 16px;
            text-align: right;
            position: absolute;
            right: 20px;
            top: 50%;
            margin-top: -8px;
        }
        .icon {
            width: 25px;
            height: 25px;
            margin-right: 10px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}

.login_out {
    color: white;
    font-weight: bold;
    text-align: center;
    font-size: 13px;
    text-align: center;
    margin: 20px auto;
    margin-top: 40px;
    padding: 15px;
    margin: 10px 20px;
    border-radius: 4px;
    background: #fa615c;
}

.iconMenu {
    padding: 10px 0;
    > div {
        width: 50%;
        text-align: center;
        i {
            display: block;
            width: 40px;
            height: 40px;
            margin: 5px auto;
            background-size: 100% !important;
            &.menu_1 {
                background: url("../../assets/business/home_menu4.png")
                    no-repeat center;
            }
            &.menu_2 {
                background: url("../../assets/business/home_menu5.png")
                    no-repeat center;
            }
        }
        div {
            font-size: 12px;
        }
    }
}
</style>
