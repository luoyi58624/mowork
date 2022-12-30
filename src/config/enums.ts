// 服务环境，不同的环境访问不同的服务器接口
export enum ServerEnv {
	DEV = 'http://moplat.develop.mowork.cn', // 开发环境
	TEST = 'http://moplat.testing.mowork.cn', // 测试环境
	PROD = 'http://moplat.mowork.cn' // 生成环境
}

// LocalStorage存储的key
export enum StorageKey {
	USER_LOGIN_INFO = 'user_login_info', // 用户登录信息key
	COMPANY_INFO = 'company_info', // 公司信息key
	HAS_COMPANYS = 'has_companys' // 用户已加入的所有公司信息key
}
