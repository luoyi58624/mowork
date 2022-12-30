// 服务器响应的数据
interface ServerData {
	rcode: any // 状态码，0为成功（接口返回的可能为 0，也可能为 '0'，所以判断时直接 res.rcode == 0 即可）
	msg: string
	data: any
}

// 云平台get请求
function get(url, data?) {
	const appStore = useAppStore()
	return new Promise<ServerData>((reslove, reject) => {
		uni.request({
			url: appStore.serverUrl + url,
			data: data,
			header: {},
			success: res => {
				responseSuccessHandler(res, reslove)
			},
			fail: err => {
				responseFailHandler(err, reject)
			}
		})
	})
}

// 云平台post请求
function post(url, data?) {
	const appStore = useAppStore()
	return new Promise<ServerData>((reslove, reject) => {
		uni.request({
			method: 'POST',
			url: appStore.serverUrl + url,
			data: data,
			header: {},
			success: res => {
				responseSuccessHandler(res, reslove)
			},
			fail: err => {
				responseFailHandler(err, reject)
			}
		})
	})
}

// 站点get请求
function siteGet(url, data?) {
	const userStore = useUserStore()
	return new Promise<ServerData>((reslove, reject) => {
		uni.request({
			url: userStore.siteUrl + url,
			data: {
				...data,
				token: userStore.userLoginInfo.siteToken // 站点所有请求都将携带站点token
			},
			header: {},
			success: res => {
				responseSuccessHandler(res, reslove)
			},
			fail: err => {
				responseFailHandler(err, reject)
			}
		})
	})
}

// 站点post请求
function sitePost(url, data?) {
	const userStore = useUserStore()
	return new Promise<ServerData>((reslove, reject) => {
		uni.request({
			method: 'POST',
			url: userStore.siteUrl + url,
			data: {
				...data,
				token: userStore.userLoginInfo.siteToken
			},
			header: {},
			success: res => {
				responseSuccessHandler(res, reslove)
			},
			fail: err => {
				responseFailHandler(err, reject)
			}
		})
	})
}

function responseSuccessHandler(res, reslove) {
	const userStore = useUserStore()
	if (res.data) {
		if (res.data.rcode == 401) {
			console.log(res, '登录过期')
			if (userStore.isLogin) {
				userStore.clearLoginInfo()
				uni.showModal({
					title: '提示',
					content: '当前登录状态已失效，请重新登录',
					showCancel: false,
					confirmText: '确认',
					success: () => {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				})
			}
		}
		reslove(res.data)
	} else {
		reslove(res)
	}
}

function responseFailHandler(err, reject) {
	uni.hideLoading()
	uni.showToast({
		icon: 'error',
		title: '请求错误'
	})
	reject(err)
}

export const request = {
	get,
	post,
	siteGet,
	sitePost
}
