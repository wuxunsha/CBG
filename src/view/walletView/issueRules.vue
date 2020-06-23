<template>
    <div class="people-stock">
        <div class="navBox">
            <van-nav-bar :title="`交易规则`"
                         fixed
                         left-arrow
                         @click-left="goback()" />
        </div>
        <div class="issue-info">
            <h3>一、交易时间</h3>
            <p>早9：00~晚18：00(该时间段发起未完成的交易订单可继续完成） </p>
            <h3>二、订单规则</h3>
            <p>
                1.当前参加买卖USDT的用户只可同时交易1单；<br />
                2.发布求购USDT单笔数量为500至3000整数，500整数倍；<br />
                3.当天产出USDT，需等第二天才能交易。<br />
                4.支付倒计时为30分钟，买方未及时点已付款，卖币方可点联系平台申诉，要求系统退回USDT；<br />
                5.核对金额倒计时为30分钟，卖方未及时点已到帐,买方可点申诉，要求系统协助USDT到账；<br />
                6.卖方手续费=USDT数量*2%，不足1USDT的收1USDT；
            </p>
            <h3>三、处罚措施</h3>
            <p>凡倒计时结束未点已付款或释放USDT操作的用户，系统会按5天不产出，次数累计5次永久封号； </p>
            <h3>四、注意事项</h3>
            <p>所有参与交易的用户必须完成实名认证、完善用户交易信息</p>
        </div>

    </div>
</template>

<script>
import chooseCards from '../../components/wallet/chooseCard'
import {
    quan_detail
} from '../../data/wallet';
import { Popup } from 'vant';
export default {
    data() {
        return {

            checked: false
        }
    },
    components: {
        chooseCards
    },
    mounted() {

    },
    methods: {
        chooseCoin() {

        }
    },

    watch: {

    }
}

</script>
<style lang='scss' scoped>
.issue-info {
    padding: 0 15px;
    width: 100%;
    border-bottom: 1px solid #ebebeb;
    h3 {
        color: rgba(53, 53, 53, 1);
    }
    p {
        color: #a5abad;
        font-size: 12px;
        margin: 5px 0;
    }
}
</style>