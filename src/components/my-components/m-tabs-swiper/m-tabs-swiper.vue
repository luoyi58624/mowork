<template>
	<view class="m-tabs-swiper2-wrapper">
		<view class="w-full" style="height: 50px;">
			<m-tabs :tabData="tabs" :modelValue="modelValue" @change="tabChange" />
		</view>

		<view class="flex-1">
			<swiper class="h-full" :current="modelValue" :duration="250" @change="swiperChange">
				<swiper-item v-for="(item, index) in tabs" :key="index">
					<view :class="['h-full', `m-tabs-content-${index}`]"> <slot :name="'swiper' + (index + 1)"></slot> </view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
export default {
	name: 'm-tabs-swiper2',
	props: {
		modelValue: {
			type: Number,
			default: 0
		},
		tabs: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			alreadyActiveTab: [] // 已激活tab，如果首次激活对应的tab，将会触发init事件
		}
	},
	model: {
		prop: 'modelValue',
		event: 'change'
	},
	watch: {
		modelValue: {
			handler(newValue) {
				if (!this.alreadyActiveTab.includes(newValue)) {
					this.alreadyActiveTab.push(newValue)
					this.$emit('init', newValue)
				}
			},
			immediate: true
		}
	},
	methods: {
		tabChange(e) {
			this.changeTabIndex(e)
		},
		swiperChange(e) {
			this.changeTabIndex(e.target.current)
		},
		changeTabIndex(index) {
			this.$emit('change', index)
		}
	}
}
</script>

<style lang="scss">
.m-tabs-swiper2-wrapper {
	width: 100vw;
	height: calc(100vh - var(--window-top) - var(--window-bottom));
	display: flex;
	flex-direction: column;
}
</style>
