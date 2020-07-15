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
            <!-- <div>
                <p>步骤二</p>
                <span>选择国籍</span>
            </div> -->
        </div>
        <div style="margin:15px 0 0 0;padding: 0 15px">
            <div class="in-name">
                <p>姓名</p>
                <input type="text"
                       placeholder="请输入姓名"
                       v-model="name">
            </div>
            <div class="in-name">
                <p>身份证</p>
                <input type="text"
                       placeholder="请输入身份证"
                       v-model="card"
                       maxlength="18">
            </div>
        </div>
        <div class="upload-box">
            <div>
                <van-uploader class="upload-input"
                              :max-count="1"
                              multiple
                              preview-full-images
                              :before-read="beforeRead"
                              :after-read="positiveRead"
                              v-model="positiveUrl">
                    <van-button>
                        <div class="up-load">身份证正面</div>
                    </van-button>
                </van-uploader>
                <van-uploader class="upload-input"
                              style="text-align:right;"
                              :max-count="1"
                              preview-full-images
                              multiple
                              :before-read="beforeRead"
                              :after-read="reverseRead"
                              v-model="reverseUrl">
                    <van-button>
                        <div class="up-load">身份证反面</div>
                    </van-button>
                </van-uploader>
            </div>
            <div>
                <van-uploader class="upload-input"
                              :max-count="1"
                              preview-full-images
                              multiple
                              :before-read="beforeRead"
                              :after-read="handheldRead"
                              v-model="handheldUrl">
                    <van-button>
                        <div class="up-load">手持身份证照</div>
                    </van-button>
                </van-uploader>
            </div>
        </div>
        <div class="footer"
             @click="submit">
            确认
        </div>
    </div>
</template>

<script>
import {
    uploadFile,
    subIdcardInfo
} from '../../data/wallet';
import chooseCitys from '../../components/wallet/chooseCity'
export default {
    data() {
        return {
            name: '',
            card: '',
            positiveUrl: [],
            reverseUrl: [],
            handheldUrl: [],
            // 身份证正面照
            idCardFrontImg: '',
            // 身份证反面照
            idCardSideImg: '',
            // 手持身份证照
            idCardHandImg: ''
        }
    },
    components: {
        chooseCitys
    },
    methods: {
        // 上传前
        beforeRead(file) {
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                Toast('请上传 jpg/png 格式图片')
                return false
            }
            return true
        },

        // 上传身份证正面图
        positiveRead(file) {
            let param = new FormData()
            param.append('file', file.file)
            uploadFile(param).then(res => {
                if (res.code === 1000) {
                    this.idCardFrontImg = res.data
                }
            }).catch(e => {
                if (e.code === 1000) {
                    this.idCardFrontImg = e.data
                }
            })
        },
        // 上传身份证反面图
        reverseRead(file) {
            let param = new FormData()
            param.append('file', file.file)
            uploadFile(param).then(res => {
                if (res.code === 1000) {
                    this.idCardSideImg = res.data
                }
            }).catch(e => {
                if (e.code === 1000) {
                    this.idCardSideImg = e.data
                }
            })
        },
        // 上传手持照
        handheldRead(file) {
            let param = new FormData()
            param.append('file', file.file)
            uploadFile(param).then(res => {
                if (res.code === 1000) {
                    this.idCardHandImg = res.data
                }
            }).catch(e => {
                if (e.code === 1000) {
                    this.idCardHandImg = e.data
                }
            })
        },
        // 提交
        submit() {
            if (!this.name) {
                return Toast.fail('请输入姓名')
            }
            if (!this.card) {
                return Toast.fail('请输入身份证号码')
            }
            if (this.positiveUrl.length <= 0) {
                return Toast.fail('请上传身份证正面照')
            }
            if (this.reverseUrl.length <= 0) {
                return Toast.fail('请上传身份证反面照')
            }
            if (this.handheldUrl.length <= 0) {
                return Toast.fail('请上传手持身份证照')
            }
            this.subIdcard()
        },
        // 提交身份认证信息
        subIdcard() {
            const data = {
                idCardFrontImg: this.idCardFrontImg,
                idCardHandImg: this.idCardHandImg,
                idCardSideImg: this.idCardSideImg,
                idCardCode: this.card,
                realName: this.name
            }
            subIdcardInfo(data).then(res => {
                if (res.code === 1000) {
                    Toast.success('提交成功')
                    setTimeout(() => {
                        this.$router.push('/bankUser')
                    }, 1500);
                } else {
                    return Toast.fail(res.msg)
                }
            }).catch(e => {
                if (e.code === 1000) {
                    Toast.success('提交成功')
                    setTimeout(() => {
                        this.$router.push('/bankUser')
                    }, 1500);
                } else {
                    return Toast.fail(e.msg)
                }
            })
        }
    }
}

</script>
<style lang='scss'>
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
    font-size: 14px;
    background: #566bf3;
    border-radius: 2px;
    text-align: center;
    color: #fff;
}
.in-name {
    margin: 20px 0 0 0;
    border-bottom: 1px solid #ebebeb;
    p {
        font-size: 12px;
        color: #353535;
    }
    input {
        font-size: 12px;
        margin: 6px 0 3px -2px;
        border: none;
    }
}
.upload-box {
    margin-top: 35px;
    padding: 0 15px;
    > div:nth-child(1) {
        display: flex;
        justify-content: space-between;
        height: 88px;
        margin-bottom: 15px;
        .upload-input {
            flex: 1;
            height: 88px;
            margin-bottom: 15px;
            .up-load {
                background: url("../../assets/wallet/my/11.png") no-repeat 50%
                    50%;
                width: 100%;
                background-size: contain;
                height: 88px;
                line-height: 88px;
                color: #c8cdd3;
            }
            .van-uploader__wrapper {
                height: 88px;
            }
            .van-uploader__input-wrapper {
                width: 100%;
                height: 88px;
            }
            .van-button--normal {
                width: 100%;
                height: 88px;
                .van-button__content {
                    width: 100%;
                }
            }
            /deep/.van-uploader__preview {
                width: 100% !important;
                height: 88px !important;
            }
            /deep/.van-uploader__preview-image {
                width: 100% !important;
                height: 88px !important;
            }
        }
        .upload-input:nth-child(2) {
            margin-left: 4%;
        }
    }
    > div:nth-child(2) {
        .upload-input {
            width: 48%;
            height: 88px;
            margin-bottom: 15px;
            .up-load {
                background: url("../../assets/wallet/my/11.png") no-repeat 50%
                    50%;
                width: 100%;
                background-size: contain;
                height: 88px;
                line-height: 88px;
                color: #c8cdd3;
            }
            .van-uploader__wrapper {
                height: 88px;
            }
            .van-uploader__input-wrapper {
                width: 100%;
                height: 88px;
            }
            .van-button--normal {
                width: 100%;
                height: 88px;
                .van-button__content {
                    width: 100%;
                }
            }
            /deep/.van-uploader__preview {
                width: 100% !important;
                height: 88px !important;
            }
            /deep/.van-uploader__preview-image {
                width: 100% !important;
                height: 88px !important;
            }
        }
    }
}
/deep/ .van-button--normal {
    width: 160px;
    height: 90px;
}
/deep/ .van-uploader__input {
    width: 180px;
    height: 90px;
}
.in-name input {
    font-size: 12px;
}
</style>