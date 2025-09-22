<template>
  <div class="login-page">
    <div class="logo-container">
      <img
        src="https://static.vecteezy.com/system/resources/previews/030/680/146/non_2x/toys-with-white-background-high-quality-ultra-hd-free-photo.jpg"
        alt="logo"
        class="logo"
      />
    </div>
    <div class="login-container">
      <div class="login-card">
        <!-- Title -->
        <h2 class="login-title">Welcome Back 👋</h2>

        <!-- Tabs -->
        <div class="tabs">
          <button :class="{ active: mode === 'login' }" @click="mode = 'login'">SIGN IN</button>
          <button :class="{ active: mode === 'signup' }" @click="mode = 'signup'">SIGN UP</button>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleSubmit">
          <div v-if="mode === 'signup'" class="input-container">
            <input type="text" v-model="name" placeholder="Name" required autocomplete="new-name" />
          </div>
          <div class="input-container">
            <input
              type="email"
              v-model="email"
              placeholder="Email"
              required
              autocomplete="new-email"
            />
          </div>
          <div class="input-container">
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              required
              autocomplete="new-password"
            />
          </div>

          <div class="options" v-if="mode === 'login'">
            <label> <input type="checkbox" v-model="rememberMe" /> Stay signed in </label>
            <!-- <p v-if="mode==='login'" class="forgot">Forgot Password?</p> -->
          </div>
          <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

          <button type="submit" class="btn-submit">
            {{ mode === 'login' ? 'SIGN IN' : 'SIGN UP' }}
          </button>
        </form>

        <button class="btn-google" @click="handleGoogleLogin">
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" />
          Login with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
defineOptions({
  name: 'LoginPage',
})
const name = ref('')
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const mode = ref('login')
const errorMessage = ref('') // 🔹 add error state

const router = useRouter()
const authStore = useAuthStore()

const handleSubmit = async () => {
  errorMessage.value = '' // reset error before new attempt

  try {
    if (mode.value === 'login') {
      await authStore.login(email.value, password.value)
      router.replace('/')
    } else {
      await authStore.signup(email.value, password.value, name.value)
      await authStore.login(email.value, password.value)
      router.replace('/')
    }
    
  } catch (err) {
    // 🔹 Catch login/signup errors
    console.error('Auth error:', err)

    if (mode.value === 'login') {
      if (err.code === 'auth/user-not-found') {
        errorMessage.value = 'No account found with this email.'
      } else if (err.code === 'auth/wrong-password') {
        errorMessage.value = 'Incorrect password.'
      } else {
        errorMessage.value = 'Login failed. Please try again.'
      }
    } else {
      errorMessage.value = 'Signup failed. Please try again.'
    }
  }
}

const handleGoogleLogin = async () => {
  try {
    await authStore.loginWithGoogle()
    router.replace('/')
  } catch (err) {
    if (err.code === 'auth/popup-closed-by-user') alert('Login popup closed by user.')
    else alert(err.message)
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f3f4f6;
  gap: 40px;
  padding: 2rem;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40vh;
  padding: 20px;
  width: 40%;
}

.logo {
  max-width: 600px;
  max-height: 350%;
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  object-fit: cover;
}

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  min-height: 100vh;
}

.login-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem 2.5rem;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.login-title {
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
  color: #1f2937;
  margin-bottom: 1rem;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.tabs button {
  flex: 1;
  padding: 0.6rem;
  border: none;
  border-radius: 0.5rem;
  background: #e5e7eb;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}

.tabs button.active {
  background: #3b82f6;
  color: white;
}

.input-container input {
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 1rem;
  outline: none;
  background: rgba(255, 255, 255, 0.9);
  color: #1f2937;
  transition:
    background 0.3s,
    box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.input-container input:focus {
  background: #fff;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #374151;
}

.btn-submit {
  width: 100%;
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.12);
  transition:
    background-color 0.2s,
    transform 0.1s;
  font-size: 1.1rem;
}

.btn-submit:hover {
  background-color: #2563eb;
}

.btn-submit:active {
  transform: scale(0.98);
}

.btn-google {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.7rem;
  cursor: pointer;
  font-weight: 500;
  transition:
    background 0.2s,
    box-shadow 0.2s;
}

.btn-google:hover {
  background: #f9fafb;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.btn-google img {
  width: 20px;
  height: 20px;
}

.error-msg {
  color: #ef4444;
  font-size: 0.95rem;
  text-align: center;
  margin-top: 0.5rem;
}

/* Mobile responsive styles */
@media (max-width: 900px) {
  .login-page {
    flex-direction: column;
    gap: 20px;
    padding: 1rem;
  }
  .logo-container,
  .login-container {
    width: 100%;
    min-height: auto;
    padding: 0;
  }
  .login-card {
    padding: 1.5rem;
    max-width: 100%;
    border-radius: 0.75rem;
  }
  .login-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  .input-container input {
    font-size: 0.95rem;
    padding: 0.65rem;
  }
  .btn-submit {
    font-size: 1rem;
    padding: 0.65rem;
    border-radius: 0.5rem;
  }
  .error-msg {
    font-size: 0.85rem;
    margin-top: 0.4rem;
  }
  .logo {
    max-width: 160px;
    max-height: 160px;
  }
}
</style>
