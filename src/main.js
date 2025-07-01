import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'

import { register } from 'swiper/element/bundle';
register();

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(MotionPlugin)
app.mount('#app')
