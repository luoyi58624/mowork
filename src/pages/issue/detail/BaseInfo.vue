<template>
	<view class="p-2">
		<view class="p-2 rounded-md bg-white m-elevation-1">
			<text class="font-bold">基础信息</text>
			<view class="p-2">
				<view class="my-1 flex justify-between">
					<text class="text-sm">ISSUE名称：</text>
					<view class="flex-1 w-0 flex justify-end items-center">
						<text class="text-sm" selectable>{{ data.name }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">ISSUE编码：</text>
					<view class="flex-1 w-0 flex justify-end items-center">
						<text class="text-sm" selectable>{{ data.code }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">ISSUE分类：</text>
					<view class="flex-1 w-0 flex justify-end items-center">
						<text class="text-sm" selectable>{{ data.typename }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">紧急程度：</text>
					<view class="flex-1 w-0 flex justify-end items-center">
						<text class="text-sm" selectable>{{
							data.urgency_degree == '1' ? '非常紧急' : data.urgency_degree == '2' ? '紧急' : '一般'
						}}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">责任部门：</text>
					<view class="flex-1 w-0 flex justify-end items-center">
						<text class="text-sm" selectable>{{ data.departmentname }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">负责人：</text>
					<view class="flex-1 w-0 flex justify-end items-center">
						<text class="text-sm" selectable>{{ data.chargername }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">创建时间：</text>
					<view class="flex justify-end items-center">
						<text class="text-sm" selectable>{{ data.regtime }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">截止时间：</text>
					<view class="flex-1 w-0 flex justify-end items-center">
						<text class="text-sm" selectable>{{ data.end_time }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">提出人：</text>
					<view class="flex-1 w-0 flex justify-end items-center">
						<text class="text-sm" selectable>{{ data.proposername }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">复核人：</text>
					<view class="flex-1 w-0 flex justify-end items-center">
						<text class="text-sm" selectable>{{ data.reviewername }}</text>
					</view>
				</view>
			</view>

			<text class="font-bold">附件</text>
			<view class="p-2">
				<template v-if="data.filepath && data.filepath.length > 0">
					<view v-for="(item, index) in data.filepath" :key="index" class="flex">
						<image :src="loadFileIcon(item.name)" style="width: 36px;height: 36px;"></image>
						<view class="ml-2 flex-1 flex flex-col justify-center min-w-0">
							<view class="text-ellipsis">
								<text class="text-sm">{{ item.name }}</text>
							</view>
							<text class="text-xs">{{ renderSize(item.size) }}</text>
						</view>
					</view>
				</template>
				<text v-else class="text-sm">无</text>
			</view>
		</view>

		<view class="mt-2 p-2 rounded-md bg-white m-elevation-1">
			<text class="font-bold">问题描述</text>

			<view class="p-2">
				<mp-html v-if="data.detail != ''" :content="data.detail" />
				<text v-else class="text-sm">无</text>
			</view>
		</view>

		<view class="mt-2 p-2 rounded-md bg-white m-elevation-1">
			<text class="font-bold">问题分析</text>

			<view class="p-2">
				<mp-html v-if="data.remark != ''" :content="data.remark" />
				<text v-else class="text-sm">无</text>
			</view>
		</view>

		<view class="mt-2 p-2 rounded-md bg-white m-elevation-1">
			<text class="font-bold">解决方案</text>

			<view class="p-2">
				<mp-html v-if="data.solves != ''" :showImgMenu="false" :content="data.solves" />
				<text v-else class="text-sm">无</text>
			</view>
		</view>
	</view>
</template>

<script>
import MpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html.vue'
import { loadFileIcon as $loadFileIcon, renderSize as $renderSize } from '@/utils/commons'
export default {
	props: ['data'],
  components:{
    MpHtml
  },
	data() {
		return {}
	},
	computed: {
		statusIconStyle() {
			if (this.data.state == 2) return 'warning'
			else {
				if (this.data.public_state === 'processing') return 'primary'
				if (this.data.public_state === 'delaying') return 'warning'
				if (this.data.public_state === 'done') return 'success'
			}
		}
	},
	methods: {
		loadFileIcon(fileName) {
			return $loadFileIcon(fileName)
		},
		renderSize(size) {
			return $renderSize(size)
		}
	}
}
</script>

<style></style>
