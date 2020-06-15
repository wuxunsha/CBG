import CryptoJS from 'crypto-js'
import { JSEncrypt } from 'jsencrypt'
const uuidv1 = require('uuid/v1');
let RSAencrypt = new JSEncrypt()
import localStorage from '../local-store'

import store from '../store/index';


const key = 'abcd1234abcd1234'; //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412'); //十六位十六进制数作为密钥偏移量

const secret = {
    Decrypt: function(word) {
        let sKey = CryptoJS.enc.Utf8.parse(key);
        let decrypt = CryptoJS.AES.decrypt(word, sKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    },
    Encrypt: function(word, key) {
       //console.log(word, key)
        let sKey = CryptoJS.enc.Utf8.parse(key);
        //var ciphertext = CryptoJS.AES.encrypt(word, sKey, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        RSAencrypt.setPublicKey(key);
        var ciphertext = RSAencrypt.encrypt(word)
        return ciphertext.toString();
    },
    EncryptLocalPass: function(publicKey) {
        return new Promise((re, je) => {
            let localPass = uuidv1().replace(/\-/g, "").substring(0, 16); //uuid替换截取16位
            // console.log(localPass)
            RSAencrypt.setPublicKey(publicKey);
            let localSecret = RSAencrypt.encrypt(localPass);
            localStorage.set('uuid', localPass);
            localStorage.set('publicKey', publicKey);
            localStorage.set('localSecret', localSecret);
            re(localSecret);
        })
    },
    EncryptParams: function(params) {
        let uuid = localStorage.get('uuid');
        let publicKey = store.state.publicKey;
        console.log('加密publicKey:---'+publicKey)
        let paramsStr = JSON.stringify(params);
        return this.Encrypt(paramsStr, publicKey);
    }
};

export {
    secret
}