<template>
	<view>
		<!-- 待办事项 -->
		<project-todo ref="projectTodoRef"></project-todo>
		<!-- 项目进度 -->
		<project-progress ref="projectProgressRef"></project-progress>
		<template v-if="$store.getters.isSelectedCompany">
			<!-- 项目分布 -->
			<project-overview ref="projectOverviewRef"></project-overview>
			<!-- 项目统计 -->
			<project-statistic ref="projectStatisticRef"></project-statistic>
			<!-- 项目指数 -->
			<!-- <project-table ref="projectTableRef"></project-table> -->
			<!-- 计划统计 -->
			<plan-statistic ref="planStatisticRef"></plan-statistic>
			<!-- issue统计 -->
			<issue-statistic ref="issueStatisticRef"></issue-statistic>
		</template>
	</view>
</template>

<script>
import ProjectTodo from './ProjectTodo.vue'
import ProjectProgress from './ProjectProgress.vue'
import ProjectOverview from './ProjectOverview.vue'
import ProjectStatistic from './ProjectStatistic.vue'
// import ProjectTable from './ProjectTable.vue'
import PlanStatistic from './PlanStatistic.vue'
import IssueStatistic from './IssueStatistic.vue'
import { request } from '@/utils/request.js'
export default {
	components: {
		ProjectTodo,
		ProjectProgress,
		ProjectOverview,
		ProjectStatistic,
		// ProjectTable,
		PlanStatistic,
		IssueStatistic
	},
	data() {
		return {}
	},
	methods: {
		getData() {
			this.getOverview()
			// this.$refs.projectTableRef.getData()
			this.$refs.planStatisticRef.getData()
			this.$refs.issueStatisticRef.getData()
		},
		getOverview() {
			request
				.get(this.$store.getters.siteUrl + '/?m=api&c=statistics&a=overview', {
					token: this.$store.state.userInfo.siteToken
				})
				.then(res => {
					if (res.rcode == 0) {
						this.setProjectTodo(res.data.todo) // 设置项目进度
						this.setProjectProgress(res.data.project.overview) // 设置项目进度
						this.setProjectOverview(res.data.project.location) // 设置项目分布
						this.setProjectStatistic(res.data.project.topN) // 设置项目统计
					}
				})
		},
		// 设置项目进度
		setProjectTodo(data) {
			this.$refs.projectTodoRef.setData(data)
		},
		// 设置项目进度
		setProjectProgress(data) {
			this.$refs.projectProgressRef.setData(data)
		},
		// 设置项目分布
		setProjectOverview(data) {
			this.$refs.projectOverviewRef.setData(
				data.map(item => {
					return {
						name: item.name,
						value: item.count
					}
				})
			)
		},
		// 设置项目统计
		setProjectStatistic(data) {
			const projectStatisticDatas = []
			projectStatisticDatas[0] = data.customer
			projectStatisticDatas[1] = data.type
			projectStatisticDatas[2] = data.manager
			projectStatisticDatas[3] = data.year
			this.$refs.projectStatisticRef.setData(projectStatisticDatas)
		}
	}
}
</script>

<style scoped lang="scss"></style>
