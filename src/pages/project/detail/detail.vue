<template>
	<m-tabs-swiper ref="tabsRef" v-model="tabIndex" :tabs="tabs" @init="getData">
		<template #swiper1>
			<ProjectDetail ref="projectDetailRef"></ProjectDetail>
		</template>
		<template #swiper2>
			<BomList ref="partsListRef" :projectcode="options.code"></BomList>
		</template>
				<template #swiper3>
					<PlanList ref="planListRef" :options="{ projectcode: options.code }"></PlanList>
				</template>
	</m-tabs-swiper>
</template>

<script>
import ProjectDetail from './ProjectDetail.vue'
import BomList from './BomList.vue'
import PlanList from '../plan/list/Content.vue'
export default {
	components: {
		ProjectDetail,
		BomList,
		PlanList
	},
	data() {
		return {
			options: {
				id: '', // 项目id
				name: '', // 项目名字
				code: '' // 项目编码
			},
			tabIndex: 0,
			tabs: ['详情', '零部件', '计划']
		}
	},
	methods: {
		getData(index) {
			if (index === 0) {
				this.$nextTick(() => {
					this.$refs.projectDetailRef.getData(this.options.id)
				})
			} else if (index === 1) {
				this.$nextTick(() => {
					this.$refs.partsListRef.getData()
				})
			} else if (index === 2) {
				this.$nextTick(() => {
					this.$refs.planListRef.getData()
				})
			}
		}
	},
	onLoad(options) {
		this.options = options
		this.$nextTick(() => {
			uni.setNavigationBarTitle({
				title: this.options.name
			})
		})
	},
	onReachBottom() {
		if (this.tabIndex == 1) {
			this.$refs.partsListRef.loadMoreData(this.options.code)
		} else if (this.tabIndex == 2) {
			this.$refs.planListRef.loadMoreData(this.options.code)
		}
	}
}
</script>

<style></style>
