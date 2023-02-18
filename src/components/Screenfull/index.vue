<template>
  <div>
    <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="click" />
</div>
</template>

<script setup lang="ts">
import screenfull from 'screenfull'
let isFullscreen = ref(false)
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}
const init = () => {
  if (screenfull.isEnabled) {
    screenfull.on('change', change)
  }
}
const destroy = () => {
  if (screenfull.isEnabled) {
    screenfull.off('change', change)
  }
}
const click = () => {
  if (!screenfull.isEnabled) {
    ElMessage({
      message: 'you browser can not work',
      type: 'warning'
    })
    return false
  }
  screenfull.toggle()
}
onMounted(() => {
  init()
})

onUnmounted(() => {
  destroy()
})
</script>
