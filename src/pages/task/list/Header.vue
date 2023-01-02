<template>
	<view class="list-header bg-white">
		<view class="w-full p-2">
			<u-search
				v-model="search"
				placeholder="搜索任务"
				:show-action="false"
				class="w-full"
				@search="getData"
				@clear="getData"
			></u-search>
		</view>

		<view class="w-full p-2 flex items-center justify-between" style="height: 28px;">
			<view class="flex items-center">
				<m-menu v-model="showMenu" offsetY="65rpx">
					<view class="flex items-center m-scale-85" @tap="showMenu = !showMenu">
						<text class="flex items-center text-sm mr-1 text-primary">{{ menus[selectIndex].name }}</text>
						<uni-icons
							:class="['rotate-180', { active: showMenu }]"
							type="bottom"
							size="16"
							color="var(--color-primary)"
						></uni-icons>
					</view>
					<template #menu>
						<view class="py-1 bg-white">
							<view
								v-for="(item, index) in menus"
								:key="index"
								class="py-2 px-3 m-scale-85"
								style="width: 150px;"
								:style="{ color: selectIndex == index ? 'var(--color-primary)' : 'var(--color-black)' }"
								@tap="setMenu(index)"
							>
								<text class="text-sm text-base">{{ item.name }}</text>
							</view>
						</view>
					</template>
				</m-menu>
				<view class="ml-3 m-scale-85" @tap="setSort(true)">
					<text class="text-sm text-info" :style="{ color: descColor }">降序</text>
					<uni-icons type="arrow-down" size="16" :color="descColor"></uni-icons>
				</view>
				<view class="ml-1 m-scale-85" @tap="setSort(false)">
					<text class="text-sm text-info" :style="{ color: ascColor }">升序</text>
					<uni-icons type="arrow-up" size="16" :color="ascColor"></uni-icons>
				</view>
			</view>
			<view class="flex items-center">
				<view class="mx-1 m-scale-85" @tap="$refs.filterDialogRef.openDialog()">
					<m-icon  type="filter" size="18" color="var(--color-info)" />
					<text class="text-info">筛选</text>
				</view>
			</view>
		</view>
		<filter-dialog ref="filterDialogRef" @confirm="setFilterData" @reset="setFilterData"></filter-dialog>
	</view>
</template>

<script>
import FilterDialog from './FilterDialog.vue'
export default {
	components: {
		FilterDialog
	},
	data() {
		return {
			search: '',
			showMenu: false,
			selectIndex: 0,
			menus: [
				{ name: '按开始时间排序', sortName: 'start_date' },
				{ name: '按项目编码排序', sortName: 'code' },
				{ name: '按项目名称排序', sortName: 'name' }
			],
			desc: true, // true降序，false升序
			filterData: {
				state: [1, 6, 7]
			} // 过滤的数据
		}
	},
	computed: {
		descColor() {
			return this.desc ? 'var(--color-primary)' : 'var(--color-info)'
		},
		ascColor() {
			return !this.desc ? 'var(--color-primary)' : 'var(--color-info)'
		}
	},
	methods: {
		setMenu(index) {
			this.selectIndex = index
			this.showMenu = false
			this.getData()
		},
		setSort(value) {
			this.desc = value
			this.getData()
		},
		setFilterData(data) {
			this.filterData = data
			this.getData()
		},
		// 返回符合接口请求的过滤选项
		getFilterOption() {
			return {
				search: this.search,
				sortname: this.menus[this.selectIndex].sortName,
				sort: this.desc ? '1' : '2', // 1.降序  2.升序
				...this.filterData
			}
		},
		// 发射请求数据事件
		getData() {
			this.$emit('getData', this.getFilterOption())
		}
	}
}
</script>

<style scoped lang="scss">
.list-header {
	width: 100vw;
	height: 84px;
	position: fixed;
	left: 0;
	z-index: 10;
	/*  #ifdef H5  */
	top: 44px;
	/*  #endif  */
}
</style>
