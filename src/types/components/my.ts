import { App } from 'vue'
import MPage from '@/components/my-components/m-page/m-page.vue'
import MMenu from '@/components/my-components/m-menu/m-menu.vue'
import MIcon from '@/components/my-components/m-icon/m-icon.vue'
import MProgress from '@/components/my-components/m-progress/m-progress.vue'
import MSkeleton from '@/components/my-components/m-skeleton/m-skeleton.vue'
import MTabs from '@/components/my-components/m-tabs/m-tabs.vue'
import MTabsSwiper from '@/components/my-components/m-tabs-swiper/m-tabs-swiper.vue'
import MTag from '@/components/my-components/m-tag/m-tag.vue'

// 该文件仅仅是给 webstorm 添加全局组件提示，pages.json 已经开启 easycom 自动导入功能
export default {
  install(Vue: App) {
    Vue.component('MPage', MPage)
    Vue.component('MMenu', MMenu)
    Vue.component('MIcon', MIcon)
    Vue.component('MProgress', MProgress)
    Vue.component('MSkeleton', MSkeleton)
    Vue.component('MTabs', MTabs)
    Vue.component('MTabsSwiper', MTabsSwiper)
    Vue.component('MTabsSwiper', MTabsSwiper)
    Vue.component('MTag', MTag)
  }
}

