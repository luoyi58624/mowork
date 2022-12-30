<template>
	<view class="w-screen p-2" style="margin-top: 80px">
		<module-title title="项目进度" />
		<view class="box">
			<view
				class="item m-elevation-1 m-scale-90 bg-primary-light text-primary"
				:class="{ 'is-new': overview.processing.is_new }">
				<text>{{ overview.processing.count }}</text>
				<text class="text-xs mt-1">进行中</text>
			</view>
			<view
				class="item m-elevation-1 m-scale-90 bg-error-light text-error"
				:class="{ 'is-new': overview.delaying.is_new }">
				<text>{{ overview.delaying.count }}</text>
				<text class="text-xs mt-1">逾期</text>
			</view>
			<view
				class="item m-elevation-1 m-scale-90 bg-warning-light text-warning"
				:class="{ 'is-new': overview.warning.is_new }">
				<text>{{ overview.warning.count }}</text>
				<text class="text-xs mt-1">预警</text>
			</view>
			<view
				class="item m-elevation-1 m-scale-90 bg-success-light text-success"
				:class="{ 'is-new': overview.done.is_new }">
				<text>{{ overview.done.count }}</text>
				<text class="text-xs mt-1">已完成</text>
			</view>
			<view
				class="item m-elevation-1 m-scale-90 bg-info-light text-info"
				:class="{ 'is-new': overview.verifying.is_new }">
				<text>{{ overview.verifying.count }}</text>
				<text class="text-xs mt-1">待审批</text>
			</view>
			<view class="item m-elevation-1 m-scale-90 bg-white text-black-2" :class="{ 'is-new': overview.other.is_new }">
				<text>{{ overview.other.count }}</text>
				<text class="text-xs mt-1">其他</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import ModuleTitle from '../../components/ModuleTitle.vue'
import { ref } from 'vue'

defineExpose({
  setData
})

const overview = ref({
	processing: { count: 0, is_new: false },
	delaying: { count: 0, is_new: false },
	warning: { count: 0, is_new: false },
	done: { count: 0, is_new: false },
	verifying: { count: 0, is_new: false },
	other: { count: 0, is_new: false }
})

function setData(data) {
	overview.value = data
}
</script>

<style scoped lang="scss">
@import '~@/styles/common/my.scss';

.box {
	margin-top: 16px;
	padding: 0 16px;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 32rpx;

	.item {
		height: 180rpx;
		border-radius: 6px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		position: relative;

		&.is-new::after {
			content: 'new';
			background-color: var(--color-white-1);
			color: var(--color-black);
			padding: 2px 4px 4px 4px;
			border-radius: 24px;
			font-size: 12px;
			position: absolute;
			top: -8px;
			right: -12px;
			@extend .m-elevation-2;
		}

		&.is-new.bg-primary-light::after {
			background-color: var(--color-primary);
			color: var(--color-white);
		}

		&.is-new.bg-success-light::after {
			background-color: var(--color-success);
			color: var(--color-white);
		}

		&.is-new.bg-warning-light::after {
			background-color: var(--color-warning);
			color: var(--color-white);
		}

		&.is-new.bg-error-light::after {
			background-color: var(--color-error);
			color: var(--color-white);
		}

		&.is-new.bg-info-light::after {
			background-color: var(--color-info);
			color: var(--color-white);
		}
	}
}
</style>
