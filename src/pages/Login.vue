<template>
  <div class="login-page">
    <!-- Left Decorative Side -->
    <div class="login-hero">
      <div class="hero-bg-shapes">
        <div class="hero-shape hero-shape-1"></div>
        <div class="hero-shape hero-shape-2"></div>
        <div class="hero-shape hero-shape-3"></div>
      </div>
      <div class="hero-content">
        <div class="hero-logo">
          <span class="hero-logo-icon">🧸</span>
          <span class="hero-logo-text">ToyStore</span>
        </div>
        <h1 class="hero-title">Welcome to the<br />World of Toys!</h1>
        <p class="hero-subtitle">
          Discover thousands of toys for kids of all ages. Create an account to track orders, save favourites, and more.
        </p>
        <div class="hero-features">
          <div class="hero-feature">
            <font-awesome-icon icon="truck" class="feature-icon" />
            <span>Free Delivery</span>
          </div>
          <div class="hero-feature">
            <font-awesome-icon icon="shield-alt" class="feature-icon" />
            <span>Secure Payments</span>
          </div>
          <div class="hero-feature">
            <font-awesome-icon icon="undo" class="feature-icon" />
            <span>Easy Returns</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Form Side -->
    <div class="login-form-side">
      <div class="login-card">
        <div class="card-header">
          <h2 class="card-title">
            {{ mode === 'login' ? 'Welcome Back 👋' : 'Create Account 🎉' }}
          </h2>
          <p class="card-subtitle">
            {{ mode === 'login' ? 'Sign in to continue shopping' : 'Join us for the best toy shopping experience' }}
          </p>
        </div>

        <!-- Tabs -->
        <div class="tabs">
          <button :class="{ active: mode === 'login' }" @click="mode = 'login'">Sign In</button>
          <button :class="{ active: mode === 'signup' }" @click="mode = 'signup'">Sign Up</button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="login-form">
          <div v-if="mode === 'signup'" class="input-group">
            <label class="input-label">
              <font-awesome-icon icon="user" class="label-icon" />
              Full Name
            </label>
            <input
              type="text"
              v-model="name"
              placeholder="Enter your name"
              required
              autocomplete="new-name"
              class="input-field"
            />
          </div>

          <div class="input-group">
            <label class="input-label">
              <font-awesome-icon icon="envelope" class="label-icon" />
              Email Address
            </label>
            <input
              type="email"
              v-model="email"
              placeholder="you@example.com"
              required
              autocomplete="new-email"
              class="input-field"
            />
          </div>

          <div class="input-group">
            <label class="input-label">
              <font-awesome-icon icon="shield-alt" class="label-icon" />
              Password
            </label>
            <input
              type="password"
              v-model="password"
              placeholder="Enter your password"
              required
              autocomplete="new-password"
              class="input-field"
            />
          </div>

          <div class="options" v-if="mode === 'login'">
            <label class="checkbox-label">
              <input type="checkbox" v-model="rememberMe" class="checkbox" />
              <span>Stay signed in</span>
            </label>
          </div>

          <p v-if="errorMessage" class="error-msg">
            <font-awesome-icon icon="times" /> {{ errorMessage }}
          </p>

          <button type="submit" class="btn-submit">
            {{ mode === 'login' ? 'Sign In' : 'Create Account' }}
            <font-awesome-icon icon="arrow-right" class="btn-arrow" />
          </button>
        </form>

        <div class="divider">
          <span class="divider-text">or continue with</span>
        </div>

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

defineOptions({ name: 'LoginPage' })

const name = ref('')
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const mode = ref('login')
const errorMessage = ref('')

const router = useRouter()
const authStore = useAuthStore()

const handleSubmit = async () => {
  errorMessage.value = ''
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
      if (err.code === 'auth/email-already-in-use') {
        errorMessage.value = 'This email is already registered. Try signing in instead.'
      } else if (err.code === 'auth/weak-password') {
        errorMessage.value = 'Password is too weak. Use at least 6 characters.'
      } else if (err.code === 'auth/invalid-email') {
        errorMessage.value = 'Please enter a valid email address.'
      } else {
        errorMessage.value = 'Signup failed. Please try again.'
      }
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
  min-height: 100vh;
}

/* ===== Left Hero Side ===== */
.login-hero {
  position: relative;
  flex: 1;
  background: linear-gradient(135deg, #F7941D 0%, #FF6B00 40%, #E8850A 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  overflow: hidden;
}

.hero-bg-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  background: white;
}

.hero-shape-1 {
  width: 400px;
  height: 400px;
  top: -120px;
  right: -100px;
}

.hero-shape-2 {
  width: 250px;
  height: 250px;
  bottom: -80px;
  left: -60px;
}

.hero-shape-3 {
  width: 150px;
  height: 150px;
  top: 60%;
  left: 50%;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 420px;
  animation: slideInLeft 0.7s ease;
}

.hero-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.hero-logo-icon {
  font-size: 2.2rem;
}

.hero-logo-text {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: 2.8rem;
  font-weight: 900;
  color: white;
  line-height: 1.1;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.88);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.hero-features {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.hero-feature {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  color: white;
  font-weight: 600;
  font-size: 0.92rem;
}

.feature-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  font-size: 0.85rem;
}

/* ===== Right Form Side ===== */
.login-form-side {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--color-bg-light);
}

.login-card {
  width: 100%;
  max-width: 440px;
  background: white;
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-border);
  animation: fadeInUp 0.6s ease;
}

/* ===== Card Header ===== */
.card-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.card-title {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--color-dark);
  margin-bottom: 0.3rem;
}

.card-subtitle {
  font-size: 0.88rem;
  color: var(--color-text-muted);
}

/* ===== Tabs ===== */
.tabs {
  display: flex;
  gap: 0;
  background: var(--color-bg-light);
  border-radius: var(--radius-xl);
  padding: 4px;
  margin-bottom: 1.8rem;
}

.tabs button {
  flex: 1;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: var(--radius-xl);
  background: transparent;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.88rem;
  font-family: var(--font-body);
  color: var(--color-text-light);
  transition: var(--transition);
}

.tabs button.active {
  background: var(--color-primary);
  color: white;
  box-shadow: 0 2px 8px rgba(247, 148, 29, 0.25);
}

.tabs button:hover:not(.active) {
  color: var(--color-primary);
}

/* ===== Form ===== */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.input-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.label-icon {
  color: var(--color-primary);
  font-size: 0.75rem;
}

.input-field {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.92rem;
  font-family: var(--font-body);
  color: var(--color-text);
  background: var(--color-bg-light);
  outline: none;
  transition: var(--transition);
}

.input-field:focus {
  border-color: var(--color-primary);
  background: white;
  box-shadow: 0 0 0 3px rgba(247, 148, 29, 0.1);
}

.input-field::placeholder {
  color: var(--color-text-muted);
}

/* ===== Options ===== */
.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--color-text-light);
  cursor: pointer;
}

.checkbox {
  accent-color: var(--color-primary);
  width: 16px;
  height: 16px;
}

/* ===== Error ===== */
.error-msg {
  color: #ef4444;
  font-size: 0.85rem;
  text-align: center;
  background: #fef2f2;
  padding: 0.6rem 1rem;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

/* ===== Submit Button ===== */
.btn-submit {
  width: 100%;
  padding: 0.85rem 1.5rem;
  background: linear-gradient(135deg, var(--color-primary), #FF6B00);
  color: white;
  font-weight: 700;
  font-size: 1rem;
  font-family: var(--font-body);
  border: none;
  border-radius: var(--radius-xl);
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 4px 16px rgba(247, 148, 29, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(247, 148, 29, 0.4);
}

.btn-submit:active {
  transform: translateY(0);
}

.btn-arrow {
  font-size: 0.85rem;
  transition: transform 0.3s ease;
}

.btn-submit:hover .btn-arrow {
  transform: translateX(3px);
}

/* ===== Divider ===== */
.divider {
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--color-border);
}

.divider-text {
  padding: 0 1rem;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  white-space: nowrap;
}

/* ===== Google Button ===== */
.btn-google {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: white;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-xl);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.92rem;
  font-family: var(--font-body);
  color: var(--color-text);
  transition: var(--transition);
}

.btn-google:hover {
  border-color: var(--color-text-muted);
  background: var(--color-bg-light);
  box-shadow: var(--shadow-sm);
}

.btn-google img {
  width: 20px;
  height: 20px;
}

/* ===== Responsive ===== */
@media (max-width: 900px) {
  .login-page {
    flex-direction: column;
  }

  .login-hero {
    padding: 2.5rem 2rem;
    min-height: auto;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-content {
    max-width: 100%;
    text-align: center;
  }

  .hero-features {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
}

@media (max-width: 640px) {
  .login-hero {
    padding: 2rem 1.5rem;
  }

  .hero-title {
    font-size: 1.6rem;
  }

  .hero-subtitle {
    font-size: 0.88rem;
  }

  .hero-features {
    display: none;
  }

  .login-form-side {
    padding: 1.5rem;
  }

  .login-card {
    padding: 1.5rem;
    border-radius: var(--radius-md);
  }

  .card-title {
    font-size: 1.4rem;
  }
}
</style>
