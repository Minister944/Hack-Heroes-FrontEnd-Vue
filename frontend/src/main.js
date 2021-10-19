import { createApp} from 'vue'
import App from './App.vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import router from './router'
import VueCookies from 'vue3-cookies'
import store from './store/index'

// axios.defaults.baseURL = 'http://127.0.0.1:5000/api/v1/'

createApp(App).config.devtools = true;

const app = createApp(App).use(router)
app.use(BootstrapVue3)
app.use(store)
app.use(VueCookies)
app.mount('#app')
