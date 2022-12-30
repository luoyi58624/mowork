<template>
	<view class="m-menu">
		<slot></slot>
		<view
			v-show="modelValue"
			class="m-menu-content m-elevation-2 rounded-md"
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
			@click="hidden">
		</view>
	</view>
</template>

<script lang="ts">
export default {
	name: 'm-menu'
}
</script>
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
.m-menu {
	position: relative;
}

.m-menu-content {
	position: absolute;
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
