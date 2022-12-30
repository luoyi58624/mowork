<template>
	<view class="w-screen h-screen">
		<view class="flex justify-center items-center" style="width: 100%; height: 200px">
			<image style="width: 160px; height: 90px" src="/static/images/logo.png" />
		</view>
		<view class="p-4">
			<u-form ref="formRef" :model="loginInfo" labelPosition="left" label-width="65">
				<u-form-item label="手机号" prop="mobile" borderBottom>
					<u-input v-model="loginInfo.mobile" type="number" border="none" placeholder="请输入手机号" clearable />
				</u-form-item>
				<u-form-item label="验证码" prop="code" borderBottom>
					<u-input v-model="loginInfo.code" type="number" maxlength="4" border="none" placeholder="请填写验证码" />
					<u-button
						class="w-auto"
						slot="right"
						type="success"
						size="small"
						:text="tips"
						:disabled="disabledSendCode"
						@tap="getCode()" />
				</u-form-item>
			</u-form>
			<u-button type="primary" class="mt-5" @click="submit">登录</u-button>

			<view class="mt-10">
				<u-divider :dashed="true" text="其他登录" lineColor="var(--color-white-3)" />
				<view class="mt-5 w-full flex justify-center">
					<image style="width: 40px; height: 40px" src="/static/images/weixin.png" />
				</view>
			</view>

			<u-code
				ref="codeRef"
				@change="codeChange"
				seconds="60"
				@start="disabledSendCode = true"
				@end="disabledSendCode = false"></u-code>
		</view>
	</view>
</template>

<script setup lang="ts">
import { reactive, ref, unref } from 'vue'
import { onReady, onShow } from '@dcloudio/uni-app'

const userStore = useUserStore()
const loginInfo = reactive({
	mobile: '',
	code: ''
})

const formRef = ref()
const codeRef = ref()
const tips = ref('')
const disabledSendCode = ref(false)
const rules = {
	mobile: [
		{
			required: true,
			message: '请输入手机号',
			trigger: ['blur']
		},
		{
			// 自定义验证函数，见上说明
			validator: (rule, value) => {
				return verifyPhone(value)
			},
			message: '手机号码不正确',
			// 触发器可以同时用blur和change
			trigger: ['blur']
		}
	],
	code: {
		type: 'string',
		required: true,
		len: 4,
		message: '请填写4位数验证码',
		trigger: ['blur']
	}
}

function submit() {
	unref(formRef)
		.validate()
		.then(res => {
			if (res) {
				uni.showLoading({
					mask: true,
					title: '正在登录'
				})
				request
					.post('/?m=api&c=user&a=smslogin', {
						mobile: loginInfo.mobile,
						// #ifdef APP
						cid: plus.push.getClientInfo().clientid,
						// #endif
						code: loginInfo.code
					})
					.then(res => {
						uni.hideLoading()
						if (res.rcode == 0) {
							uni.showToast({
								title: '登录成功',
								duration: 2000
							})
							userStore.setUserLoginInfo(res.data)
							userStore.getHasCompanys()
							uni.reLaunch({
								url: '/tabbar/home/home'
							})
						} else {
							uni.showToast({
								icon: 'error',
								title: res.msg
							})
						}
					})
					.catch(() => {
						uni.hideLoading()
					})
			}
		})
}

function getCode() {
	if (verifyPhone(loginInfo.mobile)) {
		uni.showLoading({
			mask: true,
			title: '正在获取验证码'
		})
		if (unref(codeRef).canGetCode) {
			request
				.get('/?m=api&c=sms&a=send_login_code', {
					mobile: loginInfo.mobile,
					token: 'Jg6uH5ZAkksqaFco'
				})
				.then(res => {
					uni.hideLoading()
					if (res.rcode == 0) {
						uni.showToast({
							title: '验证码已发送'
						})
						unref(codeRef).start()
					} else {
						uni.showToast({
							icon: 'error',
							title: '验证码发送失败'
						})
					}
				})
		}
	} else {
		uni.showToast({
			icon: 'error',
			title: '手机号无效'
		})
	}
}

function codeChange(text) {
	tips.value = text
}

onReady(() => {
	unref(formRef).setRules(rules)
})

onShow(() => {
	// 微信小程序隐藏跳转首页图标
	// #ifdef MP-WEIXIN
	uni.hideHomeButton()
	// #endif
})
</script>

<style scoped lang="scss"></style>
