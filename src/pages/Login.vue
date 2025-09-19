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
  gap: 1.5rem;
}

.login-title {
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
  color: #1f2937;
  margin-bottom: 1rem;
}

.register-acc {
  text-align: center;
  font-weight: 400;
  color: #1f2937;
  font-size: 1rem;
  margin-top: 1rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-input {
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

.login-input:focus {
  background: #fff;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.login-btn {
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

.login-btn:hover {
  background-color: #2563eb;
}

.login-btn:active {
  transform: scale(0.98);
}

.error-message {
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
  .login-input {
    font-size: 0.95rem;
    padding: 0.65rem;
  }
  .register-acc {
    font-size: 0.9rem;
    margin-top: 0.75rem;
  }
  .login-btn {
    font-size: 1rem;
    padding: 0.65rem;
    border-radius: 0.5rem;
  }
  .error-message {
    font-size: 0.85rem;
    margin-top: 0.4rem;
  }
  .logo {
    max-width: 160px;
    max-height: 160px;
  }
}
</style>
