// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

import { checkPermission } from '@/utils/permission'
const app = createApp(App)
app.directive('permission', {
  mounted(el, binding) {
    checkPermission(el, binding)
  },
})
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(router).use(ElementPlus).use(pinia).mount('#app')
