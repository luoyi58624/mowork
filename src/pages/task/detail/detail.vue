<template>
	<view class="relative p-2" style="padding-bottom: 56px">
		<view class="p-2 rounded-md bg-white m-elevation-1">
			<view class="flex justify-between">
				<text class="font-bold">项目信息</text>
				<view class="mr-2" @click="skipGanttPage(data.plannode.plancode)">
						<uni-tag text="甘特图" size="small" type="primary" inverted />
				</view>
			</view>
			<view class="p-2">
				<view class="my-1 flex justify-between">
					<text class="text-sm">项目名称：</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ data.project_name }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">项目编码：</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ data.plannode.projectcode }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">计划编码：</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ data.plannode.plancode }}</text>
					</view>
				</view>
			</view>

			<text class="font-bold">任务信息</text>
			<view class="p-2">
				<view class="my-1 flex justify-between">
					<text class="text-sm">任务名称：</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ data.plannode.name }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">任务编码：</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ data.code }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">任务序号：</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ data.plannode.nodecode }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">计划开始时间：</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ data.plannode.start_date }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">计划完成时间：</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ data.plannode.end_date }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">工期：</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ data.plannode.duration }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">负责人：</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ data.plannode.principal }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">开发进度：</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ $filter.percentFilter(data.progress) }}</text>
					</view>
				</view>
				<view class="my-1 flex justify-between">
					<text class="text-sm">完成情况：</text>
					<view class="flex justify-end items-center" style="width: 60%">
						<text class="text-sm" selectable>{{ data.completion }}</text>
					</view>
				</view>
			</view>
		</view>

		<view v-if="data.state != 2" class="status-icon" :class="[statusIconStyle]">
			<text v-if="data.public_state === 'processing'" class="font-bold text-xl">进行中</text>
			<text v-else-if="data.public_state === 'delaying'" class="font-bold text-xl">已逾期</text>
			<text v-else-if="data.public_state === 'done'" class="font-bold text-xl">已完结</text>
		</view>
		<view v-else class="status-icon" :class="[statusIconStyle]">
			<text class="font-bold text-xl">已拒绝</text>
		</view>

		<view class="mt-2 p-2 rounded-md bg-white m-elevation-1" v-if="data.log && data.log.length > 0">
			<text class="font-bold">任务日志</text>
			<view class="p-2">
				<view v-for="(item, index) in data.log" :key="index" class="text-xs">{{ item }}</view>
			</view>
		</view>

		<view v-if="data.state == 0" class="w-full fixed bottom-0 left-0 flex" style="height: 50px">
			<view
				class="flex-1 flex justify-center items-center font-bold text-lg bg-primary text-white"
				@click="setTaskStatus(true)">
				接受
			</view>
			<view
				class="flex-1 flex justify-center items-center font-bold text-lg bg-error text-white"
				@click="setTaskStatus(false)">
				不接受
			</view>
		</view>
		<view
			v-else-if="data.state == 1 && data.public_state !== 'done'"
			class="w-full fixed bottom-0 left-0 flex"
			style="height: 50px">
			<view
				class="flex-1 flex justify-center items-center font-bold text-lg bg-primary text-white"
				@click="$refs.confirmFinishRef.openDialog()">
				完成
			</view>
			<!-- 			<view
              class="flex-1 flex justify-center items-center font-bold text-lg bg-info-light text-info"
              @click="setTaskStatus(false)"
            >
              预报
            </view> -->
		</view>
		<!-- 		<view v-else-if="data.state == 2" class="w-full fixed bottom-0 left-0 flex" style="height: 50px;">
          <view class="flex-1 flex justify-center items-center font-bold text-lg bg-warning text-white"> 重新接受 </view>
        </view> -->

		<uni-popup ref="popupDialogRef" type="dialog">
			<uni-popup-dialog
				mode="input"
				required
				title="拒绝任务"
				placeholder="请输入拒绝原因"
				@confirm="handlerReject"></uni-popup-dialog>
		</uni-popup>
		<confirm-finish ref="confirmFinishRef" :taskId="data.id" @finish="confirmFinishHandler()"></confirm-finish>
	</view>
</template>

<script>
import ConfirmFinish from './ConfirmFinish.vue'
import { mapState } from 'pinia'
import { useUserStore } from '@/store/user'

export default {
	components: {
		ConfirmFinish
	},
	data() {
		return {
			data: {
				plannode: {}
			},
			options: {},
			rejectReason: '' // 不接受原因
		}
	},
	computed: {
		...mapState(useUserStore, ['userLoginInfo', 'siteUrl']),
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
		getData() {
			request
				.siteGet('/?m=api&c=task&a=detail', {
					uid: this.userLoginInfo.uid,
					id: this.options.id // 任务id
				})
				.then(res => {
					if (res.rcode == 0) this.data = res.data
				})
		},
		setTaskStatus(state) {
			if (state) {
				uni.showLoading({
					title: '正在处理'
				})
				request
					.sitePost( '/?m=api&c=task&a=updatestate', {
						id: this.options.id, // 任务id
						state: '1'
					})
					.then(res => {
						if (res.rcode == 0) {
							this.getData()
							uni.$emit('updateTaskList')
						}
					})
					.finally(() => {
						uni.hideLoading()
					})
			} else {
				this.$refs.popupDialogRef.open()
			}
		},
		handlerReject(value) {
			uni.showLoading({
				title: '正在处理'
			})
			request
				.sitePost( '/?m=api&c=task&a=updatestate', {
					id: this.options.id, // 任务id
					state: '2',
					objection: value
				})
				.then(res => {
					if (res.rcode == 0) {
						this.getData()
						uni.$emit('updateTaskList')
					}
				})
				.finally(() => {
					uni.hideLoading()
				})
		},
		confirmFinishHandler() {
			this.getData()
			uni.$emit('updateTaskList')
		},
		skipGanttPage(code) {
			uni.navigateTo({
				url: '/pages/plan/gantt/gantt?code=' + code
			})
		}
	},
	onLoad(options) {
		this.options = options
		this.getData()
	}
}
</script>

<style lang="scss">
.status-icon {
	position: fixed;
	bottom: 80px;
	right: 10px;
	width: 100px;
	height: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	opacity: 0.8;
	transform: rotate(-25deg);

	&.primary {
		border: 8px double var(--color-primary);
		color: var(--color-primary);
	}

	&.success {
		border: 8px double var(--color-success);
		color: var(--color-success);
	}

	&.warning {
		border: 8px double var(--color-warning);
		color: var(--color-warning);
	}
}
</style>
