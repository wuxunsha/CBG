<template>
    <div>
        <div class="navBox">
            <van-nav-bar :title="$t('wallet.rule.text_rule')" fixed left-arrow @click-left="goback()"/>
        </div>

        <div class="content">
            <h4>{{$t('wallet.rule.text_1')}}</h4>
            <p>{{$t('wallet.rule.text_2')}}</p>
            <h4>{{$t('wallet.rule.text_3')}}</h4>
            <p>{{$t('wallet.rule.text_4')}}</p>
            <p>{{$t('wallet.rule.text_5')}}</p>
            <p style="text-indent: 4em;">{{$t('wallet.rule.text_6')}}</p>
            <p style="text-indent: 4em;">{{$t('wallet.rule.text_7')}}</p>
            <p style="text-indent: 4em;">{{$t('wallet.rule.text_8')}}</p>
            <p style="text-indent: 4em;">{{$t('wallet.rule.text_9')}}</p>
            <p>{{$t('wallet.rule.text_10')}}</p>
            <h4>{{$t('wallet.rule.text_11')}}</h4>
            <p>{{$t('wallet.rule.text_12')}}</p>
            <h4>{{$t('wallet.rule.text_13')}}</h4>
            <p>{{$t('wallet.rule.text_14')}}</p>
            <p>{{$t('wallet.rule.text_15')}}</p>
            <p style="text-indent: 4em;">{{$t('wallet.rule.text_16')}}</p>
            <p style="text-indent: 4em;">{{$t('wallet.rule.text_17')}}</p>
            <p style="text-indent: 4em;">{{$t('wallet.rule.text_18')}}</p>
            <p>{{$t('wallet.rule.text_19')}}</p>
            <p style="text-indent: 4em;">{{$t('wallet.rule.text_20')}}</p>
            <p style="text-indent: 4em;">{{$t('wallet.rule.text_21')}}</p>
            <p style="text-indent: 4em;">{{$t('wallet.rule.text_22')}}</p>
            <p style="text-indent: 4em;">{{$t('wallet.rule.text_23')}}</p>
            <p style="text-indent: 4em;">{{$t('wallet.rule.text_24')}}</p>
            <p>{{$t('wallet.rule.text_25')}}</p>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    mounted() {
      
    }
}

</script>
<style lang='scss' scoped>
.content {
    padding: 0 15px 20px;
    h4 {
        font-size: 16px;
        line-height: 26px;
        margin: 10px 0;
    }
    p {
        font-size: 14px;
        line-height: 26px;
        text-indent: 2em;
    }
}
</style>