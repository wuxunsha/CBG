import Vue from 'vue'
import Router from 'vue-router'

import walletRouter from './walletRouter';

const notfound = resolve => require(['@/view/walletView/notfound'], resolve)


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/home'
        },
        {
            path: '*',
            name: 'notfound',
            component: notfound,
            meta: {
                title: "404"
            }
        },
        ...walletRouter
    ]
})