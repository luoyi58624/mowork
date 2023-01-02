<template>
	<view class="p-4">
		<u-form ref="formRef" :model="formData" :rules="rules" labelPosition="left" label-width="80">
			<u-form-item label="ISSUE名称:" prop="name" borderBottom>
				<u-input v-model="formData.name" border="none" clearable />
			</u-form-item>
			<u-form-item label="所属项目:" prop="parentname" borderBottom @click="skipProjectPage()">
				<u-input v-model="formData.parentname" disabled border="none" disabledColor="var(--color-white-2)" clearable />
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item v-if="showPlanFormItem" label="所属计划:" prop="planname" borderBottom @click="skipPlanPage()">
				<u-input v-model="formData.planname" disabled border="none" disabledColor="var(--color-white-2)" clearable />
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item label="ISSUE类型:" prop="type" labelPosition="top">
				<uni-row :gutter="20" class="mt-2">
					<uni-col
						v-for="(item, index) in issueTypeData"
						:key="index"
						:span="6"
						:class="['filter-tag', { active: item.code === formData.type }]">
						<view
							class="filter-tag-content my-1 flex justify-center items-center rounded-md m-scale-85 bg-info-light"
							@tap="setIssueType(item)">
							<text class="text-xs text-ellipsis">{{ item.name }}</text>
						</view>
					</uni-col>
				</uni-row>
			</u-form-item>
			<u-form-item label="紧急程度:" prop="urgency_degree" labelPosition="top">
				<uni-row :gutter="20" class="mt-2">
					<uni-col
						v-for="(item, index) in urgencyDegrees"
						:key="index"
						:span="6"
						:class="['filter-tag', { active: item.value === formData.urgency_degree }]">
						<view
							class="filter-tag-content my-1 flex justify-center items-center rounded-md m-scale-85 bg-info-light"
							@tap="formData.urgency_degree = item.value">
							<text class="text-xs text-ellipsis">{{ item.name }}</text>
						</view>
					</uni-col>
				</uni-row>
			</u-form-item>
			<u-form-item label="负责人:" prop="chargerName" borderBottom @click="skipUserSelectPage('setCharger')">
				<u-input v-model="formData.chargerName" disabled border="none" disabledColor="var(--color-white-2)" />
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item label="复核人:" prop="reviewerName" borderBottom @click="skipUserSelectPage('setReviewer')">
				<u-input v-model="formData.reviewerName" disabled border="none" disabledColor="var(--color-white-2)" />
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item label="截止日期:" prop="end_time" borderBottom>
				<picker mode="date" @change="setEndDate">
					<u-input :value="formData.end_time" disabled disabledColor="var(--color-white-2)" border="none"></u-input>
				</picker>
				<u-icon v-if="formData.end_time !== ''" slot="right" name="close" @click="formData.end_time = ''"></u-icon>
				<u-icon v-else slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item label="问题描述:" prop="detail" labelPosition="top">
				<m-editor class="mt-2" ref="editor1Ref" v-model="formData.detail"></m-editor>
			</u-form-item>
			<u-form-item label="问题分析:" prop="remark" labelPosition="top">
				<m-editor class="mt-2" ref="editor2Ref" v-model="formData.remark"></m-editor>
			</u-form-item>
			<u-form-item label="解决方案:" prop="solves" labelPosition="top">
				<m-editor class="mt-2" ref="editor3Ref" v-model="formData.solves"></m-editor>
			</u-form-item>
			<u-form-item label="附件:" labelPosition="top">
				<view class="py-2 w-full">
					<uni-row :gutter="10">
						<uni-col :span="4">
							<view class="py-1 flex flex-col items-center" @click="addFile()">
								<view
									class="rounded-md flex justify-center items-center m-scale-85"
									style="border: 1px dashed var(--color-info); width: 32px; height: 32px">
									<uni-icons type="plusempty" size="16" color="var(--color-info)"></uni-icons>
								</view>
							</view>
						</uni-col>
					</uni-row>
				</view>
			</u-form-item>
		</u-form>
	</view>
</template>

<script>
import { mapState } from 'pinia'
import { useCompanyStore } from '@/store/company'
export default {
	data() {
		return {
			project: {}, // 选中的项目
			showPlanFormItem: false, // 是否显示计划选择表单，只有当选中的项目存在计划时才会出现
			plan: {}, // 选中的计划
			charger: {}, // 选中的负责人
			reviewer: {}, // 选中的复核人，默认为当前登录的用户
			issueTypeData: [],
			formData: {
				name: '', // ISSUE名字
				parentname: '', // 项目名字，仅做表单展示，提交时传递code
				planname: '', // 计划名字，仅做表单展示，提交时传递code
				type: '', // issue类型 - code
				urgency_degree: 3, // 紧急程度
				chargerName: '', // issue负责人id
				reviewerName: '', // issue复核人id
				end_time: '', // 截止时间
				detail: '', // 问题描述
				remark: '', // 问题分析
				solves: '' // 解决方案
			},
			rules: {
				name: {
					required: true,
					message: '请填写issue名称',
					trigger: ['blur']
				},
				parentname: {
					required: true,
					message: '请选择项目'
				},
				type: {
					required: true,
					message: '请选择issue类型'
				},
				chargerName: {
					required: true,
					message: '请选择负责人'
				},
				reviewerName: {
					required: true,
					message: '请选择复核人'
				},
				end_time: {
					required: true,
					message: '请选择截止日期'
				},
				detail: {
					required: true,
					message: '请输入问题描述'
				}
			}
		}
	},
  computed: {
    ...mapState(useCompanyStore, ['projectManagers', 'projectStatus','urgencyDegrees'])
  },
	methods: {
		submit() {},
		skipProjectPage() {
			uni.navigateTo({
				url: '/pages/project/list/list?isSelected=true'
			})
		},
		skipPlanPage() {
			uni.navigateTo({
				url: '/pages/project/plan/list/list?isSelected=true&projectcode=' + this.project.code
			})
		},
		skipUserSelectPage(eventName) {
			uni.navigateTo({
				url: '/pages/user/select/select?&eventName=' + eventName + '&multiple=false'
			})
		},
		setProject(value) {
			this.plan = {}
			this.formData.planname = ''
			this.project = value
			this.formData.parentname = value.name
			// 如果选中的项目计划数量大于0，则显示计划表单选项
			request
				.siteGet('/?m=api&c=plan&a=plistbyprojectcode', {
					projectcode: value.code,
					page: 1, // 固定页数
					num: 5
				})
				.then(res => {
					this.showPlanFormItem = res.rcode == 0 && res.data.datalist.length > 0
				})
		},
		setPlan(value) {
			this.plan = value
			this.formData.planname = value.name
		},
		// 获取issue类型数据
		getIssueTypeData() {
			request.siteGet('/?m=api&c=issue&a=ptypelist').then(res => {
				if (res.rcode == 0) this.issueTypeData = res.data
			})
		},
		setIssueType(item) {
			this.formData.type = item.code
		},
		setCharger(value) {
			this.charger = value[0]
			this.formData.chargerName = value[0].user_name
		},
		setReviewer(value) {
			this.reviewer = value[0]
			this.formData.reviewerName = value[0].user_name
		},
		setEndDate(e) {
			this.formData.end_time = e.detail.value
		},
		addFile() {}
	},
	created() {
		this.getIssueTypeData()
		uni.$on('setProject', this.setProject)
		uni.$on('setPlan', this.setPlan)
		uni.$on('setCharger', this.setCharger)
		uni.$on('setReviewer', this.setReviewer)
	},
	destroyed() {
		uni.$off('setProject', this.setProject)
		uni.$off('setPlan', this.setPlan)
		uni.$off('setCharger', this.setCharger)
		uni.$off('setReviewer', this.setReviewer)
	},
	onNavigationBarButtonTap() {
		this.$refs.formRef.validate().then(res => {
			if (res) {
				uni.showLoading({
					title: '正在提交'
				})
				request
					.sitePost('/?m=api&c=issue&a=add', {
						data: {
							name: this.formData.name,
							projectcode: this.project.code,
							plancode: this.plan.code,
							type: this.formData.type,
							urgency_degree: this.formData.urgency_degree,
							charger: this.charger.user_id,
							reviewer: this.reviewer.user_id,
							end_time: this.formData.end_time,
							detail: this.formData.detail,
							remark: this.formData.remark,
							solves: this.formData.solves,
							filepath: []
						}
					})
					.then(res => {
						uni.hideLoading()
						uni.showModal({
							title: '添加成功',
							content: 'issue已添加，是否要继续添加？',
							cancelText: '返回上一页',
							confirmText: '继续添加',
							success: res => {
								if (res.confirm) {
									this.formData = {
										name: '', // ISSUE名字
										parentname: '', // 项目名字，仅做表单展示，提交时传递code
										planname: '', // 计划名字，仅做表单展示，提交时传递code
										type: '', // issue类型 - code
										urgency_degree: 3, // 紧急程度
										chargerName: '', // issue负责人id
										reviewerName: '', // issue复核人id
										end_time: '', // 截止时间
										detail: '', // 问题描述
										remark: '', // 问题分析
										solves: '' // 解决方案
									}
									this.project = {}
									this.plan = {}
									this.charger = {}
									this.reviewer = {}
									this.showPlanFormItem = false
									this.$refs.editor1Ref.clear()
									this.$refs.editor2Ref.clear()
									this.$refs.editor3Ref.clear()
								} else if (res.cancel) {
									uni.navigateBack({
										success: () => {
											uni.$emit('updateIssueList')
										}
									})
								}
							}
						})
					})
					.catch(() => {
						uni.hideLoading()
					})
			}
		})
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
