import { App, Component } from 'vue'

const components = import.meta.glob<{ default: Component }>('./**/*.vue', {
  eager: true
})

export default {
  install(Vue: App) {
    Object.keys(components).forEach((key) => {
      let name = key.replace(/(^\.\/)|(\/index\.vue$)/g, '')
      // only have Index file can be register in Global Vue
      if(name.endsWith('.vue')) return
      Vue.component(name, components[key].default)
    })
  }
}
