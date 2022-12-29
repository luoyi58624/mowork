import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	plugins: [
		uni(),
		AutoImport({
			// 使用自动导入api会丢失类型提示，放一个pinia只是防止输出警告
			imports: ['pinia'],
			dirs: ['./src/utils', './src/store', './src/config'],
			dts: './src/types/auto-imports.d.ts'
		})
	]
})
