<template>
	<view
		class="w-full"
		:style="{
			height: height,
			backgroundColor: bgColor,
			color: textColor
		}">
		<scroll-view :scroll-x="true" id="tabs-scroll" scroll-with-animation :scroll-left="scrollLeft">
			<view class="relative space-nowrap">
				<view class="flex">
					<view
						v-for="(item, index) in tabs"
						:key="index"
						class="flex-1 flex-center"
						:class="{ _active: modelValue === index }"
						:style="{
							height: height,
							color: modelValue == index ? activeColor : textColor,
							padding: `0px ${tabPadding}px`
						}"
						@click="tabClick(index)">
						<view :id="'m-tab-' + index" class="tab-item font-bold">
							{{ item }}
						</view>
					</view>
				</view>
				<view
					class="absolute bottom-0"
					:style="{
						transition: 'all 0.3s ease-out',
						transform: 'translateX(' + slider.left + 'px)',
						width: slider.width + 'px',
						height: sliderHeight,
						borderRadius: sliderHeight,
						backgroundColor: sliderColor
					}" />
			</view>
		</scroll-view>
	</view>
</template>

<script lang="ts">
export default {
	name: 'm-tabs'
}
</script>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
	modelValue: {
		type: Number,
		default: 0
	},
	// 标签名字
	tabs: {
		type: Array,
		default: () => []
	},
	height: {
		type: String,
		default: '50px'
	},
	bgColor: {
		type: String,
		default: '#ffffff'
	},
	textColor: {
		type: String,
		default: '#3c3c3c'
	},
	// 激活字体颜色
	activeColor: {
		type: String,
		default: 'var(--color-primary)'
	},
	// 下划线颜色
	sliderColor: {
		type: String,
		default: 'var(--color-primary)'
	},
	// 下划线高度
	sliderHeight: {
		type: String,
		default: '2px'
	},
	sliderLeft: {
		type: Number,
		default: 0
	}
})

const emits = defineEmits(['update:modelValue', 'change'])

let allTabAttr = []
let scrollDom = {
	scrollWidth: 0, // 滚动条宽度
	clientWidth: 0 // 可视宽度
}
let sliderCurrentLeft = 0
const scrollLeft = ref(0) // 滚动条位置
const tabPadding = 16
// 滑块属性
const slider = ref({
	left: 0, // 滑块距离左边的距离
	width: 0 // 滑块宽度
})

watch(
	() => props.modelValue,
	value => {
		updateSlider(value)
	}
)

function tabClick(index) {
	emits('update:modelValue', index)
	emits('change', index)
}

// 设置滚动容器属性
function init() {
	return new Promise(resolve => {
		uni
			.createSelectorQuery()
			.select('#tabs-scroll')
			.scrollOffset((res: any) => {
				scrollDom.scrollWidth = res.scrollWidth
			})
			.exec()
		uni
			.createSelectorQuery()
			.select('#tabs-scroll')
			.boundingClientRect((res: any) => {
				scrollDom.clientWidth = res.width
			})
			.exec()

		uni
			.createSelectorQuery()
			.selectAll('.tab-item')
			.boundingClientRect((res: any) => {
				allTabAttr = res
				resolve(res)
			})
			.exec()
	})
}

function updateSlider(index) {
	const sliderLeft = allTabAttr[index].left - tabPadding / 2 - 2
	slider.value = {
		width: allTabAttr[index].width + tabPadding,
		left: sliderLeft
	}
	sliderCurrentLeft = sliderLeft
	scrollLeft.value = Math.min(
		scrollDom.scrollWidth - scrollDom.clientWidth,
		Math.max(0, allTabAttr[index].left + allTabAttr[index].width / 2 - scrollDom.clientWidth / 2)
	)
}

function touchSlider(num) {
	slider.value.left = sliderCurrentLeft + num / props.tabs.length
}

onMounted(() => {
	init().then(() => {
		updateSlider(props.modelValue)
	})
})

defineExpose({
	touchSlider
})
</script>

<style lang="scss"></style>
