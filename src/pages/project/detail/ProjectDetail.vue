<template>
	<scroll-view class="h-full" scroll-y>
		<view class="p-2">
			<view class="relative px-2 py-3 flex items-center rounded-md bg-white m-elevation-1">
				<image
					v-if="data.previewimg"
					:src="siteUrl + '/' + data.previewimg"
					class="rounded-md"
					mode="aspectFill"
					style="width: 64px; height: 64px" />
				<view class="flex flex-col ml-4">
					<view class="font-bold text-primary text-ellipsis" style="width: 500rpx">{{ data.name }}</view>
					<view class="mt-2 text-xs text-info">开始时间：{{ data.start_date }}</view>
					<view class="mt-1 text-xs text-info">结束时间：{{ data.end_date }}</view>
				</view>
				<view class="absolute bottom-2 right-2 m-scale-85" @click="skipAuditPage(data)">
					<m-tag v-if="data.isComplete == 1" text="完结" plain size="mini" type="success"></m-tag>
					<m-tag v-else-if="data.state == 0" text="驳回" plain size="mini" type="warning"></m-tag>
					<m-tag v-else-if="data.state == 1" text="进行中" plain size="mini" type="primary"></m-tag>
					<m-tag v-else-if="data.state == 2" text="待审核" plain size="mini" type="info"></m-tag>
					<m-tag v-else-if="data.state == 3" text="待批准" plain size="mini" type="info"></m-tag>
					<m-tag v-else-if="data.state == 4" text="制定中" plain size="mini" type="info"></m-tag>
					<m-tag v-else-if="data.state == 5" text="暂停" plain size="mini" type="info"></m-tag>
				</view>
			</view>
			<view class="mt-2 flex flex-col rounded-md bg-white m-elevation-1">
				<view class="py-4 px-4 flex">
					<view class="flex-1 flex flex-col items-center">
						<m-progress :percent="progress1" type="circle" :strokeWidth="12" textColor="var(--color-primary)" />
						<view class="mt-2 flex flex-col items-center">
							<text class="text-sm text-primary">计划节点</text>
							<text class="text-sm">{{ pieData.plantask.total_finish }} / {{ pieData.plantask.total }}</text>
						</view>
					</view>
					<view class="flex-1 flex flex-col items-center">
						<m-progress :percent="progress2" type="circle" :strokeWidth="12" textColor="var(--color-primary)" />
						<view class="mt-2 flex flex-col items-center">
							<text class="text-sm text-primary">ISSUE</text>
							<text class="text-sm">{{ pieData.issue.total_finish }} / {{ pieData.issue.total }}</text>
						</view>
					</view>
				</view>
				<view class="px-2 py-4 flex" style="border-top: 1px solid #ccc">
					<view class="flex-1 flex flex-col items-center">
						<text class="text-xs">昨日完成节点</text>
						<text class="text-xs">{{ pieData.finish.planend }}</text>
					</view>
					<view class="flex-1 flex flex-col items-center">
						<text class="text-xs">昨日新增ISSUE</text>
						<text class="text-xs">{{ pieData.finish.openissue }}</text>
					</view>
					<view class="flex-1 flex flex-col items-center">
						<text class="text-xs">昨日关闭ISSUE</text>
						<text class="text-xs">{{ pieData.finish.closeissue }}</text>
					</view>
				</view>
			</view>
			<view class="mt-2 p-2 rounded-md bg-white m-elevation-1">
				<text class="font-bold">基本信息</text>
				<view class="p-2">
					<view class="my-1 flex justify-between">
						<text class="text-sm">项目名称：</text>
						<view class="flex-1 w-0 flex justify-end items-center">
							<text class="text-sm" selectable>{{ data.name }}</text>
						</view>
					</view>
					<view class="my-1 flex justify-between">
						<text class="text-sm">客户名称：</text>
						<view class="flex-1 w-0 flex justify-end items-center">
							<text class="text-sm" selectable>{{ data.clientname }}</text>
						</view>
					</view>
					<view class="my-1 flex justify-between">
						<text class="text-sm">项目分类：</text>
						<view class="flex-1 w-0 flex justify-end items-center">
							<text class="text-sm" selectable>{{ data.ptypename }}</text>
						</view>
					</view>
					<view class="my-1 flex justify-between">
						<text class="text-sm">项目编码：</text>
						<view class="flex-1 w-0 flex justify-end items-center">
							<text class="text-sm" selectable>{{ data.code }}</text>
						</view>
					</view>
					<view class="my-1 flex justify-between">
						<text class="text-sm">项目经理：</text>
						<view class="flex-1 w-0 flex justify-end items-center">
							<text class="text-sm" selectable>{{ data.chargername || '无' }}</text>
						</view>
					</view>
					<view class="my-1 flex justify-between">
						<text class="text-sm">项目助理：</text>
						<view class="flex-1 w-0 flex justify-end items-center">
							<text class="text-sm" selectable>{{ data.assistant || '无' }}</text>
						</view>
					</view>
				</view>
				<text class="font-bold">关联项目</text>
				<view class="p-2">
					<view class="my-1 flex justify-between">
						<text class="text-sm">关联项目名称：</text>
						<view class="flex-1 w-0 flex justify-end items-center">
							<text class="text-sm" selectable>{{ data.parentname || '无' }}</text>
						</view>
					</view>
					<view class="my-1 flex justify-between">
						<text class="text-sm">关联项目编码：</text>
						<view class="flex-1 w-0 flex justify-end items-center">
							<text class="text-sm" selectable>{{ data.parentcode || '无' }}</text>
						</view>
					</view>
				</view>
				<text class="font-bold">项目成员</text>
				<view class="py-2">
					<uni-row :gutter="10">
						<uni-col v-for="item in data.member_user" :key="item.id" :span="4">
							<view class="p-1 flex flex-col items-center">
								<image
									v-if="item.face != ''"
									:src="item.face"
									class="rounded-md"
									mode="aspectFill"
									style="width: 32px; height: 32px" />
								<uni-icons v-else type="contact" size="24"></uni-icons>
								<view class="text-ellipsis text-center" style="width: 50px">
									<text class="mt-1 text-xs">{{ item.name }}</text>
								</view>
							</view>
						</uni-col>
						<uni-col :span="4">
							<view class="p-1 flex flex-col items-center" @click="skipSelectUserPage()">
								<view
									class="rounded-md flex justify-center items-center m-scale-85"
									style="border: 1px dashed var(--color-info); width: 32px; height: 32px">
									<uni-icons type="plusempty" size="16" color="var(--color-info)"></uni-icons>
								</view>
							</view>
						</uni-col>
					</uni-row>
				</view>

				<text class="font-bold">项目描述</text>
				<view class="p-2 text-indent" v-if="data.note && data.note != ''">
					<text class="text-sm">{{ data.note }}</text>
				</view>
				<view class="p-2" v-else>
					<text class="text-sm">无</text>
				</view>

				<text class="font-bold">附件</text>
				<view class="p-2">
					<template v-if="data.filepath && data.filepath.length > 0">
						<view v-for="(item, index) in data.filepath" :key="index" class="flex">
							<image :src="loadFileIcon(item.name)" style="width: 36px; height: 36px"></image>
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
	</scroll-view>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/store/user'
import { loadFileIcon as $loadFileIcon, renderSize as $renderSize } from '@/utils/commons'

export default {
	data() {
		return {
			data: {}, // 项目详情数据
			pieData: {
				plantask: {},
				issue: {},
				finish: {
					planend: 0,
					openissue: 0,
					closeissue: 0
				}
			} // 项目节点统计
		}
	},
	computed: {
		...mapState(useUserStore, ['userLoginInfo', 'siteUrl']),
		progress1() {
			return parseInt((Number(this.pieData.plantask?.total_finish) / Number(this.pieData.plantask?.total)) * 100)
		},
		progress2() {
			return parseInt((Number(this.pieData.issue?.total_finish) / Number(this.pieData.issue?.total)) * 100)
		}
	},
	methods: {
		getData(projectId) {
			// 项目详情
			request
				.siteGet('/?m=api&c=project&a=pinfo', {
					uid: this.userLoginInfo.uid,
					id: projectId
				})
				.then(res => {
					if (res.rcode == 0) this.data = res.data
				})
			// 统计数据
			request
				.siteGet('/?m=api&c=summary&a=pronodeinfo', {
					id: projectId
				})
				.then(res => {
					if (res.rcode == 0) this.pieData = res.data
				})
		},
		skipAuditPage(data) {
			uni.navigateTo({
				url: `/pages/project/audit/audit?name=${data.name}&code=${data.code}`
			})
		},
		skipSelectUserPage() {
			const userIds = this.data.member_user.map(item => item.id)
			uni.navigateTo({
				url:
					'/pages/user/select/select?selectedUserIds=' +
					JSON.stringify(userIds) +
					'&eventName=setProjectUser&disabledChangeSelected=true'
			})
		},
		loadFileIcon(fileName) {
			return $loadFileIcon(fileName)
		},
		renderSize(size) {
			return $renderSize(size)
		},
		setProjectUser(users) {
			uni.showToast({
				icon: 'none',
				title: '暂未实现'
			})
			console.log(users)
			// const selectedUsers = []
			// this.allUsers.forEach(users => {
			// 	return users.forEach(user => {
			// 		if (user.selected) selectedUsers.push(user)
			// 	})
			// })
			// const addUsers = []
			// const delUsers = []
			// // 获取新增的人员
			// selectedUsers.forEach(item => {
			// 	if (!this.options.selectedUserIds.includes(item.user_id)) addUsers.push(item)
			// })
			// console.log(addUsers, '添加的人员')
			// // 获取被移除的人员
			// this.options.selectedUserIds.forEach(id => {
			// 	if (selectedUsers.findIndex(item => item.user_id == id) === -1) delUsers.push(id)
			// })
			// console.log(delUsers, '删除的人员')
		}
	},
	created() {
		uni.$on('setProjectUser', this.setProjectUser)
	},
	destroyed() {
		uni.$off('setProjectUser', this.setProjectUser)
	}
}
</script>

<style></style>
