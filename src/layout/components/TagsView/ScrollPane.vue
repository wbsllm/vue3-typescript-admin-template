<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
  >
    <slot />
  </el-scrollbar>
</template>

<script setup lang="ts" name="ScrollPane">
import { ScrollbarInstance } from 'element-plus'
const tagAndTagSpacing = 4 // tagAndTagSpacing
let left = ref(0)
let scrollContainer = ref<ScrollbarInstance>()
let emits = defineEmits<{ (e: 'scroll'): void }>()

let scrollWrapper = computed(()=>scrollContainer.value?.wrapRef)
const emitScroll = () => {
  emits('scroll')
}

const handleScroll = (e: any) => {
  const eventDelta = e.wheelDelta || -e.deltaY * 40
  // scrollContainer.value.scrollto.scrollLeft =
  //   $scrollWrapper.scrollLeft + eventDelta / 4
}

// moveToTarget(currentTag) {
//       const $container = this.$refs.scrollContainer.$el
//       const $containerWidth = $container.offsetWidth
//       const $scrollWrapper = this.scrollWrapper
//       const tagList = this.$parent.$refs.tag

//       let firstTag = null
//       let lastTag = null

//       // find first tag and last tag
//       if (tagList.length > 0) {
//         firstTag = tagList[0]
//         lastTag = tagList[tagList.length - 1]
//       }

//       if (firstTag === currentTag) {
//         $scrollWrapper.scrollLeft = 0
//       } else if (lastTag === currentTag) {
//         $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
//       } else {
//         // find preTag and nextTag
//         const currentIndex = tagList.findIndex(item => item === currentTag)
//         const prevTag = tagList[currentIndex - 1]
//         const nextTag = tagList[currentIndex + 1]

//         // the tag's offsetLeft after of nextTag
//         const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

//         // the tag's offsetLeft before of prevTag
//         const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

//         if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
//           $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
//         } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
//           $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
//         }
//       }
//     }

onMounted(() => {
  scrollWrapper.value?.addEventListener('scroll', emitScroll, true)
})

onUnmounted(() => {
  scrollWrapper.value?.removeEventListener('scroll', emitScroll)
})
// export default {
//   name: 'ScrollPane',
//   data() {
//     return {
//       left: 0
//     }
//   },
//   computed: {
//     scrollWrapper() {
//       return this.$refs.scrollContainer.$refs.wrap
//     }
//   },
//   mounted() {
//     this.scrollWrapper.addEventListener('scroll', this.emitScroll, true)
//   },
//   beforeDestroy() {
//     this.scrollWrapper.removeEventListener('scroll', this.emitScroll)
//   },
//   methods: {
//     handleScroll(e) {
//       const eventDelta = e.wheelDelta || -e.deltaY * 40
//       const $scrollWrapper = this.scrollWrapper
//       $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
//     },
//     emitScroll() {
//       this.$emit('scroll')
//     },
//     moveToTarget(currentTag) {
//       const $container = this.$refs.scrollContainer.$el
//       const $containerWidth = $container.offsetWidth
//       const $scrollWrapper = this.scrollWrapper
//       const tagList = this.$parent.$refs.tag

//       let firstTag = null
//       let lastTag = null

//       // find first tag and last tag
//       if (tagList.length > 0) {
//         firstTag = tagList[0]
//         lastTag = tagList[tagList.length - 1]
//       }

//       if (firstTag === currentTag) {
//         $scrollWrapper.scrollLeft = 0
//       } else if (lastTag === currentTag) {
//         $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
//       } else {
//         // find preTag and nextTag
//         const currentIndex = tagList.findIndex(item => item === currentTag)
//         const prevTag = tagList[currentIndex - 1]
//         const nextTag = tagList[currentIndex + 1]

//         // the tag's offsetLeft after of nextTag
//         const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

//         // the tag's offsetLeft before of prevTag
//         const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

//         if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
//           $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
//         } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
//           $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
//         }
//       }
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  ::v-deep {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>
