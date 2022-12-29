<template>
	<view class="charts-box">
		<qiun-data-charts type="map" :opts="opts" :chartData="chartData" />
	</view>
</template>

<script setup lang="ts">
import QiunDataCharts from '@/components/qiun-data-charts/qiun-data-charts'
import chinaMap from '@/static/json/china-map.json'

console.log(chinaMap)
const chartData = ref({
	series: chinaMap.features
})

const opts = {
	dataLabel: false,
  data: {
    '内蒙古': 1,
    '山西': 1,
  },
	extra: {
		map: {

		}
	}
}
</script>

<style scoped></style>
