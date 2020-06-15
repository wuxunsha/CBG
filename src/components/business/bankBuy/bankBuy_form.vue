<template>

  <div class="actionForm">

      <div class="formGroup">
        <div class="title">{{$t('feature.bankBuy.text_amout')}}</div>
        <div class="inputItem">
          <input type="number" :placeholder="$t('feature.bankBuy.input_amount')" v-model="amount" @blur="blur_event()">
        </div>
      </div>
      <!-- formGroup -->

      <div class="formGroup">
        <div class="title">{{$t('feature.bankBuy.text_cycle')}}</div>
        <div class="inputItem">
          <div class="selecteBox" @click="show=true"></div>
          <input type="text" :placeholder="$t('feature.bankBuy.input_cycle')" name="" id="" v-model="cyclesName">
        </div>
      </div>
      <!-- formGroup -->

      <div class="info">
        <div class="title font15 color-gray2">{{$t('feature.bankBuy.text_productRate')}}</div>
        <div class="font20 them_color font-bold">{{toFixed_4(amount*productRate)}}</div>
      </div>
      <!-- formGroup -->

      <div class="space20"></div>

      <div class="submit_btn red" @click="sendOrder">{{$t('feature.bankBuy.btn_submit')}}</div>

      <van-popup position="bottom" v-model="show">
			<van-picker :columns="cycles"
			show-toolbar
			@cancel="show=false"
			@confirm="onChange"
			:title=" `${$t('feature.bankBuy.input_cycle')}`"
			:confirm-button-text="`${$t('feature.bankBuy.text_ok')}`"
			:cancel-button-text="`${$t('feature.bankBuy.text_cancel')}`"
			/>
		</van-popup>

  </div>
  <!-- actionForm -->

</template>

<script>
import {
    mapActions
  } from 'vuex'
  import {
    productBuy
  } from '../../../data/business';
import { Toast } from 'vant';
  export default {
    props: ['proInfo'],
    data() {
      return {
        show:false,
        type:null,
        cyclesName:null,
        amount:null,
        cyclesId:null,
        productRate:0
      }
    },
    computed:{
      cycles(){//设置周期
        let info = this.parseParams(this.proInfo);
        info.cycles.forEach(v=>v.text = `${this.$t('feature.bankBuy.text_cycle_s')} ${v.productDay} ${this.$t('feature.bankOrder.text_day')} - ${this.$t('feature.bankBuy.text_mini')} ${this.toFixed_4(v.productMin)} ${this.$route.query.coinName}`);
        return info.cycles;
      }//cycles
    },
    methods: {
      ...mapActions(['actionUserInfo']),
      onChange(value, index){//选择周期
        this.cyclesName = this.cycles[index].text;
        this.cyclesId = this.cycles[index].id;
        this.productRate = this.cycles[index].productRate;
				this.show = false;
      },//onChange
      sendOrder(){
        if(!this.amount){
          Toast(this.$t('feature.bankBuy.input_amount'));
          return;
        }
        if(!this.cyclesId){
          Toast(this.$t('feature.bankBuy.input_cycle'));
          return;
        }
        let params = {
          "amount": this.amount,
          "productCycleId": this.cyclesId,
          "productId": this.proInfo.id
        }
        productBuy(params).then(v=>{
          Toast.success(v.message);
          setTimeout(() => {
            this.actionUserInfo();
          }, 1000);
        })
      }//sendOrder
    },
    mounted() {
      console.log(this.parseParams(this.proInfo))
    }
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../../styles/walletVal";
  
</style>
