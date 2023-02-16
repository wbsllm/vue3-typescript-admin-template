import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/index.vue'

export type RouteConfig = RouteRecordRaw & {
  path: string
  name?: string
  hidden?: boolean
  redirect?: string
  alwaysShow?: boolean
  meta?: Partial<IMate>
  children?: RouteConfig[]
}

interface IMate {
  roles: string[]
  title: string
  icon: string
  noCache: boolean
  breadcrumb: boolean
  affix: boolean
  activeMenu: string
  permission: string
}

export const constantRoutes: RouteConfig[] = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'Plus', affix: true }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '测试管理', icon: 'Plus' },
    children: [
      {
        path: 'a',
        component: () => import('@/views/test/a.vue'),
        name: 'Testa',
        meta: { title: 'a', icon: 'Plus' }
      },
      {
        path: 'b',
        component: () => import('@/views/test/b.vue'),
        name: 'Testb',
        meta: { title: 'b', icon: 'Plus' }
      }
    ]
  },
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
]

export const asyncRoutes: RouteConfig[] = []

const router = createRouter({
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, left: 0 }
    }
  },
  history: createWebHistory(),
  routes: constantRoutes
})

export function resetRouter() {
  const newRouter = createRouter({
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      } else {
        return { top: 0, left: 0 }
      }
    },
    history: createWebHistory(),
    routes: constantRoutes
  })
  ;(router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
