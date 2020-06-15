<template>
  <div class="share-list full-height">

   <div class="padding20"><walletNav :title="$t('wallet.share.nav_title_shareList')" left-arrow @clickLeft="goback()"/></div>

    <div class="table" v-if="child.length">
      <table>
        <thead>
          <tr>
            <th class=" textLeft text_color_dark">{{$t('wallet.share.text_td_user')}}</th>
            <th class=" textRight text_color_dark">{{$t('wallet.share.text_td_timer')}}</th>
          </tr>
        </thead>
        <ody>
          <tr v-for="(item,index) in child" :key="index">
            <td class=" textLeft them_color_gray">{{item.user_nick}}</td>
            <td class=" textRight them_color_gray">{{item.user_add_time}}</td>
          </tr>
        </ody>
      </table>

    </div>
    <!-- table -->

     <div class="nullData"><van-icon name="orders-o" /><div>{{$t('wallet.common.text_none_data')}}</div></div>
  
  </div>
  <!-- share -->
</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex'
  import {
    child
  } from '../../data/wallet';

  export default {
    data() {
      return {
        child:[]
      }
    },
    methods: {
      getChild(){//获取列表
        child().then(v=>{
          this.child = v.data;
        })
      }//getChild
    },
    mounted() {
      this.getChild();
    } //mounted
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../styles/walletVal";

  // 分享样式
  .share-list {
    .table {
      width: 100%;

      table {
        width: 100%;

        thead tr {
          background: $them_color_bgGray;

          th {
            padding: 15px 20px;
            font-size: 15px;
          }
        }

        ody {
          td {
            padding: 15px 20px;
            font-size: 13px;
          }

          tr:nth-child(even) {
            background: $them_color_bgGray;
          }
        }
      }
    }
  }

</style>
