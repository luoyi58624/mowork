import { defineStore } from 'pinia'

// 用户登录成功后的信息
interface UserLoginInfo {
	uid: string // 用户id
	user: string // 用户名字
	face: string // 头像地址，http开头
	token: string // 用户登录云平台token，即手机验证码登录获取的token
	siteToken: string // 站点token，当用户选择公司获得，后续绝大多数操作都携带该token
}

interface CompanyInfo {
	name: string // 公司名字
	code: string // 公司编码
	weburl: string // 站点接口地址
}

export const useUserStore = defineStore('user', {
	state: () => ({ userLoginInfo: {} as UserLoginInfo, companyInfo: {} as CompanyInfo, hasCompanys: [] }),
	getters: {
		isLogin: state => state.userLoginInfo.uid != null, // 用户是否登录
		isSelectedCompany: state => state.companyInfo.code != null, // 用户是否选择了公司
		siteUrl: state => 'https://' + state.companyInfo.weburl // (站点、子平台)接口地址，即用户选择公司后获得的站点地址，后续绝大多数请求都是调用该地址
	},
	actions: {
		// 初始化用户store信息
		initUserStore() {
			const userLoginInfo = uni.getStorageSync(StorageKey.USER_LOGIN_INFO)
			const companyInfo = uni.getStorageSync(StorageKey.COMPANY_INFO)
			const hasCompanys = uni.getStorageSync(StorageKey.HAS_COMPANYS)
			if (userLoginInfo) this.userLoginInfo = JSON.parse(userLoginInfo)
			if (companyInfo) this.companyInfo = JSON.parse(companyInfo)
			if (hasCompanys) this.hasCompanys = JSON.parse(hasCompanys)
		},
		// 清除登录信息
		clearLoginInfo() {
			this.userInfo = {}
			this.companyInfo = {}
			this.hasCompanys = {}
			uni.removeStorageSync(StorageKey.USER_LOGIN_INFO)
			uni.removeStorageSync(StorageKey.COMPANY_INFO)
			uni.removeStorageSync(StorageKey.HAS_COMPANYS)
		},
		// 设置用户登录信息，并同步到本地
		setUserLoginInfo(value) {
			this.userLoginInfo = value
			uni.setStorageSync(StorageKey.USER_LOGIN_INFO, JSON.stringify(value))
		},
		// 设置选中的公司信息，并同步到本地
		setCompanyInfo(value) {
			this.companyInfo = value
			uni.setStorageSync(StorageKey.COMPANY_INFO, JSON.stringify(value))
		},
		// 设置用户已加入的所有公司信息，并同步到本地
		setHasCompanys(value) {
			this.hasCompanys = value
			uni.setStorageSync(StorageKey.HAS_COMPANYS, JSON.stringify(value))
		},
		// 获取用户已加入的公司信息，当用户登录成功后触发
		getHasCompanys() {
			return new Promise(reslove => {
				request
					.get('/?m=api&c=companylib&a=mylist', {
						uid: this.userLoginInfo.uid,
						token: this.userLoginInfo.token
					})
					.then(res => {
						const data = res.data.map(item => {
							return {
								...item,
								loading: false // 追加loading属性，当用户选择公司时触发
							}
						})
						this.setHasCompanys(data)
						reslove(data)
					})
			})
		}
	}
})
