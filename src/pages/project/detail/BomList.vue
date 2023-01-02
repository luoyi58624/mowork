<template>
	<view class="p-2">
		<m-skeleton :count="10" :loading="skeletonLoading">
			<view
				class="mb-2 p-2 flex items-center rounded-md bg-white m-elevation-1 m-scale-95"
				v-for="(item, index) in listDatas"
				:key="index"
				@click="skipPage(item)">
				<image
					:src="siteUrl + '/' + item.previewimg"
					class="rounded-md"
					mode="aspectFill"
					style="width: 64px; height: 64px" />
				<view class="flex-1 w-0 flex flex-col ml-2">
					<view class="text-ellipsis w-full">
						<text class="text-sm text-base font-bold">{{ item.name }}</text>
					</view>
					<text class="text-xs text-info mt-1" selectable>编码: {{ item.bomcode }}</text>
					<text class="text-xs text-info">类别: {{ item.type }}</text>
					<text class="text-xs text-info">数量: {{ item.num }}</text>
				</view>
			</view>
		</m-skeleton>
		<u-loadmore v-show="loadmoreStatus == 'nomore' || listDatas.length > 0" :status="loadmoreStatus" />
	</view>
</template>

<script lang="ts">
import { mapState } from 'pinia'
import { useUserStore } from '@/store/user'

export default {
	props: ['projectcode'],
	data() {
		return {
			listDatas: [],
			skeletonLoading: false, // 骨架屏loading
			loadmoreStatus: 'loadmore', // loadmore组件的加载状态 loadmore、loading、nomore
			page: 1,
			num: 10
		}
	},
	computed: {
		...mapState(useUserStore, ['userLoginInfo', 'siteUrl'])
	},
	methods: {
		async getData(projectcode) {
			this.page = 1
			return new Promise(reslove => {
				this.skeletonLoading = true
				request
					.siteGet('/?m=api&c=project&a=bomlist', {
						code: projectcode,
						page: 1, // 固定页数
						num: this.num * this.page
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
		loadMoreData(projectcode) {
			if (this.loadmoreStatus != 'loadmore' || this.skeletonLoading) return
			this.loadmoreStatus = 'loading'
			this.page++
			request
				.siteGet('/?m=api&c=project&a=bomlist', {
					code: projectcode,
					page: this.page,
					num: this.num
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
		skipPage(item) {
			uni.navigateTo({
				url: `/pages/bom/detail/detail?bomId=${item.id}&projectcode=${this.projectcode}`
			})
		}
	}
}
</script>

<style scoped lang="scss"></style>
