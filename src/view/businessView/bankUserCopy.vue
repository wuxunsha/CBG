<template>
    <div id="user"
         class="full-screen">
        <div>
            <van-nav-bar :title="`${$t('feature.bankUser.nav_title')}`"
                         fixed>
                <template #right>
                    <img src="../../assets/business/user/设置@2x.png"
                         alt="">
                </template>
            </van-nav-bar>
        </div>

        <div class="user-box">
            <div class="user-left">
                <div class="user_info flex align">
                    <div class="header_text">
                        <img src="../../assets/business/user/我的－选中@2x.png"
                             alt="">
                    </div>
                    <div class="info">
                        <b>{{userInfo.user.userAccount || userInfo.user.id}}</b>
                        <!-- <span>{{$t('feature.bankUser.text_level')}}：{{userRole}}</span> -->
                        <span>{{userInfo.user.userPhone}}</span>
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
                        <img src="../../assets/business/user/图层 1 拷贝 5@2x.png"
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
                <img src="../../assets/business/user/公告消息@2x.png"
                     alt="">
                <span>{{$t('feature.bankUser.text_news')}}</span>
            </div>
        </div>

        <div class="news">
            <div class="news-box"
                 @click="$router.push('/identity')">
                <img src="../../assets/business/user/身份认证@2x.png"
                     alt="">
                <span>{{$t('feature.bankUser.text_Authentication')}}</span>
                <span>{{$t('feature.bankUser.text_verified')}}</span>
            </div>
        </div>

        <div class="news">
            <div class="news-box bottom">
                <img src="../../assets/business/user/收款方式@2x.png"
                     alt="">
                <span>{{$t('feature.bankUser.text_payment_method')}}</span>
            </div>
        </div>

        <div class="Partition"></div>

        <div class="news">
            <div class="news-box"
                 @click="gopage('/news')">
                <img src="../../assets/business/user/账户安全 @2x.png"
                     alt="">
                <span>{{$t('feature.bankUser.text_account_security')}}</span>
            </div>
        </div>

        <div class="news">
            <div class="news-box bottom">
                <img src="../../assets/business/user/关于我们@2x.png"
                     alt="">
                <span>{{$t('feature.bankUser.text_about_us')}}</span>
            </div>
        </div>

        <div class="Partition"></div>

        <myFooter :footerNavActive="activeType"></myFooter>

    </div>
</template>

<script>
import {
    mapMutations,
    mapState
} from 'vuex'
import myFooter from "../../components/wallet/footer.vue";
import {
    Toast
} from 'vant';
import {
    change_nickname,
    getUserInfo
} from '../../data/wallet';
export default {
    data() {
        return {
            activeType: "user",
            showLang: false,
            show_change_input: false, //显示修改账户名
            newName: null,
            showEdit: false,
            userRole: ''
        }
    },
    components: {
        myFooter
    },
    methods: {
        ...mapMutations(['setUserInfo', 'setToken']),
        changeName(done) {//修改用户名
            change_nickname({ "newNick": this.newName }).then(v => {
                Toast(v.message);
                let newInfo = this.userInfo;
                newInfo.username = this.newName;
                this.setUserInfo(newInfo);
                done;
            })
        },//changeName
        dialogConfirm(action, done) {//确定编辑用户名
            if (action === 'confirm') {
                if (this.newName.length < 3 || this.newName.length > 10) {
                    Toast(this.$t('wallet.user.Toast_name'))
                    done(false);
                } else {
                    setTimeout(() => {
                        this.changeName(done());
                    }, 2000);
                }
            } else {
                this.newName = null;
                done();
            }
        },//dialogConfirm
        editName() {//编辑账户名
            this.showEdit = true;
            this.newName = this.userInfo.username;
        },//editName
        login_out() { //退出登录
            Dialog.confirm({
                message: this.$t('wallet.user.text_confirm'),
                confirmButtonText: this.$t('wallet.common.text_confirmButtonText'),
                cancelButtonText: this.$t('wallet.common.text_cancelButtonText')
            }).then(() => {
                this.get_loginout();
            })
        }, //login_out
        get_loginout() {
            this.gopage_re('login');
            setTimeout(() => {
                this.setUserInfo(null);
                this.setToken(null);
                this.$store.commit('setUser', {                    user: {
                        uid: null,
                        password: null
                    }                })
                this.$store.commit('setNewToken', '')
                localStorage.removeItem('vuex');
                location.reload();
            }, 500);
        }, //get_loginout
        onSelect(item) {//设置语言
            this.set_lang(item.type);
            this.showLang = false;
        }//onSelect
    },
    computed: {
        ...mapState(['userInfo', 'check_read'])
    },
    created() {
        let roleObj = {
            0: '普通会员',
            1: '初级会员',
            2: '中级会员',
            3: '高级会员',
            4: '超级会员'
        }
        getUserInfo({ userId: this.userInfo.user.id }).then(v => {
            this.userRole = roleObj[v.data.user.userRole]
        })
    },
    mounted() {

    }
};

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
