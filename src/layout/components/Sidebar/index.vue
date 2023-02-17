<template>
  <div :class="{ 'has-logo': true }">
    <logo v-if="showLogo" :collapse="!isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="!isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts" name="sidebar">
import { IRootState } from '@/store'
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.module.scss'
const store = useStore<IRootState>()
const route = useRoute()
const { permission_routes, sidebar, sidebarLogo } = toRefs(store.getters)
let showLogo = computed(() => sidebarLogo.value)
let isCollapse = computed(() => sidebar.value.opened)
let activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu as string
  }
  return path
})
</script>
