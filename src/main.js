import { createApp } from 'vue'
import VueCookies from 'vue3-cookies'

import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css"

const app = createApp(App)

app.use(router)
app.use(VueCookies)

app.mount('#app')
