<template>
	<view class="w-screen h-screen relative">
		<view class="w-full flex justify-center items-center" style="height: 200px">
			<image style="width: 160px; height: 90px" src="/static/images/logo.png" />
		</view>
		<view class="p-4">
			<view class="px-4 py-6 bg-white rounded-md">
				<view class="flex items-center" style="height: 50px">
					<view style="width: 65px">手机号:</view>
					<view>
						<input class="bg-white" type="number" placeholder="请输入手机号" />
					</view>
				</view>
				<view class="flex items-center relative" style="height: 50px">
					<view style="width: 65px">验证码:</view>
					<input class="bg-white" type="number" placeholder="请输入4位数验证码" />
					<view
						class="absolute right-0 text-xs bg-success text-white rounded-sm m-scale-85"
						style="padding: 6px"
						@click="getCode">
						{{ codeCountDown === 0 ? '获取验证码' : `再次发送${codeCountDown}` }}
					</view>
				</view>
				<view
					class="mt-4 w-full flex-center mx-auto font-bold bg-primary text-white rounded-sm m-scale-95"
					style="height: 40px">
					登&nbsp;&nbsp;&nbsp;&nbsp;录
				</view>
				<view class="w-full mt-8">
					<view class="m-divider">
						<view class="m-divider-left"></view>
						<text class="m-divider-text">其他登录</text>
						<view class="m-divider-right"></view>
					</view>
					<view class="mt-5 w-full flex justify-center">
						<image class="m-scale-85" style="width: 40px; height: 40px" src="/static/images/weixin.png" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { ref, reactive } from 'vue'
import { verifyPhone } from '@/utils/commons'

let userStore = useUserStore()
const formData = reactive({
	phoneNumber: '',
	code: ''
})
const codeCountDown = ref(0)

function getCode() {
	if (codeCountDown.value > 0) return
	if (verifyPhone(formData.phoneNumber)) {
		uni.showLoading({
			mask: true,
			title: '正在发送验证码'
		})
		request
			.get('/?m=api&c=sms&a=send_login_code', {
				mobile: formData.phoneNumber,
				token: 'Jg6uH5ZAkksqaFco'
			})
			.then(res => {
				uni.hideLoading()
				if (res.rcode == 0) {
					uni.showToast({
						title: '验证码已发送'
					})
					codeCountDown.value = 60
					const interval = setInterval(() => {
						codeCountDown.value--
						if (codeCountDown.value == 0) clearInterval(interval)
					}, 1000)
				} else {
					uni.showToast({
						icon: 'error',
						title: '验证码发送失败'
					})
				}
			})
			.catch(() => {
				uni.hideLoading()
			})
	} else {
		uni.showToast({
			icon: 'error',
			title: '手机号无效'
		})
	}
}

function submit() {
	if (!verifyPhone(formData.phoneNumber)) {
		uni.showToast({
			icon: 'error',
			title: '手机号无效'
		})
		return
	}
	if (formData.code.length !== 4) {
		uni.showToast({
			icon: 'error',
			title: '验证码无效'
		})
		return
	}
	uni.showLoading({
		mask: true,
		title: '正在登录'
	})
	request
		.post('/?m=api&c=user&a=smslogin', {
			mobile: formData.phoneNumber,
			code: formData.code,
			// #ifdef APP
			cid: plus.push.getClientInfo().clientid
			// #endif
		})
		.then(res => {
			uni.hideLoading()
			if (res.rcode == 0) {
				uni.showToast({
					title: '登录成功',
					duration: 2000
				})
				this.$store.commit('setUserInfo', res.data)
				this.$store.dispatch('getHasCompanys')
				uni.reLaunch({
					url: '/tabbar/home/home'
				})
			} else {
				uni.showToast({
					icon: 'error',
					title: '登录失败'
				})
			}
		})
		.catch(() => {
			uni.hideLoading()
		})
}

onShow(() => {
	// 微信小程序隐藏跳转首页图标
	// #ifdef MP-WEIXIN
	uni.hideHomeButton()
	// #endif
})
</script>

<style scoped lang="scss">
.m-divider {
	width: 100%;
	height: 24px;
	display: flex;
	align-items: center;

	.m-divider-left,
	.m-divider-right {
		flex: 1;
		border-bottom: 1px solid #ccc;
	}

	.m-divider-text {
		margin: 0 8px;
	}
}
</style>
