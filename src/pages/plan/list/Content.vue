<template>
	<view style="padding: 84px 8px 4px 8px">
		<m-skeleton :count="10" :loading="skeletonLoading">
			<view
				class="relative my-2 p-2 flex items-center rounded-md bg-white m-elevation-1"
				v-for="(item, index) in listDatas"
				:key="index"
				@click="skipDetailPage(item)">
				<image
					:src="siteUrl + '/' + item.plan.previewimg"
					class="rounded-md"
					mode="aspectFill"
					style="width: 64px; height: 64px" />
				<view class="flex-1 w-0 flex flex-col ml-2">
					<view class="text-ellipsis w-full">
						<text class="text-sm text-base font-bold">{{ item.name }}</text>
					</view>
					<text class="text-xs text-info mt-1" selectable>项目名称: {{ item.project.name }}</text>
					<text class="text-xs text-info" selectable>编码: {{ item.code }}</text>
					<text class="text-xs text-info">负责人: {{ item.plan.plan_charger_name }}</text>
					<text class="text-xs text-info">计划时间: {{ item.plan.start_date }} ~ {{ item.plan.end_date }}</text>
					<text class="text-xs text-info">计划进度: {{ $filter.percentFilter(item.plan.progress) }}</text>
					<view class="flex mt-1">
						<view @click.stop="skipGanttPage(item)">
							<uni-tag width="50px" text="甘特图" inverted size="small" type="primary" />
						</view>
						<view class="ml-2" @click.stop="skipGanttPage(item)">
							<uni-tag width="50px" text="ISSUE" inverted size="small" type="primary" />
						</view>
						<view class="ml-2" @click.stop="skipAuditPage(item)">
              <uni-tag v-if="item.isComplete == 1" text="已完结" size="small" type="success" inverted></uni-tag>
              <uni-tag v-else-if="item.state == 0" text="已驳回" size="small" type="error" inverted></uni-tag>
              <uni-tag v-else-if="item.state == 1" text="进行中" size="small" type="primary" inverted></uni-tag>
              <uni-tag v-else-if="item.state == 2" text="待审核" size="small" type="default" inverted></uni-tag>
              <uni-tag v-else-if="item.state == 3" text="待批准" size="small" type="default" inverted></uni-tag>
              <uni-tag v-else-if="item.state == 4" text="制定中" size="small" type="default" inverted></uni-tag>
              <uni-tag v-else-if="item.state == 5" text="已暂停" size="small" type="default" inverted></uni-tag>
              <uni-tag v-else-if="item.state == 6" text="已完结" size="small" type="success" inverted></uni-tag>
              <uni-tag v-else-if="item.state == 8" text="已关闭" size="small" type="warning" inverted></uni-tag>
              <uni-tag v-else-if="item.state == 9" text="待复核" size="small" type="default" inverted></uni-tag>
						</view>
					</view>
				</view>
			</view>
		</m-skeleton>
		<u-loadmore v-show="loadmoreStatus == 'nomore' || listDatas.length > 0" :status="loadmoreStatus" />
	</view>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/store/user'

export default {
	data() {
		return {
			listDatas: [], // 列表数据
			skeletonLoading: false, // 骨架屏loading
			loadmoreStatus: 'loadmore', // loadmore组件的加载状态 loadmore、loading、nomore
			page: 1, // 数据第几页，页面滚动到底部时会自增，搜索时会重置(该接口数据请求越多需要执行的时间越长)
			num: 10
		}
	},
	computed: {
		...mapState(useUserStore, ['userLoginInfo', 'siteUrl'])
	},
	methods: {
		/**
		 * 获取数据（第一次加载、下拉刷新、添加过滤条件）
		 */
		async getData(filterOption = {}, resetPage = false) {
			if (resetPage) this.page = 1
			return new Promise(reslove => {
				this.skeletonLoading = true
				request
					.siteGet('/?m=api&c=plan&a=plist', {
						uid: this.userLoginInfo.uid,
						page: 1, // 固定页数
						num: this.num * this.page, // 请求的数量需要 * 当前页
						...filterOption
					})
					.then(res => {
						if (res.rcode == 0) {
							this.listDatas = res.data.datalist
							if (this.listDatas.length >= Number(res.data.total)) this.loadmoreStatus = 'nomore'
							else this.loadmoreStatus = 'loadmore'
						} else {
							this.loadmoreStatus = 'nomore'
						}
					})
					.finally(() => {
						this.skeletonLoading = false
						uni.pageScrollTo({
							scrollTop: 0,
							duration: 0
						})
						reslove(true)
					})
			})
		},
		// 加载更多数据
		loadMoreData(filterOption = {}) {
			if (this.loadmoreStatus != 'loadmore' || this.skeletonLoading) return
			this.loadmoreStatus = 'loading'
			this.page++
			request
				.siteGet('/?m=api&c=project&a=plist', {
					uid: this.userLoginInfo.uid,
					page: this.page,
					num: this.num,
					...filterOption
				})
				.then(res => {
					if (res.rcode == 0) {
						this.listDatas = this.listDatas.concat(res.data.datalist)
						if (this.listDatas.length >= res.data.total) this.loadmoreStatus = 'nomore'
						else this.loadmoreStatus = 'loadmore'
					} else {
						this.loadmoreStatus = 'nomore'
					}
				})
		},
		reset() {},
		skipDetailPage(item) {
			uni.navigateTo({
				url: `/pages/plan/detail/detail?code=${item.code}&projectcode=${item.project.code}`
			})
		},
		skipGanttPage(item) {
			uni.navigateTo({
				url: '/pages/plan/gantt/gantt?code=' + item.code
			})
		},
		skipAuditPage(data) {
			uni.navigateTo({
				url: `/pages/project/audit/audit?name=${data.name}&code=${data.code}`
			})
		}
	}
}
</script>
