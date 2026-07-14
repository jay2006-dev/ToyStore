import axios from 'axios'
import { useAuthStore } from '../stores/auth.js'

export const api = axios.create({
  baseURL: 'http://localhost:3000',
})

// Attach token to every request — fetched on-demand from Firebase SDK
// instead of reading from plain-text localStorage
api.interceptors.request.use(async (config) => {
  const authStore = useAuthStore()
  const token = await authStore.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
