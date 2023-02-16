import router, { RouteConfig } from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import store from './store'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login','/404','/dashboard','/test/a','/test/b']

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  document.title = getPageTitle(to.meta.title as string)

  const hasToken = getToken()

  //获取完整路径用于登录后重定向
  const path = encodeURIComponent(to.fullPath)

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          const accessRoutes = (await store.dispatch(
            'permission/generateRoutes',
            roles
          )) as RouteConfig[]
          console.log(accessRoutes);
          

          accessRoutes.forEach((route) => {
            router.addRoute(route)
          })
          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('user/resetToken')
          ElMessage.error(error || 'Has Error')
          next(`/login?redirect=${path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
