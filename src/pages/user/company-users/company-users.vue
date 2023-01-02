<template>
	<view class="flex">
		<view class="container-left" style="width: 120px">
			<view
				v-for="(item, index) in depData"
				:key="item.id"
				class="item"
				:class="{ actived: activedIndex === index }"
				@click="activedIndex = index">
				{{ item.name }}
			</view>
		</view>
		<view class="flex-1 h-screen bg-white">
			<scroll-view class="w-full h-full" scroll-y>
				<view v-for="dep in depUserData" :key="dep.id" class="p-2 w-full">
					<view class="flex items-center text-sm font-bold" style="height: 36px">{{ dep.name }}</view>
					<uni-row class="w-full" :gutter="10">
						<uni-col v-for="item in dep.member" :key="item.uid" :span="6">
							<view class="p-1 flex flex-col items-center" @click="skipUserDetail(item)">
								<image
									v-if="item.face != null && item.face != ''"
									:src="item.face"
									class="rounded-md"
									mode="aspectFill"
									style="width: 32px; height: 32px" />
								<uni-icons v-else type="contact" size="24"></uni-icons>
								<view class="text-ellipsis text-center mt-1 text-xs" style="width: 50px">
									{{ item.user }}
								</view>
							</view>
						</uni-col>
					</uni-row>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/store/user'

export default {
	data() {
		return {
			activedIndex: 0,
			depData: [], // 所有部门
			depUserData: [] // 部门用户
		}
	},
	computed: {
		...mapState(useUserStore, ['userLoginInfo'])
	},
	watch: {
		activedIndex(newValue) {
			this.getDepUserData(this.depData[newValue].id)
		}
	},

	methods: {
		// 获取左侧部门信息
		getDepData() {
			request.siteGet('/?m=api&c=organization&a=plist').then(res => {
				if (res.rcode == 0) {
					this.depData = res.data
					if (this.depData.length > 0) this.getDepUserData(this.depData[0].id)
				}
			})
		},
		// 获取右侧用户信息
		getDepUserData(id) {
			request
				.siteGet('/?m=api&c=organization&a=dlist', {
					uid: this.userLoginInfo.uid,
					cat_id: id
				})
				.then(res => {
					if (res.rcode == 0) this.depUserData = res.data
				})
		},
		skipUserDetail(user) {
			uni.navigateTo({
				url: '/pages/user/company-users/detail/detail?userId=' + user.uid
			})
		}
	},
	onLoad() {
		this.getDepData()
	}
}
</script>

<style scoped lang="scss">
.container-left {
	display: flex;
	flex-direction: column;
	border-right: 1px solid #ccc;

	& > .item {
		height: 44px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid #ccc;

		&.actived {
			background-color: var(--color-white-1);
			color: var(--color-primary);
		}
	}
}
</style>
