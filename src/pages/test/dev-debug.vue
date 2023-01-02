<template>
	<view>
		<view class="p-2 font-black">基础信息</view>
		<u-cell title="运行环境" :value="runEnv"></u-cell>
		<u-cell title="服务器环境" :value="appStore.serverUrl"></u-cell>

		<view class="mt-2 p-2 font-black">用户登录信息</view>
		<u-cell title="用户名" :value="userStore.userLoginInfo.user"></u-cell>
		<u-cell title="uid" :value="userStore.userLoginInfo.uid"></u-cell>
		<u-cell title="用户token">
			<template #value>
				<uni-tooltip :content="userStore.userLoginInfo.token">
					<view class="text-ellipsis text-sm" style="width: 200px; color: #606266"
						>{{ userStore.userLoginInfo.token }}
					</view>
				</uni-tooltip>
			</template>
		</u-cell>
		<u-cell title="站点token">
			<template #value>
				<uni-tooltip v-if="userStore.userLoginInfo.siteToken" :content="userStore.userLoginInfo.siteToken">
					<view class="text-ellipsis text-sm" style="width: 200px; color: #606266"
						>{{ userStore.userLoginInfo.siteToken }}
					</view>
				</uni-tooltip>
				<view v-else class="">无</view>
			</template>
		</u-cell>
		<u-cell title="公司数量" :value="userStore.userLoginInfo.company"></u-cell>
		<u-cell title="已选公司" :value="userStore.companyInfo.name || '无'"></u-cell>
		<view class="p-2">
			<u-button class="mt-2" type="error" @click="clearCompanyInfo">删除公司信息</u-button>
		</view>
	</view>
</template>

<script setup lang="ts">
let appStore = useAppStore()
let userStore = useUserStore()
const runEnv = import.meta.env.MODE

function clearCompanyInfo() {
	userStore.companyInfo = {} as any
	uni.removeStorageSync(StorageKey.COMPANY_INFO)
}
</script>

<style scoped lang="scss"></style>
