<template>
  <div>

    <div class="navBox">
      <van-nav-bar :title="`${$t('wallet.news.nav_title')}`" fixed left-arrow @click-left="goback()"/>
    </div>

    <div class="setting-box">
        <!-- 版本号 -->
        <div class="version">
            <div>
                {{$t('wallet.user.text_version')}}
            </div>
             <div>
                1.0
            </div>
        </div>
        <!-- 退出登录按钮 -->
        <div class="log-out">
            <div class="login-btn" @click="login_out()">{{$t('wallet.user.text_loginout')}}</div>
        </div>
    </div>

  </div>
</template>

<script>
// import {
//     notice
// } from '../../data/wallet';
import {
    mapMutations
} from 'vuex'
export default {
    data() {
        return {
        
        }
    },
    methods: {
        ...mapMutations(['setUserInfo', 'setToken']),
        //退出登录
        login_out() {
            Dialog.confirm({
                message: this.$t('wallet.user.text_confirm'),
                confirmButtonText: this.$t('wallet.common.text_confirmButtonText'),
                cancelButtonText: this.$t('wallet.common.text_cancelButtonText')
            }).then(() => {
                this.get_loginout();
            })
        },
        get_loginout() {
            this.gopage_re('login');
            setTimeout(() => {
                this.setUserInfo(null);
                this.setToken(null);
                this.$store.commit('setUser', { user: {
                        uid: null,
                        password: null
                    }                })
                this.$store.commit('setNewToken', '')
                localStorage.removeItem('vuex');
                location.reload();
            }, 500);
        }
    },
mounted() {
    
}
};

</script>
<style rel="stylesheet/scss" scoped lang="scss">
.setting-box {
    width: 100%;
    .version {
        display: flex;
        width: 100%;
        height: 42px;
        line-height: 42px;
        border-bottom: 1px solid #EBEBEB;
        padding: 0 15px;
        justify-content: space-between;
        > div {
            flex: 1;
            font-size: 14px;
            font-weight: 500;
            color: rgba(200,205,211,1);
        }
        > div:nth-child(2) {
            text-align: right;
            color: rgba(54,54,54,1);
        }
    }
    .log-out {
        width: 100%;
        padding: 0 15px;
        margin-top: 400px;
        .login-btn {
            font-weight: bold;
            text-align: center;
            font-size: 14px;
            text-align: center;
            width: 100%;
            padding: 15px;
            border-radius: 4px;
            background: #566CF3;
            color: #fff;
        }
    }
}
</style>
