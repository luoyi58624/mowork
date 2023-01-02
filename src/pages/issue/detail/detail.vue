<template>
	<m-tabs-swiper v-model="tabIndex" :tabs="tabs">
		<template #swiper1>
			<scroll-view class="h-full" scroll-y>
				<BaseInfo ref="baseInfoRef" :data="data"></BaseInfo>
			</scroll-view>
		</template>
		<template #swiper2>
			<scroll-view class="h-full" scroll-y>
				<FinishInfo ref="finishInfoRef" :data="data"></FinishInfo>
			</scroll-view>
		</template>
	</m-tabs-swiper>
</template>

<script>
import BaseInfo from './BaseInfo.vue'
import FinishInfo from './FinishInfo.vue'
import { mapState } from 'pinia'
import { useUserStore } from '@/store/user'

export default {
	components: { BaseInfo, FinishInfo },
	data() {
		return {
			options: {},
			data: {
				complete_info: {}
			},
			tabIndex: 0,
			tabs: ['ISSUE详情', '完成情况']
		}
	},
  computed: {
    ...mapState(useUserStore, ['userLoginInfo'])
  },
	methods: {
		getData() {
			request
				.siteGet('/?m=api&c=issue&a=detail', {
					uid: this.userLoginInfo.uid,
					id: this.options.id // 任务id
				})
				.then(res => {
					if (res.rcode == 0) {
						this.data = res.data
					}
				})
		}
	},
	onLoad(options) {
		this.options = options
		this.getData()
	}
}
</script>

<style scoped lang="scss"></style>
