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
                <p>步骤二</p>
                <!-- <span>选择国籍</span> -->
            </div>
        </div>
        <div style="margin:15px 0 0 0;padding: 0 15px">
            <div class="in-name">
                <p>姓名</p>
                <input type="text"
                       placeholder="请输入姓名">
            </div>
            <div class="in-name">
                <p>身份证</p>
                <input type="text"
                       placeholder="请输入身份证">
            </div>
        </div>
        <div>
            <van-uploader>
                <van-button>
                    <div class="up-load">身份证正面</div>
                </van-button>
            </van-uploader>
            <!-- <van-uploader>
                <van-button>上传文件</van-button>
            </van-uploader>
            <van-uploader>
                <van-button>上传文件</van-button>
            </van-uploader> -->
        </div>
        <div class="footer">
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
.in-name {
    margin: 20px 0 0 0;
    border-bottom: 1px solid #ebebeb;
    p {
        color: #353535;
    }
    input {
        margin: 6px 0 3px -2px;
        border: none;
    }
}
.up-load {
    background-image: url("../../assets/wallet/my/11.png");
    width: 100%;
    height: 100%;
    background-size: contain;
    width: 80px;
    height: 44px;
    line-height: 44px;
    color: #c8cdd3;
}
/deep/ .van-button--normal {
    width: 160px;
    height: 90px;
}
/deep/ .van-uploader__input {
    width: 180px;
    height: 90px;
}
</style>