<template>
	<view style="padding: 84px 8px 4px 8px">
		<m-skeleton :count="10" :loading="skeletonLoading">
			<view
				class="list-item relative my-2 p-2 flex items-center rounded-md bg-white m-elevation-1"
				v-for="(item, index) in listDatas"
				:key="index"
				@click="skipDetailPage(item)">
				<image
					:src="siteUrl + '/' + item.plannode.previewimg"
					class="rounded-md"
					mode="aspectFill"
					style="width: 64px; height: 64px" />
				<view class="flex-1 w-0 flex flex-col ml-2">
					<view class="text-ellipsis w-full">
						<text class="text-sm text-base font-bold">{{ item.plannode.taskname }}</text>
					</view>
					<text class="text-xs text-info mt-1"> 计划时间: {{ item.plannode.start_date }} ~ {{ item.end_date }}</text>
					<text class="text-xs text-info">实际开始: {{ item.plannode.real_sdate }}</text>
					<text class="text-xs text-info">完成情况: {{ item.plannode.completion }}</text>
					<view class="flex mt-1">
						<view class="mr-2">
							<uni-tag v-if="item.state == 1" width="50px" text="进行中" size="small" type="primary"></uni-tag>
							<uni-tag v-else-if="item.state == 6" width="50px" text="已完成" size="small" type="success"></uni-tag>
							<uni-tag v-else-if="item.state == 7" width="50px" text="已延期" size="small" type="warning"></uni-tag>
						</view>
						<uni-tag width="60px" text="节点任务" inverted size="small" type="primary"></uni-tag>
						<view class="ml-2">
							<uni-tag v-if="item.is_receive == 1" width="50px" text="已接受" size="small" type="success"></uni-tag>
							<uni-tag
								v-else-if="item.is_receive == 2"
								width="50px"
								text="不接受"
								size="small"
								type="warning"></uni-tag>
							<uni-tag
								v-else-if="item.is_receive == 0"
								width="50px"
								text="待处理"
								size="small"
								type="default"></uni-tag>
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
					.siteGet('/?m=api&c=task&a=plist', {
						uid: this.userLoginInfo.uid,
						page: 1, // 固定页数
						num: this.num * this.page, // 请求的数量需要 * 当前页
						...filterOption
					})
					.then(res => {
						if (res.rcode == 0) {
							this.listDatas = res.data.datalist
							if (this.listDatas.length >= res.data.total) this.loadmoreStatus = 'nomore'
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
				.siteGet('/?m=api&c=task&a=plist', {
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
				url: `/pages/task/detail/detail?id=${item.id}`
			})
		}
	}
}
</script>
