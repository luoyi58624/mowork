<template>
	<u-popup :show="showDialog" safeAreaInsetBottom mode="bottom" @close="showDialog = false" @open="openAddCompanyEvent">
		<view class="p-2">
			<u-form ref="addFormRef" :model="addData" labelPosition="left" labelWidth="100px">
				<u-form-item label="公司名称:" prop="company.id" borderBottom @click="showCompanyPicker = true">
					<u-input
						v-model="addData.company.name"
						disabled
						disabledColor="#ffffff"
						placeholder="请选择公司"
						border="none" />
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="角色:" prop="role.id" borderBottom @click="showRolePicker = true">
					<u-input
						v-model="addData.role.name"
						disabled
						disabledColor="#ffffff"
						placeholder="请选择角色"
						border="none" />
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<template v-if="addData.role.id != null">
					<template v-if="addData.role.id == 0">
						<u-form-item
							v-if="companyDep.one.length > 0"
							label="部门:"
							prop="dep.id"
							borderBottom
							@click="showDepPicker = true">
							<u-input
								v-model="addData.dep.name"
								disabled
								disabledColor="#ffffff"
								placeholder="请选择部门"
								border="none" />
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
					</template>
					<template v-if="addData.role.id == 1">
						<u-form-item label="供应商名称:" prop="customerName" borderBottom>
							<u-input
								v-model="addData.customerName"
								disabledColor="#ffffff"
								placeholder="请输入供应商公司名称"
								border="none" />
						</u-form-item>
					</template>
				</template>
				<u-form-item label="姓名:" prop="username" borderBottom>
					<u-input
						v-model="addData.username"
						border="none"
						:disabled="disabledModifyUsername"
						disabledColor="#ffffff"></u-input>
				</u-form-item>
			</u-form>
			<u-picker
				:show="showCompanyPicker"
				:columns="allCompanys"
				:loading="loadingAllCompany"
				keyName="name"
				closeOnClickOverlay
				@close="showCompanyPicker = false"
				@cancel="showCompanyPicker = false"
				@confirm="setAddCompany" />
			<u-picker
				:show="showRolePicker"
				:columns="roles"
				keyName="name"
				closeOnClickOverlay
				@close="showRolePicker = false"
				@cancel="showRolePicker = false"
				@confirm="setAddRole" />
			<u-picker
				:show="showDepPicker"
				:columns="[companyDep.one, companyDep.two[companyDep.activeIndex]]"
				keyName="name"
				closeOnClickOverlay
				@close="showDepPicker = false"
				@cancel="showDepPicker = false"
				@confirm="setAddDep"
				@change="depChangeHandler" />
			<u-button class="mt-4" type="primary" @click="addCompany()">添加公司</u-button>
			<view class="w-full mt-2 text-center text-xs text-error" v-show="errorMsg != ''">{{ errorMsg }}</view>
		</view>
	</u-popup>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import { reactive, ref, unref } from 'vue'

const emits = defineEmits(['success'])

defineExpose({
	showAddCompany: showAddCompany
})

const userStore = useUserStore()

// 表单默认的添加对象模型
const defaultAddData = {
	company: {
		id: null,
		name: ''
	},
	role: {
		id: null,
		name: ''
	},
	dep: {
		id: null,
		name: ''
	},
	customerName: '',
	username: ''
}

const rules = {
	'company.id': [
		{
			required: true,
			message: '请选择公司'
		}
	],
	'role.id': {
		required: true,
		message: '请选择角色'
	},
	'dep.id': {
		required: true,
		message: '请选择部门'
	},
	customerName: {
		required: true,
		message: '请输入供应商公司名字'
	},
	username: {
		required: true,
		message: '请输入你的名字'
	}
}

const roles = [
	[
		{ id: 0, name: '员工' },
		{ id: 1, name: '外部人员' }
	]
]

const addFormRef = ref()
const showDialog = ref(false) // 添加公司弹窗显示
const showCompanyPicker = ref(false) // 公司选择器
const showRolePicker = ref(false) // 角色选择器
const showDepPicker = ref(false) //部门选择器
const loadingAllCompany = ref(false) // 选择器内加载所有公司loading
const disabledModifyUsername = ref(false) // 是否禁止修复名字，如果手机号登录返回的信息包含了名字，则禁止修改
const allCompanys = ref([]) //  所有公司
// 选中的公司部门信息
const companyDep = reactive({
	one: [],
	two: [],
	activeIndex: 0
})
const addData = ref(cloneDeep(defaultAddData))
const errorMsg = ref('')

// 显示添加公司弹窗
function showAddCompany() {
	showDialog.value = true
	getAllCompanys()
}

// 打开弹窗时设置表单规则
function openAddCompanyEvent() {
	if (userStore.userLoginInfo.user && userStore.userLoginInfo.user != '') {
		addData.value.username = userStore.userLoginInfo.user
		disabledModifyUsername.value = true
	}
	unref(addFormRef).setRules(rules)
}

// 获取所有公司
function getAllCompanys() {
	loadingAllCompany.value = true
	request
		.get('/?m=api&c=companylib&a=plist', {
			search: '',
			page: 1,
			num: 10000,
			token: userStore.userLoginInfo.token
		})
		.then(res => {
			allCompanys.value = [
				res.data.filter(item => item.weburl.indexOf('http://') !== -1 || item.weburl.indexOf('https://') !== -1)
			]
		})
		.finally(() => {
			loadingAllCompany.value = false
		})
}

// 设置公司
function setAddCompany(e) {
	const data = e.value[0]
	addData.value.company.id = data.id
	addData.value.company.name = data.name
	showCompanyPicker.value = false
	companyDep.one = []
	companyDep.two = []
	companyDep.activeIndex = 0
	addData.value.dep = {
		id: null,
		name: ''
	}
	addData.value.customerName = ''
	uni.request({
		url: data.weburl,
		success: (res: any) => {
			if (res.data.rcode == 0) {
				const onePicker = []
				const twoPicker = []
				res.data.data.organization.forEach((item, index) => {
					onePicker.push(item)
					if (item.children && Array.isArray(item.children)) {
						twoPicker[index] = item.children
					} else {
						twoPicker[index] = []
					}
				})
				companyDep.one = onePicker
				companyDep.two = twoPicker
			} else {
				uni.showToast({
					icon: 'error',
					title: '部门加载失败'
				})
			}
		},
		fail: () => {
			uni.showToast({
				icon: 'error',
				title: '部门加载失败'
			})
		}
	})
}

// 设置角色
function setAddRole(e) {
	addData.value.role.id = e.value[0].id
	addData.value.role.name = e.value[0].name
	showRolePicker.value = false
	addData.value.dep = {
		id: null,
		name: ''
	}
	addData.value.customerName = ''
}

// 设置部门
function setAddDep(e) {
	let index = 1
	if (e.value[1] == null) index = 0
	addData.value.dep.id = e.value[index].id
	addData.value.dep.name = e.value[index].name
	showDepPicker.value = false
}

// 更新部门右边列数据
function depChangeHandler(e) {
	if (e.columnIndex === 0) companyDep.activeIndex = e.index
}

// 添加公司
function addCompany() {
	errorMsg.value = ''
	unref(addFormRef)
		.validate()
		.then(valid => {
			if (!valid) return
			const data = {
				uid: userStore.userLoginInfo.uid,
				name: addData.value.username,
				company_code: addData.value.company.id,
				role: addData.value.role.id
			} as any
			if (data.role == 0) {
				data.department = addData.value.dep.id
			} else if (data.role == 1) {
				data.customer = addData.value.customerName
			}
			uni.showLoading({
				mask: true,
				title: '正在提交...'
			})
			request
				.post('/?m=api&c=user&a=cu_relation', data)
				.then(res => {
					uni.hideLoading()
					if (res.rcode == 0) {
						uni.showToast({
							title: '添加成功'
						})
						addData.value = cloneDeep(defaultAddData)
						showDialog.value = false
						emits('success')
					} else {
						errorMsg.value = res.msg
					}
				})
				.catch(() => {
					uni.hideLoading()
				})
		})
}
</script>

<style></style>
