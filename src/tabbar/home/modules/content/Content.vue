<template>
	<view>
		<!-- 待办事项 -->
		<project-todo ref="projectTodoRef"></project-todo>
		<!-- 项目进度 -->
		<project-progress ref="projectProgressRef"></project-progress>
		<template v-if="userStore.isSelectedCompany">
			<!-- 项目分布 -->
			<!--			<project-overview ref="projectOverviewRef"></project-overview>-->
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

<script setup lang="ts">
import ProjectTodo from './ProjectTodo.vue'
import ProjectProgress from './ProjectProgress.vue'
// import ProjectOverview from './ProjectOverview.vue'
import ProjectStatistic from './ProjectStatistic.vue'
// import ProjectTable from './ProjectTable.vue'
import PlanStatistic from './PlanStatistic.vue'
import IssueStatistic from './IssueStatistic.vue'
import { ref, unref } from 'vue'

defineExpose({
	getData
})

const userStore = useUserStore()

const projectTodoRef = ref()
const projectProgressRef = ref()
const projectOverviewRef = ref()
const projectStatisticRef = ref()
const projectTableRef = ref()
const planStatisticRef = ref()
const issueStatisticRef = ref()

function getData() {
	getOverview()
	// unref(projectTableRef).getData()
	unref(planStatisticRef).getData()
	unref(issueStatisticRef).getData()
}

function getOverview() {
	request.siteGet('/?m=api&c=statistics&a=overview').then(res => {
		if (res.rcode == 0) {
			setProjectTodo(res.data.todo)
			setProjectProgress(res.data.project.overview)
			// setProjectOverview(res.data.project.location)
			setProjectStatistic(res.data.project.topN)
		}
	})
}

function setProjectTodo(data) {
	unref(projectTodoRef).setData(data)
}

function setProjectProgress(data) {
	unref(projectProgressRef).setData(data)
}

function setProjectOverview(data) {
	unref(projectOverviewRef).setData(
		data.map(item => {
			return {
				name: item.name,
				value: item.count
			}
		})
	)
}

function setProjectStatistic(data) {
	const projectStatisticDatas = []
	projectStatisticDatas[0] = data.customer
	projectStatisticDatas[1] = data.type
	projectStatisticDatas[2] = data.manager
	projectStatisticDatas[3] = data.year
	unref(projectStatisticRef).setData(projectStatisticDatas)
}
</script>
