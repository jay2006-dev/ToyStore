import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Profile from '../pages/profile.vue'
import Cart from '../pages/Cart.vue'
import Checkout from '../pages/Checkout.vue'
import ProductList from '../product/ProductList.vue'
import ProductDetails from '../product/ProductDetails.vue'
import NotFoundPage from '../components/NotFoundPage.vue'
import NoAccessPage from '../components/NoAccessPage.vue'
import FavouriteItem from '../pages/FavouriteItem.vue'
import { useAuthStore } from '../stores/auth.js'

const routes = [
  { default: '/', name: Home, component: Home },
  { path: '/login', component: Login },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } },

  { path: '/products', component: ProductList },
  { path: '/products/:id', component: ProductDetails, props: true },
  { path: '/cart', component: Cart, meta: { requiresAuth: true } },
  { path: '/favourites', component: FavouriteItem, meta: { requiresAuth: true } },
  { path: '/checkout', component: Checkout, meta: { requiresAuth: true } },
  { path: '/no-access', component: NoAccessPage },
  { path: '/:pathMatch(.*)*', component: NotFoundPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthorized) {
    next('/login')
  } else {
    next()
  }
})

export default router
