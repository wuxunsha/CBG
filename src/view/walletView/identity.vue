<template>
    <div>
        <div class="navBox">
            <van-nav-bar :title="``"
                         fixed
                         left-arrow
                         @click-left="goback()" />
        </div>
        <div class="open-iden">
            <h3>开启身份认证</h3>
            <div>
                <p>步骤一</p>
                <span>选择国籍</span>
            </div>
        </div>
        <div style="margin:15px 0 0 0">
            <chooseCitys v-on:chooseCoin="chooseCoin"
                         :defaultId="$route.query.coinId"
                         type="recharge" />
        </div>
        <div class="footer"
             @click="$router.push('/identityTwo')">
            下一步
        </div>
    </div>
</template>

<script>
import chooseCitys from '../../components/wallet/chooseCity'
export default {
    data() {
        return {
        }
    },
    components: {
        chooseCitys
    },
    methods: {
        chooseCoin() {

        }
    }
}

</script>
<style lang='scss' scoped>
.open-iden {
    padding: 0 15px;
    h3 {
        font-size: 28px;
        color: #353535;
        font-weight: 700;
    }
    div {
        display: flex;
        font-size: 12px;
        margin: 10px 0;
        p {
            color: #353535;
            margin-right: 25px;
        }
        span {
            color: #a5acae;
        }
    }
}
.footer {
    margin: 40px auto;
    width: 90%;
    height: 33px;
    line-height: 33px;
    background: rgba(200, 205, 211, 1);
    border-radius: 2px;
    text-align: center;
    color: #fff;
}
</style>