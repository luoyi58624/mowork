<template>
	<view>
		<view class="bg-white">
			<u-cell-group :border="false">
				<u-cell title="头像" :isLink="true">
					<image
						slot="value"
						v-if="userInfo.face != ''"
						:src="userInfo.face"
						class="rounded-md"
						mode="aspectFill"
						style="width: 20px; height: 20px" />
				</u-cell>
				<u-cell title="姓名" :value="userInfo.user" :isLink="true"></u-cell>
				<u-cell title="性别" :value="$filter.sexFilter(userInfo.sex)" :isLink="true"></u-cell>
			</u-cell-group>
		</view>

		<view class="mt-2 bg-white">
			<u-cell-group :border="false">
				<u-cell title="手机号码" :value="userInfo.mobile" :isLink="true"></u-cell>
				<u-cell title="邮箱" :value="userInfo.email" :isLink="true"></u-cell>
			</u-cell-group>
		</view>

		<view class="mt-2 bg-white">
			<u-cell-group :border="false">
				<u-cell title="所属企业" :value="companyInfo.name || '未加入企业'"></u-cell>
				<u-cell title="所属部门" :value="depInfo.organization"></u-cell>
				<u-cell title="所属职位" :value="depInfo.role"></u-cell>
				<u-cell title="企业邮箱" :value="depInfo.email"></u-cell>
			</u-cell-group>
		</view>

		<view class="p-4">
			<u-button type="error" @tap="execLogout()">退出登录</u-button>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '@/store/user'

export default {
	data() {
		return {
			options: {
				userId: ''
			},
			userInfo: {},
			depInfo: {}
		}
	},
	computed: {
		...mapState(useUserStore, ['userLoginInfo','companyInfo'])
	},
	methods: {
		...mapActions(useUserStore, ['logout']),
		getData() {
			request
				.get('/?m=api&c=user&a=pinfo', {
					token: this.userLoginInfo.token,
					uid: this.userLoginInfo.uid
				})
				.then(res => {
					if (res.rcode == 0) {
						this.userInfo = res.data
					}
				})

			request
				.get(
					'/?m=api&c=user&a=myrole',
					{
						uid: this.userLoginInfo.uid
					},
					true
				)
				.then(res => {
					if (res.rcode == 0) {
						this.depInfo = res.data
					}
				})
		},
		execLogout() {
			uni.showModal({
				title: '提示',
				content: '你确定要退出吗？',
				cancelText: '取消',
				confirmText: '确认',
				success: res => {
					if (res.confirm) {
						this.logout()
					}
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
