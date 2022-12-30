<template>
	<m-page statusBarBg="var(--color-primary)" navbar-color="#ffffff" :navbar-height="155">
		<template #navbar>
			<Header></Header>
		</template>
		<view>
			<view class="w-full p-2">
				<Statistic />
				<Cell />
			</view>
		</view>
	</m-page>
</template>

<script setup lang="ts">
import Header from './mdoules/Header.vue'
import Statistic from './mdoules/Statistic.vue'
import Cell from './mdoules/Cell.vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'

onPullDownRefresh(() => {
	setTimeout(() => {
		uni.stopPullDownRefresh()
	}, 500)
})
</script>
