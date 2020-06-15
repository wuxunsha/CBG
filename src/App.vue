<template>
  <div id="app" class="bg_color walletView">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>

		<router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
	data(){
			return{
				transitionName:'transitionRouter'
			}
		},
	components: {
		},
		watch: {
　　　		'$route' (to, from) {
				const toDepth = to.path.split('/').length
				const fromDepth = from.path.split('/').length
				this.transitionName = toDepth < fromDepth ? 'transitionRouter' : 'transitionRouter'
			}
　 },
  name: 'app'
}
</script>

<style  lang="scss">
	.transitionRouter-enter-active,
.transitionRouter-leave-active {
	transition: all 0.3s;
	opacity: 1;
}

.transitionRouter-enter,
.transitionRouter-leave{
    opacity: 0;
}
#app{
	min-height: 100vh;
	box-sizing: border-box;
}
</style>
