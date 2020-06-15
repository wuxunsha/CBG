import {
    get,
    post
} from "./fetch"; //引用fetch.js
import qs from 'qs';
let isProduction = process.env.NODE_ENV === 'production'
const newUrlPath = isProduction ? 'http://api2.njmall.store' : '/proxyPoolUrl'; //线上路由
export function getTeamInfo(params) { //推荐头部数据
    return get({
        url: `${newUrlPath}/index/user/team`,
        params: params
    })
} //getTeamInfo
export function getPoolList(params) { //矿池产品列表
    return get({
        url: `${newUrlPath}/index/Product/lists`,
        params: params
    })
} //poolList


const urlPath = isProduction ? 'http://tb.njmall.store/proxyUrl/wallet/v1' : 'proxyUrl/wallet/v1'; //线上路由

export function poolList(params) { //矿池产品列表
    return get({
        url: `${urlPath}/user/pool/list`,
        params: params
    })
} //poolList

export function orderList(params) { //我的矿池列表
    return get({
        url: `${urlPath}/user/pool/orderList`,
        params: params
    })
} //orderList

export function newOrderList(params) { //我的矿池列表
    return post({
        url: `${newUrlPath}/index/order/orderList`,
        params: params
    })
} //orderList

export function coinsList(params) { //代币列表
    return get({
        url: `${urlPath}/user/coins`,
        params: params
    })
} //coinsList

export function poolBuy(params) { //poolBuy
    return post({
        url: `${newUrlPath}/index/order/add`,
        params: params
    })
    // return post({
    //     url: `${urlPath}/user/pool/buy`,
    //     params: params
    // })
} //poolBuy

export function bankList(params) { //获取理财产品列表
    return get({
        url: `${urlPath}/user/product/list`,
        params: params
    })
} //bankList

export function productBuy(params) { //购买理财产品
    return post({
        url: `${urlPath}/user/product/buy`,
        params: params
    })
} //productBuy

export function bankOrderList(params) { //bankOrderList
    return get({
        url: `${urlPath}/user/product/orderList`,
        params: params
    })
} //bankOrderList


export function poolHeader(params) { //获取挖矿顶部信息
    return get({
        url: `${urlPath}/user/pool/info`,
        params: params
    })
} //poolHeader

export function newPoolHeader(params) { //获取挖矿顶部信息
    return post({
        url: `${newUrlPath}/index/User/poolInfo`,
        params: params
    })
} //newPoolHeader


export function childList(params) { //分享列表
    return get({
        url: `${urlPath}/user/child`,
        params: params
    })
} //childList

export function childInfo(params) { //推荐头部数据
    return get({
        url: `${urlPath}/user/childInfo`,
        params: params
    })
} //child_detail'


export function resonance(params) { //矿池详情
    return get({
        url: `${urlPath}/user/pool/resonance`,
        params: params
    })
} //resonance


export function productInfo(params) { //银行顶部信息
    return get({
        url: `${urlPath}/user/product/info`,
        params: params
    })
} //productInfo


export function transfer(params) { //转账
    return post({
        url: `${urlPath}/user/transfer`,
        params: params
    })
} //transfer

export function idGetName(params) { //获取id名称
    return get({
        url: `${urlPath}/user/transfer/check`,
        params: params
    })
} //idGetName

export function transferFee(params) { //获取手续费
    return get({
        url: `${urlPath}/user/transferFee`,
        params: params
    })
} //transferFee