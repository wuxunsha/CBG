<template>
    <div>
        <div class="navBox">
            <van-nav-bar :title="this.$route.query.type == 3 ? titleName  : this.$route.query.type == 2 ? titleName : titleName"
                         fixed
                         left-arrow
                         @click-left="goback()" />
        </div>

        <div class="content-box">
            <div class="input-box">
                <p>{{$t('wallet.payment.text_name')}}</p>
                <input type="text"
                       v-model="name"
                       :placeholder="`${$t('wallet.payment.text_name_placeholder')}` + `${$t('wallet.payment.text_name')}`">
            </div>
            <div class="input-box">
                <p>{{this.$route.query.type == 3 ? $t('wallet.payment.text_weixin') : this.$route.query.type == 2 ? $t('wallet.payment.text_zhifubao') : $t('wallet.payment.text_yinghangka')}}{{$t('wallet.payment.text_account')}}</p>
                <input type="text"
                       v-model="acount"
                       :placeholder="this.$route.query.type == 3 ? `${$t('wallet.payment.text_name_placeholder')}` + `${$t('wallet.payment.text_weixin')}` + `${$t('wallet.payment.text_account')}` : this.$route.query.type == 2 ? `${$t('wallet.payment.text_name_placeholder')}` + `${$t('wallet.payment.text_zhifubao')}` + `${$t('wallet.payment.text_account')}` : `${$t('wallet.payment.text_name_placeholder')}` + `${$t('wallet.payment.text_yinghangka')}` + `${$t('wallet.payment.text_account')}`">
            </div>
            <div class="input-box">
                <p>{{$t('wallet.payment.text_phone')}}</p>
                <input type="text"
                       v-model="phone"
                       :placeholder="`${$t('wallet.payment.text_name_placeholder')}` + `${$t('wallet.payment.text_phone')}`">
            </div>
            <div class="input-box" v-if="this.$route.query.type != 3">
                <p>{{$t('wallet.payment.text_qr_code')}}</p>
                <van-uploader v-model="fileList"
                              multiple
                              :max-count="1"
                              preview-full-images
                              upload-icon="plus"
                              :after-read="afterRead"
                              :before-read="beforeRead"
                              :max-size="2 * 1024 * 1024" />
                <p>{{$t('wallet.payment.text_prompt')}}</p>
            </div>
        </div>

        <!-- 保存按钮 -->
        <div class="add-btn">
            <span @click="save">{{$t('wallet.payment.text_save')}}</span>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            fileList: [],
            name: '',
            acount: '',
            phone: '',
            img: '',
            titleName: '添加收款方式'
        }
    },
    methods: {
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            // console.log(file)
            // console.log(file);
            let param = new FormData();
            param.append('file', file.file);

            this.$http.post('http://trex.top/payservice/' + 'upload/file', param).then(res => {
                if (res.code == 1000) {
                    this.img = res.data
                } 
            }).catch(v => {
                console.log(v);

            })
        },
        save() {
            if (!this.name) {
                return Toast.fail('请输入姓名')
            }
            if (!this.acount) {
                return Toast.fail('请输入账户地址')
            }
            if (!this.phone) {
                return Toast.fail('请输入联系电话')
            }
            if(this.$route.query.type != 3) {
                if (this.fileList.length <= 0) {
                    return Toast.fail('请添加收款二维码')
                }
            }
            if (this.$route.query.type != 3 && !this.img) {
                return Toast.fail('请添加收款二维码')
            }

            if (this.$route.query.mode === '1') {
                if (this.$route.query.type == 3) {
                    let data = {
                        'payAccount': this.acount,
                        // 收款账号

                        'payName': this.name,
                        // 真实姓名

                        'payPhone': this.phone,
                        // 联系方式

                        'payType': this.$route.query.type
                        // 支付方式：1，支付宝，2，微信，3，银行
                    }
                    this.addUserOtc(data)
                } else {
                    let data = {
                        'payAccount': this.acount,
                        // 收款账号

                        'payName': this.name,
                        // 真实姓名

                        'payPhone': this.phone,
                        // 联系方式

                        'payType': this.$route.query.type,
                        // 支付方式：1，支付宝，2，微信，3，银行

                        'payUrl': this.img,
                        // 收款二维码
                    }
                    this.addUserOtc(data)
                }
            } else if (this.$route.query.mode === '2') {
                if (this.$route.query.type == 3) {
                    let data = {
                        id: this.$route.query.item.id,
                        'payAccount': this.acount,
                        // 收款账号

                        'payName': this.name,
                        // 真实姓名

                        'payPhone': this.phone,
                        // 联系方式

                        'payType': this.$route.query.item.payType
                        // 支付方式：1，支付宝，2，微信，3，银行
                    }
                    this.updateUserOtc(data)
                } else {
                    let data = {
                        id: this.$route.query.item.id,
                        'payAccount': this.acount,
                        // 收款账号

                        'payName': this.name,
                        // 真实姓名

                        'payPhone': this.phone,
                        // 联系方式

                        'payType': this.$route.query.item.payType,
                        // 支付方式：1，支付宝，2，微信，3，银行

                        'payUrl': this.img,
                        // 收款二维码
                    }
                    this.updateUserOtc(data)
                }
            }
        },
        // 添加收款方式
        addUserOtc(data) {
            this.$http.post('http://trex.top/payservice/' + 'user/addUserOtc', data).then(res => {
                if (res.code == 1000) {
                    this.$layer.open({
                        content: res.msg,
                        skin: 'msg',
                        time: 2 //2秒后自动关闭
                    })
                    this.$router.push({ path: '/paymentMethod' })
                } else {
                    this.$layer.open({
                        content: res.msg,
                        skin: 'msg',
                        time: 2 //2秒后自动关闭
                    })
                }
            })
        },
        // 提交编辑收款方式
        updateUserOtc(data) {
            this.$http.post('http://trex.top/payservice/' + 'user/updateUserOtc', data).then(res => {
                if (res.code == 1000) {
                    this.$layer.open({
                        content: res.msg,
                        skin: 'msg',
                        time: 2 //2秒后自动关闭
                    })
                    this.$router.push({ path: '/paymentMethod' })
                } else {
                    this.$layer.open({
                        content: res.msg,
                        skin: 'msg',
                        time: 2 //2秒后自动关闭
                    })
                }
            })
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
        if (this.$route.query.mode === '2') {
            this.titleName = '修改收款方式'
            // console.log(sessionStorage.getItem("path"))
            this.name = this.$route.query.item.payName
            this.acount = this.$route.query.item.payAccount
            this.phone = this.$route.query.item.payPhone
            this.fileList = [
                { url: this.$route.query.item.payUrl }
            ]
            this.img = this.$route.query.item.payUrl
        } else if (this.$route.query.mode === '1') {
            this.titleName = '添加收款方式'
        }
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
            color: rgba(53, 53, 53, 1);
        }
        input {
            font-size: 12px;
            margin-top: 6px;
            width: 100%;
            line-height: 35px;
            border: none;
            border-bottom: 1px solid rgba(235, 235, 235, 1);
        }
        .van-uploader {
            margin-top: 20px;
            .upload-button {
                width: 80px;
                height: 80px;
                overflow: hidden;
                border-radius: 8px;
                background: #fff;
                border: 1px solid #ccc;
                .van-icon {
                    color: #ccc !important;
                    font-size: 20px;
                }
            }
        }
        p:nth-child(3) {
            font-size: 12px;
            font-weight: 500;
            color: rgba(200, 205, 211, 1);
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
    border-top: 1px solid rgba(235, 235, 235, 1);
    text-align: center;
    span {
        display: inline-block;
        width: 100%;
        height: 34px;
        line-height: 34px;
        background: rgba(86, 107, 243, 1);
        border-radius: 4px;
        cursor: pointer;
        color: #fff;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
    }
}
</style>
