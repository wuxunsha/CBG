<template>
    <div>
        <a class="btn_border_them getCode"
           v-if="second">{{second}} {{$t('wallet.getCode.text_timer')}}</a>
        <a class="btn_border_them getCode"
           v-else
           @click="getCode()">{{$t('wallet.getCode.text_get')}}</a>
    </div>
</template>


<script>
let timer;
import {
    smsFindLoginPhone
} from '../../data/wallet';
import {
    validatePhoneNum
} from '../../util';
export default {
    props: ['codeData'],
    data() {
        return {
            second: null, //倒计时
        }
    },
    methods: {
        //获取验证码
        getCode() {
            if(!this.codeData.userAccount) {
                return Toast('请输入用户名')
            }
            smsFindLoginPhone(this.codeData).then(v => {
                if(v.code === 1000) {
                    Toast(v.msg);
                    this.setGetCodeStatue();
                } else {
                    Toast(v.msg)
                }
            })
        },
        //设置获取验证码状态
        setGetCodeStatue() {
            this.second = 60;
            timer = setInterval(() => {
                if (this.second > 1) {
                    --this.second;
                } else {
                    this.second = null;
                    clearInterval(timer);
                }
            }, 1000)
        }
    },
    mounted() {

    },
    beforeDestroy() {
        clearInterval(timer);
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/scss" lang="scss">
a {
    font-size: 14px;
    line-height: 10px;
}
</style>
