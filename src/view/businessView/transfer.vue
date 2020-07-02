<template>
  <div class="full-height">

    <div class="navBox">
      <van-nav-bar
        :title="`${$t('feature.transfer.text_title')}`"
        fixed
        left-arrow @click-left="goback()" @click-right="gopage('/assetsDetail_v2')">
        <template #right>
          <van-icon name="orders-o" size="18" />
        </template>
      </van-nav-bar>
    </div>

    <div class="actionForm">
      <div class="currency-select" @click="show = true">
        <div class="currency-select-left">
          <img src="../../assets/wallet/asstes/USDT@2x.png" alt="">
          <span>
            {{currCoin}}
          </span>
        </div>
        <div>
          <van-icon name="arrow" />
        </div>
      </div>

      <div class="formGroup">
        <div class="title">{{$t('feature.transfer.text_id')}}</div>
        <div class="inputItem inputItemButton">
          <input type="text" :placeholder="`${$t('feature.transfer.input_id')}`" v-model="reqParams.toId" @blur="blur_event()" @change="getName()">
        </div>
      </div>

      <div class="formGroup">
        <div class="title">{{$t('feature.transfer.text_number')}}</div>
        <div class="inputItem inputItemButton transfer-amount">
           <input type="number" :placeholder="`${$t('feature.transfer.input_number')}`" v-model="reqParams.number" @blur="blur_event()" @change="getFee()">
          <span class="money-type">{{currCoin}}</span>
          <span>|</span>
          <span @click="allSum" class="money-type">{{$t('feature.transfer.All')}}</span>
        </div>
        <div class="balance">
          <span>{{$t('feature.transfer.text_able')}}：</span>
          <span>{{balance}}&nbsp;{{currCoin}}</span>
        </div>
      </div>

      <div class="formGroup">
        <div class="title">{{$t('feature.transfer.text_code')}}</div>
        <div class="inputItem flex align inputItemButton">
            <input type="number" :placeholder="`${$t('feature.transfer.input_code')}`" v-model="reqParams.code" @blur="blur_event()">
            <div class="getCode"> <getCode :codeData="{type:'transfer',phone:userInfo.userPhone}"/></div>
        </div>
      </div>

      <div class="formGroup">
        <div class="title">{{$t('feature.transfer.text_pass')}}</div>
        <div class="inputItem inputItemButton">
          <input type="number" style="-webkit-text-security:disc" :placeholder="`${$t('feature.transfer.input_pass')}`" v-model="reqParams.transactionPwd" @blur="blur_event()">
        </div>
      </div>

      <div class="submit-box">
        <van-button class="submit" @click="checkParams()">{{$t('feature.transfer.text_btn')}}</van-button>
      </div>
  </div>

  <van-popup position="bottom" v-model="show">
    <van-picker :columns="coins"
    show-toolbar @change="currencyChange"
    @cancel="show=false"
    @confirm="onChange"
    :title=" `${$t('feature.transfer.text_pickerTitle')}`"
    :confirm-button-text="`${$t('feature.bankBuy.text_ok')}`"
    :cancel-button-text="`${$t('feature.bankBuy.text_cancel')}`"
    />
  </van-popup>

  </div>
</template>

<script>
import {
  mapMutations,
  mapState,
  mapActions
} from 'vuex'
import getCode from '../../components/wallet/getCode'
import { Toast } from 'vant';
import { 
  TBListfund
} from '../../data/wallet';

export default {
  data() {
    return {
      show:false,
      reqParams:{
        number:null, // 金额
        toId:null, // 收款人账号
        code:null,//验证码
        transactionPwd:null,//支付密码
        coinId:null // 币种ID
      },
      currCoin:null,//当前币种
      // 币种列表
      coins: [],
      // 余额
      balance: ''
    }
  },
  components:{getCode},
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    //获取手续费
    getFee(){
      if(this.reqParams.number)
        this.fee = this.scale<1 ? this.toFixed_4(this.reqParams.number * this.scale) : this.scale;
      else
        this.fee = null;
    },
    //获取比例
    getScale(){
      transferFee().then(v=>{
        this.scale = v.data;
      })
    },
    // 币种改变
    currencyChange() {
      this.reqParams.number = null
    },
    // 全部金额
    allSum () {
      this.reqParams.number = this.balance
    },
    //确认转账
    checkParams(){
      if(!this.reqParams.toId){
        Toast(this.$t('feature.transfer.text_id'))
        return;
      }
      if(!this.reqParams.number){
        Toast(this.$t('feature.transfer.input_number'));
        return;
      }
      if(!this.reqParams.code){
        Toast(this.$t('feature.transfer.input_code'));
        return;
      }
      if(!this.reqParams.transactionPwd){
        Toast(this.$t('feature.transfer.input_pass'));
        return;
      }
      this.transfer();
    },
    transfer(){
      transfer(this.reqParams).then(v=>{
        console.TBListfund
        (v);
        Toast.success(v.message);
        setTimeout(() => {
          this.goback();
        }, 1000);
      })
    },
    //获取id名称
    getName(){
      if(!this.reqParams.toId){
        this.idName = null;
        return;
      }
      idGetName({id:this.reqParams.toId}).then(v=>{
        if(v.data)
          this.idName  = v.data;
        else
          this.idName  = 'UIDNULL';
      })
    },
    //选择币种
    onChange(value){
      console.log(value)
      this.currCoin = value.text
      this.reqParams.coinId = value.coinId
      this.balance = value.lastBalance
      this.show = false;
    },
    // 获取资产列表信息
    getBalanceAll() {
      TBListfund({token_: this.$store.state.newToken}).then(res => {
        if (res.code === '200') {
          res.data.forEach(item => {
            if (item.coinId === '1001') {
              item.text = 'USDT'
            } else if (item.coinId === '1002') {
              item.text = 'CBK'
            } else if (item.coinId === '1003') {
              item.text = 'CBG'
            } else if (item.coinId === '1004') {
              item.text = 'BTC'
            }
          })
          this.coins = res.data
          this.currCoin = res.data[0].text
          this.reqParams.coinId = res.data[0].coinId
          this.balance = res.data[0].lastBalance
        }
      })
    }
  },
  mounted() {
    this.getBalanceAll();
        
  },
  created() {
    console.log(this.userInfo)
  }
};

</script>
<style rel="stylesheet/scss" scoped lang="scss">
@import "../../styles/walletVal";
.formGroup{
  margin-top: 20px;
}
>>>.getCode{
  white-space: nowrap;
  padding: 10px 5px;
  border-radius: 4px;
  color:#566BF3;
  margin-left: 10px;
}
.inputItem input {
  font-size: 14px;
}
.money-type {
  font-size: 14px;
}
</style>
