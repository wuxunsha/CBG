import walletNav from './walletNav.vue'
// 这里是重点
const Nav = {
    install: function(Vue) {
        Vue.component('walletNav', walletNav)
    }
}

// 导出组件
export default Nav