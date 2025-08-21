import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthorized = ref(false)
  const role = ref('')

  function login(username, password) {
    if (username === 'user@123' && password === '1234') {
      isAuthorized.value = true
      role.value = 'user'
      return true
    }
    if (username === 'admin@123' && password === '12345') {
      isAuthorized.value = true
      role.value = 'admin'
      return true
    }
    return false
  }

  function logout() {
    isAuthorized.value = false
    role.value = ''
  }

  return { isAuthorized, role, login, logout }
})
