// 服务器响应的数据
interface ServerData {
	rcode: any // 状态码，0为成功（接口返回的可能为 0，也可能为 '0'，所以判断时直接 res.rcode == 0 即可）
	msg: string
	data: any
}

function get(url, data?) {
	const appStore = useAppStore()
	return new Promise<ServerData>((reslove, reject) => {
		uni.request({
			url: appStore.serverUrl + url,
			data: data,
			header: {},
			success: res => {
				reslove(res.data as ServerData)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

function post(url, data?) {
	const appStore = useAppStore()
	return new Promise<ServerData>((reslove, reject) => {
		uni.request({
			method: 'POST',
			url: appStore.serverUrl + url,
			data: data,
			header: {},
			success: res => {
				reslove(res.data as ServerData)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

export const request = {
	get,
	post
}
