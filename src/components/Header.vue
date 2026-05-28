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
    </div>

    <nav class="nav">
      <input
        type="text"
        placeholder="Search products..."
        class="search-input"
        :value="searchQuery"
        @input="onInput"
        height="5%"
      />
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/products" class="nav-link">Products</router-link>
        <router-link to="/favourites" class="nav-link">Wishlist</router-link>
        <router-link v-if="cartStore.cart.length > 0 && authStore.user" to="/cart" class="nav-link"
          >Cart ({{ cartStore.cart.length }})</router-link
        ><router-link v-else to="/cart" class="nav-link"
          ><i fa fa-shoping-cart></i>Cart
        </router-link>
        <router-link to="/checkout" class="nav-link">Checkout</router-link>
        <button v-if="authStore.isAuthenticated" class="logout-btn" @click="logout">Logout</button>
      </div>
      <div class="hamburger" @click="hamburgerMenu">☰</div>
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

function hamburgerMenu() {
  const navLinks = document.querySelector('.nav-links')
  navLinks.classList.toggle('active')
  navLinks.style.transition = 'all 0.3s ease-in-out'
  navLinks.style.zIndex = '1000'
}

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
  border: 1px solid white;
  transition: white 0.2s ease-in-out;
}
.search-input:focus {
  border-color: #3b82f6; /* Tailwind blue-500 */
}
.nav {
  display: flex;
  flex-direction: row;
  /* gap: 0.2rem; */
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 2px;
  margin-left: 5px;
  /* max-width: 180px; */
  margin: 8px;
  border-radius: 20px;
  justify-content: space-between;
}

.nav-link {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  width: 100%;
  text-decoration: none;
  color: white;
  font-weight: 500;
  max-width: 80px;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.hamburger {
  display: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
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
    width: 250px;
    border: 1px solid white;
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: row;
    justify-content: space-around;
    padding: 0.75rem 1rem;
    border-radius: 4%;
  }

  .nav {
    /* flex-wrap: wrap; */
    flex-direction: row;
    justify-content: center;
    gap: 0.2rem;
    width: 100%;
    /* margin-top: 0.75rem; */
    /* justify-content: flex-start; */
  }

  .search-input {
    width: 100%;
    /* margin-bottom: 0.75rem; */
    border: 1px solid white;
  }

  .nav-links {
    display: none; /* Hide the menu by default */
    flex-direction: column;
    background: #333;
    position: absolute;
    top: 60px;
    right: 0;
    width: 200px;
    padding: 10px;
  }

  .nav-links.active {
    display: flex; /* Show when active */
  }

  .hamburger {
    display: block; /* Show hamburger on small screens */
  }
}

@media (max-width: 480px) {
  .header {
    padding: 0rem;
    height: 10vh;
    flex-direction: row;
    justify-items: space-around;
  }

  .first {
    flex-direction: row;
    align-items: center;
  }

  .logo {
    width: 40px;
    height: 40px;
  }

  .search-input {
    font-size: 0.8rem;
    padding: 0.5rem;
    width: 160px;
    /* margin: 0rem;
    /* margin: auto; */
    /* margin-bottom: 15px;  */
    border: 1px solid white;
  }

  .search-input:focus {
    width: 160px;
    border: 1px solid white;
  }

  nav {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 0rem;
  }

  .hamburger {
    position: absolute;
    top: 15px;
    right: 15px;
  }
  .nav-links {
    text-align: center;
    width: 150px;
    max-width: 180px;
    color: white;
    box-shadow: 0 2px 6px 5px rgba(0, 0, 0, 0.15);
    background-color: white;
  }
  .nav-link {
    background-color: #2563eb;
    color: white !important;
  }
  .nav-links.active {
    display: flex;
  }
  .nav-link,
  .logout-btn {
    width: 100%;
    margin: auto;
    margin-bottom: 2px;
    color: black !important;
  }
}
</style>
