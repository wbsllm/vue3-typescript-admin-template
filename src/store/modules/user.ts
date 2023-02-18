import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter, RouteConfig } from '@/router'
import { Module } from 'vuex'
import { IRootState } from '..'
import { login, logout, getInfo } from '@/api/user'

export interface IUserState {
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
}

const store: Module<IUserState, IRootState> = {
  namespaced: true,
  state: {
    token: getToken() || '',
    name: '',
    introduction: '',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    roles: []
  },
  mutations: {
    SET_TOKEN: (state, token: string) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction: string) => {
      state.introduction = introduction
    },
    SET_NAME: (state, username: string) => {
      state.name = username
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
        login({ username: username.trim(), password: password })
          .then((response) => {
            const { data } = response

            commit('SET_TOKEN', data.token)
            setToken(data.token)
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // get user info
    getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then((response) => {
            const { data } = response

            if (!data) {
              reject('Verification failed, please Login again.')
            }

            const { roles, name, avatar, introduction } = data

            // roles must be a non-empty array
            if (!roles || roles.length <= 0) {
              reject('getInfo: roles must be a non-null array!')
            }

            commit('SET_ROLES', roles)
            commit('SET_NAME', name)
            commit('SET_AVATAR', avatar)
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // user logout
    logout({ commit, state, dispatch }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resetRouter()

            // reset visited views and cached views
            // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
            dispatch('tagsView/delAllViews', null, { root: true })

            resolve('')
          })
          .catch((error) => {
            reject(error)
          })
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
    },

    // dynamically modify permissions
    async changeRoles({ commit, dispatch }, role) {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = (await dispatch('permission/generateRoutes', roles, {
        root: true
      })) as RouteConfig[]
      // dynamically add accessible routes
      accessRoutes.forEach((route) => {
        router.addRoute(route)
      })

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })
    }
  }
}

export default store
