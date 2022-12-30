<template>
	<view>
		<view class="w-screen flex justify-between items-center px-2">
			<m-menu v-model="showMenu" offsetY="38px">
				<view class="flex items-center" :class="{ active: showMenu }" @tap="showMenu = !showMenu">
					<text class="flex items-center font-bold mr-1" v-if="userStore.companyInfo.code == null">请选择公司</text>
					<text class="flex items-center font-bold mr-1" v-else>{{ userStore.companyInfo.name }}</text>
					<m-icon
						:class="['rotate-180', { active: showMenu }]"
						type="arrow-down"
						size="20"
						color="var(--color-white)" />
				</view>
				<template #menu>
					<view class="py-1 bg-white text-black" style="width: 300px">
						<view
							v-for="item in userStore.hasCompanys"
							:key="item.code"
							class="menu-item py-2 px-4 flex items-center justify-between"
							:class="{ actived: userStore.companyInfo.code == item.code }"
							@tap="setHasCompany(item)">
							<text>{{ item.name }}</text>
							<m-icon
								v-if="!item.loading && userStore.companyInfo.code === item.code"
								type="check"
								size="16"
								color="var(--color-primary)" />
							<u-loading-icon v-if="item.loading" size="16"></u-loading-icon>
						</view>
						<view class="py-2 px-4 flex items-center" @tap="showAddCompany()">
							<m-icon type="add" size="16" />
							<text class="ml-1">添加公司</text>
						</view>
					</view>
				</template>
			</m-menu>
			<m-icon type="saomiao" size="24" color="var(--color-white)" @tap="scanCode"></m-icon>
		</view>

		<AddCompany ref="addCmpanyRef" @success="userStore.getHasCompanys()" />
	</view>
</template>

<script setup lang="ts">
import AddCompany from './AddCompany.vue'
import qs from 'qs'
import { ref, unref } from 'vue'

const emits = defineEmits(['load-home-data'])
const userStore = useUserStore()
const addCmpanyRef = ref()
const showMenu = ref(false) // 下拉菜单显示

// 设置已添加的公司
function setHasCompany(item) {
	if (userStore.companyInfo.code === item.code) {
		showMenu.value = false
		return
	}
	item.loading = true
	request
		.get('/?m=api&c=companylib&a=getUserState', {
			uid: userStore.userLoginInfo.uid,
			token: userStore.userLoginInfo.token,
			weburl: item.weburl
		})
		.then(res => {
			if (res.rcode == 0) {
				const state = res.data.state
				userStore.setCompanyInfo(item)
				if (state == 1) {
					let cid // 客户端标识，实现手机消息推送
					// #ifndef APP
					cid = '490712fd5524f0a3ee8215808e1211cf' // 非app平台使用固定的客户端标识，你可以使用你自己的手机cid
					// #endif
					// #ifdef APP
					cid = plus.push.getClientInfo().clientid
					console.log(cid, '手机cid')
					// #endif
					const data = {
						token: userStore.userLoginInfo.token,
						cid
					}
					request
						.sitePost('/?m=api&c=login&a=login&' + qs.stringify(data))
						.then(res => {
							console.log(res, '企业授权')
							if (res.rcode == 0) {
								showMenu.value = false
								userStore.setUserLoginInfo({
									...userStore.userLoginInfo,
									siteToken: res.data.token // 企业站点token
								})
								// 加载首页数据
								emits('load-home-data')
							} else {
								uni.showToast({
									icon: 'error',
									title: '企业授权失败'
								})
							}
						})
						.catch(e => {
							console.log(e, '企业授权错误')
							uni.showToast({
								icon: 'error',
								title: '企业授权错误'
							})
						})
						.finally(() => {
							item.loading = false
						})
				} else {
					item.loading = false
					if (state == 0) {
						uni.showModal({
							title: '提示',
							content: '您的审核不通过，是否重新申请加入该公司？',
							success() {
								showMenu.value = false
								unref(addCmpanyRef).showAddCompany()
							}
						})
					} else if (state == 2) {
						uni.showModal({
							title: '提示',
							content: '您处于待审核状态，请耐心等待管理员处理！',
							showCancel: false
						})
					} else if (state == 3) {
						uni.showModal({
							title: '提示',
							content: '您已离职，是否重新申请加入该公司？',
							success() {
								showMenu.value = false
								unref(addCmpanyRef).showAddCompany()
							}
						})
					} else {
						uni.showToast({
							icon: 'error',
							title: '未知状态'
						})
					}
				}
			} else {
				uni.showToast({
					icon: 'error',
					title: '用户状态异常'
				})
				item.loading = false
			}
		})
		.catch(() => {
			uni.showToast({
				icon: 'error',
				title: '连接失败'
			})
			item.loading = false
		})
}

function showAddCompany() {
	showMenu.value = false
	unref(addCmpanyRef).showAddCompany()
}

function scanCode() {
	// #ifdef H5
	uni.showToast({
		icon: 'error',
		title: '浏览器不支持'
	})
	// #endif

	// #ifndef H5
	uni.scanCode({
		success: res => {
			console.log('条码类型：' + res.scanType)
			console.log('条码内容：' + res.result)
			uni.showLoading({
				title: '请求中...'
			})
			request
				.sitePost('/?m=api&c=user&a=qrcodeLogin', {
					code: res.result,
					uid: userStore.userLoginInfo.uid
				})
				.then(res => {
					uni.hideLoading()
					uni.showToast({
						icon: 'error',
						title: res.msg
					})
				})
				.catch(() => {
					uni.hideLoading()
				})
		}
	})
	// #endif
}
</script>

<style scoped lang="scss">
.menu-item.actived {
	color: var(--color-primary);
}
</style>
