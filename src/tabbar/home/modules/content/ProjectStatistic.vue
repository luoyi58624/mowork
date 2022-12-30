<template>
	<view class="w-screen p-2">
		<module-title title="项目统计" :share="false" />
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
					scrollAlign: 'left', //滚动条初始位置
					rotateLabel: true,

					rotateAngle: -45
				}
			},
			buttons: ['客户名称', '项目类型', '项目经理', '按年份'], // 项目统计按钮组
			activeButton: 0 // 激活的按钮索引
		}
	},
	methods: {
		switchButton(index) {
			this.activeButton = index
			this.setData(null, index)
		},
		setData(datas, index = 0) {
			if (datas) this.datas = datas
			let name
			switch (index) {
				case 0:
					name = '项目数量'
					break
				case 1:
					name = '个数'
          break
        case 2:
          name = '完成ISSUE'
          break
        case 3:
          name = '完成项目'
          break
			}
			this.chartData = {
				categories: this.datas[this.activeButton].map(item => item.name),
				series: [
					{
						name: name,
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
