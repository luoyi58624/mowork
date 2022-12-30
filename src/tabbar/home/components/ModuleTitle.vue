<template>
	<view class="module-wrapper">
		<view class="module-title">{{ title }}</view>
		<view class="module-share m-scale-85" v-if="share">
			<m-icon  type="fenxiang" size="14" color="var(--color-black-3)"/> 分享
		</view>
	</view>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true
		},
		share: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style scoped lang="scss">
.module-wrapper {
	width: 100%;
	margin-bottom: 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.module-title {
		font-weight: bold;
		padding-left: 4px;
		border-left: 3px solid var(--color-primary);
	}

	.module-share {
		padding: 4px 8px;
		font-size: 12px;

		border: 1px solid var(--color-info);
		border-radius: 24px;
		display: flex;
		align-items: center;
	}
}
</style>
