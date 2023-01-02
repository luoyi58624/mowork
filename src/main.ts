import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import App from './App.vue'

import uviewPlus from 'uview-plus'
import { useGlobalProperties } from '@/plugins/globalProperties'

export function createApp() {
	const app = createSSRApp(App)
	app.use(Pinia.createPinia())
	app.use(uviewPlus)

	useGlobalProperties(app)
	return {
		app
	}
}
