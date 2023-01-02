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
		return {
			options: {
				publish: true // 是否为公开的，为true则查询所有issue，false则查询当前登录的用户下状态为进行中的issue
			}
		}
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
	onLoad(options) {
		if (options.publish == 'false') this.options.publish = false
	},
	mounted() {
		this.getData()
		this.getProjectManagers()
		uni.$on('updateIssueList', this.getData) // 注册加载数据事件
	},
	destroyed() {
		uni.$off('updateIssueList', this.getData)
	},
	// 触底加载更多
	onReachBottom() {
		this.$refs.contentRef.loadMoreData(this.$refs.headerRef.getFilterOption())
	},
	// 下拉刷新
	async onPullDownRefresh() {
		await this.$refs.contentRef.getData(this.$refs.headerRef.getFilterOption())
		uni.stopPullDownRefresh()
	},
	onNavigationBarButtonTap(e) {
		if (e.index === 0) {
			uni.navigateTo({
				url: '/pages/issue/setting/setting'
			})
		} else if (e.index === 1) {
			uni.navigateTo({
				url: '/pages/issue/add/add'
			})
		}
	}
}
</script>

<style scoped lang="less"></style>
