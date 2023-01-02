<template>
	<view class="m-tabs-swiper-wrapper">
		<view class="w-full" style="height: 50px">
			<m-tabs ref="tabsRef" :tabs="tabs" :modelValue="modelValue" @change="changeTabIndex" />
		</view>

		<view class="flex-1">
			<swiper class="h-full" skip-hidden-item-layout :current="modelValue" :duration="250" @change="swiperChange">
				<swiper-item v-for="(item, index) in tabs" :key="index">
					<view
						:class="['h-full', `m-tabs-content-${index}`]"
						@touchstart="touchStartHandler"
						@touchmove="touchMoveHandler"
						@touchend="touchEndHandler">
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
import { ref, unref, watch } from 'vue'

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

const tabsRef = ref()
const alreadyActiveTab = ref([]) // 已激活tab，如果首次激活对应的tab，将会触发init事件

const touchEvent = {
	startX: 0,
	startY: 0,
	endX: 0,
	endY: 0
}
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

// 不完善，后续要优化
function touchStartHandler(e) {
	// touchEvent.startX = e.changedTouches[0].pageX
	// touchEvent.startY = e.changedTouches[0].pageY
}

function touchMoveHandler(e) {
	// touchEvent.endX = e.changedTouches[0].pageX
	// touchEvent.endY = e.changedTouches[0].pageY
	// unref(tabsRef).touchSlider(touchEvent.startX - touchEvent.endX)
}

function touchEndHandler() {
	// unref(tabsRef).touchSlider(0)
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
