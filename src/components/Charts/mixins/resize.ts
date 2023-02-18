import { debounce } from '@/utils'
import { ECharts } from 'echarts'
let echart = shallowRef<ECharts>()
let $_sidebarElm = ref<Element>()
let $_resizeHandler: (e: Event) => void

const $_initResizeEvent = () => {
  window.addEventListener('resize', $_resizeHandler)
}
const $_destroyResizeEvent = () => {
  window.removeEventListener('resize', $_resizeHandler)
}
const $_sidebarResizeHandler = (e: any) => {
  if (e.propertyName === 'width') {
    $_resizeHandler(e)
  }
}
const $_initSidebarResizeEvent = () => {
  $_sidebarElm.value = document.getElementsByClassName('sidebar-container')[0]
  $_sidebarElm.value.addEventListener('transitionend', $_sidebarResizeHandler)
}
const $_destroySidebarResizeEvent = () => {
  $_sidebarElm.value?.removeEventListener(
    'transitionend',
    $_sidebarResizeHandler
  )
}
export default function () {
  onMounted(() => {
    $_resizeHandler = debounce(() => {
      echart.value?.resize()
    }, 100)
    $_initResizeEvent()
    $_initSidebarResizeEvent()
  })

  onBeforeUnmount(() => {
    $_destroyResizeEvent()
    $_destroySidebarResizeEvent()
  })
  onActivated(() => {
    $_initResizeEvent()
    $_initSidebarResizeEvent()
  })

  onDeactivated(() => {
    $_destroyResizeEvent()
    $_destroySidebarResizeEvent()
  })
  return echart
}
