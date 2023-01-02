export {}

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$filter: {
			percentFilter: (value: string | number) => string // 百分比格式化，如果是数字，将自动添加 %，否则原样输出
			sexFilter: (value: string | number) => string // 性别格式化，0=女，1=男，null=未知
		}
	}
}
