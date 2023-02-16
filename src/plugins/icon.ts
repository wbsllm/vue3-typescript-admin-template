import { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
  install(Vue: App) {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      Vue.component(key, component)
    }
  }
}
