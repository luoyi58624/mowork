<template>
	<view class="page-container">
		<view class="tool-container m-elevation-1">
			<view class="font-bold">我的模块</view>
			<view class="box">
				<view
					v-for="(item, index) in myModules"
					:key="index"
					class="item m-elevation-1 m-scale-90"
					@tap="skipPage(item.url)"
				>
					<m-icon :type="item.icon" size="24" color="var(--color-black-3)"/>
					<text class="mt-1 text-xs">{{ item.name }}</text>
				</view>
			</view>
		</view>
		<view class="tool-container v-elevation-1 mt-2">
			<view class="font-bold">更多工具</view>
			<view class="box">
				<view
					v-for="(item, index) in tools"
					:key="index"
					class="item m-elevation-1 m-scale-90"
					@tap="skipPage(item.url)"
				>
					<m-icon :type="item.icon" size="24" color="var(--color-black-3)"/>
					<text class="mt-1 text-xs">{{ item.name }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			myModules: [
				{
					name: '项目',
					icon: 'project',
					url: '/pages/project/list/list'
				},
				{
					name: '任务',
					icon: 'task',
					url: '/pages/task/list/list'
				},
				{
					name: '计划',
					icon: 'control',
					url: '/pages/plan/list/list'
				},
				{
					name: 'ISSUE',
					icon: 'edit',
					url: '/pages/issue/list/list'
				},
				{
					name: '工作交接',
					icon: 'jiaojie',
					url: ''
				},
				{
					name: '企业知识库',
					icon: 'cangku',
					url: ''
				},
				{
					name: '审批',
					icon: 'shenpi',
					url: ''
				},
				{
					name: '出勤打卡',
					icon: 'clock',
					url: ''
				}
			],
			tools: [
				{
					name: '搜索',
					icon: 'search',
					url: ''
				},
				{
					name: '表格识别',
					icon: 'saomiao',
					url: ''
				},
				{
					name: '8D',
					icon: 'tubiao',
					url: ''
				},
				{
					name: 'FMEA',
					icon: 'female',
					url: ''
				},
				{
					name: '地图',
					icon: 'map',
					url: ''
				}
			]
		}
	},
	methods: {
		skipPage(url) {
			if (this.$store.getters.isSelectedCompany) {
				if (url && url !== '') {
					uni.navigateTo({
						url
					})
				} else {
					uni.showToast({
						icon: 'error',
						title: '还未开发'
					})
				}
			} else {
				uni.showToast({
					icon: 'error',
					title: '请选择公司'
				})
			}
		}
	}
}
</script>

<style scoped lang="scss">
.page-container {
	height: calc(100vh - 94px);
	padding: 8px;
}
.tool-container {
	padding: 16px;
	background-color: #fff;
	border-radius: 8px;

	.box {
		margin-top: 16px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 4px;

		.item {
			height: 150rpx;
			border-radius: 6px;
			background-color: #e9ecef;
			color: var(--color-black);
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
