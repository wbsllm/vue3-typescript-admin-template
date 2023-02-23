<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="$store.state.app.device === 'mobile' && store.state.app.sidebar.opened" class="drawer-bg"
      @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: $store.state.settings.tagsView }" class="main-container">
      <div :class="{ 'fixed-header': $store.state.settings.fixedHeader }">
        <navbar />
        <tags-view v-if="$store.state.settings.tagsView" />
      </div>
      <app-main />
      <right-panel v-if="$store.state.settings.showSettings">
        <setting />
      </right-panel>
    </div>
  </div>
</template>

<script setup lang="ts" name="Layout">
import RightPanel from '@/components/RightPanel/index.vue'
import { IRootState } from '@/store'
import { AppMain, Navbar, Sidebar, TagsView, Setting } from './components'
import resizeMixin from './mixins/ResizeHandler'
const store = useStore<IRootState>()
let classObj = computed(() => ({
  hideSidebar: !store.state.app.sidebar.opened,
  openSidebar: store.state.app.sidebar.opened,
  withoutAnimation: store.state.app.sidebar.withoutAnimation,
  mobile: store.state.app.device === 'mobile'
}))
resizeMixin()
const handleClickOutside = () => {
  store.dispatch('app/closeSideBar', { withoutAnimation: false })
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.module.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
