let account = localStorage.getItem('token');
const state = {
    token: '',
    newToken: '',
    userInfo: '',
    publicKey: '',
    logDtail: '', //流水详情
    popup: {
        data: null,
        type: null
    },
    logTypeArr: null, //流水类型
    // 用户登录名
    user: {
        uid: null,
        password: null
    }
}
export default state;