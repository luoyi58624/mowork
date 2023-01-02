<template>
	<view>
		<u-index-list :index-list="indexList">
			<template v-for="(users, index) in allUsers">
				<u-index-item>
					<u-index-anchor :text="indexList[index]" bgColor="var(--color-white-2)"></u-index-anchor>
					<view class="bg-white px-4">
						<view v-for="item in users" :key="item.user_id" class="flex items-center my-2">
							<m-checkbox v-model="item.selected" :disabled="item.disabled" @click="clickHandler(item)">
								{{ item.user_name }}
							</m-checkbox>
						</view>
					</view>
				</u-index-item>
			</template>
		</u-index-list>
	</view>
</template>

<script>
import { flattenDeep } from 'lodash-es'
import { generateLetterArray, getChineseHeadLetter } from '@/utils/commons'
import { mapActions } from 'pinia'
import { useCompanyStore } from '@/store/company'

export default {
	data() {
		return {
			options: {
				title: '人员选择',
				multiple: true, // 多选，设置false将只能选一个，如果为false同时设置了默认选中用户，则必须设置 disabledChangeSelected 属性
				selectedUserIds: [], // 默认选中的用户id
				disabledChangeSelected: false, // 是否禁止改变默认已选的用户
				eventName: '' // 点击完成触发的事件名字
			},
			indexList: [],
			allUsers: []
		}
	},
	methods: {
		...mapActions(useCompanyStore, ['getAllUser']),
		getData(reset = false) {
			return new Promise(reslove => {
				this.getAllUser(reset)
					.then(res => {
						const indexList = []
						const userArray = []
						const datas = res.filter(item => item.state == 1)
						// 将所有用户名字首拼音进行分类，其数据结构参考uview u-index-list组件：
						// 包含一个英文字母的一维数组，以及每个英文字母相对应的用户集合的二维数组
						const letterArray = generateLetterArray(true) // 生成26个大写的英文字母数组
						letterArray.forEach(letter => {
							const users = []
							datas.forEach(item => {
								const index = getChineseHeadLetter(item.user_name, true) // 获取用户名字首拼音大写字母
								if (letter === index) {
									if (!indexList.includes(letter)) indexList.push(letter)
									users.push(this.setExtendAttr(item))
								}
							})
							if (users.length > 0) userArray.push(users)
						})
						this.indexList = indexList
						this.allUsers = userArray
					})
					.finally(() => {
						reslove(true)
					})
			})
		},
		// 设置扩展属性，用于对数据进行其他操作
		setExtendAttr(user) {
			const data = {
				...user,
				selected: false, // 控制是否选中
				disabled: false // 是否禁止修改
			}
			if (this.options.selectedUserIds.includes(user.user_id)) {
				data.selected = true
				data.disabled = this.options.disabledChangeSelected
			}
			return data
		},
		checkboxChange(e) {
			console.log(e)
		},
		clickHandler(user) {
			// 如果不是多选，则每次点击选项都重置选中
			if (!this.options.multiple) {
				flattenDeep(this.allUsers)
					.filter(item => item.user_id != user.user_id)
					.filter(item => !item.disabled)
					.forEach(item => {
						item.selected = false
					})
			}
		}
	},
	onLoad(options) {
		if (options.title) this.options.title = options.title
		if (options.multiple == 'false') this.options.multiple = false
		if (options.disabledChangeSelected == 'true') this.options.disabledChangeSelected = true
		if (options.selectedUserIds) this.options.selectedUserIds = JSON.parse(options.selectedUserIds)
		if (options.eventName) this.options.eventName = options.eventName
		this.getData()
		this.$nextTick(() => {
			uni.setNavigationBarTitle({
				title: this.options.title
			})
		})
	},
	async onPullDownRefresh() {
		await this.getData(true)
		uni.stopPullDownRefresh()
	},
	onNavigationBarButtonTap() {
		// 返回上一级，并返回选中的所有用户对象
		uni.$emit(
			this.options.eventName,
			flattenDeep(this.allUsers).filter(item => item.selected)
		)
		uni.navigateBack()
	}
}
</script>

<style lang="scss"></style>
