<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <KeepAlive :include="cachedViews">
          <component :is="Component"></component>
        </KeepAlive>
      </Transition>
    </router-view>
  </section>
</template>

<script setup lang="ts" name="AppMain">
import { IRootState } from '@/store'
const store = useStore<IRootState>()
const cachedViews = computed(() => store.state.tagsView.cachedViews)
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter-from {
  transform: translateX(-100px);
  opacity: 0;
}
.fade-leave-from {
  transform: translateX(100px);
  opacity: 0;
}
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
