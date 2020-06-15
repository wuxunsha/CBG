<template>
    <div id="new_detail">

        <div class="navBox">
            <van-nav-bar fixed
                         left-arrow
                         @click-left="goback()" />
        </div>

        <div v-if="content.contentText">

            <div class="header"
                 v-if="false">

                <div class="info flex align border-bottom">
                    <!-- <div><van-icon name="manager-o" />user</div> -->
                    <div>
                        <van-icon name="underway-o" />{{content.addTime}}</div>
                </div>
            </div>
            <!-- header -->
            <div class="new-title">
                <img src="../../assets/wallet/asstes/CBG.CBK--2@2x.png">
                <span>CB</span>
                <span>GAME</span>
            </div>
            <div class="line"></div>

            <div class="title">{{content.title}}</div>

            <div class="html_content"
                 v-html="content.contentText"></div>

            <div class="space20"></div>

        </div>
        <!-- content -->

        <div v-else>
            <div class="space40"></div>
            <van-skeleton title
                          :row="3" />
        </div>

    </div>
    <!-- index -->
</template>

<script>
import {
    noticeDetail
} from '../../data/wallet';
export default {
    data() {
        return {
            content: {
                title: this.$t('wallet.news.nav_title_detial')
            }
        }
    },
    methods: {
        get_data() { //获取详情
            noticeDetail({
                id: this.$route.query.id
            }).then(v => {
                this.content = v.data;
            })
        } //get_data
    },
    mounted() {
        this.get_data();
    } //mounted
};

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.header {
    padding: 20px 0;

    .info {
        padding: 10px;
        > div {
            margin-right: 20px;
            font-weight: normal;
            font-size: 11px;
            opacity: 0.5;
        }

        i {
            display: inline-block;
            margin-right: 5px;
            position: relative;
            top: 2px;
        }
    }
}

.html_content {
    line-height: 22px;
    font-size: 12px;
    padding: 0 16px;
    word-break: break-all;
    * {
        word-break: break-all;
    }
    p {
        line-height: 2em;
        font-size: 12px;
        display: block;
        margin-bottom: 10px;
    }

    img {
        max-width: 100%;
    }
}
.new-title {
    padding: 0 16px;
    margin: 8px 0 22px 0;
    img {
        // width: 120px;
        // height: 18px;
        width: 18%;
        vertical-align: bottom;
        margin-right: 10px;
    }
    span:nth-child(2) {
        font-size:22px;
        font-family:Swis721 Blk BT;
        font-weight:900;
        color:rgba(86,107,243,1);
        margin-right: 6px;
    }
    span:nth-child(3) {
        font-size:22px;
        font-family:Swis721 Blk BT;
        font-weight:900;
        color:#22EFB9;
    }
}
.line {
    width: 100%;
    height: 1px;
    background-color: #ccc;
}
.title {
    margin: 30px 0;
    width: 65%;
    font-size: 24px;
    font-weight: 400;
    padding: 0px 16px;
}
</style>
