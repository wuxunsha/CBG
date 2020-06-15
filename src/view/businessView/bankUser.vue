<template>
    <div id="user"
         class="full-screen">

        <div class="navBox opacity">
            <van-nav-bar :title="`${$t('feature.bankUser.nav_title')}`" />
        </div>

        <div class="user_info flex align"
             style="padding-top:60px;">
            <div class="header_text">{{userInfo.user.userName.substring(0,1).toUpperCase()}}</div>
            <div class="info">
                <b>UUID&nbsp;:&nbsp;{{userInfo.user.userAccount || userInfo.user.id}}</b>
                <span>{{$t('feature.bankUser.text_level')}}：{{userRole}}</span>
                <!-- <span>{{$t('feature.bankUser.text_level')}}：{{userInfo.user.userLevelId > 0 ? userInfo.user.userLevelId-1 : `${$t('feature.bankUser.text_level_n')}` }}</span> -->
            </div>
        </div>
        <!-- user_info -->

        <div class="menu_item_box">

            <div class="iconMenu flex align">
                <div class="item"
                     @click="gopage('/bankShare')">
                    <i class="menu_1"></i>
                    <div class=" text_color_dark textCenter">{{$t('feature.bankUser.text_bankShare')}}</div>
                </div>
                <div class="item"
                     @click="gopage('/bankShareList')">
                    <i class="menu_2"></i>
                    <div class=" text_color_dark textCenter">{{$t('feature.bankUser.text_shareList')}}</div>
                </div>
            </div>
            <!-- iconMenu -->

            <div class="bg_color_gray space10"></div>

            <div class="flex align menu_list right_row border-bottom"
                 @click="gopage('/assetsDetail_v2')">
                <div class="icon">
                    <img src="../../assets/business/menu_mx.png"
                         alt=""
                         srcset="">
                </div>
                <div class="title font12 text_color_dark  font-bold">{{$t('feature.bankUser.text_assets')}}</div>
                <van-icon name="arrow" />
            </div>
            <!-- menu_list -->

            <div class="flex align menu_list right_row border-bottom"
                 @click="gopage('/rechargeList')">
                <div class="icon">
                    <img src="../../assets/business/menu_cz.png"
                         alt=""
                         srcset="">
                </div>
                <div class="title font12 text_color_dark  font-bold">{{$t('feature.bankUser.text_rechargeList')}}</div>
                <van-icon name="arrow" />
            </div>
            <!-- menu_list -->

            <div class="flex align menu_list right_row border-bottom"
                 @click="gopage('/withdrawList')">
                <div class="icon">
                    <img src="../../assets/business/menu_tx.png"
                         alt=""
                         srcset="">
                </div>
                <div class="title font12 text_color_dark  font-bold">{{$t('feature.bankUser.text_withdrawList')}}</div>
                <van-icon name="arrow" />
            </div>
            <!-- menu_list -->

            <div class="flex align menu_list right_row border-bottom"
                 @click="gopage('/forgetPass')">
                <div class="icon">
                    <img src="../../assets/business/menu_dl.png"
                         alt=""
                         srcset="">
                </div>
                <div class="title font12 text_color_dark  font-bold">{{$t('feature.bankUser.text_forgetPass')}}</div>
                <van-icon name="arrow" />
            </div>
            <!-- menu_list -->

            <div class="flex align menu_list right_row border-bottom"
                 @click="gopage('/setPayPass')">
                <div class="icon">
                    <img src="../../assets/business/menu_zfmm.png"
                         alt=""
                         srcset="">
                </div>
                <div class="title font12 text_color_dark  font-bold">{{$t('feature.bankUser.text_changePayPass')}}</div>
                <van-icon name="arrow" />
            </div>
            <!-- menu_list -->

            <div class="flex align menu_list right_row border-bottom"
                 @click="gopage('/feedback')">
                <div class="icon">
                    <img src="../../assets/business/menu_kf.png"
                         alt=""
                         srcset="">
                </div>
                <div class="title font12 text_color_dark  font-bold">{{$t('feature.bankUser.text_feedback')}}</div>
                <van-icon name="arrow" />
            </div>
            <!-- menu_list -->

            <div class="flex align menu_list right_row border-bottom"
                 @click="gopage('/news')">
                <div class="icon">
                    <img src="../../assets/business/menu_gg.png"
                         alt=""
                         srcset="">
                </div>
                <div class="title font12 text_color_dark  font-bold">{{$t('feature.bankUser.text_news')}}</div>
                <van-icon name="arrow" />
            </div>
            <!-- menu_list -->

            <!-- <div class="flex align menu_list right_row border-bottom" @click="gopage('/setPayPass')" v-if="false">
        <div class="icon">
          <img src="../../assets/business/menu_jy.png" alt="" srcset="">
        </div>
        <div class="title font12 text_color_dark  font-bold">修改交易密码</div>
         <van-icon name="arrow" />
      </div> -->
            <!-- menu_list -->

            <div class="flex align menu_list right_row border-bottom"
                 @click="showLang=true">
                <div class="icon">
                    <img src="../../assets/business/menu_yy.png"
                         alt=""
                         srcset="">
                </div>
                <div class="title font12 text_color_dark  font-bold">{{$t('feature.bankUser.text_lang')}}</div>
                <van-icon name="arrow" />
            </div>
            <!-- menu_list -->

        </div>
        <!-- menu_item_box -->

        <div class="space20"></div>

        <div class="login_out"
             @click="login_out()">{{$t('wallet.user.text_loginout')}}</div>

        <div class="space20"></div>

        <van-dialog v-model="showEdit"
                    :title="$t('wallet.user.dialog_edit')"
                    show-cancel-button
                    :closeOnClickOverlay="true"
                    :beforeClose="dialogConfirm">
            <div class="dialogMain">
                <van-field v-model="newName"
                           border
                           clickable
                           :placeholder="$t('wallet.user.input_name')" />
            </div>
        </van-dialog>

        <!-- <van-popup v-model="showEdit">内容</van-popup> -->

        <van-action-sheet v-model="showLang"
                          :title="$t('wallet.common.exchange_lang')"
                          :actions="lang_actions"
                          @select="onSelect" />

        <myFooter :footerNavActive="activeType"></myFooter>

    </div>
    <!-- index -->
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

    } //mounted
};

</script>
<style rel="stylesheet/scss" scoped lang="scss">
@import "../../styles/walletVal";

#user {
    box-sizing: border-box;
}

.user_info {
    margin-top: 0;
    padding: 30px 20px;
    position: relative;
    background: $them_color_dark;
    padding-bottom: 80px;

    * {
        color: white;
    }

    .header_text {
        width: 50px;
        height: 50px;
        background: white;
        color: $them_color;
        text-align: center;
        line-height: 50px;
        border-radius: 100px;
        font-weight: bold;
        font-size: 30px;
        margin-right: 15px;
    }
    .info {
        b {
            display: block;
            margin-bottom: 5px;
            font-size: 15px;
        }
        span {
            display: block;
            font-size: 12px;
        }
    }

    .main,
    .number-info,
    .btn-row {
        position: relative;
        z-index: 11;
    }
    .header {
        margin-right: 10px;
        img {
            width: 50px;
            height: 50px;
            border-radius: 100px;
            -webkit-border-radius: 100px;
            overflow: hidden;
            background: white;
            padding: 5px;
        }
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
