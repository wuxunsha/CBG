<template>

  <div class="mylist">
      <div class="listTitle">{{$t('feature.miningDetail.text_listTitle')}}</div>

      <div class="chart">
        <div class="ul">
          <div class="li" v-for="(item,index) in data"  :key="index">
            <div :style="{width:`${ item.currentNumber / item.maxTb *100}%`,opacity:`${++index/1.6}`}" class="val animated slideInLeft"></div>
          <span>{{`1:${ parseFloat ( 2 - parseFloat(item.discount) ) }`}}</span>
          </div>
        </div>

        <div class="info">
          <div>{{$t('feature.miningDetail.text_pTitle')}}</div>
          <div>{{$t('feature.miningDetail.text_p')}}</div>
        </div>

      </div>
      <!-- chart -->
      

  </div>

</template>

<script>
  import {
    resonance
  } from '../../../data/business';
  export default {
    props: ['user'],
    data() {
      return {
        data:null
      }
    },
    methods: {
      getData(){
        resonance().then(v=>{
          console.log(v)
          this.data = v.data;
        })
      }//getData
    },
    mounted() {
      this.getData();
    } //mounted
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../../styles/walletVal";
  .mylist{
    padding: 10px;
  }
  .chart{
    background: white;
    border-radius: 8px;
    padding: 20px 0;
    .ul{
      overflow: hidden;
      padding:0 10px;
      .li{
        height: 40px;
        margin-bottom: 10px;
        margin-bottom: 10px;
        color: white;
        line-height: 40px;
        min-width: 2px;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        // padding-left: 10px;
        background: rgba(0,0,0,0.1);
        .val{
          background: #126e8c;
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          z-index: 1;
          border-radius: 4px;
        }
        span{
          display: block;
          padding-left: 10px;
          position: relative;
          z-index: 11;
        }
      }
    }
    .info{
      padding: 10px;
      color: $them_color_gray;
      font-size: 12px;
      >div{
        margin-bottom: 5px;
      }
    }
  }
</style>
