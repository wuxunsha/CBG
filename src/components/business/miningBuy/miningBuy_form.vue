<template>

  <div class="actionForm">

    <div class="listTitle">{{$t('feature.miningBuy.text_chooseTitle')}}</div>

    <div class="inputRow flex align between">

      <div class="formGroup">
        <div class="inputItem">
          <input type="text" placeholder="" value="TB" name="" id="" disabled>
        </div>
      </div>
      <!-- formGroup -->

      <div class="formGroup">
        <div class="inputItem">
          <div class="selecteBox" @click="()=>{scaleShow=true;currSet=1}"></div>
          <input type="text" placeholder="" v-model="scale1" name="" id="">
        </div>
      </div>
      <!-- formGroup -->

      <div class="formGroup">
        <div class="inputItem">
          <div class="selecteBox" @click="show=true"></div>
          <input type="text" placeholder="" v-model="coinIdName" name="" id="">
        </div>
      </div>
      <!-- formGroup -->

      <div class="formGroup">
        <div class="inputItem">
          <div class="selecteBox" @click="()=>{scaleShow=true;currSet=2}"></div>
          <input type="text" placeholder="" v-model="scale2" name="" id="">
        </div>
      </div>
      <!-- formGroup -->

    </div>
    <!-- flex -->


    <div class="info font12 color-gray2">
      <div>{{$t('feature.miningBuy.text_pTitle')}}</div>
      <div>{{$t('feature.miningBuy.text_p')}}</div>
    </div>
    <!-- formGroup -->

    <div class="space20"></div>

    <div class="submit_btn red" @click="sendOrder">{{$t('feature.miningBuy.text_subsmit')}}</div>

    <van-popup position="bottom" v-model="show">
      <van-picker :columns="ableCoins" show-toolbar @cancel="show=false" @confirm="onChange" :title=" `${$t('feature.miningBuy.text_coins')}`"
        :confirm-button-text="`${$t('feature.miningBuy.text_ok')}`" :cancel-button-text="`${$t('feature.miningBuy.text_cancel')}`" />
    </van-popup>

    <van-popup position="bottom" v-model="scaleShow">
      <van-picker :columns="scaleArr" show-toolbar @cancel="show=false" @confirm="onScaleArr" :title=" `${$t('feature.miningBuy.text_rate')}`"
        :confirm-button-text="`${$t('feature.miningBuy.text_ok')}`" :cancel-button-text="`${$t('feature.miningBuy.text_cancel')}`" />
    </van-popup>


    

  </div>
  <!-- actionForm -->

</template>

<script>
import {
  coinsList,
  poolBuy
} from '../../../data/business';
import {
  mapMutations,
  mapState
} from 'vuex'
import { Toast } from 'vant';
  export default {
    props: ['id'],
    data() {
      return {
        show:false,//显示币种选择
        scaleShow:false,//显示比例选择
        coins: [],
        from:{
          coinId: null,
          poolId: this.id,
          proportion: 0.5,
          userId: ''
        },
        coinIdName:null,
        scaleArr:[
          {text:"10%",val:0.1},
          {text:"20%",val:0.2},
          {text:"30%",val:0.3},
          {text:"40%",val:0.4},
          {text:"50%",val:0.5},
          {text:"60%",val:0.6},
          {text:"70%",val:0.7},
          {text:"80%",val:0.8},
          {text:"90%",val:0.9},
          {text:"100%",val:1}
        ],
        currSet:null,//当前选择
        scale1:'50%',//比例2
        scale2:'50%'//比例2
      }
    },
    computed:{
      ...mapState(['userInfo']),
      ableCoins(){//筛选可选币种
        let res = this.coins.filter(x=>x.pool=='Y');
        res.forEach(x=>x.text = x.coinName);
        if(res.length){
          this.coinIdName = res[0].coinName;
          this.from.coinId = res[0].id;
        }
        return res;
      }//ableCoins
    },
    methods: {
      onChange(value, index) {
        // console.log(value, index)
        let {coinName,id} = this.ableCoins[index];
        this.coinIdName = coinName;
        this.from.coinId = id;
        this.show = false;
      },
      onScaleArr(value, index) {
        // console.log(value, index)
        let {text,val} = this.scaleArr[index];

        if(this.currSet==1){
          this.scale1 = text;
          this.scale2 = ((1-val)*100).toFixed(0)+'%';
        }
        else{
          this.scale2 = text;
          this.scale1 = ((1-val)*100).toFixed(0)+'%';
        }
        this.scaleShow = false;
      },
      getCoinsList(){
        coinsList().then(v=>{
          // console.log(v);
          this.coins = v.data;
        })
      },//getCoinsList
      sendOrder(){//发送订单
        this.from.userId = this.userInfo.user.id
        this.from.proportion = this.scaleArr.find(x=>x.text==this.scale1).val;
        poolBuy(this.from).then(v=>{
          Toast.success(v.message)
          // console.log(v)
          setTimeout(() => {
            this.goback()
          }, 1000);
        })
      }//sendOrder
    },
    mounted() {
      this.getCoinsList();
    }
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../../styles/walletVal";

  .info {
    line-height: 2em;
  }

  .inputRow {
    .formGroup {
      margin: 0 5px;

      input {
        text-align: center;
      }
    }

    margin-bottom: 30px;
  }

</style>
