import { Module } from 'vuex'
import { IRootState } from '..'
import variables, {
  IScssVariables
} from '@/styles/element-variables.module.scss'
import { defaultSettings, ISettings } from '@/settings'

export type ISettingsState = Omit<ISettings, 'errorLog' | 'title'> &
  IScssVariables

const store: Module<ISettingsState, IRootState> = {
  namespaced: true,
  state: {
    ...defaultSettings,
    theme: variables.theme
  },
  mutations: {
    CHANGE_SETTING: (
      state,
      { key, value }: { key: keyof ISettingsState; value: never }
    ) => {
      if (state.hasOwnProperty(key)) {
        state[key] = value
      }
    }
  },
  actions: {
    changeSetting({ commit }, data) {
      commit('CHANGE_SETTING', data)
    }
  }
}

export default store
