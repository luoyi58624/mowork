<template>
	<view class="w-75 p-2">
		<module-title title="项目分布" :share="false" />
		<view id="china-map-echart" :prop="option" :change:prop="echarts.updateEcharts" style="height: 300px;"></view>
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
			option: {
				tooltip: {
					trigger: 'item'
				},
				dataZoom: {
					type: 'inside'
				},
				// 分段型视觉映射
				visualMap: {
					type: 'piecewise',
					pieces: [
						{
							min: 301,
							color: '#B40000'
						},
						{
							min: 201,
							max: 300,
							color: '#f73c24'
						},
						{
							min: 101,
							max: 200,
							color: '#F97766'
						},
						{
							min: 10,
							max: 100,
							color: '#F9ADA3'
						},
						{
							min: 1,
							max: 9,
							color: '#F9DAD7'
						},
						{
							value: 0,
							color: 'white'
						}
					],
					textStyle: {
						color: '#7B93A7'
					}
				},
				series: [
					{
						name: '项目分布',
						type: 'map',
						roam: false,
						map: 'china',
						zoom: 1.2,
						showLegendSymbol: false, // 关闭系列标识的小圆点，存在 legend 组件时生效。
						select: {
							disabled: true
						},
						data: []
					}
				]
			}
		}
	},
	methods: {
		setData(data) {
			this.option.series[0].data = data
		}
	}
}
</script>

<script module="echarts" lang="renderjs">
import chinaMap from 'static/china-map.json'
let myChart
export default {
	mounted() {
		if (typeof window.echarts === 'function') {
			this.initEcharts()
		} else {
			// 动态引入较大类库避免影响页面展示
			const script = document.createElement('script')
			// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
			script.src = 'static/echarts.min.js'
			script.onload = this.initEcharts.bind(this)
			document.head.appendChild(script)
		}
	},
	methods: {
		initEcharts() {
			echarts.registerMap('china', chinaMap)
			myChart = echarts.init(document.getElementById('china-map-echart'))
			// 观测更新的数据在 view 层可以直接访问到
			myChart.setOption(this.option)
		},
		updateEcharts(newValue, oldValue, ownerInstance, instance) {
			// 监听 service 层数据变更
			if(myChart!=null)	myChart.setOption(newValue)
		}
	}
}
</script>

<style scoped lang="less"></style>
