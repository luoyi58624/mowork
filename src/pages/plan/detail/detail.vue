<template>
	<view class="p-2">
		<view class="p-2 flex rounded-md bg-white m-elevation-1" style="height: 100px">
			<view class="flex-1 flex flex-col items-center justify-center">
				<view>
					<text class="text-sm text-primary">计划进度</text>
				</view>
				<view class="mt-2">
					<text class="text-lg text-primary">{{ $filter.percentFilter(data.per) }}</text>
				</view>
			</view>
			<view class="flex-1 flex flex-col items-center justify-center">
				<view>
					<text class="text-sm text-success">已完结：{{ data.total_finish }}</text>
				</view>
				<view class="mt-2">
					<text class="text-sm text-warning">剩余节点：{{ data.total_sy }}</text>
				</view>
			</view>
		</view>
		<view class="mt-2 p-2 rounded-md bg-white m-elevation-1">
			<view class="flex justify-between">
				<text class="font-bold">基础信息</text>
				<view class="mr-2" @click="skipGanttPage(data)">
					<uni-tag text="甘特图" size="small" type="primary" inverted />
				</view>
			</view>

			<view class="p-2">
				<view class="my-1 flex justify-between">
					<text class="text-sm">计划名称：</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ data.name }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">计划编码：</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ data.code }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">计划类型：</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ data.middletype == 1 ? '产品开发计划' : '工装开发计划' }}</text>
						<text class="text-sm" selectable v-if="data.type_name !== '产'">-{{ data.type_name }}具</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">数量：</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ data.num }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">开始日期：</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ data.start_date }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">完成日期：</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ data.end_date }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">来源：</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ data.resource_name }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">负责人：</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ data.plan_charger_name }}</text>
					</view>
				</view>
			</view>

			<text class="font-bold">备注</text>
			<view class="p-2 text-indent" v-if="data.field.note && data.field.note != ''">
				<text class="text-sm">{{ data.field.note }}</text>
			</view>
			<view class="p-2" v-else>
				<text class="text-sm">无</text>
			</view>

			<text class="font-bold">附件</text>
			<view class="p-2">
				<text class="text-sm">待实现...</text>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/store/user'

export default {
	data() {
		return {
			data: {
				field: {}
			},
			options: {}
		}
	},
	computed: {
		...mapState(useUserStore, ['userLoginInfo'])
	},
	methods: {
		getData() {
			request
				.siteGet('/?m=api&c=plan&a=plandetail', {
					uid: this.userLoginInfo.uid,
					code: this.options.code,
					projectcode: this.options.projectcode
				})
				.then(res => {
					if (res.rcode == 0) this.data = res.data
				})
		},
		skipGanttPage(item) {
			uni.navigateTo({
				url: '/pages/plan/gantt/gantt?code=' + item.code
			})
		}
	},
	onLoad(options) {
		this.options = options
		this.getData()
	}
}
</script>

<style lang="scss"></style>
