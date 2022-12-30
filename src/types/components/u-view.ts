import { App } from 'vue'
import UIcon from 'uview-plus/components/u-icon/u-icon.vue'
import UImage from 'uview-plus/components/u-image/u-image.vue'
import UButton from 'uview-plus/components/u-button/u-button.vue'
import URow from 'uview-plus/components/u-row/u-row.vue'
import UCol from 'uview-plus/components/u-col/u-col.vue'
import UTag from 'uview-plus/components/u-tag/u-tag.vue'
import ULoading from 'uview-plus/components/u-loading/u-loading.vue'
import ULoadingIcon from 'uview-plus/components/u-loading-icon/u-loading-icon.vue'
import UForm from 'uview-plus/components/u-form/u-form.vue'
import UFormItem from 'uview-plus/components/u-form-item/u-form-item.vue'
import UInput from 'uview-plus/components/u-input/u-input.vue'
import UPopup from 'uview-plus/components/u-popup/u-popup.vue'
import UDivider from 'uview-plus/components/u-divider/u-divider.vue'
import UCode from 'uview-plus/components/u-code/u-code.vue'
import UPicker from 'uview-plus/components/u-picker/u-picker.vue'
import UCell from 'uview-plus/components/u-cell/u-cell.vue'
import UCellGroup from 'uview-plus/components/u-cell-group/u-cell-group.vue'
import UToast from 'uview-plus/components/u-toast/u-toast.vue'

export default {
	install(Vue: App) {
		Vue.component('UIcon', UIcon)
		Vue.component('UImage', UImage)
		Vue.component('UButton', UButton)
		Vue.component('URow', URow)
		Vue.component('UCol', UCol)
		Vue.component('UTag', UTag)
		Vue.component('ULoading', ULoading)
		Vue.component('ULoadingIcon', ULoadingIcon)
		Vue.component('UForm', UForm)
		Vue.component('UFormItem', UFormItem)
		Vue.component('UInput', UInput)
		Vue.component('UPopup', UPopup)
		Vue.component('UDivider', UDivider)
		Vue.component('UCode', UCode)
		Vue.component('UPicker', UPicker)
		Vue.component('UCell', UCell)
		Vue.component('UCellGroup', UCellGroup)
		Vue.component('UToast', UToast)
	}
}
