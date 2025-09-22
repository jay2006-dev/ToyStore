import axios from 'axios'
import { useAuthStore } from '../stores/auth.js'

export const api = axios.create({
  baseURL: 'http://localhost:3000', // 👈 your Express backend
})

// Attach token to every request
api.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})
