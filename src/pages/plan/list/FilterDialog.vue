<template>
	<u-popup :show="showDialog" mode="bottom" @close="showDialog = false">
		<view class="relative p-2" style="padding-bottom: 80px">
			<u-form ref="addFormRef" :model="formData" labelPosition="left" labelWidth="80px">
				<u-form-item label="创建时间:" prop="createDate" borderBottom>
					<picker mode="date" @change="setCreateDate">
						<u-input :value="formData.createDate" disabled disabledColor="#ffffff" border="none"></u-input>
					</picker>
					<u-icon
						v-if="formData.createDate !== ''"
						slot="right"
						name="close"
						@click="formData.createDate = ''"></u-icon>
					<u-icon v-else slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="结束时间:" prop="endDate" borderBottom>
					<picker mode="date" :start="formData.createDate" @change="setEndDate">
						<u-input :value="formData.endDate" disabled disabledColor="#ffffff" border="none"></u-input>
					</picker>
					<u-icon v-if="formData.endDate !== ''" slot="right" name="close" @click="formData.endDate = ''"></u-icon>
					<u-icon v-else slot="right" name="arrow-right"></u-icon>
				</u-form-item>

				<view class="flex mt-2">
					<view class="mt-2 mb-1 text-sm" style="width: 80px">状态:</view>
					<view class="flex-1">
						<uni-row :gutter="20">
							<uni-col
								v-for="(item, index) in projectStatus"
								:key="index"
								:span="6"
								:class="['filter-tag', { active: activeStatus(item) }]">
								<view
									class="filter-tag-content my-1 flex justify-center items-center rounded-md m-scale-85 bg-info-light"
									@tap="setStatus(item)">
									<text class="text-xs text-ellipsis">{{ item.name }}</text>
								</view>
							</uni-col>
						</uni-row>
					</view>
				</view>
				<view class="flex mt-2">
					<view class="mt-2 mb-1 text-sm" style="width: 80px">项目经理:</view>
					<view class="flex-1">
						<uni-row :gutter="20">
							<uni-col
								v-for="(item, index) in projectManagers"
								:key="index"
								:span="6"
								:class="['filter-tag', { active: activeManager(item) }]">
								<view
									class="filter-tag-content my-1 flex justify-center items-center rounded-md m-scale-85 bg-info-light"
									@tap="setManager(item)">
									<text class="text-xs text-ellipsis">{{ item.name }}</text>
								</view>
							</uni-col>
						</uni-row>
					</view>
				</view>
			</u-form>
			<view class="w-full absolute bottom-0 left-0 flex" style="height: 50px">
				<view
					class="flex-1 flex justify-center items-center font-bold text-lg bg-primary text-white"
					@click="setFilterData">
					确定
				</view>
				<view
					class="flex-1 flex justify-center items-center font-bold text-lg bg-info-light text-info"
					@click="resetFilterData">
					重置
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
import { mapState } from 'pinia'
import { useCompanyStore } from '@/store/company'

export default {
	data() {
		return {
			showDialog: false,
			formData: {
				createDate: '',
				endDate: '',
				status: [],
				projectManagerIds: []
			}
		}
	},
	computed: {
		...mapState(useCompanyStore, ['projectManagers', 'projectStatus'])
	},
	methods: {
		openDialog() {
			this.showDialog = true
		},
		setCreateDate(e) {
			this.formData.createDate = e.detail.value
		},
		setEndDate(e) {
			this.formData.endDate = e.detail.value
		},
		setStatus(item) {
			const i = this.formData.status.findIndex(i => i == item.value)
			if (i === -1) {
				this.formData.status.push(item.value)
			} else {
				this.formData.status.splice(i, 1)
			}
		},
		setManager(item) {
			const i = this.formData.projectManagerIds.findIndex(i => i == item.id)
			if (i === -1) {
				this.formData.projectManagerIds.push(item.id)
			} else {
				this.formData.projectManagerIds.splice(i, 1)
			}
		},
		activeStatus(item) {
			return this.formData.status.findIndex(i => i == item.value) !== -1
		},
		activeManager(item) {
			return this.formData.projectManagerIds.findIndex(i => i == item.id) !== -1
		},
		setFilterData() {
			const data = {}
			if (this.formData.createDate !== '') {
				data.start_time_start = this.formData.createDate
				data.start_time_end = this.formData.createDate
			}
			if (this.formData.endDate !== '') {
				data.end_time_start = this.formData.endDate
				data.end_time_end = this.formData.endDate
			}
			if (this.formData.status.length > 0) {
				data.state = this.formData.status
			}
			if (this.formData.projectManagerIds.length > 0) {
				data.charger = this.formData.projectManagerIds
			}
			this.showDialog = false
			this.$emit('confirm', data)
		},
		resetFilterData() {
			this.formData = {
				createDate: '',
				endDate: '',
				status: [],
				projectManagerIds: []
			}
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
