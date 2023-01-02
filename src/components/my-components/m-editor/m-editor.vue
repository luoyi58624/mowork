<template>
	<view class="editor-wrapper" :style="{ '--editor-height': height }">
		<view class="toolbar">
			<view class="iconfont">
				<m-icon type="image" size="24" color="var(--color-black-3)" @tap="insertImage()"></m-icon>
			</view>
			<view class="iconfont">
				<m-icon type="delete" size="24" color="var(--color-black-3)" @tap="clear()"></m-icon>
			</view>
			<view class="iconfont"> <m-icon type="undo" size="24" color="var(--color-black-3)" @tap="undo()"></m-icon> </view>
			<view class="iconfont">
				<m-icon class="reversalX" type="undo" size="24" color="var(--color-black-3)" @tap="redo()"></m-icon>
			</view>
		</view>

		<editor
			class="editor-container ql-container"
			showImgSize
			showImgToolbar
			showImgResize
			@ready="onEditorReady"
			@input="onInput"
		>
		</editor>
	</view>
</template>

<script>
import { isEmpty } from '@/utils/commons'
export default {
	name: 'm-editor',
	props: {
		// 编辑器内容双向绑定，也可以通过ref调用getHtml、getText方法获取富文本内容
		// uniapp editor组件没有提供value属性，所以v-model只是方便获取内容，以下几点需要注意：
		// 1. 多个富文本绑定同样的值，修改一个编辑器内容无法同步修改其他编辑器
		// 2. 不支持通过v-model初始化内容，请调用setContent方法进行初始化
		modelValue: {
			type: String,
			default: ''
		},
		// 绑定的内容格式化，可选值：html、text
		formatType: {
			type: String,
			default: 'html'
		},
		// 编辑器高度
		height: {
			type: String,
			default: '200px'
		}
	},
	model: {
		prop: 'modelValue',
		event: 'change'
	},
	data() {
		return {
			editorCtx: {},
			formats: {},
			content: {
				html: '',
				text: ''
			}
		}
	},
	methods: {
		// 初始化编辑器
		onEditorReady() {
			uni
				.createSelectorQuery()
				.in(this)
				.select('.editor-container')
				.context(res => {
					this.editorCtx = res.context
				})
				.exec()
		},
		// 监听内容变化
		onInput(e) {
			this.content = {
				html: e.detail.html,
				text: e.detail.text
			}
			this.$emit('change', this.content[this.formatType])
		},
		getHtml() {
			return this.content.html
		},
		getText() {
			return this.content.text
		},
		insertImage() {
			uni.chooseImage({
				count: 1,
				success: res => {
					this.editorCtx.insertImage({
						src: res.tempFilePaths[0],
						alt: '图像',
						success: function() {
							console.log('insert image success')
						}
					})
				}
			})
		},
		clear() {
			this.editorCtx.clear()
		},
		undo() {
			this.editorCtx.undo()
		},
		redo() {
			this.editorCtx.redo()
		}
	}
}
</script>

<style scoped lang="scss">
.editor-wrapper {
	width: 100%;
	height: var(--editor-height);
	border: 1px solid #ccc;

	.toolbar {
		width: 100%;
		height: 40px;
		border-bottom: 1px solid #ccc;
		padding: 0 8px;
		display: flex;
		align-items: center;

		.iconfont {
			width: 36px;
			height: 32px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.ql-container {
		width: 100%;
		min-height: calc(var(--editor-height) - 44px) !important;
		height: calc(var(--editor-height) - 44px);
		padding: 8px 8px;
		box-sizing: border-box;
		font-size: 16px;
		line-height: 1.5;
	}
}
</style>
