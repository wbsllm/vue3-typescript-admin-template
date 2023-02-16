<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { isExternal } from '@/utils/validate'
const props = defineProps<{ to: string }>()
const { to } = toRefs(props)
const type = computed(() => {
  if (isExternal(to.value)) {
    return 'a'
  }
  return 'router-link'
})
const linkProps = (to: string) => {
  if (isExternal(to)) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return {
    to: to
  }
}
</script>
