import { defineStore } from 'pinia'
import { ServerEnv } from '@/config/enums'

export const useAppStore = defineStore('app', {
	state: () => ({
		systemInfo: {} as UniNamespace.GetSystemInfoResult, // 系统信息，包含窗口高度、状态栏高度等设备一系列信息
		serverUrl: '' // 云平台接口地址
	}),
	actions: {
		// 初始化appStore
		initAppStore() {
			this.systemInfo = uni.getSystemInfoSync()
			this.setServerEnv(ServerEnv.DEV) // 若要打包不同环境的APP只需要修改枚举变量即可
		},
		/**
		 * 设置服务器环境
		 * @param prodEnv   生产环境下指定的服务器地址
		 */
		setServerEnv(prodEnv: ServerEnv) {
			// 开发环境使用uniapp条件编译设置不同的环境
			if (import.meta.env.MODE == 'development') {
				// #ifdef H5
				this.serverUrl = ServerEnv.PROD
				// #endif
				// #ifdef MP-WEIXIN
				this.serverUrl = ServerEnv.TEST
				// #endif
				// #ifdef APP
				this.serverUrl = ServerEnv.DEV
				// #endif
			} else {
				this.serverUrl = prodEnv
			}
		}
	}
})
