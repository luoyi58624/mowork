<template>
	<view class="w-75 p-2">
		<module-title title="项目指数" :share="false" />
		<uni-table border stripe emptyText="暂无更多数据">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="center" width="120">项目</uni-th>
				<uni-th align="center" width="120">客户</uni-th>
				<uni-th align="center" width="120">计划剩余/总数</uni-th>
				<uni-th align="center" width="120">任务剩余/总数</uni-th>
				<uni-th align="center" width="130">ISSUE剩余/总数</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="item in tableData" :key="item.id">
				<uni-td align="center"> {{ item.name }} </uni-td>
				<uni-td align="center">{{ item.customer_name }}</uni-td>
				<uni-td align="center">{{ item.plan.remaining }}/{{ item.plan.total }}</uni-td>
				<uni-td align="center">{{ item.task.remaining }}/{{ item.task.total }}</uni-td>
				<uni-td align="center">{{ item.issue.remaining }}/{{ item.issue.total }}</uni-td>
			</uni-tr>
		</uni-table>
	</view>
</template>

<script>
import ModuleTitle from '../../components/ModuleTitle.vue'
export default {
	components: {
		ModuleTitle
	},
	data() {
		return {
			tableData: []
		}
	},
	methods: {
		getData() {
			request
				.siteGet( '/?m=api&c=statistics&a=projectIndex')
				.then(res => {
					if (res.rcode == 0) {
						this.tableData = res.data.index
					}
				})
		}
	}
}
</script>

<style></style>
