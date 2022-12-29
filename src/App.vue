<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'

const appStore = useAppStore()
const userStore = useUserStore()

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

onLaunch(() => {
	checkLoginStatus()
	windowResizeHandler()
	appStore.initServer(ServerEnv.PROD)
})

onShow(() => {
	uni.onWindowResize(windowResizeHandler)
})

onHide(() => {
	uni.offWindowResize(windowResizeHandler)
})
</script>

<style lang="scss">
@import '@/styles/index.scss';
</style>
