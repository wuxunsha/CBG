import {
    get,
    post
} from "./fetch"; //引用fetch.js
import qs from 'qs';

//const urlPath = process.env.urlPath;
//const urlPath = '/proxyUrl';
// const urlPath = 'proxyUrl/wallet/v1'; //线上路由
let isProduction = process.env.NODE_ENV === 'production'

const newUrlPath = isProduction ? 'http://api2.njmall.store' : '/proxyPoolUrl'; //线上路由
export function getUserInfo(params) { //获取用户信息
    return get({
        url: `${newUrlPath}/index/user/info`,
        params: params
    })
} //getUserInfo
export function registerNew(params) { //用户注册
    return post({
        url: `${newUrlPath}/index/user/add`,
        params: params
    })
} //registerNew
export function checkTbAddress(params) { //用户注册
    return post({
        url: `${newUrlPath}/index/user/checkTbAddress`,
        params: params
    })
} //checkTbAddress


const urlPath = isProduction ? 'http://tb.njmall.store/proxyUrl/wallet/v1' : 'proxyUrl/wallet/v1'; //线上路由

export function register(params) { //用户注册
    return post({
        url: `${urlPath}/user/register`,
        params: params
    })
} //register



export function send_message(params) { //获取验证码
    return post({
        url: `${urlPath}/user/send_code`,
        params: qs.stringify(params)
    })
} //send_message

export function login(params) { //帐号登录
    return post({
        url: `${urlPath}/user/login`,
        params: params
    })
} //login

export function user_info() { //获取用户信息
    return get({
        url: `${urlPath}/user/info`
    })
} //user_info




export function banner_list() { //获取首页banner
    return get({
        url: `${urlPath}/user/banner/list`
    })
} //banner_list


export function recharge_address(params) { //获取充值地址
    return get({
        url: `${urlPath}/user/recharge_address`,
        params: params
    })
} //recharge_address


export function withdraw(params) { //申请提现
    return post({
        url: `${urlPath}/user/withdraw/submit`,
        params: qs.stringify(params)
    })
} //withdraw

export function feedback_list(params) { //获取反馈列表
    return get({
        url: `${urlPath}/user/feedback/list`,
        params: params
    })
} //get_feedback

export function send_feedback(params) { //提交反馈
    return post({
        url: `${urlPath}/user/feedback/submit`,
        params: qs.stringify(params)
    })
} //feedback

export function notice(params) { //获取公告列表
    return get({
        url: `${urlPath}/user/notice/list`,
        params: params
    })
} //notice

export function noticeDetail(params) { //获取公告详情
    return get({
        url: `${urlPath}/user/notice/detail`,
        params: params
    })
} //noticeDetail

export function log(params) { //获取流水
    return get({
        url: `${urlPath}/user/log`,
        params: params
    })
} //log


export function logType(params) { //获取流水类型判断
    return get({
        url: `${urlPath}/public/log/type`,
        params: params
    })
} //logTpe



export function headUpload(params) { //头像上传
    return post({
        url: `${urlPath}/user/headUpload`,
        params: params
    })
} //headUpload

export function rechargeList(params) { //获取充值明细
    return get({
        url: `${urlPath}/user/recharge_list`,
        params: params
    })
} //rechargeList

export function withdrawList(params) { //获取提现明细
    return get({
        url: `${urlPath}/user/withdraw/list`,
        params: params
    })
} //withdrawList

let coinBaseUrl = isProduction ? 'http://api.coindog.com' : 'coindog'
export function get_ranks(params) { //获取行情
    return get({
        url: `${coinBaseUrl}/api/v1/currency/ranks`,
        params: params
    })
} //get_ranks

// 目前所用接口结束====================================



export function child(params) { //推荐人列表
    return get({
        url: `${urlPath}/user/child`,
        params: params
    })
} //child

export function change_nickname(params) { //修改用户名
    return post({
        url: `${urlPath}/user/change_nickname`,
        params: qs.stringify(params)
    })
} //change_nickname


export function change_password(params) { //修改用户密码
    return post({
        url: `${urlPath}/user/change_password`,
        params: qs.stringify(params)
    })
} //change_password

export function change_pay_password(params) { //修改支付密码
    return post({
        url: `${urlPath}/user/changePayPwd`,
        params: qs.stringify(params)
    })
} //change_pay_password



export function log_record(params) { //流水记录
    return get({
        url: `${urlPath}/user/log`,
        params: params
    })
} //log



export function child_detail(params) { //推荐概览数据
    return get({
        url: `${urlPath}/user/child_detail`,
        params: params
    })
} //child_detail'


const quanPath = isProduction ? 'http://39.99.215.137' : 'quanProxy'; //线上路由

export function quan_detail(params) { //推荐概览数据
    return get({
        url: `${quanPath}/qmlcg/selectForDT`,
        params: params
    })
}

export function TBListfund(params) { //获取资产列表
    return get({
        url: 'http://39.99.215.137:8080/tb/listfund',
        params: params
    })
}

export function TBListCZinfo(params) { //获取充值记录
    return get({
        url: 'http://39.99.215.137:8080/tb/listCZinfo',
        params: params
    })
}