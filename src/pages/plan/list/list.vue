<template>
	<view>
		<Header ref="headerRef" @getData="searchData" />
		<Content ref="contentRef" />
	</view>
</template>

<script>
import Header from './Header.vue'
import Content from './Content.vue'
import { mapActions } from 'pinia'
import { useCompanyStore } from '@/store/company'

export default {
	components: {
		Header,
		Content
	},
	data() {
		return {}
	},
	methods: {
		...mapActions(useCompanyStore, ['getProjectManagers']),
		// 执行过滤条件搜索数据，每次搜索都将重置页数
		searchData(filterOption) {
			this.$refs.contentRef.getData(filterOption, true)
		},
		// 获取数据
		getData() {
			this.$refs.contentRef.getData(this.$refs.headerRef.getFilterOption())
		}
	},
	// 初始化数据和加载所有项目经理
	mounted() {
		this.getData()
		this.getProjectManagers()
	},
	// 触底加载更多
	onReachBottom() {
		this.$refs.contentRef.loadMoreData(this.$refs.headerRef.getFilterOption())
	},
	// 下拉刷新
	async onPullDownRefresh() {
		await this.$refs.contentRef.getData(this.$refs.headerRef.getFilterOption())
		uni.stopPullDownRefresh()
	}
}
</script>

<style scoped lang="less"></style>
