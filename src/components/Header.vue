<template>
  <div class="header-wrapper" :class="{ scrolled: isScrolled }">
    <!-- Announcement Bar -->
    <div class="announcement-bar">
      <div class="announcement-inner">
        <p class="announcement-text">
          <font-awesome-icon icon="truck" class="announcement-icon" />
          FREE Delivery on Orders Over ₹500!
        </p>
        <div class="announcement-right">
          <router-link v-if="!authStore.isAuthenticated" to="/login" class="announcement-link">
            Login / Sign Up
          </router-link>
          <span v-else class="announcement-link" @click="logout">
            <font-awesome-icon icon="user" /> Logout
          </span>
        </div>
      </div>
    </div>

    <!-- Main Header -->
    <header class="main-header">
      <div class="header-inner">
        <!-- Logo -->
        <div class="logo-area" @click="router.push('/')">
          <div class="logo-icon">🧸</div>
          <div class="logo-text">
            <span class="logo-name">ToyStore</span>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="main-nav" :class="{ active: mobileMenuOpen }">
          <router-link to="/" class="main-nav-link" @click="closeMobileMenu">Home</router-link>
          <router-link to="/products" class="main-nav-link" @click="closeMobileMenu">Shop</router-link>
          <router-link to="/favourites" class="main-nav-link" @click="closeMobileMenu">Wishlist</router-link>
          <router-link to="/checkout" class="main-nav-link" @click="closeMobileMenu">Checkout</router-link>
        </nav>

        <!-- Right Actions -->
        <div class="header-actions">
          <!-- Search -->
          <div class="search-container" :class="{ expanded: searchOpen }">
            <button class="action-btn search-toggle" @click="toggleSearch" aria-label="Search">
              <font-awesome-icon :icon="searchOpen ? 'times' : 'search'" />
            </button>
            <input
              v-if="searchOpen"
              ref="searchInput"
              type="text"
              placeholder="Search products..."
              class="search-field"
              :value="searchQuery"
              @input="onInput"
              @keyup.escape="toggleSearch"
            />
          </div>

          <!-- User -->
          <router-link to="/login" class="action-btn" aria-label="Profile">
            <font-awesome-icon icon="user" />
          </router-link>

          <!-- Cart -->
          <router-link to="/cart" class="action-btn cart-btn" aria-label="Cart">
            <font-awesome-icon icon="shopping-cart" />
            <span v-if="cartStore.cart.length > 0" class="cart-badge">{{ cartStore.cart.length }}</span>
          </router-link>

          <!-- Mobile hamburger -->
          <button class="hamburger-btn" @click="toggleMobileMenu" aria-label="Menu">
            <font-awesome-icon :icon="mobileMenuOpen ? 'times' : 'bars'" />
          </button>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { useCartStore } from '../stores/cartStore.js'

const cartStore = useCartStore()
const router = useRouter()
const authStore = useAuthStore()

defineOptions({ name: 'HeaderPage' })

const { searchQuery } = defineProps({ searchQuery: String })
const emit = defineEmits(['update:searchQuery'])

const isScrolled = ref(false)
const searchOpen = ref(false)
const mobileMenuOpen = ref(false)
const searchInput = ref(null)

function logout() {
  authStore.logout()
  router.push('/login')
}

function onInput(e) {
  router.push('/products')
  emit('update:searchQuery', e.target.value)
}

function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

function handleScroll() {
  isScrolled.value = window.scrollY > 40
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* ===== Announcement Bar ===== */
.announcement-bar {
  background: linear-gradient(135deg, var(--color-primary) 0%, #FF6B00 100%);
  color: white;
  font-size: 0.82rem;
  font-weight: 500;
  padding: 0.45rem 0;
  transition: var(--transition);
}

.header-wrapper.scrolled .announcement-bar {
  max-height: 0;
  padding: 0;
  overflow: hidden;
}

.announcement-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.announcement-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.announcement-icon {
  font-size: 0.9rem;
}

.announcement-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.announcement-link {
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.announcement-link:hover {
  opacity: 0.85;
}

/* ===== Main Header ===== */
.header-wrapper {
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: var(--transition);
}

.main-header {
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  padding: 0;
  transition: var(--transition);
}

.header-wrapper.scrolled .main-header {
  box-shadow: var(--shadow-md);
}

.header-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
}

/* ===== Logo ===== */
.logo-area {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  transition: var(--transition);
}

.logo-area:hover {
  transform: scale(1.02);
}

.logo-icon {
  font-size: 2rem;
  line-height: 1;
}

.logo-name {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--color-primary);
  letter-spacing: -0.5px;
}

/* ===== Navigation ===== */
.main-nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.main-nav-link {
  padding: 0.5rem 1.1rem;
  border-radius: var(--radius-xl);
  font-weight: 600;
  font-size: 0.92rem;
  color: var(--color-text);
  transition: var(--transition);
  white-space: nowrap;
}

.main-nav-link:hover {
  color: var(--color-primary);
  background: var(--color-bg-warm);
}

.main-nav-link.router-link-exact-active,
.main-nav-link.router-link-active[href="/"] {
  color: white;
  background: var(--color-primary);
}

/* ===== Header Actions ===== */
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.action-btn {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: transparent;
  color: var(--color-text);
  font-size: 1.05rem;
  transition: var(--transition);
  position: relative;
  border: none;
  cursor: pointer;
}

.action-btn:hover {
  background: var(--color-bg-warm);
  color: var(--color-primary);
}

/* ===== Search ===== */
.search-container {
  display: flex;
  align-items: center;
  position: relative;
}

.search-container.expanded {
  position: relative;
}

.search-field {
  width: 220px;
  padding: 0.5rem 1rem;
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-xl);
  font-family: var(--font-body);
  font-size: 0.88rem;
  outline: none;
  transition: var(--transition);
  animation: fadeIn 0.3s ease;
}

.search-field:focus {
  box-shadow: 0 0 0 3px rgba(247, 148, 29, 0.15);
}

/* ===== Cart Badge ===== */
.cart-btn {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background: var(--color-sale);
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

/* ===== Hamburger ===== */
.hamburger-btn {
  display: none;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: transparent;
  color: var(--color-text);
  font-size: 1.2rem;
  transition: var(--transition);
}

.hamburger-btn:hover {
  background: var(--color-bg-warm);
  color: var(--color-primary);
}

/* ===== Responsive ===== */
@media (max-width: 900px) {
  .hamburger-btn {
    display: flex;
  }

  .main-nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1rem;
    box-shadow: var(--shadow-lg);
    border-bottom-left-radius: var(--radius-md);
    border-bottom-right-radius: var(--radius-md);
    z-index: 999;
    animation: fadeInUp 0.3s ease;
  }

  .main-nav.active {
    display: flex;
  }

  .main-nav-link {
    width: 100%;
    text-align: center;
    padding: 0.75rem 1rem;
    border-radius: var(--radius-sm);
  }

  .search-field {
    width: 160px;
  }
}

@media (max-width: 480px) {
  .header-inner {
    height: 56px;
    padding: 0 1rem;
  }

  .logo-name {
    font-size: 1.3rem;
  }

  .logo-icon {
    font-size: 1.6rem;
  }

  .action-btn {
    width: 36px;
    height: 36px;
    font-size: 0.95rem;
  }

  .announcement-bar {
    font-size: 0.72rem;
    padding: 0.35rem 0;
  }

  .search-field {
    width: 130px;
    font-size: 0.82rem;
  }
}
</style>
