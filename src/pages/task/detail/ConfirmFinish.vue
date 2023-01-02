<template>
	<uni-popup ref="popupRef">
		<view class="relative p-2 bg-white" style="padding-bottom: 80px">
			<u-form ref="addFormRef" :model="formData" :rules="rules" labelPosition="left" labelWidth="100px">
				<u-form-item label="实际开始时间:" prop="real_sdate" borderBottom>
					<picker style="z-index: 99999" mode="date" @change="setCreateDate">
						<u-input :value="formData.real_sdate" disabled disabledColor="#ffffff" border="none"></u-input>
					</picker>
					<u-icon
						v-if="formData.real_sdate !== ''"
						slot="right"
						name="close"
						@click="formData.real_sdate = ''"></u-icon>
					<u-icon v-else slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="实际完成时间:" prop="real_edate" borderBottom>
					<picker mode="date" :start="formData.real_edate" @change="setEndDate">
						<u-input :value="formData.real_edate" disabled disabledColor="#ffffff" border="none"></u-input>
					</picker>
					<u-icon
						v-if="formData.real_edate !== ''"
						slot="right"
						name="close"
						@click="formData.real_edate = ''"></u-icon>
					<u-icon v-else slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="完成进度:" prop="progress">
					<u-number-box :min="1" :max="100" v-model="formData.progress"></u-number-box>
					<!-- <u-input type="number" :value="formData.progress" @change="setProgress"></u-input> -->
				</u-form-item>
				<u-form-item label="完成情况:" prop="completion">
					<u-textarea v-model="formData.completion" placeholder="请输入描述信息(可选)"></u-textarea>
				</u-form-item>
			</u-form>
			<view class="w-full absolute bottom-0 left-0 flex" style="height: 50px">
				<view
					class="flex-1 flex justify-center items-center font-bold text-lg bg-primary text-white"
					@click="confirm()">
					提交
				</view>
				<view
					class="flex-1 flex justify-center items-center font-bold text-lg bg-info-light text-info"
					@click="closeDialog()">
					取消
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	props: ['taskId'],
	data() {
		return {
			formData: {
				real_sdate: '',
				real_edate: '',
				progress: 100,
				completion: ''
			},
			rules: {
				real_sdate: {
					required: true,
					message: '必填'
				},
				real_edate: {
					required: true,
					message: '必填'
				}
			}
		}
	},
	methods: {
		openDialog() {
			this.$refs.popupRef.open('bottom')
		},
		closeDialog() {
			this.formData = {
				real_sdate: '',
				real_edate: '',
				progress: 100,
				completion: ''
			}
			this.$refs.popupRef.close()
		},
		setCreateDate(e) {
			this.formData.real_sdate = e.detail.value
		},
		setEndDate(e) {
			this.formData.real_edate = e.detail.value
		},
		confirm() {
			this.$refs.addFormRef.validate().then(res => {
				if (res) {
					const start = new Date(this.formData.real_sdate)
					const end = new Date(this.formData.real_edate)
					let date = (end - start) / 1000 / 60 / 60 / 24
					if (date <= 0) date = 1
					uni.showLoading({
						title: '正在提交'
					})
					request
						.siteGet('/?m=api&c=task&a=updateprogress', {
							data: {
								id: this.taskId,
								...this.formData,
								real_duration: date
							}
						})
						.then(res => {
							if (res.rcode == 0) {
								this.closeDialog()
								this.$emit('finish')
							}
						})
						.finally(() => {
							uni.hideLoading()
						})
				}
			})
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
