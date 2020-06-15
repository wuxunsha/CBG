/**
 * Created by Wonder on 2018/5/14
 * 操作本地localStorage
 */
export default {
    name: "localStorage",
    set: function (key, value) {
        try {
            value = JSON.stringify(value);
        } catch (e) {
            throw e;
        }
        window.localStorage.setItem(key, value);
    },
    setString: function (key, value) {
        window.localStorage.setItem(key, value);
    },
    get: function (key) {
        if (!key) {
            throw new Error('没有找到key。');
        }
        if (typeof key === 'object') {
            throw new Error('key不能是一个对象。');
        }
        let value = window.localStorage.getItem(key);
        if (value !== null) {
            try {
                value = JSON.parse(value);
            } catch (e) {
                throw e;
            }
        }
        return value;
    },
    getString: function (key) {
        if (!key) {
            throw new Error('没有找到key。');
        }
        return window.localStorage.getItem(key);
    },
    getIdentity: function () {
        return this.get('Identity')
    },
    remove: function (key) {
        window.localStorage.removeItem(key);
    }
}
