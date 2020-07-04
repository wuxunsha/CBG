<template>
    <div class="chat-box">
        <!-- <header>聊天室人数：{{count}}</header> -->
        <van-nav-bar :title="`孙小姐`"
                     fixed
                     left-arrow
                     @click-left="goback()" />
        <div class="msg-box"
             ref="msg-box">
            <div v-for="(i,index) in list"
                 :key="index"
                 class="msg"
                 :style="i.userId == userId?'flex-direction:row-reverse':''">
                <div style="width:100%;text-align: center;">
                    <p>{{i.time}}</p>
                </div>

                <div class="user-head">
                    <div class="head"
                         :style="` background: hsl(${getUserHead(i.userId,'bck')}, 88%, 62%); clip-path:polygon(${getUserHead(i.userId,'polygon')}% 0,100% 100%,0% 100%); transform: rotate(${getUserHead(i.userId,'rotate')}deg)`"></div>
                </div>
                <div class="user-msg">
                    <span v-if="i.contentImg"
                          :style="i.userId == userId?' float: right;margin:0 15px 0 0':''">
                        <img :src="i.contentImg">
                    </span>
                    <span v-else
                          :style="i.userId == userId?' float: right;margin:0 15px 0 0':''"
                          :class="i.userId == userId?'right':'left'">{{i.content}}</span>
                </div>

            </div>
        </div>
        <div class="input-box">
            <input type="text"
                   ref="sendMsg"
                   v-model="contentText"
                   @keyup.enter="sendText()" />
            <div class="btn"
                 :class="{['btn-active']:contentText}"
                 @click="sendText()"><img src="../../assets/wallet/deal/fa.png"></div>
            <div class="btn"
                 :class="{['btn-active']:contentText}">
                <label for="uploadImg">
                    <input type="file"
                           @change="uploadFile($event)"
                           name="image"
                           accept="image/*"
                           multiple
                           style="display:none;"
                           id="uploadImg">
                    <img src="../../assets/wallet/deal/qw.png">
                </label>

            </div>
        </div>
    </div>
</template>
 
<script>
import { log } from '../../data/wallet';
export default {
    data() {
        return {
            ws: null,
            count: 0,
            userId: 3, //当前用户ID

            list: [
                { userId: 1, time: new Date().toLocaleTimeString(), content: '你好有什么可以帮你？' }
            ],
            contentText: "", //input输入的值
            valueUrl: ''
        };
    },
    created() {

    },
    mounted() {
        // this.getUserID();
        // this.initWebSocket();
    },
    methods: {
        //根据时间戳作为当前用户ID
        getUserID() {
            let time = new Date().getTime();
            this.userId = time;
        },
        //根据userID生成一个随机头像
        getUserHead(id, type) {
            let ID = String(id);
            if (type == "bck") {
                return Number(ID.substring(ID.length - 3));
            }
            if (type == "polygon") {
                return Number(ID.substring(ID.length - 2));
            }
            if (type == "rotate") {
                return Number(ID.substring(ID.length - 3));
            }
        },
        //滚动条到底部
        scrollBottm() {
            let el = this.$refs["msg-box"];
            el.scrollTop = el.scrollHeight;
        },
        //发送聊天信息
        sendText() {
            let _this = this;
            _this.$refs["sendMsg"].focus();
            if (!_this.contentText) {
                return;
            }
            let params = {
                userId: _this.userId,
                msg: _this.contentText
            };
            // _this.ws.send(JSON.stringify(params)); //调用WebSocket send()发送信息的方法
            let arr = {
                userId: 3, time: new Date().toLocaleTimeString(), content: _this.contentText
            }
            _this.list.push(arr)
            _this.contentText = "";
            setTimeout(() => {
                _this.scrollBottm();
            }, 500);
        },
        //进入页面创建websocket连接
        initWebSocket() {
            let _this = this;
            //判断页面有没有存在websocket连接
            if (window.WebSocket) {
                // 192.168.0.115 是我本地IP地址 此处的 :8181 端口号 要与后端配置的一致
                let ws = new WebSocket("ws://192.168.0.115:8181");
                _this.ws = ws;
                ws.onopen = function (e) {
                    console.log("服务器连接成功");
                };
                ws.onclose = function (e) {
                    console.log("服务器连接关闭");
                };
                ws.onerror = function () {
                    console.log("服务器连接出错");
                };
                ws.onmessage = function (e) {
                    //接收服务器返回的数据
                    let resData = JSON.parse(e.data);
                    if (resData.funName == "userCount") {
                        _this.count = resData.users;
                        _this.list = resData.chat;
                        console.log(resData.chat);
                    } else {
                        _this.list = [
                            ..._this.list,
                            { userId: resData.userId, content: resData.msg }
                        ];
                    }
                };
            }
        },
        uploadFile(el) {
            console.log(el);

            if (!el.target.files[0].size) return; // 如果文件大小为0，则返回
            if (el.target.files[0].type.indexOf('image') === -1) { //如果不是图片格式
                // this.$dialog.toast({ mes: '请选择图片文件' });
                console.log('请选择图片文件');
            } else {
                const that = this;
                const reader = new FileReader(); // 创建读取文件对象
                reader.readAsDataURL(el.target.files[0]); // 发起异步请求，读取文件
                reader.onload = function () {  // 文件读取完成后
                    // 读取完成后，将结果赋值给img的src
                    console.log(this.result);
                    let arr = {
                        userId: 3, time: new Date().toLocaleTimeString(), contentImg: this.result
                    }
                    that.list.push(arr)
                    // that.valueUrl = this.result;
                    // console.log(this.result);
                };

                const uid = 'e0c9dd3de0418e698d49984ae035992a'; //后台需要的参数
                const formData = new FormData();  // 创建一个formdata对象
                formData.append('res', el.target.files[0]);
                formData.append('uid', uid);
                // postUploadFile(formData).then(res => {  // 发送请求，保存图片
                //     if (res.status === 0) {
                //         this.valueUrl = res.data;
                //     } else {
                //         console.log(res);
                //     }
                // });
            }

        }
    }
};
</script>
 
<style lang="scss" scoped>
.chat-box {
    margin: 0 auto;
    background: #fafafa;
    position: absolute;
    height: 100%;
    width: 100%;
    max-width: 700px;
    header {
        position: fixed;
        width: 100%;
        height: 3rem;
        background: #409eff;
        max-width: 700px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        color: white;
        font-size: 1rem;
    }
    .msg-box {
        position: absolute;
        height: calc(100% - 6.5rem);
        width: 100%;
        margin-top: 5rem;
        overflow-y: scroll;
        .msg {
            flex-wrap: wrap;
            width: 95%;
            min-height: 2.5rem;
            margin: 1rem 0.5rem;
            position: relative;
            display: flex;
            justify-content: flex-start !important;
            .user-head {
                min-width: 2.5rem;
                width: 20%;
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 50%;
                background: #f1f1f1;
                display: flex;
                justify-content: center;
                align-items: center;
                .head {
                    width: 1.2rem;
                    height: 1.2rem;
                }
                // position: absolute;
            }
            .user-msg {
                width: 80%;
                // position: absolute;
                word-break: break-all;
                position: relative;
                z-index: 5;
                margin-left: 15px;
                span {
                    display: inline-block;
                    padding: 0.5rem 0.7rem;
                    border-radius: 0.5rem;
                    margin-top: 0.2rem;
                    font-size: 0.88rem;
                }
                .left {
                    background: white;
                    animation: toLeft 0.5s ease both 1;
                }
                .right {
                    background: #53a8ff;
                    color: white;
                    animation: toright 0.5s ease both 1;
                }
                @keyframes toLeft {
                    0% {
                        opacity: 0;
                        transform: translateX(-10px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0px);
                    }
                }
                @keyframes toright {
                    0% {
                        opacity: 0;
                        transform: translateX(10px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0px);
                    }
                }
            }
        }
    }
    .input-box {
        padding: 0.5rem;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 4.2rem;
        background: #fafafa;
        box-shadow: 0 0 5px #ccc;
        display: flex;
        justify-content: space-between;
        align-items: center;
        input {
            height: 3.2rem;
            display: inline-block;
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ebebeb;
            border-radius: 0.2rem;
            font-size: 0.88rem;
        }
        .btn {
            // height: 2.3rem;
            // min-width: 4rem;
            // background: #e0e0e0;
            // padding: 0.5rem;
            // font-size: 0.88rem;
            // color: white;
            // text-align: center;
            // border-radius: 0.2rem;
            // margin-left: 0.5rem;
            // transition: 0.5s;
            img {
                width: 15px;
                height: 15px;
                margin: 0 10px;
            }
        }
        .btn-active {
            // background: #409eff;
        }
    }
}
</style>