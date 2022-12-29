import { defineStore } from 'pinia'

// 用户登录成功后的信息
interface UserLoginInfo {
	uid: string     // 用户id
	name: string
	token: string
}

export const useUserStore = defineStore('user', {
	state: () => ({ userLoginInfo: {} as UserLoginInfo }),
	getters: {
		isLogin: state => state.userLoginInfo.uid != null
	},
	actions: {
		setUserLoginInfo(){

		}
	}
})


