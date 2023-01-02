<template>
	<view class="p-2">
		<view class="mt-2 mb-4">
			<text class="font-bold text-sm">项目名字：{{ options.name }}</text>
		</view>

		<view v-for="item in dataList" :key="item.id" class="flex items-center py-2 px-4 mt-2 rounded-md bg-white">
			<image :src="item.face" class="rounded-md" mode="aspectFill" style="width: 40px; height: 40px" />
			<view class="flex-1 flex flex-col px-2">
				<view class="flex items-center justify-between">
					<view>
						<text class="text-xs text-black-2">审批人员： {{ item.username }}</text>
					</view>
					<view>
						<text class="text-xs font-bold">{{ item.operation }}</text>
					</view>
				</view>
				<view>
					<text class="text-xs text-black-2">审批时间：{{ item.regtime }}</text>
				</view>
				<view>
					<text class="text-xs text-black-2">审批意见：</text>
					<text class="text-xs">无</text>
				</view>
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
			options: {},
			dataList: []
		}
	},
	computed:{
    ...mapState(useUserStore, ['userLoginInfo'])
  },
	onLoad(options) {
		this.options = options
		request
			.siteGet('/?m=api&c=log&a=plist', {
				uid: this.userLoginInfo.uid,
				code: this.options.code
			})
			.then(res => {
				console.log(res)
				if (res.rcode == 0) {
					this.dataList = res.data
				}
			})
	}
}
</script>

<style lang="scss"></style>
