import { defineStore } from 'pinia'

/**
 * 该 store 维护所有和用户选中的公司相关的全局状态，例如：项目管理、计划管理、公司成员
 */
export const useCompanyStore = defineStore('company', {
	state: () => ({
		projectManagers: [], // 项目经理
		users: [], // 公司所有成员
		projectStatus: projectStatus, // 项目状态
		urgencyDegrees: urgencyDegrees // 紧急程度
	}),
	getters: {},
	actions: {
		/**
		 * 获取该公司所有的项目经理
		 * @param reset 是否重置，如果为false，直接返回store内的数据
		 */
		getProjectManagers(reset = false) {
			return new Promise((reslove, reject) => {
				if (this.projectManagers.length > 0 && !reset) {
					reslove(this.projectManagers)
				} else {
					request
						.siteGet('/?m=api&c=manager&a=pmanagerlist')
						.then(res => {
							if (res.rcode == 0) {
								const data = res.data.map(item => {
									return {
										id: item.id,
										name: item.user
									}
								})
								this.projectManagers = data
								reslove(data)
							} else {
								reject(res)
							}
						})
						.catch(e => {
							reject(e)
						})
				}
			})
		},
		// 获取公司所有的用户
		getAllUser(reset = false) {
			return new Promise(reslove => {
				if (this.users.length > 0 && !reset) {
					reslove(this.users)
				} else {
					request.siteGet('/?m=api&c=user&a=plist').then(res => {
						const data = res.data.users
						this.users = data
						reslove(data)
					})
				}
			})
		}
	}
})

const projectStatus = [
	{
		name: '已驳回',
		value: '0',
		boo: false
	},
	{
		name: '进行中',
		value: '1',
		boo: false
	},
	{
		name: '待审核',
		value: '2',
		boo: false
	},
	{
		name: '待批准',
		value: '3',
		boo: false
	},
	{
		name: '已暂停',
		value: '5',
		boo: false
	},
	{
		name: '已完结',
		value: '6',
		boo: false
	},
	{
		name: '已关闭',
		value: '8',
		boo: false
	},
	{
		name: '待复核',
		value: '9',
		boo: false
	}
]

// 紧急程度
const urgencyDegrees = [
	{
		name: '非常紧急',
		value: 1
	},
	{
		name: '紧急',
		value: 2
	},
	{
		name: '一般',
		value: 3
	}
]
