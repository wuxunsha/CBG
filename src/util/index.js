import { Checkbox } from "vant";

export function validatePhoneNum(value) {
    return !!value && /^1[3456789]\d{9}$/.test(value);
}
export function validateEmail(value) {
    return !!value && /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value);
}

export function fonrmatTimer(mss, lang) { //转时分秒
    if (mss < 0) {
        return '00天00时00分00秒';
    }
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    days = days > 9 ? days : '0' + days;
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    hours = hours > 9 ? hours : '0' + hours;
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    minutes = minutes > 9 ? minutes : '0' + minutes;
    var seconds = (mss % (1000 * 60)) / 1000;
    seconds = seconds > 9 ? seconds.toFixed(0) : '0' + seconds.toFixed(0);
    let timer;
    if (lang == 'en') {
        timer = days + "D" + hours + "H" + minutes + "M" + seconds + "S";
    } else if (lang == 'zh_hk') {
        timer = days + "天" + hours + "時" + minutes + "分" + seconds + "秒";
    } else {
        timer = days + "天" + hours + "时" + minutes + "分" + seconds + "秒";
    }
    return timer;
} //fonrmatTimer

export function setConutDowns_mss(start, end) {
    let conutDown_timer;
    let start_timer = new Date(start.replace(/-/g, "/"));
    let end_timer = new Date(end.replace(/-/g, "/"));
    conutDown_timer = end_timer - start_timer;
    return conutDown_timer;
}

export function timerExchange(time, type) {
    time = new Date(Date.parse(time.replace(/-/g, "/")));
    var dt = new Date(time);
    var yy = dt.getFullYear();
    var mm = (dt.getMonth() + 1) > 9 ? dt.getMonth() + 1 : dt.getMonth() + 1;
    mm = mm > 9 ? mm : '0' + mm
    var dd = dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate();
    var hh = dt.getHours() > 9 ? dt.getHours() : '0' + dt.getHours();
    var mi = dt.getMinutes() > 9 ? dt.getMinutes() : '0' + dt.getMinutes();
    var ss = dt.getSeconds() > 9 ? dt.getSeconds() : '0' + dt.getSeconds();
    var dy = dt.getDay() > 9 ? dt.getDay() : '0' + dt.getDay();
    if (type == 'hh:mi mm/dd')
        return `${hh}:${mi} ${mm}/${dd}`;
    else
        return `${yy}-${mm}-${dd} ${hh}:${mi}`;
}



export function Check_browser(time, lang) {
    if (typeof localStorage === 'object') {
        localStorage.setItem('localStorage_test', 1);
        setTimeout(() => {
            if (!localStorage.getItem('localStorage_test')) {
                localStorage.removeItem('localStorage_test');

                if (localStorage.getItem('lang') == 'zh_hk') {
                    alert("當前瀏覽器不支持localStorage，部分功能將無法使用，請切換瀏覽器或關閉隱私模式!");
                } else if (localStorage.getItem('lang') == 'zh_cn') {
                    alert("当前浏览器不支持localStorage，部分功能将无法使用，请切换浏览器或关闭隐私模式!");
                } else {
                    alert("The current browser does not support localStorage, some features will not be available, please switch browser or close privacy mode!");
                }

            }
        }, 1000);
    };
}


export function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

export function isPhone() {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
}

export function isAndroid() {
    var u = navigator.userAgent;
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    return isAndroid;
}

export function isiOS() {
    var u = navigator.userAgent;
    isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isiOS;
}


export function toFixed_2(val) {
    console.log(val)
    let res = (parseInt(val * 100) / 100).toFixed(2);
    return res ? res : null;
}

export function gopage_searchTxId(type, txId) {
    switch (type) {
        case 'BTC':
            window.open('https://btc.com/' + txId)
            break;
        case 'EOS':
            window.open('https://www.eosx.io/tx/' + txId)
            break;
        case 'USDT':
            window.open('https://omniexplorer.info/tx/' + txId)
            break;
        case 'GOC':
            window.open('https://www.eosx.io/tx/' + txId)
            break;
        case 'ETH':
            window.open('https://etherscan.io/tx/' + txId)
            break;
    }
}


export function link_page(url) {
    window.open(url);
}


export function toFixed_4(val) {
    val = Number(val).toFixed(5);
    let res = val.substring(0, val.length - 1);
    return res ? res : null;
}


export function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = date.getMonth() + 1 + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
}