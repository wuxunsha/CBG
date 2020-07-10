<template>
    <div>
        <van-tabbar v-model="active" route>
            <van-tabbar-item to="/home">
                <span>{{$t('feature.footer.text_home')}}</span>
                <template #icon="props">
                    <img :src="props.active ? mine.active : mine.inactive" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item to="/deal">
                <span>{{$t('feature.footer.text_deal')}}</span>
                <template #icon="props">
                    <img :src="props.active ? transaction.active : transaction.inactive" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item to="/assets">
                <span>{{$t('feature.footer.text_assets')}}</span>
                <template #icon="props">
                    <img :src="props.active ? wallet.active : wallet.inactive" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item to="/bankUser">
                <span>{{$t('feature.footer.text_user')}}</span>
                <template #icon="props">
                    <img :src="props.active ? user.active : user.inactive" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>


<script>
import {
    mapState,
    mapMutations
} from 'vuex'
export default {
    props: ['footerNavActive'],
    name: 'myFooter',
    data() {
        return {
            active: 0,
            mine: {
                active: require('../../assets/business/sy.png'),
                inactive: require('../../assets/business/sy3x.png')
            },
            transaction: {
                active: require('../../assets/business/jy2x.png'),
                inactive: require('../../assets/business/jy01.png')
            },
            wallet: {
                active: require('../../assets/business/qb3x.png'),
                inactive: require('../../assets/business/qb2x.png')
            },
            user: {
                active: require('../../assets/business/wd3x.png'),
                inactive: require('../../assets/business/wd2x.png')
            }
        }
    },
    methods: {
    },
    computed: {
    },
    mounted() {
    },

}

</script>

<style scoped rel="stylesheet/scss" lang="scss">

</style>
