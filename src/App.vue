<template>
  <div v-if="!authStore.isAuthenticated">
    <Login />
  </div>
  <div v-else class="app-layout">
    <Header v-model:searchQuery="searchQuery" />
    <main class="main-content">
      <router-view :searchQuery="searchQuery" />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from './stores/auth'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Login from './pages/Login.vue'

const searchQuery = ref('') // shared state
const authStore = useAuthStore()
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
