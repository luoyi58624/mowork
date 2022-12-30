<template>
  <view class="relative w-screen bg-primary" style="height: 160px;">
    <view class="px-4 pt-2 flex text-white">
      <view
          class="flex flex-col items-center flex-1 m-scale-85"
          v-for="(item, index) in projects"
          :key="index"
          @tap="skipPage(item.url)"
      >
        <m-icon :type="item.icon" size="30" color="var(--color-white)"/>
        <text class="mt-1 font-bold text-sm">{{ item.name }}</text>
      </view>
    </view>
    <view class="absolute px-3 py-4 rounded-md bg-white m-elevation-2" style="width: 90%;left: 5%;top:90px;">
      <view class="font-bold">待办事项</view>
      <view class="flex mt-4">
        <view
            class="flex flex-col items-center flex-1 m-scale-85"
            v-for="item in todos"
            :key="item.name"
            @tap="skipPage(item.url)"
        >
          <m-icon :type="item.icon" size="28" color="var(--color-primary)"/>
          <text class="mt-1 font-bold text-xs text-black-2">{{ item.name }}</text>
          <text class="text-primary mt-1 font-bold text-sm">{{ item.count }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      projects: [
        {
          name: '项目管理',
          icon: 'project',
          url: '/pages/project/list/list'
        },
        {
          name: '计划控制',
          icon: 'control',
          url: '/pages/plan/list/list'
        },
        {
          name: '任务跟踪',
          icon: 'task',
          url: '/pages/task/list/list'
        },
        {
          name: 'ISSUE',
          icon: 'edit',
          url: '/pages/issue/list/list'
        }
      ],
      todos: [
        {
          name: '我的任务',
          count: 0,
          icon: 'task',
          url: '/pages/project/list/list'
        },
        {
          name: '我的ISSUE',
          count: 0,
          icon: 'edit',
          url: '/pages/issue/list/list?publish=false'
        },
        {
          name: '我的审批',
          count: 0,
          icon: 'shenpi'
        }
      ]
    }
  },
  methods: {
    skipPage(url) {
      if (this.$store.getters.isSelectedCompany) {
        uni.navigateTo({
          url
        })
      } else {
        uni.showToast({
          icon: 'error',
          title: '请选择公司'
        })
      }
    },
    setData(datas) {
      this.todos[0].count = datas.task.count
      this.todos[1].count = datas.issue.count
      this.todos[2].count = datas.verify.count
    }
  }
}
</script>

<style></style>
