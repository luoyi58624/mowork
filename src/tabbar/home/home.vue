<template>
	<m-page navbar-bg="var(--color-primary)" navbar-color="#ffffff">
		<template #navbar>
			<Header @load-home-data="getHomeData()" />
		</template>
<!--		<Content ref="contentRef" />-->
	</m-page>
</template>

<script setup lang="ts">
import Header from './modules/header/Header.vue'
// import Content from './modules/content/Content.vue'
import { ref, unref } from 'vue'

const contentRef = ref()

// 加载首页所有模块的数据
function getHomeData() {
	// unref(contentRef).getData()
}
</script>

<style scoped lang="scss"></style>
