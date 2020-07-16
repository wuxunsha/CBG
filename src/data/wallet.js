import {
    get,
    post
} from "./fetch"; //引用fetch.js
import qs from 'qs';
import { getJSON } from "js-cookie";

let isProduction = process.env.NODE_ENV === 'production'

const newUrlPath = isProduction ? 'http://api2.njmall.store' : '/proxyPoolUrl'; //线上路由
export function getUserInfo(params) { //获取用户信息
    return get({
        url: `${newUrlPath}/index/user/info`,
        params: params
    })
}

let coinBaseUrl = isProduction ? 'http://api.coindog.com' : 'coindog'
export function get_ranks(params) { //获取行情
    return get({
        url: `${coinBaseUrl}/api/v1/currency/ranks`,
        params: params
    })
}

// 目前所用接口结束====================================

export function child(params) { //推荐人列表
    return get({
        url: `${urlPath}/user/child`,
        params: params
    })
}

export function change_nickname(params) { //修改用户名
    return post({
        url: `${urlPath}/user/change_nickname`,
        params: qs.stringify(params)
    })
}

export function log_record(params) { //流水记录
    return get({
        url: `${urlPath}/user/log`,
        params: params
    })
}

export function child_detail(params) { //推荐概览数据
    return get({
        url: `${urlPath}/user/child_detail`,
        params: params
    })
}


const quanPath = isProduction ? 'http://39.99.215.137' : 'quanProxy'; //线上路由

export function quan_detail(params) { //推荐概览数据
    return get({
        url: `${quanPath}/qmlcg/selectForDT`,
        params: params
    })
}

const registerPath = 'http://trex.top/proxyUrl/wallet/v1/'

export function register(params) { //用户注册
    return post({
        url: `${registerPath}user/register`,
        params: params
    })
}

export function send_message(params) { //获取验证码
    return post({
        url: `${registerPath}user/send_code`,
        params: qs.stringify(params)
    })
}

const cbkPathUrl = 'http://8.210.81.131:8080/'

export function gettoken(params) { //获取token
    return get({
        url: `${cbkPathUrl}util/gettoken`,
        params: params
    })
}

export function login(params) { //帐号登录
    return post({
        url: `${cbkPathUrl}otc/login`,
        params: params
    })
}

export function TBListfund(params) { //获取资产列表
    return get({
        url: `${cbkPathUrl}tb/listfund`,
        params: params
    })
}

export function TBListCZinfo(params) { //获取充值记录
    return get({
        url: `${cbkPathUrl}tb/listCZinfo`,
        params: params
    })
}


export function upload(params) { // 上传图片
    return post({
        url: `${cbkPathUrl}userInfoUpload`,
        params: params
    })
}

export function getUserTDtotalIncome(params) { // 获取团队总收益
    return get({
        url: `${cbkPathUrl}cguser/getUserTDtotalIncome`,
        params: params
    })
}

export function getUserTDIncome(params) { // 获取直推和团队实时剩余收益
    return get({
        url: `${cbkPathUrl}cguser/getUserTDIncome`,
        params: params
    })
}

export function notice(params) { //获取公告列表
    return get({
        url: `${cbkPathUrl}cguser/getnotice`,
        params: params
    })
}

export function getExtract(params) { //获取公告列表
    return get({
        url: `${cbkPathUrl}qmlcg/tqTeamIncome`,
        params: params
    })
} //notice`,

export function change_password(params) { //修改用户密码
    return post({
        url: `${cbkPathUrl}otc/updateUserPwd`,
        params: qs.stringify(params)
    })
}

export function getRollImg(params) { //获取首页轮播图
    return get({
        url: `${cbkPathUrl}qmlcg/getRollImg`,
        params: params
    })
}

export function getCode(params) { //找回密码获取验证码
    return get({
        url: `${cbkPathUrl}getCode`,
        params: params
    })
}

export function change_pay_password(params) { //修改支付密码
    return post({
        url: `${cbkPathUrl}otc/updateUserPayPwd`,
        params: qs.stringify(params)
    })
}

export function getLoginCode(params) { //忘记登陆密码
    return get({
        url: `${cbkPathUrl}getNologinCode`,
        params: params
    })
}

export function getUserPayInfo(params) { // 获取用户收款方式
    return get({
        url: `${cbkPathUrl}cguser/getUserPayInfo`,
        params: params
    })
}

export function listZJinfo(params) { // 获取资产列表
    return get({
        url: `${cbkPathUrl}tb/listZJinfo`,
        params: params
    })
}


const txPathUrl = 'http://trex.top/payservice/'

export function withdraw(params) { //申请提现
    return post({
        url: `${txPathUrl}withDraw/apply`,
        params: qs.parse(params)
    })
}

export function uploadFile(params) { // 上传图片
    return post({
        url: `${txPathUrl}upload/file`,
        params
    })
}

export function subIdcardInfo(params) { // 提交身份证认证信息
    return post({
        url: `${txPathUrl}user/subIdcardInfo`,
        params
    })
}

export function user_info() { //获取用户信息
    return get({
        url: `${txPathUrl}user/getUserInfo`,
    })
} //user_info

export function getUser(params) { // 获取我的页面用户信息
    return get({
        url: `${txPathUrl}user/getUserInfo`,
        params: params
    })
}

export function getUserTeamInfo(params) { // 获取团队信息下面贡献列表
    return post({
        url: `${txPathUrl}user/getUserTeamInfo`,
        params: params
    })
}

export function smsPhone(params) { // 转账获取验证码
    return post({
        url: `${txPathUrl}open/smsPhone`,
        params: params
    })
}

export function transfer(params) { // 转账
    return post({
        url: `${txPathUrl}order/transfer`,
        params: params
    })
}

export function getTotalFund(params) { // 获取总资产
    return post({
        url: `${txPathUrl}order/getTotalFund`,
        params: params
    })
}

export function smsFindLoginPhone(params) { // 找回密码验证码
    return post({
        url: `${txPathUrl}user/smsFindLoginPhone`,
        params: params
    })
}

export function findLoginPwd(params) { //找回密码
    return post({
        url: `${txPathUrl}user/findLoginPwd`,
        params: params
    })
}

export function qmlcgFanli(params) { //领取
    return post({
        url: `${txPathUrl}order/getRebate`,
        params: params
    })
}