import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import router from './router'

const app = createApp(App)

app.use(router, axios, VueAxios)

app.config.globalProperties.axios=axios

app.mount('#app')

