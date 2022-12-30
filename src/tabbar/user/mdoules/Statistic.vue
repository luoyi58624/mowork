<template>
	<view class="w-full pt-2 pb-4 px-2 m-elevation-1 rounded-md bg-white">
		<view class="font-bold text-black-3 text-sm">任务统计分析</view>
		<view class="flex items-center mt-4">
			<view class="flex flex-col items-center flex-1 v-scale-85">
				<m-progress :percent="30" type="circle" textColor="var(--color-primary)"></m-progress>
				<text class="font-bold text-xs text-black-3 mt-2">按时完成</text>
			</view>
			<view class="flex flex-col items-center flex-1 v-scale-85">
				<m-progress :percent="50" type="circle" textColor="var(--color-primary)"></m-progress>
				<text class="font-bold text-xs text-black-3 mt-2">提前完成</text>
			</view>
			<view class="flex flex-col items-center flex-1 v-scale-85">
				<m-progress :percent="15" type="circle" textColor="var(--color-primary)"></m-progress>
				<text class="font-bold text-xs text-black-3 mt-2">延期完成</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {}
</script>

<style></style>
