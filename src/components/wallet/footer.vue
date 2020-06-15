<template>
    <div>
        <div class="footer_space"></div>
        <div class="footer flex between align">

            <router-link class="item"
                         :class="footerNavActive==item.title?'active animated bounceIn':''"
                         :to="{path:item.path}"
                         v-for="(item,index) in navRouter"
                         :key="index">
                <i :class="`${item.title} icon`"></i>
                <span>{{item.name}}</span>
            </router-link>

        </div>
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
            navRouter: [{
                title: 'home',
                path: '/home',
                name: `${this.$t('feature.footer.text_home')}`
            }, {
                title: 'deal',
                path: '/deal',
                name: `${this.$t('feature.footer.text_deal')}`
            }, {
                title: 'assets',
                path: '/assets',
                name: `${this.$t('feature.footer.text_assets')}`
            }, {
                title: 'user',
                path: '/bankUser',
                name: `${this.$t('feature.footer.text_user')}`
            }]
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/scss" lang="scss">
@import "../../styles/walletVal";

.footer_space {
    height: 60px;
}

.footer {
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: white;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    z-index: 20;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

.item {
    box-sizing: border-box;
    width: 50%;
    text-align: center;
    font-size: 12px;
    color: #d8d8d8;
    font-weight: bold;
    position: relative;

    .red {
        width: 6px;
        height: 6px;
        background: #ff5656;
        position: absolute;
        top: 5px;
        right: 36%;
        z-index: 11;
        border-radius: 10px;
    }
}

.item.active {
    color: $them_color;
}

.item .icon {
    display: block;
    width: 23px;
    height: 23px;
    margin: 0 auto;
    background-size: 100% 100% !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    margin-bottom: 3px;
}

  .item .icon.home {
    background: url(../../assets/business/首页@3x.png);
  }

  .item.active .icon.home {
    background: url(../../assets/business/首页－选中.png);
  }

.item .icon.deal {
    background: url(../../assets/business/交易@2.png);
}

.item.active .icon.deal {
    background: url(../../assets/business/交易@2x.png);
}

//  .item .icon.mining {
//   background: url(../../assets/business/nav_mining.png);
// }

// .item.active .icon.mining {
//   background: url(../../assets/business/nav_mining_active.png);
// }

.item .icon.assets {
    background: url(../../assets/business/钱包@2x.png);
}

  .item.active .icon.assets {
    background: url(../../assets/business/钱包@3x.png);
  }


  .item .icon.user {
    background: url(../../assets/business/我的@2x.png);
  }

  .item.active .icon.user {
    background: url(../../assets/business/我的－选中@3x.png);
  }

</style>
