import { Module } from 'vuex'
import { IRootState } from '..'

import { defaultSettings, ISettings, } from '@/settings'

export type ISettingsState = ISettings

const store: Module<ISettingsState, IRootState> = {
  namespaced: true,
  state: defaultSettings,
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
