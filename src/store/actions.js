import {
    user_info
} from '../data/wallet';

export const actionUserInfo = ({ commit }) => {
    return new Promise((resolve, reject) => {
        user_info().then(res => {
            let { data } = res;
            commit('setUserInfo', data);
            resolve(data)
        }).catch(e => {
            console.error(e);
            reject(e)
        })
    })
}