<template>
	<scroll-view class="h-full" scroll-y>
		<view v-for="i in 100" :key="i">demo-{{ i }}</view>
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {
			refresh: true
		}
	},
	methods: {
		onRefresh() {
			this.refresh = true
			setTimeout(() => {
				this.refresh = false
			}, 1000)
		}
	}
}
</script>

<style></style>
