<template>
  <div>
        <div class="navBox">
            <van-nav-bar :title="`${$t('wallet.payment.payment_title')}`" fixed left-arrow @click-left="goback()"/>
        </div>

        <div class="content-box">
            <div class="no-data" v-if="hidden">
                <p>{{$t('wallet.payment.payment_information')}}</p>
                <img src="../../assets/wallet/deal/图层 7 拷贝@2x.png" alt="">
                <p>{{$t('wallet.payment.payment_no')}}</p>
            </div>

            <div class="with-data" v-else>
                <div class="the-way">
                    <div>
                        <img src="../../assets/wallet/deal/微信@2x.png" alt="">
                    </div>
                    <div>
                        <p>13666666666</p>
                    </div>
                    <div>
                        <span>编辑</span>
                    </div>
                </div>
                <div class="the-way">
                    <div>
                        <img src="../../assets/wallet/deal/支付宝@2x.png" alt="">
                    </div>
                    <div>
                        <p>13666666666</p>
                    </div>
                    <div>
                        <span>编辑</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 添加按钮 -->
        <div class="add-btn">
            <span>{{$t('wallet.payment.payment_add')}}</span>
        </div>
  
  </div>
</template>

<script>
export default {
    data() {
        return {
            hidden: true
        }
    },
    methods: {

    },
    computed: {
        
    },
    mounted() {
        
    }
};

</script>

<style rel="stylesheet/scss" scoped lang="scss">
.content-box {
    .no-data {
        width: 50%;
        margin: 110px auto;
        > p {
            font-size: 12px;
            font-weight: 500;
            color: rgba(53,53,53,1);
            margin-bottom: 38px;
            text-align: center;
        }
        img {
            width: 100%;
            margin-bottom: 18px;
        }
        > p:nth-child(3) {
            color: rgba(200,205,211,1);
        }
    }
    .with-data {
        .the-way {
            display: flex;
            padding: 0 15px;
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #EBEBEB;
            > div:nth-child(1) {
                width: 18px;
                margin-right: 16px;
                img {
                    width: 100%;
                    vertical-align: sub;
                }
            }
            > div:nth-child(2) {
                flex: 1;
                p {
                    font-size: 12px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(53,53,53,1);
                }
            }
            > div:nth-child(3) {
                width: 60px;
                text-align: center;
                span {
                    // display: inline-block;
                    padding: 4px 14px;
                    background: #566BF3;
                    font-size: 12px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(255,255,255,1);
                    border-radius:4px;
                }
            }
        }
    }
}
.add-btn {
    position: fixed;
    bottom: 0;
    height: 62px;
    line-height: 62px;
    padding: 0 15px;
    width: 100%;
    border-top: 1px solid rgba(235,235,235,1);
    text-align: center;
    span {
        display: inline-block;
        width: 100%;
        height: 34px;
        line-height: 34px;
        background: rgba(86,107,243,1);
        border-radius: 4px; 
        cursor: pointer;
        color: #fff;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
    }
}
</style>
