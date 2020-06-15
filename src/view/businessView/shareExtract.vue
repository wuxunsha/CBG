<template>
    <div>

        <div>
            <van-nav-bar :title="`${$t('feature.bankShareList.nav_title')}`"
                         left-arrow
                         @click-left="goback()"
                         fixed />
        </div>

        <div class="user-info">
            <div>
                <img src="../../assets/business/user/我的－选中@2x.png"
                     alt="">
                <span>吴先生</span>
            </div>
            <div>
                <p>
                    总收益
                </p>
                <p>12345</p>
            </div>
        </div>

        <div class="revenue-box">
            <ul class="revenue-list">
                <li>
                    <div>收益</div>
                    <div>数量</div>
                    <div>方式</div>
                    <div>提取</div>
                </li>
                <li>
                    <div>推荐收益</div>
                    <div>800</div>
                    <div class="select-box">
                        <p>
                            <span>选择卖出等级</span>
                            <van-icon name="play" />
                        </p>
                    </div>
                    <div>提取</div>
                </li>
                <li>
                    <div>团队收益</div>
                    <div>800</div>
                    <div class="select-box">
                        <p>
                            <span>选择卖出等级</span>
                            <van-icon name="play" />
                        </p>
                    </div>
                    <div>提取</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
//   import {
//     childList,
//     childInfo,
//     getTeamInfo
//   } from '../../data/business';

export default {
    data() {
        return {

        }
    },
    methods: {

    },
    created() {

    },
    mounted() {

    }
};

</script>
<style rel="stylesheet/scss" scoped lang="scss">
.user-info {
    display: flex;
    margin-top: 46px;
    width: 100%;
    height: 96px;
    border-bottom: 5px solid #f7f6fb;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
    > div {
        flex: 1;
        img {
            width: 38px;
            border-radius: 50%;
        }
        span {
            margin-left: 12px;
            font-size: 14px;
            font-weight: bold;
            color: rgba(53, 53, 53, 1);
        }
    }
    > div:nth-child(2) {
        width: 100%;
        text-align: center;
        > p:nth-child(1) {
            font-size: 12px;
            font-weight: bold;
            color: rgba(53, 53, 53, 1);
        }
        > p:nth-child(2) {
            font-size: 26px;
            font-weight: bold;
            color: rgba(86, 107, 243, 1);
        }
    }
}
.revenue-box {
    width: 100%;
    .revenue-list {
        > li {
            display: flex;
            padding: 0 15px;
            border-bottom: 1px solid #ebebeb;
            height: 40px;
            line-height: 40px;
            align-items: center;
            justify-content: center;
            > div {
                font-size: 12px;
                font-weight: 500;
                color: rgba(53, 53, 53, 1);
            }
            > div:nth-child(1) {
                flex: 0.6;
            }
            > div:nth-child(2) {
                flex: 0.6;
            }
            > div:nth-child(3) {
                flex: 1;
            }
            > div:nth-child(4) {
                text-align: right;
                flex: 0.4;
                height: 22px;
                text-align: center;
                line-height: 22px;
                color: #fff;
                background: rgba(86, 107, 243, 1);
                border-radius: 2px;
            }
        }
        > li:nth-child(1) {
            > div {
                color: rgba(200, 205, 211, 1);
            }
            > div:nth-child(4) {
                text-align: right;
                color: rgba(200, 205, 211, 1);
                background: none;
            }
        }
        .select-box {
            p {
                border: 1px solid #c8cdd3;
                width: 76%;
                line-height: 20px;
                padding: 2px 6px;
                span {
                    font-size: 12px;
                    color: rgba(165, 172, 174, 1);
                }
                .van-icon {
                    transform: rotate(90deg);
                    vertical-align: text-top;
                    color: rgba(165, 172, 174, 1);
                    font-size: 12px;
                    margin-left: 6px;
                }
            }
        }
    }
}
</style>
