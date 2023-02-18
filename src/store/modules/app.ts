import { Module } from 'vuex'
import Cookies from 'js-cookie'
import { IRootState } from '..'
import { getLanguage } from '@/lang'

export interface IAppState {
  device: string
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  size: string
  language: string
}

const store: Module<IAppState, IRootState> = {
  namespaced: true,
  state: {
    device: 'desktop',
    sidebar: {
      opened: Cookies.get('sidebarStatus')
        ? !!+Cookies.get('sidebarStatus')!
        : true,
      withoutAnimation: false
    },
    language: getLanguage(),
    size: Cookies.get('size') || 'medium'
  },
  mutations: {
    TOGGLE_SIDEBAR: (state) => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', '1')
      } else {
        Cookies.set('sidebarStatus', '0')
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', '0')
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    SET_LANGUAGE: (state, language: string) => {
      state.language = language
      Cookies.set('language', language)
    },
    TOGGLE_DEVICE: (state, device: string) => {
      state.device = device
    },
    SET_SIZE: (state, size: string) => {
      state.size = size
      Cookies.set('size', size)
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setLanguage({ commit }, language: string) {
      commit('SET_LANGUAGE', language)
    },
    setSize({ commit }, size) {
      commit('SET_SIZE', size)
    }
  }
}

export default store
