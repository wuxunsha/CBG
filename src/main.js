// 内部资料
// https://shimo.im/docs/wlEjNdjJliIfoNmu/read
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index';
import Lib from '@/data/index'
import axios from 'axios'
import layer from 'layer-mobile'
import {
    Check_browser,
    timerExchange,
    toFixed_4
} from './util';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import qs from 'qs';

Check_browser(); //检查浏览器是否支持本地存储

import VueI18n from 'vue-i18n' //多语言
Vue.use(VueI18n);

import language from './language';

const i18n = new VueI18n({
    locale: 'zh_hk', // 语言标识
    messages: {
        'zh_hk': language.zh_hk, // 中文语言包
        'zh_cn': language.zh_cn, // 中文语言包
        'en': language.en // 英文语言包
    }
})

//import VConsole from 'vconsole'; // 手机控制台插件。打包上线记得注释掉再打包 push online
//new VConsole()

import {
    Button,
    Toast,
    Popup,
    Icon,
    Loading,
    Tag,
    NavBar,
    Swipe,
    SwipeItem,
    Dialog,
    Checkbox,
    Notify,
    Tab,
    Tabs,
    ActionSheet,
    Skeleton,
    Panel,
    Stepper,
    Field,
    Area,
    Overlay,
    Uploader,
    Picker,
    RadioGroup,
    Radio,
    Search
} from 'vant'
Vue.use(Button).use(Popup).use(Icon).use(Loading).use(Tag).use(NavBar).use(Swipe).use(SwipeItem).use(Dialog).use(Checkbox).use(Notify).use(Tab).use(Tabs).use(ActionSheet).use(Skeleton).use(Panel).use(Stepper).use(Field).use(Area).use(Overlay).use(Uploader).use(Picker).use(Radio).use(RadioGroup).use(Search);
window.Toast = Toast;
window.Dialog = Dialog;
import 'vant/lib/index.css';
import './styles/index.scss';

Vue.prototype.$lib = Lib;
Vue.prototype.$http = axios;
Vue.prototype.$layer = layer;
Vue.prototype.goback = () => {
    router.go(-1);
}
Vue.prototype.gopage = (path) => {
    router.push(path);
}
Vue.prototype.gopage_re = (path) => {
    router.replace(path);
}
Vue.prototype.openLink = (url) => {
    window.open(url);
}
Vue.prototype.lang_actions = [{
    name: "繁體中文",
    type: "zh_hk"
}, {
    name: "简体中文",
    type: "zh_cn"
}, {
    name: "English",
    type: "en"
}]

Vue.prototype.blur_event = () => {
    window.scrollTo(0, 0);
    //window.scrollTo(0, document.documentElement.clientHeight);
}

Vue.prototype.lang = 'zh_hk';

Vue.prototype.set_lang = (type) => {
    i18n.locale = type;
    localStorage.setItem('lang', type);
    Vue.prototype.lang = type;
}

Vue.prototype.toFixed_4 = (num) => {
    return toFixed_4(num)
}

Vue.prototype.timerMD = (date) => {
    return timerExchange(date, 'hh:mi mm/dd')
}

Vue.prototype.setPopup = (data) => {
    //store.mutations.setPopup(data);
    store.commit('setPopup', data);
}


Vue.prototype.setImgUrl = (key) => {
    return (`https://xmtop.cn/proxyUrl/wallet/img/${key}`)
}


Vue.prototype.qsParams = (params) => {
    return qs.stringify(params)
}
Vue.prototype.parseParams = (params) => {
    return qs.parse(params)
}


Vue.config.productionTip = false
Vue.filter('dateFilter', function(value) {
    return new Date(parseInt(value) * 1000).toLocaleString();
})

//  全局公共组件导入

import walletNav from './components/common'
Vue.use(walletNav);

/* eslint-disable no-new */
const requireAuth = ['login', 'register', 'forgetPass'] //不需要跳转登录路由
router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);
    NProgress.start();
    let isLogin = store.state.token;
    if (requireAuth.indexOf(to.meta.title) < 0) {
        // console.log('需要跳转')
        if (isLogin) {
            next()
        } else {
            next()
            if (to.path === '/login') { //这就是跳出循环的关键
                next()
            } else {
                next()
                next('/login')
            }
        }
        next()
    } else {
        // console.log('不需要跳转==》')
        if (isLogin && (to.path === '/login' || to.path === '/register')) { //登录状态，登录注册跳转首页
            next()
                // next('/home')
                // console.log('跳转首页')
        } else {
            next()
        }

    }
});

router.afterEach(transition => {
    NProgress.done();
})
new Vue({
    data() {
        return {

        }
    },
    el: '#app',
    router,
    store,
    i18n,
    components: {
        App
    },
    template: '<App/>',
    mounted: function() {
        var lang = localStorage.getItem('lang') || navigator.language;
        // console.log(lang)
        if (lang == 'zh_hk') {
            this.$i18n.locale = window.lang = 'zh_hk';
        } else if (lang.indexOf('en') >= 0) {
            this.$i18n.locale = window.lang = 'en';
        } else {
            this.$i18n.locale = window.lang = 'zh_cn';
        }
    }
})