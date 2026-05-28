<template>
  <div v-if="!authStore.isAuthenticated">
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  overflow-x: hidden !important;
  height: 100%;
}
.footer {
  fixed: bottom;
  width: 100%;
}
Header {
  /* position: sticky; */
  top: 0;
  z-index: 1000;
  height: 10vh;
}
@media (max-width: 768px) {
  Header {
    height: auto;
  }
}
@media (max-width: 480px) {
  Header {
    height: auto;
  }
  Footer {
    display: none;
  }
}
</style>
