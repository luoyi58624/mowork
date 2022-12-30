<template>
	<view
		class="w-full"
		style="height: 50px"
		:style="{
			backgroundColor: bgColor,
			color: textColor
		}">
		<scroll-view :scroll-x="true" class="scroll-view-h" scroll-with-animation :scroll-left="slider.scrollLeft">
			<view class="scroll-container">
				<view class="flex">
					<view
						v-for="(item, index) in tabData"
						:key="index"
						class="_item"
						:id="'_tab_' + index"
						:class="{ _active: modelValue === index }"
						:style="{
							color: modelValue == index ? activeColor : textColor
						}"
						@click="tabClick(index)"
						>{{ item }}
					</view>
				</view>
				<view
					class="_underline"
					:style="{
						transform: 'translateX(' + slider.left + 'px)',
						width: slider.width + 'px',
						backgroundColor: underLineColor
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
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
	modelValue: {
		type: Number,
		default: 0
	},
	tabData: {
		type: Array,
		default: () => []
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
	underLineColor: {
		type: String,
		default: 'var(--color-primary)'
	}
})

const emits = defineEmits(['update:modelValue'])

const scorll = ref({})
const slider = ref({
	left: 0,
	width: 0,
	scrollLeft: 0
})

watch(
	() => props.tabData,
	value => {
		updateTabWidth()
	}
)

watch(
	() => props.modelValue,
	value => {
		tabToIndex(value)
	}
)

function tabClick(index) {
	emits('update:modelValue', index)
}

// 计算滚动位置
function calcScrollPosition() {
	const query = uni.createSelectorQuery()

	query
		.select('#_scroll')
		.boundingClientRect(res => {
			console.log(res)
			scorll.value = res
			updateTabWidth()
		})
		.exec()
}

function updateTabWidth(index = 0) {
	const data = props.tabData

	const query = uni.createSelectorQuery()

	query
		.select('#_tab_' + index)
		.boundingClientRect((res: any) => {
			slider.value = {
				width: res.width,
				left: res.left,
				// scrollLeft: res.left - (data[index - 1] ? data[index - 1]._slider.width : 0))
				scrollLeft: 0
			}

			if (props.modelValue == index) {
				tabToIndex(props.modelValue)
			}

			index++
			if (data.length > index) {
				updateTabWidth(index)
			}
		})
		.exec()
}

function tabToIndex(index) {
	// let _slider = this.tabList[index]._slider
	//
	// let width = uni.upx2px(this.defaultConfig.underLineWidth)
	//
	// if (!width) {
	// 	if (this.defaultConfig.itemWidth) {
	// 		width = uni.upx2px(this.defaultConfig.itemWidth)
	// 	} else {
	// 		width = this.tabList[index][this.defaultConfig.key].length * 16
	// 	}
	// 	width += uni.upx2px(this.defaultConfig.underLinePadding) * 2
	// }
	//
	// let scorll_left = this.scorll.left || 0
	//
	// this.slider = {
	// 	left: _slider.left - scorll_left + (_slider.width - width) / 2,
	// 	width: width,
	// 	scrollLeft: _slider.scrollLeft - scorll_left
	// }
}

onMounted(() => {
	calcScrollPosition()
	uni.onWindowResize(calcScrollPosition)
})

onUnmounted(() => {
	uni.offWindowResize(calcScrollPosition)
})
</script>

<style lang="scss" scoped>
.scroll-view-h {
	white-space: nowrap;
	width: 100%;
	height: 100%;
	box-sizing: border-box;

	._scroll-content {
		width: 100%;
		height: 100%;
		position: relative;

		._underline {
			height: 2px;
			background-color: #e54d42;
			border-radius: 2px;
			transition: 0.5s;
			position: absolute;
			bottom: 0;
		}
	}
}
</style>
