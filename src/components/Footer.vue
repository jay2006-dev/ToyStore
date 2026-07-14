<template>
  <footer class="site-footer">
    <div class="footer-main">
      <div class="footer-inner">
        <!-- Brand Column -->
        <div class="footer-col footer-brand">
          <div class="footer-logo" @click="router.push('/')">
            <span class="footer-logo-icon">🧸</span>
            <span class="footer-logo-text">ToyStore</span>
          </div>
          <p class="footer-desc">
            Bringing joy to kids of all ages with the best collection of toys, games, and educational products.
          </p>
          <div class="footer-socials">
            <a href="#" class="social-link" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>

        <!-- About Us -->
        <div class="footer-col">
          <h3 class="footer-heading">About Us</h3>
          <ul class="footer-list">
            <li><a href="#" @click.prevent="router.push('/')">Privacy Policy</a></li>
            <li><a href="#" @click.prevent="router.push('/')">Terms & Conditions</a></li>
            <li><a href="#" @click.prevent="router.push('/')">Return Policy</a></li>
            <li><a href="#" @click.prevent="router.push('/')">Affiliate</a></li>
          </ul>
        </div>

        <!-- Services -->
        <div class="footer-col">
          <h3 class="footer-heading">Services</h3>
          <ul class="footer-list">
            <li><a href="#" @click.prevent="router.push('/')">FAQ</a></li>
            <li><a href="#" @click.prevent="router.push('/products')">All Products</a></li>
            <li><a href="#" @click.prevent="router.push('/cart')">My Cart</a></li>
            <li><a href="#" @click.prevent="router.push('/checkout')">Checkout</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="footer-col">
          <h3 class="footer-heading">Contact</h3>
          <ul class="footer-list contact-list">
            <li>
              <font-awesome-icon icon="map-marker-alt" class="contact-icon" />
              <span>123 Toy Lane, Play City, India</span>
            </li>
            <li>
              <font-awesome-icon icon="phone" class="contact-icon" />
              <span>+91 98765 43210</span>
            </li>
            <li>
              <font-awesome-icon icon="envelope" class="contact-icon" />
              <span>hello@toystore.in</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <div class="footer-bottom-inner">
        <p>&copy; {{ currentYear }} Toy Store. All rights reserved.</p>
        <p class="footer-credit">Made with ❤️ for kids everywhere</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentYear = computed(() => new Date().getFullYear())

defineOptions({ name: 'FooterPage' })
</script>

<style scoped>
.site-footer {
  background: var(--color-dark);
  color: rgba(255, 255, 255, 0.85);
  margin-top: auto;
}

.footer-main {
  padding: 3.5rem 0 2rem;
}

.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 2.5rem;
}

/* ===== Brand Column ===== */
.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: var(--transition);
}

.footer-logo:hover {
  opacity: 0.85;
}

.footer-logo-icon {
  font-size: 1.8rem;
}

.footer-logo-text {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-primary);
}

.footer-desc {
  font-size: 0.88rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1.2rem;
  max-width: 280px;
}

/* ===== Social Links ===== */
.footer-socials {
  display: flex;
  gap: 0.6rem;
}

.social-link {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
  transition: var(--transition);
}

.social-link:hover {
  background: var(--color-primary);
  color: white;
  transform: translateY(-3px);
}

/* ===== Footer Columns ===== */
.footer-heading {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.2rem;
  position: relative;
  padding-bottom: 0.6rem;
}

.footer-heading::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 2px;
  background: var(--color-primary);
  border-radius: 2px;
}

.footer-list li {
  margin-bottom: 0.65rem;
}

.footer-list a {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.88rem;
  transition: var(--transition);
  display: inline-block;
}

.footer-list a:hover {
  color: var(--color-primary);
  padding-left: 4px;
}

/* ===== Contact List ===== */
.contact-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
}

.contact-icon {
  color: var(--color-primary);
  font-size: 0.85rem;
  margin-top: 0.15rem;
  flex-shrink: 0;
}

.contact-list span {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.88rem;
}

/* ===== Bottom Bar ===== */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.2rem 0;
}

.footer-bottom-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-bottom p {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.4);
}

.footer-credit {
  font-size: 0.82rem;
}

/* ===== Responsive ===== */
@media (max-width: 900px) {
  .footer-inner {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (max-width: 600px) {
  .footer-inner {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }

  .footer-desc {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .footer-heading::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .footer-socials {
    justify-content: center;
  }

  .footer-logo {
    justify-content: center;
  }

  .contact-list li {
    justify-content: center;
  }

  .footer-bottom-inner {
    flex-direction: column;
    gap: 0.3rem;
    text-align: center;
  }
}
</style>
