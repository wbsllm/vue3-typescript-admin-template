import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { Module } from 'vuex'
import { IRootState } from '..'
import { login, getInfo } from '@/api'

export interface IUserState {
  token: string
  username: string
  name: string
  avatar: string
  roles: string[]
}

const store: Module<IUserState, IRootState> = {
  namespaced: true,
  state: {
    token: getToken() || '',
    username: '',
    name: '',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    roles: []
  },
  mutations: {
    SET_TOKEN: (state, token: string) => {
      state.token = token
    },
    SET_USERNAME: (state, username: string) => {
      state.username = username
    },
    SET_NAME: (state, name: string) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar: string) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles: string[]) => {
      state.roles = roles
    }
  },
  actions: {
    // user login
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login()
          .then((res) => {
            commit('SET_TOKEN', res.access_token)
            setToken(res.access_token)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // get user info
    getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        const token = getToken()!
        getInfo(token)
          .then((res) => {
            const { id, nickName, avatar, roles } = res
            commit('SET_ID', id)
            commit('SET_ROLES', roles)
            commit('SET_NAME', nickName)
            commit('SET_AVATAR', avatar)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // user logout
    logout({ commit, state, dispatch }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_ID', '')
        commit('SET_ROLES', '')
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')
        removeToken()
        resetRouter()

        dispatch('tagsView/delAllViews', null, { root: true })
        resolve('')
      })
    },

    // remove token
    resetToken({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve('')
      })
    }
  }
}

export default store
