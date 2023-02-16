import { App, Component } from 'vue'

interface ComponentModule {
  default: Component
}

const files = import.meta.glob<ComponentModule>('./**/*.vue', { eager: true })
const modules: Record<string, Component> = {}

Object.keys(files).forEach((key) => {
  let name = key.replace('./', '').replace('.ts', '')
  modules[name] = files[key].default
})

export default {
  install(Vue: App) {
    Object.keys(files).forEach((key) => {
      let name = key.replace(/(^\.\/)|(\.vue$)/, '')
      Vue.component(name, files[key].default)
    })
  }
}
