<template>
	<view>
		<Header ref="headerRef" @getData="searchData" />
		<view style="padding-top: 84px;"> <Content :options="options" ref="contentRef" /> </view>
	</view>
</template>

<script>
// pages/project/plan/list/list是某个项目所包含的计划，pages/plan/list/list是用户拥有的计划
import { request } from '@/utils/request.js'
import Header from './Header.vue'
import Content from './Content.vue'
export default {
	components: {
		Header,
		Content
	},
	data() {
		return {
			options: {
				isSelected: false,
				projectcode: ''
			}
		}
	},
	methods: {
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
		this.options = options
		if (this.options.isSelected) {
      this.$nextTick(()=>{
        uni.setNavigationBarTitle({
          title: '选择计划'
        })
      })
		} else {
      this.$nextTick(()=>{
        uni.setNavigationBarTitle({
          title: '项目计划'
        })
      })
		}
	},
	// 初始化数据和加载所有项目经理
	mounted() {
		this.getData()
		this.$store.dispatch('getAllProjectManager')
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
