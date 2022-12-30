<template>
	<scroll-view
		class="h-full"
		scroll-x
		scroll-y
		refresher-background="var(--color-white-2)"
		refresher-enabled
		:refresher-threshold="100"
		:refresher-triggered="refresh"
		@refresherrefresh="onRefresh"
	>
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
