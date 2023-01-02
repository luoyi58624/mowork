<template>
	<view class="p-2">
		<view class="p-2 bg-white rounded-md m-elevation-1">
			<view class="flex items-center" style="height: 56px">
				<image
					v-if="userInfo.face != null && userInfo.face !== ''"
					:src="siteUrl + '/' + userInfo.face"
					class="rounded-md"
					mode="aspectFill"
					style="width: 48px; height: 48px" />
				<view class="ml-2"> {{ userInfo.user }}</view>
			</view>
			<u-cell-group :border="false">
				<u-cell title="手机" :value="userInfo.mobile" :border="false"></u-cell>
				<u-cell title="邮箱" :value="userInfo.email" :border="false"></u-cell>
			</u-cell-group>
		</view>
		<!-- <view class="p-4"> <u-button type="primary">发消息</u-button> </view> -->
	</view>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/store/user'

export default {
	data() {
		return {
			options: {
				userId: ''
			},
			userInfo: {}
		}
	},
	computed: {
		...mapState(useUserStore, ['userLoginInfo', 'siteUrl'])
	},
	methods: {
		getData() {
			request
				.siteGet('/?m=api&c=manager&a=pinfo', {
					uid: this.userLoginInfo.uid,
					ruid: this.options.userId
				})
				.then(res => {
					if (res.rcode == 0) {
						this.userInfo = res.data
					}
				})
		}
	},
	onLoad(options) {
		this.options.userId = options.userId
		this.getData()
	}
}
</script>

<style lang="scss"></style>
