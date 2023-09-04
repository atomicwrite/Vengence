import {createApp} from 'vue'
import App from './App.vue'
import {store} from "@/data/store";
import './index.css'
const app = createApp(App)
app.mount('#app')
app.use(store);
