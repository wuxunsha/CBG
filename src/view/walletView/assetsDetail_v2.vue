<template>
  <div class="assetsbg full-height">

    <div class="navBox">
      <van-nav-bar
        :title="`${$t('feature.assetsDetail_v2.nav_title')}`"
        fixed
        left-arrow
        @click-left="goback()"
      />
    </div>

    <div class="assetsBox">
      <ul v-if="asstesList.length > 0">
        <li v-for="(item, index) in asstesList" :key="index">
          <div>
            <p>{{item.typeName}}</p>
            <p style="text-align:right;" :class="item.amount > 0 ? 'green' : item.amount < 0 ? 'red' : 'blue'">{{item.amount <= 0 ? item.amount : '+' + item.amount}}</p>
          </div>
          <p>{{timerExchange(item.addTime)}}</p>
        </li>
      </ul>
      <div v-else style="margin-top: 20px;">
        <h4 style="text-align:center;color:#ccc;font-size: 14px;">暂无数据</h4>
      </div>
    </div>
  </div>
</template>

<script>
import {
  listZJinfo
} from '../../data/wallet'
export default {
  data() {
    return {
      asstesList: []
    }
  },
  methods: {
    getListZJinfo() {
      const data = {
        token_: this.$store.state.newToken,
        coinId: this.$route.query.coinId
      }
      listZJinfo(data).then(res => {
        console.log(res.code)
        if(res.code === '200') {
          this.asstesList = res.data
        }
      })
    },
    timerExchange(time) {
      var dt = new Date(time)
      var yy = dt.getFullYear()
      var mm = (dt.getMonth() + 1) > 9 ? dt.getMonth() + 1 : dt.getMonth() + 1
      mm = mm > 9 ? mm : '0' + mm
      var dd = dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate()
      var hh = dt.getHours() > 9 ? dt.getHours() : '0' + dt.getHours()
      var mi = dt.getMinutes() > 9 ? dt.getMinutes() : '0' + dt.getMinutes()
      var ss = dt.getSeconds() > 9 ? dt.getSeconds() : '0' + dt.getSeconds()
      var dy = dt.getDay() > 9 ? dt.getDay() : '0' + dt.getDay()
      return `${yy}-${mm}-${dd} ${hh}:${mi}:${ss}`
    }
  },
  created() {
    this.getListZJinfo()
  }
};

</script>
<style rel="stylesheet/scss" scoped lang="scss">
.assetsBox {
  width: 100%;
  ul {
    widows: 100%;
    li {
      width: 100%;
      border-bottom: 1px solid #EBEBEB;
      padding: 10px 15px;
      >div {
        display: flex;
        >p {
          flex: 1;
          font-size: 14px;
          font-weight: bold;
          color: rgba(53,53,53,1);
        }
        .green {
          color: #22EFB9;
        }
        .blue {
          color: #566BF3;
        }
        .red {
          color: red;
        }
      }
      >p {
        margin-top: 10px;
        font-size: 12px;
        font-weight: 500;
        color: rgba(200,205,211,1);
      }
    }
  }
}
</style>
