<template>
	<view class="w-screen p-2">
		<module-title title="ISSUE统计" :share="false" />
		<view style="height: 500px;">
			<qiun-data-charts type="pie" :eopts="option" :chartData="chartData" echartsH5 echartsApp />
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
			chartData: {},
			option: {
				grid: {
					top: 0,
					left: 10
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
			request
				.get(this.$store.getters.siteUrl + '/?m=api&c=statistics&a=issueTypeStat', {
					token: this.$store.state.userInfo.siteToken
				})
				.then(res => {
					if (res.rcode == 0) {
						const data = res.data.list.map(item => {
							return {
								name: item.name,
								value: Number(item.count)
							}
						})
						this.chartData = {
							series: [
								{
									data: data
								}
							]
						}
					}
				})
		}
	}
}
</script>

<style></style>
