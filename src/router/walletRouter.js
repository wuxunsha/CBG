const app = resolve => require(['@/view/walletView/app'], resolve)
const user = resolve => require(['@/view/walletView/user'], resolve)
const book = resolve => require(['@/view/walletView/book'], resolve)
const recharge = resolve => require(['@/view/walletView/recharge'], resolve)
const withdraw = resolve => require(['@/view/walletView/withdraw'], resolve)
const withdrawList = resolve => require(['@/view/walletView/withdrawList'], resolve)
const share = resolve => require(['@/view/walletView/share'], resolve)
const feedback = resolve => require(['@/view/walletView/feedback'], resolve)
const login = resolve => require(['@/view/walletView/login'], resolve)
const register = resolve => require(['@/view/walletView/register'], resolve)
const forgetPass = resolve => require(['@/view/walletView/forgetPass'], resolve)
const shareList = resolve => require(['@/view/walletView/shareList'], resolve)
const hisDetail = resolve => require(['@/view/walletView/hisDetail'], resolve)
const assetsDetail = resolve => require(['@/view/walletView/assetsDetail'], resolve)
const newsDetail = resolve => require(['@/view/walletView/newsDetail'], resolve)
const setPayPass = resolve => require(['@/view/walletView/setPayPass'], resolve)
const assetsDetail_v2 = resolve => require(['@/view/walletView/assetsDetail_v2'], resolve)
const rechargeList = resolve => require(['@/view/walletView/rechargeList'], resolve)
const news = resolve => require(['@/view/walletView/news'], resolve)
const peopleStock = resolve => require(['@/view/walletView/peopleStock'], resolve)
const peopleDetail = resolve => require(['@/view/walletView/peopleDetail'], resolve)
const myProperty = resolve => require(['@/view/walletView/myProperty'], resolve)
const issue = resolve => require(['@/view/walletView/issue'], resolve)
const identity = resolve => require(['@/view/walletView/identity'], resolve)
const identityTwo = resolve => require(['@/view/walletView/identityTwo'], resolve)


// 自定义路由

import business from './business';

let routerArr = {
    app: app,
    user: user,
    book: book,
    recharge: recharge,
    withdraw: withdraw,
    withdrawList: withdrawList,
    share: share,
    feedback: feedback,
    login: login,
    forgetPass: forgetPass,
    register: register,
    shareList: shareList,
    hisDetail: hisDetail,
    assetsDetail: assetsDetail,
    newsDetail: newsDetail,
    setPayPass: setPayPass,
    assetsDetail_v2: assetsDetail_v2,
    rechargeList: rechargeList,
    news: news,
    peopleStock: peopleStock,
    peopleDetail: peopleDetail,
    myProperty: myProperty,
    issue: issue,
    identity: identity,
    identityTwo: identityTwo,
    ...business // 非通用路由
}


let parent = [];

let aliveRouter = ['home', 'assets', 'bankUser', 'mining']; //需要缓存路由
for (let key in routerArr) {
    let item = {
        path: `/${key}`,
        name: key,
        component: routerArr[key],
        meta: {
            keepAlive: aliveRouter.indexOf(key) < 0 ? false : true,
            title: key,
            title_en: key
        }
    }
    parent.push(item);
}

export default parent //res;