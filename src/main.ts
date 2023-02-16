import App from './App.vue'
import '@/styles/index.scss'
import router from './router'
import store from './store'
import components from './components'
import icon from './plugins/icon'
import './permission'
const app = createApp(App)
app.use(router).use(store).use(components).use(icon).mount('#app')
