<template>
  <div v-if="authStore.isAuthorized === false">
    <Login />
  </div>
  <div v-else>
    <Header v-model:searchQuery="searchQuery" />
    <router-view :searchQuery="searchQuery" />
    <Footer class="footer" />
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
.footer {
  fixed: bottom;
  width: 100%;
}
</style>
