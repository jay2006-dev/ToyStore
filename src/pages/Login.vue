<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Title -->
      <h2 class="login-title">Welcome Back 👋</h2>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="login-form">
        <!-- Username -->
        <div>
          <input v-model="username" placeholder="Username" class="login-input" />
        </div>

        <!-- Password -->
        <div>
          <input v-model="password" type="password" placeholder="Password" class="login-input" />
        </div>

        <div>
          <p class="register-acc">Want to create an account? <a href="#">Register</a></p>
        </div>

        <!-- Login Button -->
        <button type="submit" class="login-btn">Login</button>

        <!-- Error Message -->
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
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
const username = ref('')
const password = ref('')
const error = ref('')
const authStore = useAuthStore()
const router = useRouter()

function handleLogin() {
  if (authStore.login(username.value, password.value)) {
    router.push('/')
  } else {
    error.value = 'Invalid username or password'
  }
}
</script>

<style scoped>
/* Container with gradient background */
/* Container with background image */
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url('https://content.jdmagicbox.com/v2/comp/hyderabad/r9/040pxx40.xx40.170718155039.y8r9/catalogue/toys-n-more-hyderabad-jfgqxgqxax.jpg');
  background-size: cover;
  background-position: center;
}

/* Glass Effect Card */
.login-card {
  background: rgba(255, 255, 255, 0.25); /* semi-transparent white */
  backdrop-filter: blur(12px); /* glass blur */
  -webkit-backdrop-filter: blur(12px); /* Safari support */
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
}

/* Title */
.login-title {
  font-size: 1.875rem;
  font-weight: 800;
  text-align: center;
  color: #fff; /* white text for contrast */
  margin-bottom: 1.5rem;
}
.register-acc {
  text-align: center;
  font-weight: 400;
  color: #fef9c3; /* light yellow for contrast */
  font-size: 1.075rem;
  margin-top: 1rem;
}
/* Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Input Fields */
.login-input {
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 1rem;
  outline: none;
  background: rgba(255, 255, 255, 0.6);
  color: #1f2937;
  transition:
    background 0.3s,
    box-shadow 0.2s;
}

.login-input:focus {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
}

/* Button */
.login-btn {
  width: 100%;
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
  transition:
    background-color 0.2s,
    transform 0.1s;
}

.login-btn:hover {
  background-color: #2563eb;
}

.login-btn:active {
  transform: scale(0.98);
}

/* Error Message */
.error-message {
  color: #f87171;
  font-size: 0.875rem;
  text-align: center;
  margin-top: 0.5rem;
}
</style>
