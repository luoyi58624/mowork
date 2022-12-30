<template>
	<view class="w-screen p-2">
		<module-title title="计划统计" :share="false" />
		<view style="height: 360px;">
			<qiun-data-charts type="column" :eopts="option" :chartData="chartData" :tooltipShow="false" echartsH5 echartsApp />
		</view>
		<view class="button-wrapper">
			<view
				v-for="(button, index) in buttons"
				:key="index"
				class="button-item text-xs m-scale-85"
				:class="{ active: activeButton === index }"
				@click="switchButton(index)"
			>
				{{ button }}
			</view>
		</view>
	</view>
</template>

<script>
import ModuleTitle from '../../components/ModuleTitle.vue'
import { request } from '@/utils/request.js'
export default {
	components: {
		ModuleTitle
	},
	data() {
		return {
			datas: [],
			chartData: {},
			option: {
				grid: {
					left: '3%',
					right: '4%',
					bottom: 30,
					top: 10,
					containLabel: true
				},
				xAxis: {
					type: 'value',
					boundaryGap: [0, 0.01],
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					}
				},
				yAxis: {
					type: 'category',
					data: []
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
			request
				.get(this.$store.getters.siteUrl + '/?m=api&c=statistics&a=planTopStat', {
					token: this.$store.state.userInfo.siteToken
				})
				.then(res => {
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
						show: false,
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
