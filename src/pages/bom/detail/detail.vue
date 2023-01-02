<template>
	<view class="p-2">
		<view class="mt-2 p-2 rounded-md bg-white m-elevation-1">
			<text class="font-bold">零部件信息</text>
			<view class="p-2">
				<view class="my-1 flex justify-between">
					<text class="text-sm">名称：</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ data.name }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">编码：</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ data.bomcode }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">类别：</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ data.type }}</text>
					</view>
				</view>
			</view>

			<text class="font-bold">模块信息</text>
			<view class="p-2">
				<view class="my-1 flex justify-between" v-for="(val, key) in data.customfield" :key="key">
					<text class="text-sm">{{ key }}</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ val || '无' }}</text>
					</view>
				</view>
			</view>

			<text class="font-bold">备注</text>
			<view class="p-2 text-indent" v-if="data.field.note && data.field.note != ''">
				<text class="text-sm">{{ data.field.note }}</text>
			</view>
			<view class="p-2" v-else>
				<text class="text-sm">无</text>
			</view>

			<text class="font-bold">模型</text>
			<view class="p-2">
				<text class="text-sm">待实现...</text>
			</view>

			<text class="font-bold">附件</text>
			<view class="p-2">
				<text class="text-sm">待实现...</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			data: {
				field: {}
			},
			options: {}
		}
	},
	methods: {
		getData() {
			request
				.siteGet('/?m=api&c=project&a=bominfo', {
					id: this.options.bomId,
					projectcode: this.options.projectcode
				})
				.then(res => {
					console.log(res.data.datalist)
					if (res.rcode == 0) this.data = res.data.datalist
				})
		}
	},
	onLoad(options) {
		this.options = options
		this.getData()
	}
}
</script>

<style lang="scss"></style>
