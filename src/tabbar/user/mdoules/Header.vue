<template>
	<view class="w-full">
		<view class="w-full bg-primary flex justify-between px-2" style="height: 80px">
			<view class="flex items-center">
				<view>
					<uni-icons
						type="contact-filled"
						size="64"
						color="var(--color-white)"
						@click="skipPage('/pages/user/detail/detail')"></uni-icons>
				</view>
				<view class="ml-1">
					<view v-if="userStore.isLogin">
						<text class="text-sm">{{ userStore.userLoginInfo.user }}</text>
						<text class="text-xs ml-1"> - 员工</text>
					</view>
					<view v-else class="text-sm">未登录</view>
					<view v-if="userStore.isSelectedCompany" class="flex flex-col">
						<view class="mt-1 text-xs">{{ userStore.companyInfo.name }}</view>
						<view class="mt-1 text-xs">部门：MoWork开发组</view>
					</view>
					<view v-else class="mt-1 text-xs">未加入公司</view>
				</view>
			</view>
			 <uni-icons type="gear" size="28" color="var(--color-white)" class="mt-4 mr-1"></uni-icons>
		</view>
		<view class="w-full relative" style="height: 75px">
			<view class="w-full bg-primary" style="height: 50px; border-radius: 0 0 50% 50%"></view>
			<view class="w-full h-full px-2 absolute top-0">
				<view class="w-full h-full flex items-center bg-white m-elevation-1 rounded-md">
					<view class="flex flex-col items-center flex-1 m-scale-85">
						<uni-icons type="chat" size="28" color="var(--color-black-3)"></uni-icons>
						<text class="font-bold text-xs text-black-3">消息</text>
					</view>
					<view class="flex flex-col items-center flex-1 m-scale-85">
						<uni-icons type="map-pin-ellipse" size="28" color="var(--color-black-3)"></uni-icons>
						<text class="font-bold text-xs text-black-3">足迹</text>
					</view>
					<view class="flex flex-col items-center flex-1 m-scale-85">
						<uni-icons type="hand-up" size="28" color="var(--color-black-3)"></uni-icons>
						<text class="font-bold text-xs text-black-3">我的赞</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
const userStore = useUserStore()

function skipPage(url) {
	uni.navigateTo({
		url,
		animationType: 'zoom-fade-out',
		animationDuration: 300
	})
}
</script>

<style></style>
