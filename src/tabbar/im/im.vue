<template>
	<view>
		<m-tabs-swiper2 v-model="tabIndex" :tabs="tabs" hasTabbar>
			<template #swiper1>
				<Page1></Page1>
			</template>
			<template #swiper2>
				<Page2></Page2>
			</template>
			<template #swiper3>
				<view>页面3</view>
			</template>
			<template #swiper4>
				<view>页面4</view>
			</template>
			<template #swiper5>
				<view>页面5</view>
			</template>
			<template #swiper6>
				<view>页面6</view>
			</template>
			<template #swiper7>
				<view>页面7</view>
			</template>
			<template #swiper8>
				<view>页面8</view>
			</template>
			<template #swiper9>
				<view>页面9</view>
			</template>
			<template #swiper10>
				<view>页面10</view>
			</template>
		</m-tabs-swiper2>
	</view>
</template>

<script>
import Page1 from './Page1.vue'
import Page2 from './Page2.vue'
export default {
	components: { Page1, Page2 },
	data() {
		return {
			tabIndex: 0,
			tabs: [
				{
					name: '页面1'
				},
				{
					name: '页面2'
				},
				{
					name: '页面3'
				},
				{
					name: '页面4'
				},
				{
					name: '页面5'
				},
				{
					name: '页面6'
				},
				{
					name: '页面7'
				},
				{
					name: '页面8'
				},
				{
					name: '页面9'
				},
				{
					name: '页面10'
				}
			]
		}
	},
	methods: {}
}
</script>

<style lang="scss">
</style>
