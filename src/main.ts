import App from './App.vue'
import '@/styles/index.scss'

import router from './router'
import store from './store'

// plugins
import components from './components'
import icons from './icons'
import i18n from './lang'

import 'virtual:svg-icons-register'
import './permission'

const app = createApp(App)
app.use(router).use(store).use(components).use(i18n).use(icons).mount('#app')
