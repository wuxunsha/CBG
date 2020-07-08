<template>
    <div>
        <div class="newsList flex align"
             @click="gopage(item)">
            <div class="img"
                 v-if="item.imgUrl">
                <img :src="item.imgUrl"
                     alt=""
                     srcset="">
            </div>
            <div class="text ellipse">
                <div class="title ellipse">
                    <span>{{item.title}}</span>
                    <span @click="gopage(item)">点击查看</span>
                </div>
                <div class="sub_title ellipse">{{item.subtitle}}</div>
                <div class="info flex align">
                    <!-- <div><van-icon name="manager-o" />user</div> -->
                    <div>{{timerExchange(item.addTime)}}</div>
                </div>
            </div>
        </div>
        <!-- newsList -->
    </div>
</template>

<script>
export default {
    props: ['item'],
    data() {
        return {}
    },
    methods: {
        gopage(item) {
            this.$router.push({ path: '/newsDetail', query: { item: item } })
        },
        timerExchange(time) {
            var dt = new Date(time)
            var yy = dt.getFullYear()
            var mm = (dt.getMonth() + 1) > 9 ? dt.getMonth() + 1 : dt.getMonth() + 1
            mm = mm > 9 ? mm : '0' + mm
            var dd = dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate()
            var hh = dt.getHours() > 9 ? dt.getHours() : '0' + dt.getHours()
            var mi = dt.getMinutes() > 9 ? dt.getMinutes() : '0' + dt.getMinutes()
            var ss = dt.getSeconds() > 9 ? dt.getSeconds() : '0' + dt.getSeconds()
            var dy = dt.getDay() > 9 ? dt.getDay() : '0' + dt.getDay()
            return `${yy}-${mm}-${dd} ${hh}:${mi}:${ss}`
        }
    },
    mounted() { },
    watch: {

    } //watch
};

</script>
<style rel="stylesheet/scss" scoped lang="scss">
@import "../../styles/walletVal";
.newsList {
    background: white;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    width: 100%;
    .img {
        min-width: 120px;
        width: 120px;
        height: 90px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        overflow: hidden;
        margin-right: 10px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    &:active {
        .img {
            opacity: 0.5;
        }
    }
    .text {
        width: 100%;
        > div {
            width: 100%;
            margin-bottom: 5px;
            &.title {
                width: 100%;
                font-size: 16px;
                span:nth-child(2) {
                    float: right;
                    font-size: 14px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(86, 107, 243, 1);
                }
            }
            &.sub_title {
                margin: 10px 0;
                font-size: 12px;
                font-weight: 500;
                color: rgba(165, 172, 174, 1);
            }
            &.info {
                > div {
                    margin-right: 20px;
                    font-weight: normal;
                    font-size: 11px;
                    color: rgba(86, 107, 243, 1);
                }
            }
        }
    }
}
</style>
