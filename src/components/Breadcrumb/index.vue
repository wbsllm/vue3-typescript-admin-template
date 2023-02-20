<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{
          item.meta?.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta?.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { RouteConfig } from '@/router';
import * as pathToRegexp from 'path-to-regexp'
type Route = Partial<RouteConfig>

let levelList = ref<Route[]>([])
const route = useRoute()
const router = useRouter()

const getBreadcrumb = () => {
  let matched = route.matched.filter(item => item.meta && item.meta.title) as (Route)[]
  const first = matched[0]

  if (!isDashboard(first)) {
    matched.unshift({ path: '/dashboard', meta: { title: 'Dashboard' } })
  }

  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  )
}

const isDashboard = (route: Route) => {
  const name = route && route.name
  if (!name) {
    return false
  }
  return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}

const handleLink = (item: Route) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect)
    return
  }
  router.push(pathCompile(path!))
}

const pathCompile = (path: string) => {
  // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
  const { params } = route
  var toPath = pathToRegexp.compile(path)
  return toPath(params)
}

watch(route, route => {
  if (route.path.startsWith('/redirect/')) {
    return
  }
  getBreadcrumb()
}, { immediate: true })
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
