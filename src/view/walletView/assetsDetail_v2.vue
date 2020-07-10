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
      <ul>
        <li>
          <div>
            <p>充币</p>
            <p style="text-align:right;" class="green">+20.00</p>
          </div>
          <p>2020/04/13 12:21:12</p>
        </li>
        <li>
          <div>
            <p>充币</p>
            <p style="text-align:right;" class="blue">-20.00</p>
          </div>
          <p>2020/04/13 12:21:12</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    
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
