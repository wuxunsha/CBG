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
const forgetPass = resolve => require(['@/view/mine/forgetPass'], resolve)
const changePassword = resolve => require(['@/view/mine/change-password'], resolve)

const shareList = resolve => require(['@/view/walletView/shareList'], resolve)
const hisDetail = resolve => require(['@/view/walletView/hisDetail'], resolve)
const assetsDetail = resolve => require(['@/view/walletView/assetsDetail'], resolve)
const newsDetail = resolve => require(['@/view/walletView/newsDetail'], resolve)
const setPayPass = resolve => require(['@/view/mine/setPayPass'], resolve)
const assetsDetail_v2 = resolve => require(['@/view/walletView/assetsDetail_v2'], resolve)
const rechargeList = resolve => require(['@/view/walletView/rechargeList'], resolve)
const news = resolve => require(['@/view/mine/news'], resolve)
const peopleStock = resolve => require(['@/view/walletView/peopleStock'], resolve)
const peopleDetail = resolve => require(['@/view/walletView/peopleDetail'], resolve)
const myProperty = resolve => require(['@/view/walletView/myProperty'], resolve)
const issue = resolve => require(['@/view/walletView/issue'], resolve)
const identity = resolve => require(['@/view/walletView/identity'], resolve)
const identityTwo = resolve => require(['@/view/walletView/identityTwo'], resolve)
const shareExtract = resolve => require(['@/view/mine/shareExtract'], resolve)
const setting = resolve => require(['@/view/mine/setting'], resolve)
const safety = resolve => require(['@/view/mine/safety'], resolve)
const paymentMethod = resolve => require(['@/view/mine/payment-method'], resolve)
const issueRules = resolve => require(['@/view/walletView/issueRules'], resolve)
const issueWait = resolve => require(['@/view/walletView/issueWait'], resolve)
const issueAwait = resolve => require(['@/view/walletView/issueAwait'], resolve)
const issueOlerdy = resolve => require(['@/view/walletView/issueOlerdy'], resolve)
const sell = resolve => require(['@/view/walletView/sell'], resolve)
const sellWait = resolve => require(['@/view/walletView/sellWait'], resolve)
const sellAwait = resolve => require(['@/view/walletView/sellAwait'], resolve)
const sellOlerdy = resolve => require(['@/view/walletView/sellOlerdy'], resolve)
const addPayment = resolve => require(['@/view/mine/add-payment'], resolve)
const service = resolve => require(['@/view/walletView/service'], resolve)
const orderList = resolve => require(['@/view/walletView/orderList'], resolve)
const rule = resolve => require(['@/view/walletView/rule'], resolve)
const myList = resolve => require(['@/view/walletView/myList'], resolve)


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
    changePassword: changePassword,
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
    shareExtract: shareExtract,
    setting: setting,
    safety: safety,
    paymentMethod: paymentMethod,
    issueRules: issueRules,
    issueWait: issueWait,
    issueAwait: issueAwait,
    issueOlerdy: issueOlerdy,
    sell: sell,
    sellWait: sellWait,
    sellAwait: sellAwait,
    sellOlerdy: sellOlerdy,
    addPayment: addPayment,
    service: service,
    orderList: orderList,
    rule: rule,
    myList: myList,
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