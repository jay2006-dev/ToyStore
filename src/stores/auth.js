import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { auth } from '../services/firebase'
import { updateProfile } from 'firebase/auth'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const error = ref(null)
  const loading = ref(false)
  const isAuthenticated = computed(() => !!user.value) // ✅ reactive auth state

  const saveToken = async (firebaseUser) => {
    if (firebaseUser) {
      const t = await firebaseUser.getIdToken()
      token.value = t
      localStorage.setItem('token', t) // persist
    } else {
      token.value = null
      localStorage.removeItem('token')
    }
  }

  // Signup
  const signup = async (email, password, name) => {
    loading.value = true
    error.value = null
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(result.user, { displayName: name })
      await saveToken(result.user)
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // Login with Email/Password
  const login = async (email, password) => {
    loading.value = true
    error.value = null
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      await saveToken(result.user)
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // Login with Google OAuth
  const loginWithGoogle = async () => {
    loading.value = true
    error.value = null

    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' }) // force account selection

    try {
      const result = await signInWithPopup(auth, provider)
      await saveToken(result.user)
      // result.user contains the logged-in user
      console.log('Google Login Success:', result.user)
    } catch (err) {
      console.error('Google Login Error:', err)
      error.value = err
      // Provide more detailed error messages
      if (err.code === 'auth/invalid-credential') {
        alert('Invalid Google credentials. Check Firebase configuration and authorized domains.')
      } else if (err.code === 'auth/popup-closed-by-user') {
        alert('Login popup closed by user.')
      } else if (err.code === 'auth/cancelled-popup-request') {
        alert('Popup request cancelled. Try again.')
      } else {
        alert(err.message)
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  // Logout
  const logout = async () => {
    loading.value = true
    error.value = null
    try {
      await signOut(auth)
      token.value = null
      localStorage.removeItem('token')
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // Track logged-in user
  onAuthStateChanged(auth, async (firebaseUser) => {
    user.value = firebaseUser
    await saveToken(firebaseUser)
  })

  return {
    user,
    error,
    token,
    loading,
    signup,
    login,
    isAuthenticated,
    loginWithGoogle,
    logout,
  }
})
