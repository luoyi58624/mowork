<template>
	<view class="w-screen p-2" v-if="hasData">
		<module-title title="ISSUE统计" :share="false" />
		<view style="height: 500px">
			<qiun-data-charts :opts="option" type="pie" :chartData="chartData" />
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
			chartData: {},
			hasData: true,
			option: {
				update: true,
				extra: {
					pie: {
						border: false
					}
				}
			}
		}
	},
	methods: {
		switchButton(index) {
			this.activeButton = index
			this.setData()
		},
		getData() {
			request.siteGet('/?m=api&c=statistics&a=issueTypeStat').then(res => {
				if (res.rcode == 0) {
					if (res.data.list && res.data.list.map) {
						const data = res.data.list.map(item => {
							return {
								name: item.name,
								value: Number(item.count)
							}
						})

						console.log(data)

						this.chartData = {
							series: [
								{
									data: data
								}
							]
						}
					} else {
						this.hasData = false
					}
				}
			})
		}
	}
}
</script>

<style></style>
