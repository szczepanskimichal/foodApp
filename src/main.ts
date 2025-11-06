import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import { useDarkMode } from './composables/useDarkMode'

// Inicjalizuj dark mode przy starcie aplikacji
useDarkMode()

const app = createApp(App)

app.use(router);
app.mount('#app');
