import {
    get,
    post
} from "./fetch"; //引用fetch.js
import qs from 'qs';
import { getJSON } from "js-cookie";

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


// export function recharge_address(params) { //获取充值地址
//     return get({
//         url: `${urlPath}/user/recharge_address`,
//         params: params
//     })
// } //recharge_address


// export function withdraw(params) { //申请提现
//     return post({
//         url: `${urlPath}/user/withdraw/submit`,
//         params: qs.stringify(params)
//     })
// } //withdraw

// export function feedback_list(params) { //获取反馈列表
//     return get({
//         url: `${urlPath}/user/feedback/list`,
//         params: params
//     })
// } //get_feedback

// export function send_feedback(params) { //提交反馈
//     return post({
//         url: `${urlPath}/user/feedback/submit`,
//         params: qs.stringify(params)
//     })
// } //feedback

// // export function notice(params) { //获取公告列表
// //     return get({
// //         url: `${urlPath}/user/notice/list`,
// //         params: params
// //     })
// // } //notice

// export function noticeDetail(params) { //获取公告详情
//     return get({
//         url: `${urlPath}/user/notice/detail`,
//         params: params
//     })
// } //noticeDetail

// export function log(params) { //获取流水
//     return get({
//         url: `${urlPath}/user/log`,
//         params: params
//     })
// } //log


// export function logType(params) { //获取流水类型判断
//     return get({
//         url: `${urlPath}/public/log/type`,
//         params: params
//     })
// } //logTpe



// export function headUpload(params) { //头像上传
//     return post({
//         url: `${urlPath}/user/headUpload`,
//         params: params
//     })
// } //headUpload

// export function rechargeList(params) { //获取充值明细
//     return get({
//         url: `${urlPath}/user/recharge_list`,
//         params: params
//     })
// } //rechargeList

// export function withdrawList(params) { //获取提现明细
//     return get({
//         url: `${urlPath}/user/withdraw/list`,
//         params: params
//     })
// } //withdrawList

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

export function change_pay_password(params) { //修改支付密码
    return post({
        url: `${urlPath}/user/changePayPwd`,
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
export function send_message(params) { //获取验证码
    return post({
        url: `${registerPath}user/send_code`,
        params: qs.stringify(params)
    })
}

export function getCode(params) { //找回密码获取验证码
    return get({
        url: `${registerPath}getCode`,
        params: params
    })
}

export function register(params) { //用户注册
    return post({
        url: `${registerPath}user/register`,
        params: params
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

export function qmlcgFanli(params) { //领取
    return get({
        url: `${cbkPathUrl}qmlcg/fanli`,
        params: params
    })
}



export function getUser(params) { // 获取我的页面用户信息
    return get({
        url: `${cbkPathUrl}cguser/getUserInfo`,
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

export function getUserTeamInfo(params) { // 获取团队信息下面贡献列表
    return get({
        url: `${cbkPathUrl}cguser/getUserTeamInfo`,
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

export function user_info() { //获取用户信息
    return get({
        url: `${cbkPathUrl}cguser/getUserInfo`,
    })
} //user_info

export function checkTbAddress(params) { //用户注册
    return post({
        url: `${cbkPathUrl}/index/user/checkTbAddress`,
        params: params
    })
} //checkTbAddress

export function change_password(params) { //修改用户密码
    return post({
        url: `${cbkPathUrl}otc/updateUserPwd`,
        params: qs.stringify(params)
    })
}

export function forgetUserPwd(params) { //找回密码
    return post({
        url: `${cbkPathUrl}otc/forgetUserPwd`,
        params: qs.stringify(params)
    })
}

export function getRollImg(params) { //获取首页轮播图
    return get({
        url: `${cbkPathUrl}qmlcg/getRollImg`,
        params: params
    })
}
