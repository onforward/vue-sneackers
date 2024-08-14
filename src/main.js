import './assets/main.css'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import router from './router'
import App from './App.vue'

const app = createApp(App)

app.use(autoAnimatePlugin)
app.use(router)

app.mount('#app')
