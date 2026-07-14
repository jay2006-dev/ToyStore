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
  const error = ref(null)
  const loading = ref(false)
  const isAuthenticated = computed(() => !!user.value)

  /**
   * Get the current user's ID token on-demand.
   * This avoids storing the token in plain-text localStorage.
   * Firebase SDK handles token refresh and secure storage internally.
   */
  const getToken = async () => {
    if (auth.currentUser) {
      return await auth.currentUser.getIdToken(/* forceRefresh */ false)
    }
    return null
  }

  // Signup
  const signup = async (email, password, name) => {
    loading.value = true
    error.value = null
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(result.user, { displayName: name })
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
      await signInWithEmailAndPassword(auth, email, password)
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
    provider.setCustomParameters({ prompt: 'select_account' })

    try {
      await signInWithPopup(auth, provider)
    } catch (err) {
      console.error('Google Login Error:', err)
      error.value = err
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
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // Track logged-in user via Firebase's own auth state listener
  // Firebase SDK handles persistence securely (IndexedDB, not plain localStorage)
  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser
  })

  return {
    user,
    error,
    loading,
    signup,
    login,
    isAuthenticated,
    loginWithGoogle,
    logout,
    getToken,
  }
})
