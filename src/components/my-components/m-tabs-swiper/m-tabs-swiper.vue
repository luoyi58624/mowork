<template>
	<view class="m-tabs-swiper-wrapper">
		<view class="w-full" style="height: 50px">
			<m-tabs :tabs="tabs" :modelValue="modelValue" @change="changeTabIndex" />
		</view>

		<view class="flex-1">
			<swiper class="h-full" skip-hidden-item-layout :current="modelValue" :duration="250" @change="swiperChange">
				<swiper-item v-for="(item, index) in tabs" :key="index">
					<view :class="['h-full', `m-tabs-content-${index}`]">
						<slot :name="'swiper' + (index + 1)"></slot>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script lang="ts">
export default {
	name: 'm-tabs-swiper'
}
</script>
<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
	modelValue: {
		type: Number,
		default: 0
	},
	tabs: {
		type: Array,
		required: true
	}
})

const emits = defineEmits(['update:modelValue', 'init'])

const alreadyActiveTab = ref([]) // 已激活tab，如果首次激活对应的tab，将会触发init事件

watch(
	() => props.modelValue,
	value => {
		if (!alreadyActiveTab.value.includes(value)) {
			alreadyActiveTab.value.push(value)
			emits('init', value)
		}
	},
	{
		immediate: true
	}
)

function swiperChange(e) {
	changeTabIndex(e.detail.current)
}

function changeTabIndex(index) {
	emits('update:modelValue', index)
}
</script>

<style lang="scss">
.m-tabs-swiper-wrapper {
	width: 100vw;
	height: calc(100vh - var(--window-top) - var(--window-bottom));
	display: flex;
	flex-direction: column;
}
</style>
