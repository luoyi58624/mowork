<template>
	<uni-popup ref="popupRef">
		<view class="relative p-2 bg-white" style="height: 300px;">
			<u-form ref="addFormRef" :model="formData" labelPosition="left" labelWidth="80px">
				<view class="flex mt-2">
					<view class="mt-2 mb-1 text-sm" style="width: 80px;">任务状态:</view>
					<view class="flex-1">
						<uni-row :gutter="20">
							<uni-col
								v-for="(item, index) in status"
								:key="index"
								:span="6"
								:class="['filter-tag', { active: activeStatus(item) }]"
							>
								<view
									class="filter-tag-content my-1 flex justify-center items-center rounded-md m-scale-85 bg-info-light"
									@tap="setStatus(item)"
								>
									<text class="text-xs text-ellipsis">{{ item.name }}</text>
								</view>
							</uni-col>
						</uni-row>
					</view>
				</view>
			</u-form>
			<view class="w-full absolute bottom-0 left-0 flex" style="height: 50px;">
				<view
					class="flex-1 flex justify-center items-center font-bold text-lg bg-primary text-white"
					@click="setFilterData"
				>
					确定
				</view>
				<view
					class="flex-1 flex justify-center items-center font-bold text-lg bg-info-light text-info"
					@click="resetFilterData"
				>
					重置
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	data() {
		return {
			showDialog: false,
			status: [
				{
					name: '进行中',
					value: 1
				},
				{
					name: '已完成',
					value: 6
				},
				{
					name: '已延期',
					value: 7
				}
			],
			formData: {
				state: [1, 6, 7]
			}
		}
	},
	methods: {
		openDialog() {
			this.$refs.popupRef.open('bottom')
		},
		closeDialog() {
			this.$refs.popupRef.close()
		},
		resetFilterData() {
			this.formData = {
				state: [1, 6, 7]
			}
		},
		setStatus(item) {
			const i = this.formData.state.findIndex(i => i == item.value)
			if (i === -1) {
				this.formData.state.push(item.value)
			} else {
				this.formData.state.splice(i, 1)
			}
		},
		activeStatus(item) {
			return this.formData.state.findIndex(i => i == item.value) !== -1
		},
		setFilterData() {
			const data = {}
			if (this.formData.state.length > 0) {
				data.state = this.formData.state
			}
			this.closeDialog()
			this.$emit('confirm', data)
		}
	}
}
</script>

<style scoped lang="scss">
.filter-tag-content {
	height: 28px;
	transition: all 0.15s ease-out;
}
.filter-tag.active {
	& > .filter-tag-content {
		color: white;
		background-color: var(--color-primary);
	}
}
</style>
