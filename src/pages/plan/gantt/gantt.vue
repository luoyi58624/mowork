<template>
	<web-view :src="src" :update-title="false"></web-view>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/store/user'

export default {
	data() {
		return {
			src: ''
		}
	},
  computed: {
    ...mapState(useUserStore, ['siteUrl'])
  },
	onLoad(options) {
		// 渲染甘特图h5页面
		this.src = this.siteUrl + '/?c=project&a=gantt&code=' + options.code
	}
}
</script>

<style lang="scss"></style>
