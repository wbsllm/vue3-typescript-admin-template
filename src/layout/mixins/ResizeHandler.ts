import { IRootState } from '@/store'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design
const route = useRoute()
const store = useStore<IRootState>()

const $_isMobile = () => {
  const rect = body.getBoundingClientRect()
  return rect.width - 1 < WIDTH
}

const $_resizeHandler = () => {
  if (!document.hidden) {
    const isMobile = $_isMobile()
    store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

    if (isMobile) {
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  }
}

onBeforeMount(()=>{
    window.addEventListener('resize', $_resizeHandler)
})

onBeforeUnmount(()=>{
    window.removeEventListener('resize', $_resizeHandler)
})

onMounted(() => {
  const isMobile = $_isMobile()
  if (isMobile) {
    store.dispatch('app/toggleDevice', 'mobile')
    store.dispatch('app/closeSideBar', { withoutAnimation: true })
  }
})

watch(route, () => {
  if (store.state.app.device === 'mobile' && store.state.app.sidebar.opened) {
    store.dispatch('app/closeSideBar', { withoutAnimation: false })
  }
})
