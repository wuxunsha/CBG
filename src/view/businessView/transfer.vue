<template>
  <div class="full-height">

    <div class="navBox">
      <van-nav-bar
        :title="`${$t('feature.transfer.text_title')}`"
        fixed
        left-arrow @click-left="goback()">
        <!-- <template #right>
          <van-icon name="orders-o" size="18" />
        </template> -->
      </van-nav-bar>
    </div>

    <div class="actionForm">
      <div class="currency-select" @click="show = true">
        <div class="currency-select-left">
          <img :src="reqParams.conidId === '1001' ? require('./../../assets/wallet/asstes/USDT.png') : reqParams.conidId === '1002' ? require('./../../assets/wallet/asstes/CBK.png') : reqParams.conidId === '1003' ? require('./../../assets/wallet/asstes/CBG.png') : require('./../../assets/wallet/asstes/BTC.png')" alt="">
          <span>
            {{currCoin}}
          </span>
        </div>
        <div class="currency-select-right">
          <van-icon name="arrow" />
        </div>
      </div>

      <div class="formGroup">
        <div class="title">{{$t('feature.transfer.text_id')}}</div>
        <div class="inputItem inputItemButton">
          <input type="text" :placeholder="`${$t('feature.transfer.input_id')}`" v-model="reqParams.toAccount">
        </div>
      </div>

      <div class="formGroup">
        <div class="title">{{$t('feature.transfer.text_number')}}</div>
        <div class="inputItem inputItemButton transfer-amount">
           <input type="number" :placeholder="`${$t('feature.transfer.input_number')}`" v-model="reqParams.amount">
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
            <input type="number" :placeholder="`${$t('feature.transfer.input_code')}`" v-model="reqParams.noteCode">
            <div class="getCode"> <forgetGetCode :codeData="{phone:userInfo.userPhone}" /></div>
        </div>
      </div>

      <div class="formGroup">
        <div class="title">{{$t('feature.transfer.text_pass')}}</div>
        <div class="inputItem inputItemButton">
          <input type="number" style="-webkit-text-security:disc" :placeholder="`${$t('feature.transfer.input_pass')}`" v-model="reqParams.password">
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
  mapState
} from 'vuex'
import forgetGetCode from '../../components/wallet/forgetGetCode'
import { Toast } from 'vant';
import { 
  TBListfund,
  transfer
} from '../../data/wallet';

export default {
  data() {
    return {
      show:false,
      reqParams:{
        phone: null,
        amount:null, // 金额
        toAccount:null, // 收款人账号
        noteCode:null,//验证码
        password:null,//支付密码
        conidId:null // 币种ID
      },
      currCoin:null,//当前币种
      // 币种列表
      coins: [],
      // 余额
      balance: ''
    }
  },
  components:{forgetGetCode},
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    //获取手续费
    getFee(){
      if(this.reqParams.amount)
        this.fee = this.scale<1 ? this.toFixed_4(this.reqParams.amount * this.scale) : this.scale;
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
      this.reqParams.amount = null
    },
    // 全部金额
    allSum () {
      this.reqParams.amount = this.balance
    },
    //确认转账
    checkParams(){
      if(!this.reqParams.toAccount){
        Toast(this.$t('feature.transfer.text_id'))
        return;
      }
      if(!this.reqParams.amount){
        Toast(this.$t('feature.transfer.input_number'));
        return;
      }
      if(!this.reqParams.noteCode){
        Toast(this.$t('feature.transfer.input_code'));
        return;
      }
      if(!this.reqParams.password){
        Toast(this.$t('feature.transfer.input_pass'));
        return;
      }
      if(Number(this.reqParams.amount) > Number(this.balance)) {
        Toast('转账金额不能超出可用余额');
        return;
      }
      this.transfer()
    },
    transfer(){
      let data = {
        phone: this.userInfo.userPhone,
        amount: Number(this.reqParams.amount),
        toAccount: this.reqParams.toAccount,
        noteCode: this.reqParams.noteCode,
        password: this.reqParams.password,
        conidId: Number(this.reqParams.conidId)
      }
      transfer(data).then(v=>{
        if (v.code === 1000) {
          Toast.success(v.msg)
          setTimeout(() => {
            this.goback()
          }, 1000)
        } else {
          Toast.success(v.msg)
        }
      })
    },
    //获取id名称
    getName(){
      if(!this.reqParams.toAccount){
        this.idName = null;
        return;
      }
      idGetName({id:this.reqParams.toAccount}).then(v=>{
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
      this.reqParams.conidId = value.coinId
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
          this.reqParams.conidId = res.data[0].coinId
          this.balance = res.data[0].lastBalance
        }
      })
    }
  },
  mounted() {
    this.getBalanceAll();
        
  },
  created() {
    // console.log(this.userInfo)
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
.currency-select-right {
  .van-icon {
    font-size: 20px;
  }
}
</style>
