<template>
  <div>
    <div class="walletNav transition3" :class="fixed?'fixed border-bottom':''">
      <div class="action flex align between transition3">
        <div class="backIocn transition3" @click="$emit('clickLeft')"><van-icon name="down" /></div>
        <slot></slot>
      </div>
      <h1 class="navTitle transition3" :style="{color:textColor}">{{title}}</h1>
    </div>
    <!-- index -->
    <div style="height:90px;" v-if="fixed"></div>
  </div>
</template>

<script>
  export default {
    props: ['title','left-arrow','textColor'],
    data() {
      return{
        fixed:false//吸顶样式
      }
    },
    methods: {
      //监听滚动
      handleScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        //console.log(scrollTop)
        if(scrollTop>90)
          this.fixed = true;
        else
          this.fixed = false;
      },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    destroyed(){
        window.removeEventListener('scroll', this.handleScroll);
    }
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">
.walletNav{
  margin-bottom: 15px;
  .backIocn{
    padding: 5px 0;
    max-width: 100px;
    .van-icon{
      transform: rotate(90deg);
      font-size: 20px;
      color: #939da7;
    }
  }
  .navTitle{
    display: block;
    font-size: 25px;
    font-weight: bold;
    color: #213c57;
    margin-top: -0px;
    line-height: 1.8em;
  }
  .rightText{
    color: #213c57;
    font-size: 14px;
    font-weight: bold;
    i{
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
      margin-top: -2px;
    }
  }
  &.fixed{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 11;
    background: white;
    height: 60px;
    .action{
      height: 100%;
      padding: 0 20px;
    }
    .navTitle{
      position: absolute;
      width: 60%;
      top: 0;
      left: 20%;
      height: 100%;
      text-align: center;
      font-size: 16px;
      padding: 0 0;
      z-index: 11;
      line-height: 60px;
    }
  }
}

</style>
