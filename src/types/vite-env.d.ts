/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare global {
  import { ComponentCustomProperties } from 'vue'
  import { Store } from 'vuex'
  import { IRootState } from './store'
  declare module '@vue/runtime-core' {
    // declare your own store states

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
      $store: Store<IRootState>
    }
  }
}
