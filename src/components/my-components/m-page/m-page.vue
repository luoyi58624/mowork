<template>
	<view
		class="m-page"
		:style="[
			{
				'--status-bar-height': appStore.systemInfo.statusBarHeight + 'px',
				'--navbar-height': navbarHeight + 'px',
				'--container-height': containerHeight,
				'--navbar-bg': navbarBg,
				'--navbar-color': navbarColor
			}
		]">
		<view class="m-navbar">
			<view
				class="m-system-bar"
				:style="{
					backgroundColor: statusBarBg == null ? navbarBg : statusBarBg
				}" />
			<view class="m-navbar-container">
				<slot name="navbar" />
			</view>
		</view>

		<view class="m-container">
			<slot></slot>
		</view>
	</view>
</template>

<script lang="ts">
export default {
	name: 'm-page'
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

defineProps({
	navbarHeight: {
		type: Number,
		default: 44
	},
	// 状态栏背景色，如果没有则使用 navbarBg
	statusBarBg: {
		type: String,
		default: null
	},
	// 导航栏背景颜色
	navbarBg: {
		type: String,
		default: '#ffffff'
	},
	// 导航栏文字颜色
	navbarColor: {
		type: String,
		default: 'rgb(107, 107, 107)'
	}
})

const appStore = useAppStore()

const containerHeight = computed(() => {
	let height
	// #ifdef H5
	height = 'calc(100vh - var(--navbar-height) - var(--window-bottom))'
	// #endif
	// #ifndef H5
	height = 'calc(100vh - var(--status-bar-height) - var(--navbar-height))'
	// #endif
	return height
})
</script>

<style lang="scss">
.m-page {
	width: 100vw;
	position: relative;
}

.m-navbar {
	width: 100%;
	position: fixed;
	z-index: 2;
}

.m-system-bar {
	width: 100%;
	height: var(--status-bar-height);
}

.m-navbar-container {
	width: 100%;
	height: var(--navbar-height);
	display: flex;
	align-items: center;
	background-color: var(--navbar-bg);
	color: var(--navbar-color);
}

.m-container {
	width: 100%;
	position: absolute;
	z-index: 1;
	top: calc(var(--status-bar-height) + var(--navbar-height));
	/* #ifdef H5  */
	padding-bottom: var(--window-bottom);
	/* #endif */
}
</style>
