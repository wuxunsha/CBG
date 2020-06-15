<template>
  <div>
      <div class="newsList flex align" @click="gopage(`/newsDetail?id=${item.id}`)">
          <div class="img" v-if="item.imgUrl">
            <img :src="item.imgUrl" alt="" srcset="">
          </div>
          <div class="text ellipse">
              <div class="title ellipse">
                <span>{{item.title}}</span>
                <span @click="gopage(`/newsDetail?id=${item.id}`)">点击查看</span>
              </div>
              <div class="sub_title ellipse">{{item.subtitle}}</div>
              <div class="info flex align">
                  <!-- <div><van-icon name="manager-o" />user</div> -->
                  <div>{{item.addTime}}</div>
              </div>
          </div>
      </div>
        <!-- newsList -->
  </div>
</template>

<script>
  export default {
    props: ['item'],
    data() {
      return {}
    },
    methods: {},
    mounted() {},
    watch: {

    } //watch
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import "../../styles/walletVal";
  .newsList{
      background: white;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #E8E8E8;
        border-radius:4px;
        width: 100%;
        .img{
            min-width: 120px;
            width: 120px;
            height: 90px;
            background: rgba(0,0,0,0.1);
            border-radius: 4px;
            overflow: hidden;
            margin-right: 10px;
            img{
              width: 100%;
              height: 100%;
            }
        }
        &:active{
          .img{
            opacity: 0.5;
          }
        }
        .text{
          width: 100%;
            >div{
              width: 100%;
                margin-bottom: 5px;
                &.title{
                  width: 100%;
                  font-size: 16px;
                  span:nth-child(2) {
                    float: right;
                    font-size: 14px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(86,107,243,1);
                  }
                }
                &.sub_title{
                  margin: 10px 0;
                  font-size: 12px;
                  font-weight: 500;
                  color: rgba(165,172,174,1);
                }
                &.info{
                    >div{
                      margin-right: 20px;
                      font-weight: normal;
                      font-size: 11px;
                      color:rgba(86,107,243,1);
                    }
                }
            }
        }
    }
</style>
