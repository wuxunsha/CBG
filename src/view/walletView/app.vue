<template>
  <div class="walletView">
    
    <keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>

		<router-view v-if="!$route.meta.keepAlive"></router-view>
    
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
     
    },
    computed: {
      
    },
    activated() {

    } //mounted
  };

</script>
<style rel="stylesheet/scss" scoped lang="scss">

</style>
