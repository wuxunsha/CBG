import axios from 'axios'; //引入axios
import localStorage from '../local-store'
import {
    secret
} from "@/util/secret";
import qs from 'qs';
import router from '../router'
import store from '../store/index';
let isProduction = process.env.NODE_ENV === 'production'
let oldBaseUrl = isProduction ? 'http://tb.njmall.store/' : ''
let coinBaseUrl = isProduction ? 'http://api.coindog.com' : 'coindog'
let mallBaseUrl = isProduction ? 'http://122.51.200.81:9523' : 'mallProxy'
let registerUrl = 'http://trex.top/'
let loginrUrl = 'http://8.210.81.131:8080/'
let tbUrl = 'http://trex.top/payservice'

const noGifArr = [
    coinBaseUrl + '/api/v1/currency/ranks',
    registerUrl + 'proxyUrl/wallet/v1/user/register',
    mallBaseUrl + '/wallet/v1/user/info',
    mallBaseUrl + '/product/list',
    registerUrl + 'proxyUrl/wallet/v1/user/send_code',
]; //不显示加载框路由
const wihteList = [
    oldBaseUrl + 'proxyUrl/order/exchange'
]; //加密名单
const request_json = [
    registerUrl + 'proxyUrl/wallet/v1/user/register',
    oldBaseUrl + 'proxyUrl/wallet/v1/user/login',
    oldBaseUrl + 'proxyUrl/order/exchange',
    oldBaseUrl + 'proxyUrl/wallet/v1/user/withdraw',
    oldBaseUrl + 'proxyUrl/wallet/v1/user/pool/buy',
    oldBaseUrl + 'proxyUrl/wallet/v1/user/product/buy',
    loginrUrl + 'otc/transfer',
    tbUrl + '/withDraw/apply',
    tbUrl + '/user/addUserOtc',
    tbUrl + '/user/getUserPayType',
    tbUrl + '/user/updateUserOtc',

    // tbUrl + '/upload/file'

]; //application/json方式请求接口

const request_file = [
    oldBaseUrl + 'proxyUrl/wallet/v1/user/headUpload',
    // tbUrl + '/upload/file'
]; //headers: {'Content-Type': 'multipart/form-data'}

axios.interceptors.request.use(function(config) {

    //console.log(config)


    if (config.method === 'post' && wihteList.indexOf(config.url) >= 0) {
        let secretParams = '';
        //secretParams.publicKey = store.state.publicKey;//localStorage.get('publicKey');
        //console.log('secretParams.publicKey----' + secretParams.publicKey)
        secretParams = secret.EncryptParams(config.data.params);
        // console.log('secretParams-----')
        // console.log(secretParams)
        config.data = secretParams;
    }

    Toast.resetDefaultOptions(); //恢复正常设置

    if (noGifArr.indexOf(config.url) < 0) { //不显示加载动画
        Toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            loadingType: 'circular',
            message: window.localStorage.getItem('lang') == 'en' ? 'loading' : '加载中'
        });
    }

    let contentType;

    if (request_file.indexOf(config.url) > -1) {
        contentType = 'multipart/form-data';
        // console.log(config)
    } else if (request_json.indexOf(config.url) > -1 || config.url.indexOf('currency/ranks') > -1) {
        contentType = 'application/json';
    } else {
        // contentType = 'application/json';
        contentType = 'application/x-www-form-urlencoded';
    }
    // console.log(config.url)
    console.log(contentType)

    let lang = window.localStorage.getItem('lang');
    if (lang == 'zh_hk') {
        lang = 'zh_hk';
    } else if (lang == 'en') {
        lang = 'en_us';
    } else {
        lang = 'zh_cn';
    }

    if (config.url == tbUrl + '/withDraw/apply' || config.url == tbUrl + '/upload/file' || config.url == tbUrl + '/user/addUserOtc' || config.url == tbUrl + '/user/getUserPayType' || config.url == tbUrl + '/user/updateUserOtc') {
        config.headers = {
            'content-type': contentType,
            'access-token': store.state.newToken,
            'locale': lang
        }
    } else {
        config.headers = {
            'content-type': contentType,
            'token_': store.state.newToken,
            'locale': lang
        }
    }


    //zh_cn,zh_hk,en_us

    if (config.url == oldBaseUrl + 'proxyUrl/wallet/v1/user/login')
        delete config.headers['Authorization']

    return config;
}, function(error) {
    Toast.clear();
    return Promise.reject(error);
});

axios.interceptors.response.use(function(response) {
    // console.log(response)
    if (response.data.code == 401) {
        Toast.fail(window.localStorage.getItem('lang') == 'en' ? 'please sign in' : '请登录');
        store.commit('set_token', null);
        store.commit('setUserInfo', null);
        store.commit('sealance', null);
        router.replace({
            path: '/login',
            query: {
                redirect: router.currentRoute.fullPath
            }
        });
    } else if (response.data.code == 300) {
        Toast("登录已过期，请重新登录!")
        setTimeout(() => {
            store.commit('set_token', null);
            store.commit('setUserInfo', null);
            store.commit('sealance', null);
            router.replace({
                path: '/login',
                redirect: router.currentRoute.fullPath
            });
        }, 2000);
    }
    Toast.clear();
    return response.data;
}, function(error) {
    Toast.clear();
    return Promise.reject(error);
});


export const get = (data, that) => {
        return new Promise(function(resolve, reject) {
            axios({
                    method: 'GET',
                    url: data.url,
                    params: data.params
                })
                .then(res => {
                    if (res.code == 200) {
                        resolve(res);
                    } else {
                        // console.log('错误/////')
                        // console.log(res)
                        setTimeout(() => {
                            if (res.message)
                                Toast.fail(res.message);
                        }, 500);
                        reject(res);
                    }
                    Toast.clear();
                })
                .catch(err => {
                    reject(err);
                    console.error(err);
                    setTimeout(() => {
                        Toast.fail(window.localStorage.getItem('lang') == 'en' ? 'Network Error' : '网络错误');
                    }, 500);
                    Toast.clear();
                })
        })
    } //get

export const post = (data, ...reset) => {
        return new Promise(function(resolve, reject) {
            axios({
                    method: 'POST',
                    url: data.url,
                    data: data.params
                })
                .then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        resolve(res);
                    } else {
                        setTimeout(() => {
                            // Toast.fail(res.message);
                        }, 500);
                        reject(res);
                    }
                })
                .catch(err => {
                    console.log(112);

                    reject(err);
                    console.error(err);
                    setTimeout(() => {
                        Toast.fail(window.localStorage.getItem('lang') == 'en' ? 'Network Error' : '网络错误');
                    }, 500);
                    Toast.clear();
                })
        })
    } //get

export default {
    get,
    post
}