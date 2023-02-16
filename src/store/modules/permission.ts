import { asyncRoutes, constantRoutes, RouteConfig } from '@/router'
import { Module } from 'vuex'
import { IRootState } from '..'

const hasPermission = (roles: string[], route: RouteConfig) => {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta?.roles?.includes(role))
  } else {
    return true
  }
}

export function filterAsyncRoutes(routes: RouteConfig[], roles: string[]) {
  const res: RouteConfig[] = []

  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export interface IPermissionState {
  routes: RouteConfig[]
  addRouters: RouteConfig[]
}

const store: Module<IPermissionState, IRootState> = {
  namespaced: true,
  state: {
    routes: constantRoutes,
    addRouters: []
  },
  mutations: {
    SET_ROUTES(state, routers: RouteConfig[]) {
      state.addRouters = routers
      state.routes = constantRoutes.concat(routers)
    }
  },
  actions: {
    generateRoutes({ commit }, roles: string[]) {
      return new Promise((resolve) => {
        let accessedRoutes
        if (roles.includes('SADMIN')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}

export default store
