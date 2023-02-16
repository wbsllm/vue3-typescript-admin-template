import { Module, ModuleTree } from 'vuex'
import { IRootState } from '..'

interface StoreModule {
  default: Module<IRootState, IRootState>
}

const files = import.meta.glob<StoreModule>('./*.ts', { eager: true })
const modules: ModuleTree<IRootState> = {}

Object.keys(files).forEach((key) => {
  let name = key.replace('./', '').replace('.ts', '')
  modules[name] = files[key].default
})

export default modules
