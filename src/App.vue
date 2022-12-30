<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'

const appStore = useAppStore()
const userStore = useUserStore()

// 应用启动生命周期
onLaunch(() => {
	appStore.initAppStore() // 初始化appStore
	userStore.initUserStore() // 初始化userStore
	checkLoginStatus() // 检查登录状态
})

onShow(() => {
	uni.onWindowResize(windowResizeHandler)
})

onHide(() => {
	uni.offWindowResize(windowResizeHandler)
})

// 检测登录状态
function checkLoginStatus() {
	if (userStore.isLogin) {
		closeSplashscreen()
	} else {
		uni.reLaunch({
			url: '/pages/login/login',
			success: () => {
				closeSplashscreen()
			}
		})
	}
}

// 关闭启动封面-仅APP
function closeSplashscreen() {
	// #ifdef APP
	plus.navigator.closeSplashscreen()
	// #endif
}

// 监听窗口尺寸变化
function windowResizeHandler() {
	appStore.systemInfo = uni.getSystemInfoSync()
}
</script>

<style lang="scss">
@import '@/styles/index.scss';
</style>
