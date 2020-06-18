<template>
  <div>
        <div class="navBox">
            <van-nav-bar :title="this.$route.query.type == 0 ? `${$t('wallet.payment.payment_add')}` + `${$t('wallet.payment.text_weixin')}` + `${$t('wallet.payment.text_collect_money')}` : this.$route.query.type == 1 ? `${$t('wallet.payment.payment_add')}` + `${$t('wallet.payment.text_zhifubao')}` + `${$t('wallet.payment.text_collect_money')}` : `${$t('wallet.payment.payment_add')}` + `${$t('wallet.payment.text_yinghangka')}` + `${$t('wallet.payment.text_collect_money')}`" fixed left-arrow @click-left="goback()"/>
        </div>

        <div class="content-box">
            <div class="input-box">
                <p>{{$t('wallet.payment.text_name')}}</p>
                <input type="text" :placeholder="`${$t('wallet.payment.text_name_placeholder')}` + `${$t('wallet.payment.text_name')}`">
            </div>
            <div class="input-box">
                <p>{{this.$route.query.type == 0 ? $t('wallet.payment.text_weixin') : this.$route.query.type == 1 ? $t('wallet.payment.text_zhifubao') : $t('wallet.payment.text_yinghangka')}}{{$t('wallet.payment.text_account')}}</p>
                <input type="text" :placeholder="this.$route.query.type == 0 ? `${$t('wallet.payment.text_name_placeholder')}` + `${$t('wallet.payment.text_weixin')}` + `${$t('wallet.payment.text_account')}` : this.$route.query.type == 1 ? `${$t('wallet.payment.text_name_placeholder')}` + `${$t('wallet.payment.text_zhifubao')}` + `${$t('wallet.payment.text_account')}` : `${$t('wallet.payment.text_name_placeholder')}` + `${$t('wallet.payment.text_yinghangka')}` + `${$t('wallet.payment.text_account')}`">
            </div>
            <div class="input-box">
                <p>{{$t('wallet.payment.text_phone')}}</p>
                <input type="text" :placeholder="`${$t('wallet.payment.text_name_placeholder')}` + `${$t('wallet.payment.text_phone')}`">
            </div>
            <div class="input-box">
                <p>{{$t('wallet.payment.text_qr_code')}}</p>
                <van-uploader v-model="fileList" multiple :max-count="1"  preview-full-image upload-icon="plus" :after-read="afterRead" :before-read="beforeRead" :max-size="2 * 1024 * 1024"/>
                <p>{{$t('wallet.payment.text_prompt')}}</p>
            </div>
        </div>

        <!-- 保存按钮 -->
        <div class="add-btn">
            <span>{{$t('wallet.payment.text_save')}}</span>
        </div>
  
  </div>
</template>

<script>
export default {
    data() {
        return {
            fileList: []
        }
    },
    methods: {
       afterRead(file) {
        // 此时可以自行将文件上传至服务器
        console.log(file)
        },
        beforeRead(file) {
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            Toast('请上传 jpg\png 格式图片');
            return false;
        }
        return true;
        }
    },
    computed: {
        
    },
    mounted() {
        
    }
};

</script>

<style rel="stylesheet/scss" scoped lang="scss">
.content-box {
    padding: 0 15px;
    margin-top: 30px;
    .input-box {
        margin-bottom: 22px;
        p {
            font-size: 14px;
            line-height: 14px;
            font-weight: bold;
            color: rgba(53,53,53,1);
        }
        input {
            font-size: 12px;
            margin-top: 6px;
            width: 100%;
            line-height: 35px;
            border: none;
            border-bottom: 1px solid rgba(235,235,235,1);
        }
        .van-uploader {
            margin-top: 20px;
        }
        p:nth-child(3) {
            font-size: 12px;
            font-weight: 500;
            color: rgba(200,205,211,1);
            margin-top: 15px;
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
