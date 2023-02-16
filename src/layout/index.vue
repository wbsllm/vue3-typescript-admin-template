<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: settings.tagsView }" class="main-container">
      <div :class="{ 'fixed-header': settings.fixedHeader }">
        <navbar />
        <tags-view v-if="settings.tagsView" />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script setup lang="ts" name="Layout">
import { IRootState } from '@/store'
import { AppMain, Navbar, Sidebar, TagsView } from './components'
import './mixins/ResizeHandler'
const store = useStore<IRootState>()
let { settings } = toRefs(store.state)
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
