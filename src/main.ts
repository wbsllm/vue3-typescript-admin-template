import App from './App.vue'
import '@/styles/index.scss'

import router from './router'
import store from './store'

// plugins
import components from './components'
import icons from './icons'

import 'virtual:svg-icons-register'
import './permission'

const app = createApp(App)
app.use(router).use(store).use(components).use(icons).mount('#app')
