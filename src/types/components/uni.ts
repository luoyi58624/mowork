import { App } from 'vue'
import UniForms from '@dcloudio/uni-ui/lib/uni-forms/uni-forms.vue'
import UniFormsItem from '@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.vue'

export default {
  install(Vue: App) {
    Vue.component('UniForms', UniForms)
    Vue.component('UniFormsItem', UniFormsItem)
    Vue.component('Picker', {} as unknown)
  }
}

