<template>
	<view>
		<m-tabs-swiper v-model="tabIndex" :tabs="tabs" hasTabbar>
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
		</m-tabs-swiper>
<!--    <m-tabs :tabs="tabs" v-model="tabIndex"></m-tabs>-->
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
			// tabs: ['页面1', '页面2', '页面3', '页xaxas面4', '页面5', '页面6', '页面7', '页面8', '页面9', '页面10']
			tabs: ['页面1', '页面2']
		}
	},
	methods: {}
}
</script>

<style lang="scss"></style>
