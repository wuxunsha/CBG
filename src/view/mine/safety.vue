<template>
  <div>

    <div class="navBox">
      <van-nav-bar :title="`${$t('wallet.safety.safety_title')}`" fixed left-arrow @click-left="goback()"/>
    </div>

    <div class="setting-box">
        <!-- 登录密码 -->
        <div class="version" @click="gopage('/forgetPass')">
            <div>
                {{$t('wallet.safety.safety_login')}}
            </div>
             <div>
                {{$t('wallet.safety.safety_modify')}}
                <van-icon name="arrow" />
            </div>
        </div>
        <!-- 交易密码 -->
        <div class="version" @click="gopage('/setPayPass')">
            <div>
                {{$t('wallet.safety.safety_transaction')}}
            </div>
             <div>
                {{$t('wallet.safety.safety_set')}}
                <van-icon name="arrow" />
            </div>
        </div>

        <!-- 隔断层 -->
        <div class="cut-off"></div>

         <!-- 手机认证 -->
        <div class="version">
            <div>
                {{$t('wallet.safety.safety_phone')}}
            </div>
             <div>
                 <van-switch v-model="checked" size="14px" />
                {{$t('wallet.safety.safety_modify')}}
                <van-icon name="arrow" />
            </div>
        </div>
        <!-- 邮箱认证 -->
        <div class="version">
            <div>
                {{$t('wallet.safety.safety_mailbox')}}
            </div>
             <div>
                {{$t('wallet.safety.safety_binding')}}
                <van-icon name="arrow" />
            </div>
        </div>

        <!-- 隔断层 -->
        <div class="cut-off"></div>
    </div>

  </div>
</template>

<script>
// import {
//     notice
// } from '../../data/wallet';
// import {
//     mapMutations
// } from 'vuex'
export default {
    data() {
        return {
            checked: false
        }
    },
    methods: {
        
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
            color: rgba(54,54,54,1);;
        }
        > div:nth-child(2) {
            text-align: right;
            color: rgba(200,205,211,1);
        }
        .van-icon {
            vertical-align: middle;
            margin-left: 4px;
        }
        .van-switch {
            margin-right: 10px;
            vertical-align: middle;
        }
    }
    .cut-off {
        height: 10px;
        width: 100%;
        background: #F7F6FB;
    }
}
</style>
