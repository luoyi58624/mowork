import { App } from 'vue'
import UniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'

export default {
  install(Vue: App) {
    Vue.component('UniIcons', UniIcons)
    Vue.component('Picker', {} as unknown)
    Vue.component('Swiper', {} as unknown)
    Vue.component('SwiperItem', {} as unknown)
  }
}

