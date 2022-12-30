<template>
	<view>
		<view class="mt-2 bg-white rounded-md m-elevation-1">
			<u-cell-group :border="false">
				<u-cell title="公司同事" isLink @click="skipPage('/pages/user/company-users/company-users')"></u-cell>
			</u-cell-group>
		</view>
		<view class="mt-2 bg-white rounded-md m-elevation-1">
			<u-cell-group :border="false">
				<u-cell title="关于MoWork" isLink></u-cell>
				<u-cell title="意见反馈" isLink></u-cell>
				<u-cell title="软件更新" value="1.0.0" isLink :border="false"></u-cell>
			</u-cell-group>
		</view>
		<view class="mt-2 bg-white rounded-md m-elevation-1">
			<u-cell-group :border="false">
				<u-cell title="测试页面" isLink :border="false" @click="skipPage('/pages/dev-debug')"></u-cell>
			</u-cell-group>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isDev: process.env.NODE_ENV === 'development'
		}
	},
	methods: {
		skipPage(url) {
			uni.navigateTo({
				url
			})
		}
	}
}
</script>

<style scoped lang="less"></style>
