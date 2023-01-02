import { App } from 'vue'

// vue全局属性
export function useGlobalProperties(app: App) {
	// 全局filter，template可以直接通过 $filter.xxxx 使用
	app.config.globalProperties.$filter = {
		percentFilter(value) {
			let newValue
			if (isNaN(Number(value))) newValue = value
			else newValue = value + '%'
			return newValue
		},
		sexFilter(value) {
			let newValue
			if (isEmpty(value)) {
				newValue = '未知'
			} else {
				if (value == 0) {
					newValue = '女'
				} else if (value == 1) {
					newValue = '男'
				}
			}
			return newValue
		}
	}
}
