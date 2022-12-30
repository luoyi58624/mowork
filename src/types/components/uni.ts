import { App } from 'vue'
import UniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'
import UniRow from '@dcloudio/uni-ui/lib/uni-row/uni-row.vue'
import UniCol from '@dcloudio/uni-ui/lib/uni-col/uni-col.vue'

export default {
  install(Vue: App) {
    Vue.component('UniIcons', UniIcons)
    Vue.component('UniRow', UniRow)
    Vue.component('UniCol', UniCol)
    Vue.component('ScrollView', {} as unknown)
    Vue.component('Picker', {} as unknown)
    Vue.component('Swiper', {} as unknown)
    Vue.component('SwiperItem', {} as unknown)
  }
}

