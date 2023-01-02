<template>
	<view class="p-2">
		<m-skeleton :count="10" :loading="skeletonLoading">
			<view
				class="relative mb-2 p-2 flex items-center rounded-md bg-white m-elevation-1"
				v-for="(item, index) in listDatas"
				:key="index"
				@click="skipDetailPage(item)">
				<image
					:src="siteUrl + '/' + item.previewimg"
					class="rounded-md"
					mode="aspectFill"
					style="width: 64px; height: 64px" />
				<view class="flex-1 w-0 flex flex-col ml-2">
					<text class="text-ellipsis w-full text-sm text-base font-bold">
            {{ item.name || '无' }}
					</text>
					<text class="text-xs text-info mt-1" selectable>编码: {{ item.code }}</text>
					<text class="text-xs text-info" selectable>负责人: {{ item.charger.name }}</text>
					<text class="text-xs text-info">计划时间: {{ item.start_date }} ~ {{ item.end_date }}</text>
					<text class="text-xs text-info">计划进度: {{ item.progross }}</text>
				</view>
				<view class="absolute bottom-1 right-1" @click.stop="skipGanttPage(item)">
						<uni-tag text="甘特图" size="small" type="primary" inverted />
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
	props: {
		options: {
			type: Object,
			default: () => {
				return {
					isSelected: false,
					projectcode: ''
				}
			}
		}
	},
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
		...mapState(useUserStore, ['siteUrl'])
	},
	methods: {
		async getData() {
			this.page = 1
			return new Promise(reslove => {
				this.skeletonLoading = true
				request
					.siteGet('/?m=api&c=plan&a=plistbyprojectcode', {
						projectcode: this.options.projectcode,
						page: 1, // 固定页数
						num: this.num * this.page
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
						this.$nextTick(() => {
							this.$emit('finish')
						})
						reslove(true)
					})
			})
		},
		// 加载更多数据
		loadMoreData() {
			if (this.loadmoreStatus != 'loadmore') return
			this.loadmoreStatus = 'loading'
			this.page++
			request
				.siteGet('/?m=api&c=plan&a=plistbyprojectcode', {
					projectcode: this.options.projectcode,
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
				.finally(() => {
					this.$nextTick(() => {
						this.$emit('finish')
					})
				})
		},
		reset() {},
		skipDetailPage(item) {
			if (this.options.isSelected) {
				uni.$emit('setPlan', item)
				uni.navigateBack()
			} else {
				uni.navigateTo({
					url: `/pages/plan/detail/detail?code=${item.code}&projectcode=${this.options.projectcode}`
				})
			}
		},
		skipGanttPage(item) {
			uni.navigateTo({
				url: '/pages/plan/gantt/gantt?code=' + item.code
			})
		}
	}
}
</script>

<style scoped lang="scss"></style>
