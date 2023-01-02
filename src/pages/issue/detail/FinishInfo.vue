<template>
	<view class="p-2">
		<view class="rounded-md bg-white m-elevation-1">
			<view class="py-2 px-4 flex">
				<view class="flex-1 flex flex-col items-center">
					<m-progress
						:percent="data.complete_info.progress"
						type="circle"
						:strokeWidth="12"
						textColor="var(--color-primary)"
					/>
				</view>
				<view class="flex-1 flex flex-col justify-center">
					<view>
						<text class="text-sm text-black-2">完成日期：</text>
						<text class="text-sm text-success">{{ data.complete_info.real_edate }}</text>
					</view>
					<view class="mt-2">
						<text class="text-sm text-black-2">实际工时：</text>
						<text class="text-sm text-success">{{ data.complete_info.real_duration }}小时</text>
					</view>
				</view>
			</view>
		</view>

		<view class="mt-2 p-2 rounded-md bg-white m-elevation-1">
			<text class="font-bold">完成情况描述</text>

			<view class="p-2">
				<mp-html
					v-if="data.complete_info.completion && data.complete_info.completion != ''"
					:content="data.complete_info.completion"
				/>
				<text v-else class="text-sm">无</text>
			</view>
		</view>

		<view class="mt-2 p-2 rounded-md bg-white m-elevation-1">
			<text class="font-bold">附件</text>

			<view class="p-2">
				<template v-if="data.complete_info.filepath && data.complete_info.filepath.length > 0">
					<view v-for="(item, index) in data.complete_info.filepath" :key="index" class="flex">
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
