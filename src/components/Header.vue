<template>
  <header class="header">
    <div class="first">
      <h1 @click="router.push('/')">
        <img
          src="https://img.freepik.com/premium-vector/toy-store-text-effect-3d-comic-style_879681-695.jpg"
          width="45px"
          height="45px"
          class="logo"
        />
      </h1>
      <input
        type="text"
        placeholder="Search products..."
        class="search-input"
        :value="searchQuery"
        @input="onInput"
        height="5%"
      />
    </div>

    <nav class="nav">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/products" class="nav-link">Products</router-link>
      <router-link to="/favourites" class="nav-link">Wishlist</router-link>
      <router-link v-if="cartStore.cart.length > 0 && authStore.user" to="/cart" class="nav-link"
        >Cart ({{ cartStore.cart.length }})</router-link
      ><router-link v-else to="/cart" class="nav-link"><i fa fa-shoping-cart></i>Cart </router-link>
      <router-link to="/checkout" class="nav-link">Checkout</router-link>
      <button v-if="authStore.isAuthenticated" class="logout-btn" @click="logout">Logout</button>
    </nav>
  </header>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { useCartStore } from '../stores/cartStore.js'
const cartStore = useCartStore()
const router = useRouter()
const authStore = useAuthStore()
defineOptions({
  name: 'HeaderPage',
})
function logout() {
  authStore.logout() // Call the logout action from the auth store
  router.push('/login') // Redirect to home after logout
}
const { searchQuery } = defineProps({
  searchQuery: String,
})

const emit = defineEmits(['update:searchQuery'])

function onInput(e) {
  router.push('/products')
  emit('update:searchQuery', e.target.value) // Vue auto-updates App.vue's searchQuery
}
</script>
<style scoped>
.header {
  background-color: #2563eb; /* Tailwind blue-600 */
  color: white;
  padding-right: 0.5rem;
  display: flex;
  flex-direction: row;
  margin: 0px;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.logo {
  font-weight: bold;
  font-size: 1.5rem;
  letter-spacing: 0.5px;
  padding: 10px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  border: none;
  padding-left: 20px;
  border-radius: 100px;
}

.logo:hover {
  transform: scale(1.05);
}

.search-input {
  width: 350px;
  margin: auto;
  margin-left: 10px;
  padding: 1rem;
  height: 10px;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  transition: white 0.2s ease-in-out;
}
.search-input:focus {
  border-color: #3b82f6; /* Tailwind blue-500 */
}
.nav {
  display: flex;
  gap: 1rem;
}

.nav-link {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  text-decoration: none;
  color: white;
  font-weight: 500;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.router-link-active {
  background-color: white;
  color: #2563eb; /* Tailwind blue-600 */
  font-weight: 600;
}
.logout-btn {
  background-color: #ef4444; /* Tailwind red-600 */
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}
.first {
  display: flex;
  flex-direction: row;
}

/* 📱 Mobile Responsive Header */
@media (max-width: 1024px) {
  .search-input {
    width: 200px;
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    padding: 0.75rem 1rem;
  }

  .nav {
    flex-wrap: wrap;
    gap: 0.5rem;
    width: 100%;
    margin-top: 0.75rem;
    justify-content: flex-start;
  }

  .search-input {
    width: 100%;
    margin-bottom: 0.75rem;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 0.5rem;
  }

  .logo {
    width: 40px;
    height: 40px;
  }

  .search-input {
    font-size: 0.9rem;
    padding: 0.4rem;
  }

  .nav {
    flex-direction: column;
    align-items: stretch;
  }

  .nav-link,
  .logout-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
