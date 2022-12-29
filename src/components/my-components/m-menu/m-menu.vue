<template>
	<view class="relative">
		<slot></slot>
		<view
			v-show="modelValue"
			class="v-menu absolute m-elevation-2 rounded-md"
			:style="{
				left: offsetX,
				top: offsetY
			}">
			<slot name="menu"></slot>
		</view>
		<view
			v-if="modelValue"
			class="fixed top-0 left-0 w-screen h-screen bg-transparent"
			style="z-index: 999"
			@tap="hidden">
		</view>
	</view>
</template>

<script setup lang="ts">
defineProps({
	modelValue: {
		type: Boolean,
		default: false
	},
	offsetX: {
		type: String,
		default: '0px'
	},
	offsetY: {
		type: String,
		default: '0px'
	}
})

const emits = defineEmits(['update:modelValue'])

function hidden() {
	emits('update:modelValue', false)
}
</script>

<style scoped lang="scss">
.v-menu {
	z-index: 1000;
	overflow: hidden;
	animation: show 0.25s ease-out;
}

@keyframes show {
	0% {
		opacity: 0.2;
		transform: translateY(-30px);
	}

	100% {
		opacity: 1;
		transform: translateY(0px);
	}
}
</style>
