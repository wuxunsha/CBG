<template>
    <div class="people-stock">
        <div class="navBox">
            <van-nav-bar :title="`发布买入`"
                         fixed
                         left-arrow
                         @click-left="goback()" />
        </div>
        <div class="issue-info">
            <p>交易大厅开放时间(工作日) <span style="color:#353535;margin:0 0 0 10px">9:00-18:00</span> </p>
        </div>
        <div class="sell">
            <div class="sell-top">
                <p>昨日均价(CNY) <span style="color:#353535">36.00~180.00 CNY</span></p>
                <p>交易单价(CNY)<span style="margin:0 0 0 10px">0.33-0.36</span></p>
                <p>最低500CBK起售，整数倍</p>
            </div>
            <div class="sell-right">
                <p>交易单价(CNY)<span style="margin:0 0 0 10px">0.33-0.36</span></p>
            </div>

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


        }
    },

    mounted() {

    },
    methods: {

    },

    watch: {

    }
}

</script>
<style lang='scss' scoped>
.issue-info {
    padding: 0 15px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: rgba(247, 246, 251, 1);
    p {
        color: #556bf3;
    }
}
.sell {
    display: flex;
    .sell-top {
    }
}
</style>