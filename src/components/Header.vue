<template>
  <header class="header">
    <h1 class="logo" @click="router.push('/')">Toy Store</h1>

    <nav class="nav">
      <input
        type="text"
        placeholder="Search products..."
        class="search-input"
        @keyup.enter="$emit('search', $event.target.value)"
      />
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/products" class="nav-link">Products</router-link>
      <router-link to="/cart" class="nav-link">Cart</router-link>
      <router-link to="/checkout" class="nav-link">Checkout</router-link>
      <button class="logout-btn" @click="logout">Logout</button>
    </nav>
  </header>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
const router = useRouter()
const authStore = useAuthStore()
defineOptions({
  name: 'HeaderPage',
})
function logout() {
  authStore.logout() // Call the logout action from the auth store
  router.push('/login') // Redirect to home after logout
}
</script>
<style scoped>
.header {
  background-color: #2563eb; /* Tailwind blue-600 */
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.logo {
  font-weight: bold;
  font-size: 1.5rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.logo:hover {
  transform: scale(1.05);
}

.search-input {
  width: 300px;
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db; /* Tailwind gray-300 */
  outline: none;
  transition: border-color 0.2s ease-in-out;
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
</style>
