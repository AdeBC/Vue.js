import { createApp, h } from 'vue'
import App from './App.vue'
import ElementPLus from 'element-plus'
import './style/theme/index.css'
import locale from 'element-plus/lib/locale/lang/en'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import imageZoom from 'vue-image-zoomer'
//import VueSidebarMenu from 'vue-sidebar-menu'
//import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'


router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

const app = createApp(
    {
        render: () => h(App),
        imageZoom
    }
)

app.use(router)
app.use(ElementPLus, {locale})
app.use(VueAxios, axios)
//app.use(VueSidebarMenu)
const ImageZoom = require('vue-image-zoomer').default
app.component('image-zoom', ImageZoom)
axios.defaults.baseURL = 'http://127.0.0.1:8080'
app.mount('#app')