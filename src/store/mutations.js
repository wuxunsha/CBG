// 提交 mutations是更改Vuex状态的唯一合法方法
/*export const modifyAName = (state, name) => {
    setTimeout(() => {
        state.resturantName = 'name1'
    }, 2000);
    state.resturantName = 'name2'
}
*/
export const setToken = (state, params) => { //登陆获取当前用户信息
    state.token = params;
}
export const setUser = (state, params) => { // 保存登录用户信息
    state.user = params;
}
export const setNewToken = (state, params) => { // 保存三方token
    state.newToken = params;
}
export const setUserInfo = (state, params) => { //设置详细用户信息
    state.userInfo = params;
}
export const setPublicKey = (state, params) => { //设置加密公钥
    state.publicKey = params;
}
export const setLogDtail = (state, params) => { //设置流水详情
    state.logDtail = params;
}

export const setLogTypeArr = (state, params) => { //设置流水类型
    state.logTypeArr = params;
}

export const setPopup = (state, params) => { //设置弹出层
    if (!params) {
        state.popup.type = false;
    } else {
        state.popup = params;
    }

}