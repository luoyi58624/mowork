<template>
	<m-page navbar-bg="var(--color-primary)" navbar-color="#ffffff">
		<template #navbar>
			<view class="w-full flex justify-between px-2">
				<m-menu v-model="showMenu" offsetY="60rpx">
					<view class="flex items-center" :class="{ active: showMenu }" @tap="showMenu = !showMenu">
						<text class="flex items-center font-bold mr-1">{{ menus[selectIndex].name }}</text>
						<uni-icons
							:class="['rotate-180', { active: showMenu }]"
							type="bottom"
							size="20"
							color="var(--color-white)"
						></uni-icons>
					</view>
					<template #menu>
						<view class="py-1 bg-white text-black-3" style="width: 150px;">
							<view v-for="(item, index) in menus" :key="index" class="py-2 px-4 m-scale-85" @tap="setMenu(index)">
								{{ item.name }}
							</view>
						</view>
					</template>
				</m-menu>
				<uni-icons class="m-scale-85" type="compose" size="24" color="var(--color-white)"></uni-icons>
			</view>
		</template>

			<image class="w-full" src="/static/images/xiangmuquan-bg.png" />
			<view class="p-2">
				<view
					class="flex py-4 m-scale-95"
					v-for="(item, index) in listDatas"
					:key="index"
					style="border-bottom: 1px solid #c8c6c4;"
				>
					<view> <uni-icons type="contact-filled" size="64" color="var(--color-primary)"></uni-icons> </view>
					<view class="text-base">
						<view class="text-sm font-bold">{{ item.name }}</view> <view class="text-xs mt-1">{{ item.content }}</view>
						<view class="text-xs mt-1 text-info">{{ item.date }}</view>
					</view>
				</view>
			</view>
	</m-page>
</template>

<script>
export default {
	data() {
		return {
			showMenu: false,
			selectIndex: 0,
			menus: [{ name: '所有项目' }, { name: '我的任务' }, { name: '我的ISSUE' }, { name: '我的审批' }],
			listDatas: []
		}
	},
	methods: {
		setMenu(index) {
			this.selectIndex = index
			this.showMenu = false
		}
	},
	mounted() {
		for (let i = 0; i < 10; i++) {
			this.listDatas.push({
				name: '罗懿',
				content: 'ISSUE编码：IS21212121 ISSUE名称：互动消息：撤回消息重新编辑问题 通过审核',
				date: '11-02 19:08:34'
			})
		}
	},
	onPullDownRefresh() {
		setTimeout(() => {
			uni.stopPullDownRefresh()
		}, 500)
	}
}
</script>

<style scoped lang="less"></style>
