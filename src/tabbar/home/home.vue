<template>
	<m-page navbar-bg="var(--color-primary)" navbar-color="#ffffff">
		<template #navbar>
			<Header @load-home-data="getHomeData()" />
		</template>
		<Content ref="contentRef" />
	</m-page>
</template>

<script setup lang="ts">
import Header from './modules/header/Header.vue'
import Content from './modules/content/Content.vue'
import { ref, unref } from 'vue'
import { onPullDownRefresh, onReady } from '@dcloudio/uni-app'

const userStore = useUserStore()
const contentRef = ref()

// 加载首页所有模块的数据
function getHomeData() {
	unref(contentRef).getData()
}

onPullDownRefresh(() => {
	if (userStore.isSelectedCompany) {
		getHomeData()
		setTimeout(() => {
			uni.stopPullDownRefresh()
			uni.showToast({
				icon: 'success',
				title: '数据已更新'
			})
		}, 1500)
	} else {
		setTimeout(() => {
			uni.stopPullDownRefresh()
			uni.showToast({
				icon: 'error',
				title: '请选择公司'
			})
		}, 500)
	}
})

onReady(() => {
	if (userStore.isSelectedCompany) {
		getHomeData()
	}
})
</script>
