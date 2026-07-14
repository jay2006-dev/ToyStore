import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faSearch,
  faUser,
  faShoppingCart,
  faHeart,
  faStar,
  faStarHalfAlt,
  faBars,
  faTimes,
  faCheck,
  faChevronRight,
  faChevronLeft,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faTruck,
  faShieldAlt,
  faUndo,
  faHeadset,
  faArrowRight,
  faTag,
  faClock,
  faCalendar,
  faComment,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faSearch,
  faUser,
  faShoppingCart,
  faHeart,
  faStar,
  faStarHalfAlt,
  faBars,
  faTimes,
  faCheck,
  faChevronRight,
  faChevronLeft,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faTruck,
  faShieldAlt,
  faUndo,
  faHeadset,
  faArrowRight,
  faTag,
  faClock,
  faCalendar,
  faComment,
)

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Vue3Toastify, { autoClose: 3000 })
app.use(FloatingVue)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
