<template>
  <div
    v-if="isExternal(iconClass)"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
  />
  <svg v-else :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup name="SvgIcon" lang="ts">
import { isExternal } from '@/utils/validate'
const props = withDefaults(
  defineProps<{ iconClass: string; className?: string }>(),
  { className: '' }
)
const { iconClass, className } = toRefs(props)
const styleExternalIcon = computed(() => ({
  mask: `url(${iconClass.value}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${iconClass.value}) no-repeat 50% 50%`
}))
const svgClass = computed(() => {
  if (className.value) {
    return 'svg-icon ' + className.value
  } else {
    return 'svg-icon'
  }
})
const iconName = computed(() => `#icon-${iconClass.value}`)
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
