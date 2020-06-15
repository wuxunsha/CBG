<template>
    <div>
      <div class="navBox">
        <van-nav-bar
          :title="`404`"
          fixed
          left-arrow
          @click-left="goback()"
        />
      </div>

        <div class="content">
            <!-- <div class="bg"><img src="../assets/image/404.png"></div> -->
            <h1 v-if="data">{{data}}</h1>
             <h1 v-else>not found ...</h1>

          <router-link :to='{path:"/index"}' replace class="btn" v-if="data">{{lange=='en'?"back home":"返回首页"}}</router-link>

        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      data:'',
      lange: window.lange
    };
  },
  components: {},
  mounted: function() {
    let paramsData = this.$route.query.data;
  //  console.log(paramsData);
    if(paramsData){
      this.data = this.$route.query.data.message
    }
  }//mounted
};
</script>
<style scoped>
h1 {
  margin: 40px 20px;
  text-align: center;
  font-size: 18px;
  opacity: 0.8;
}
.bg {
  background: #33a4ea;
  text-align: center;
  padding: 20px 0;
}
.bg img {
  width: 100px;
}
.btn{
  display: block;
  width: 40%;
  margin: 0 auto;
  padding: 15px;
}
</style>
