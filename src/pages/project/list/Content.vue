<template>
	<view style="padding: 84px 8px 4px 8px">
		<m-skeleton :count="10" :loading="skeletonLoading">
			<view
				class="relative my-2 p-2 flex items-center rounded-md bg-white m-elevation-1"
				v-for="(item, index) in listDatas"
				:key="index"
				@click="skipDetailPage(item)">
				<image
					:src="siteUrl + '/' + item.previewimg"
					class="rounded-md"
					mode="aspectFill"
					style="width: 64px; height: 64px" />
				<view class="flex-1 min-w-0 flex flex-col ml-2">
					<text class="text-ellipsis w-full text-sm text-base font-bold">
						{{ item.name }}
					</text>
					<text class="text-xs text-info mt-1" selectable>编码: {{ item.code }}</text>
					<text class="text-xs text-info">项目经理: {{ item.charger }}</text>
					<text class="text-xs text-info">创建日期: {{ item.start_date }}</text>
				</view>
				<view class="absolute bottom-1 right-1" @click.stop="skipAuditPage(item)">
					<m-tag v-if="item.isComplete == 1" text="完结" plain size="mini" type="success"></m-tag>
					<m-tag v-else-if="item.state == 0" text="已驳回" plain size="mini" type="error"></m-tag>
					<m-tag v-else-if="item.state == 1" text="进行中" plain size="mini" type="primary"></m-tag>
					<m-tag v-else-if="item.state == 2" text="待审核" plain size="mini" type="info"></m-tag>
					<m-tag v-else-if="item.state == 3" text="待批准" plain size="mini" type="info"></m-tag>
					<m-tag v-else-if="item.state == 4" text="制定中" plain size="mini" type="info"></m-tag>
					<m-tag v-else-if="item.state == 5" text="已暂停" plain size="mini" type="info"></m-tag>
					<m-tag v-else-if="item.state == 6" text="已完结" plain size="mini" type="success"></m-tag>
					<m-tag v-else-if="item.state == 8" text="已关闭" plain size="mini" type="warning"></m-tag>
					<m-tag v-else-if="item.state == 9" text="待复核" plain size="mini" type="info"></m-tag>
				</view>
			</view>
		</m-skeleton>
		<u-loadmore :status="loadmoreStatus" />
	</view>
</template>

<script>
import qs from 'qs'
import { mapState } from 'pinia'
import { useUserStore } from '@/store/user'
export default {
	props: ['options'],
	data() {
		return {
			listDatas: [], // 列表数据
			skeletonLoading: false, // 骨架屏loading
			loadmoreStatus: 'loadmore', // loadmore组件的加载状态 loadmore、loading、nomore
			page: 1, // 数据第几页，页面滚动到底部时会自增，搜索时会重置(该接口数据请求越多需要执行的时间越长)
			num: 20
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
				const state = qs.stringify({ state: filterOption.state }, { arrayFormat: 'brackets' })
				console.log(state)
				delete filterOption.state
				request
					.siteGet('/?m=api&c=project&a=plist&' + state, {
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
			if (this.loadmoreStatus == 'nomore' || this.skeletonLoading) return
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
			if (this.options.isSelected) {
				uni.$emit('setProject', item)
				uni.navigateBack()
			} else {
				uni.navigateTo({
					url: `/pages/project/detail/detail?id=${item.id}&name=${item.name}&code=${item.code}`
				})
			}
		},
		skipAuditPage(data) {
			uni.navigateTo({
				url: `/pages/project/audit/audit?name=${data.name}&code=${data.code}`
			})
		}
	}
}
</script>

<style scoped lang="scss"></style>
