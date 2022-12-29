<template>
	<view
		class="w-screen h-screen"
		:style="{
			'--status-bar-height': statusBarHeight + 'px',
			'--navbar-height': navbarHeight + 'px',
			'--container-height': containerHeight
		}">
		<view class="w-screen fixed z-2">
			<view
				class="w-screen"
				:style="{
					height: statusBarHeight + 'px',
					backgroundColor: backgroundColor
				}" />
			<view
				class="w-screen flex items-center px-2"
				:style="{
					height: navbarHeight + 'px',
					backgroundColor: backgroundColor,
					color: color
				}">
				<slot name="navbar"></slot>
			</view>
		</view>

		<view class="v-container w-screen relative z-1">
			<slot name="container"></slot>
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

defineProps({
	navbarHeight: {
		type: Number,
		default: 44
	},
	backgroundColor: {
		type: String,
		default: 'rgb(245, 245, 245)'
	},
	color: {
		type: String,
		default: 'rgb(107, 107, 107)'
	}
})

const statusBarHeight = ref(0)

const containerHeight = computed(() => {
	let height
	// #ifdef H5
	height = 'calc(100vh - var(--navbar-height) - 50px)'
	// #endif
	// #ifndef H5
	height = 'calc(100vh - var(--status-bar-height) - var(--navbar-height))'
	// #endif
	return height
})

onMounted(() => {
	statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight
})
</script>

<style scoped lang="scss">
.v-container {
	top: calc(var(--status-bar-height) + var(--navbar-height));
	/* #ifdef H5  */
	padding-bottom: 50px;
	/* #endif */
}
</style>
