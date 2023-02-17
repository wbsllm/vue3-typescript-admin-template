<template>
  <div ref="rightPanel" :class="{ show: show }" class="rightPanel-container">
    <!-- <div class="rightPanel-background" /> -->
    <div class="rightPanel">
      <div
        class="handle-button"
        :style="{ top: buttonTop + 'px', 'background-color': theme }"
        @click.stop="show = !show"
      >
        <el-icon v-if="show">
          <CloseBold />
        </el-icon>
        <el-icon v-else>
          <Setting />
        </el-icon>
      </div>
      <div class="rightPanel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script name="RightPanel" setup lang="ts">
import { IRootState } from '@/store'
import { addClass, removeClass } from '@/utils'
const store = useStore<IRootState>()
let show = ref(false)
let theme = computed(() => store.state.settings.theme)
let rightPanel = ref<Node>()

const insertToBody = () => {
  const body = document.querySelector('body')
  body?.insertBefore(rightPanel.value!, body.firstChild)
}

onMounted(() => {
  insertToBody()
})
onBeforeUnmount(() => {
  const body = document.querySelector('body')
  body?.removeChild(rightPanel.value!)
})
const props = withDefaults(
  defineProps<{ clickNotClose: boolean; buttonTop: number }>(),
  {
    clickNotClose: false,
    buttonTop: 250
  }
)
const { clickNotClose, buttonTop } = toRefs(props)
watch(show, (value) => {
  if (value && !clickNotClose.value) {
    addEventClick()
  }
  if (value) {
    addClass(document.body, 'showRightPanel')
  } else {
    removeClass(document.body, 'showRightPanel')
  }
})
const addEventClick = () => {
  window.addEventListener('click', closeSidebar)
}
const closeSidebar = (evt: any) => {
  const parent = evt.target.closest('.rightPanel')
  if (!parent) {
    show.value = false
    window.removeEventListener('click', closeSidebar)
  }
}
</script>

<style>
.showRightPanel {
  overflow: hidden;
  position: relative;
  width: calc(100% - 15px);
}
</style>

<style lang="scss" scoped>
.rightPanel-background {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  background: rgba(0, 0, 0, 0.2);
  z-index: -1;
}

.rightPanel {
  width: 100%;
  max-width: 260px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 40000;
}

.show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

  .rightPanel-background {
    z-index: 20000;
    opacity: 1;
    width: 100%;
    height: 100%;
  }

  .rightPanel {
    transform: translate(0);
  }
}

.handle-button {
  width: 48px;
  height: 48px;
  position: absolute;
  left: -48px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  line-height: 48px;

  .el-icon {
    font-size: 24px;
    height: 48px;
  }
}
</style>
