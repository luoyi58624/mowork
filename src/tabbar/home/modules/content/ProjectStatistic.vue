<template>
	<view class="w-screen p-2">
		<module-title title="项目统计" :share="false" />
		<view style="height: 360px;">
			<qiun-data-charts type="column" :eopts="option" :chartData="chartData" echartsH5 echartsApp />
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
					bottom: 150
				},
				xAxis: {
					data: [],
					axisLabel: {
						margin: 12,
						interval: 0,
						rotate: -20
					}
				},
				dataZoom: {
					show: true, // 为true 滚动条出现
					realtime: true,
					type: 'slider', // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
					height: 30, // 表示滚动条的高度，也就是粗细
					start: 0, // 表示默认展示20%～80%这一段。
					end: 100,
					bottom: 36,
					brushSelect: false
				}
			},
			buttons: ['客户名称', '项目类型', '项目经理', '按年份'], // 项目统计按钮组
			activeButton: 0 // 激活的按钮索引
		}
	},
	methods: {
		switchButton(index) {
			this.activeButton = index
			this.setData()
		},
		setData(datas) {
			if (datas) this.datas = datas
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
