<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Logo / Store Name -->
      <div class="footer-brand">
        <h2 class="footer-title">🧸 Toy Store</h2>
        <p class="footer-subtitle">Bringing joy, one toy at a time!</p>
      </div>

      <!-- Navigation Links -->
      <div class="footer-links">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#" @click="router.push('/')">Home</a></li>
          <li><a href="#" @click="router.push('/products')">Shop</a></li>
          <li><a href="#" @click="router.push('/cart')">Cart</a></li>
          <li><a href="#" @click="router.push('/checkout')">Checkout</a></li>
        </ul>
      </div>

      <!-- Social Icons -->
      <div class="footer-socials">
        <h3>Follow Us</h3>
        <div class="social-icons">
          <a href="#" aria-label="Facebook">📘</a>
          <a href="#" aria-label="Instagram">📸</a>
          <a href="#" aria-label="Twitter">🐦</a>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <p>&copy; 2025 Toy Store. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
defineOptions({
  name: 'FooterPage',
})
</script>

<style scoped>
.footer {
  background: #2563eb;
  text-align: center;
  color: white;
  padding-top: 1.75rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.footer-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: auto;
  padding: 0 1.5rem;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.footer-subtitle {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-top: 0.3rem;
}

.footer-links h3,
.footer-socials h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #fef9c3;
}
.footer-links,
.footer-socials {
  text-align: left;
}

.footer-links ul {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin: 0.4rem 0;
}

.footer-links a {
  text-decoration: none;
  color: #fff;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #fde68a;
}

.footer-socials .social-icons a {
  font-size: 1.4rem;
  margin-right: 0.8rem;
  transition: transform 0.2s;
}

.footer-socials .social-icons a:hover {
  transform: scale(1.2);
}

.footer-bottom {
  text-align: center;
  padding: 1rem;
  margin-top: 2rem;
  border-top: 2px solid rgba(255, 255, 255, 0.3);
  font-size: 0.85rem;
}
/* 📱 Mobile Responsive Styles */
@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr; /* stack all sections */
    text-align: center;
    gap: 1.5rem;
  }

  .footer-links,
  .footer-socials {
    text-align: center;
  }

  .footer-links ul {
    padding: 0;
    margin: 0 auto;
  }

  .footer-links li {
    margin: 0.3rem 0;
  }

  .footer-socials .social-icons {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .footer-title {
    font-size: 1.25rem;
  }

  .footer-subtitle {
    font-size: 0.8rem;
  }

  .footer-links h3,
  .footer-socials h3 {
    font-size: 1rem;
  }

  .footer-bottom {
    font-size: 0.75rem;
  }
}
</style>
