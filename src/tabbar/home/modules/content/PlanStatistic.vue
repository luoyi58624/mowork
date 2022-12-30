<template>
	<view class="w-screen p-2">
		<module-title title="计划统计" :share="false" />
		<view style="height: 360px">
			<qiun-data-charts :opts="option" type="column" ontouch :chartData="chartData" />
		</view>
		<view class="button-wrapper">
			<view
				v-for="(button, index) in buttons"
				:key="index"
				class="button-item text-xs m-scale-85"
				:class="{ active: activeButton === index }"
				@click="switchButton(index)">
				{{ button }}
			</view>
		</view>
	</view>
</template>

<script>
import ModuleTitle from '../../components/ModuleTitle.vue'
import QiunDataCharts from '@/components/qiun-data-charts/qiun-data-charts'

export default {
	components: {
		ModuleTitle,
		QiunDataCharts
	},
	data() {
		return {
			datas: [],
			chartData: {},
			option: {
				update: true,
				enableScroll: true,
				xAxis: {
					itemCount: 5,
					scrollShow: true, //新增是否显示滚动条，默认false
					scrollAlign: 'left' //滚动条初始位置
				}
			},
			buttons: ['供应商', '计划状态', '按年份'],
			activeButton: 0 // 激活的按钮索引
		}
	},
	methods: {
		switchButton(index) {
			this.activeButton = index
			this.setData()
		},
		getData() {
			request.siteGet('/?m=api&c=statistics&a=planTopStat').then(res => {
				if (res.rcode == 0) {
					this.datas[0] = res.data.topN.supplier
					this.datas[1] = res.data.topN.state
					this.datas[2] = res.data.topN.year
					this.setData()
				}
			})
		},
		setData() {
			this.chartData = {
				categories: this.datas[this.activeButton].map(item => item.name),
				series: [
					{
						name: '目标值',
						data: this.datas[this.activeButton].map(item => Number(item.count))
					}
				]
			}
		}
	}
}
</script>

<style scoped lang="scss">
.button-wrapper {
	display: flex;

	.button-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 6px 0;
		background-color: var(--color-info);
		color: var(--color-white);
		margin: 4px;
		border-radius: 24px;

		&.active {
			background-color: var(--color-primary);
		}
	}
}
</style>
