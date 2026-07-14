<template>
  <div class="profile-page">
    <!-- Profile Header Banner -->
    <section class="profile-banner">
      <div class="banner-bg-shapes">
        <div class="banner-shape banner-shape-1"></div>
        <div class="banner-shape banner-shape-2"></div>
      </div>
      <div class="banner-inner">
        <div class="profile-avatar">
          <img
            v-if="user?.photoURL"
            :src="user.photoURL"
            alt="Profile"
            class="avatar-img"
          />
          <div v-else class="avatar-placeholder">
            <font-awesome-icon icon="user" />
          </div>
        </div>
        <h1 class="profile-name">{{ user?.displayName || 'ToyStore User' }}</h1>
        <p class="profile-email">{{ user?.email || 'No email' }}</p>
      </div>
    </section>

    <!-- Profile Content -->
    <section class="profile-content">
      <div class="profile-grid">
        <!-- Account Details Card -->
        <div class="profile-card">
          <div class="card-header">
            <font-awesome-icon icon="user" class="card-icon" />
            <h2 class="card-title">Account Details</h2>
          </div>
          <div class="card-body">
            <div class="detail-row">
              <span class="detail-label">Full Name</span>
              <span class="detail-value">{{ user?.displayName || 'Not set' }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email Address</span>
              <span class="detail-value">{{ user?.email || 'Not available' }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Member Since</span>
              <span class="detail-value">{{ memberSince }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Account ID</span>
              <span class="detail-value detail-uid">{{ user?.uid?.slice(0, 12) }}...</span>
            </div>
          </div>
        </div>

        <!-- Quick Stats Card -->
        <div class="profile-card">
          <div class="card-header">
            <font-awesome-icon icon="shopping-cart" class="card-icon" />
            <h2 class="card-title">Shopping Summary</h2>
          </div>
          <div class="card-body">
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-icon-wrap" style="background: #FFF3E0;">
                  <font-awesome-icon icon="shopping-cart" style="color: #F7941D;" />
                </div>
                <div class="stat-info">
                  <span class="stat-value">{{ cartStore.cart.length }}</span>
                  <span class="stat-label">Cart Items</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon-wrap" style="background: #FCE4EC;">
                  <font-awesome-icon icon="heart" style="color: #E91E63;" />
                </div>
                <div class="stat-info">
                  <span class="stat-value">{{ favouriteStore.favouriteItems.length }}</span>
                  <span class="stat-label">Wishlist Items</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions Card -->
        <div class="profile-card actions-card">
          <div class="card-header">
            <font-awesome-icon icon="arrow-right" class="card-icon" />
            <h2 class="card-title">Quick Actions</h2>
          </div>
          <div class="card-body">
            <div class="actions-list">
              <button class="action-item" @click="router.push('/products')">
                <div class="action-left">
                  <font-awesome-icon icon="search" class="action-icon" />
                  <span>Browse Products</span>
                </div>
                <font-awesome-icon icon="chevron-right" class="action-arrow" />
              </button>
              <button class="action-item" @click="router.push('/favourites')">
                <div class="action-left">
                  <font-awesome-icon icon="heart" class="action-icon" />
                  <span>My Wishlist</span>
                </div>
                <font-awesome-icon icon="chevron-right" class="action-arrow" />
              </button>
              <button class="action-item" @click="router.push('/cart')">
                <div class="action-left">
                  <font-awesome-icon icon="shopping-cart" class="action-icon" />
                  <span>View Cart</span>
                </div>
                <font-awesome-icon icon="chevron-right" class="action-arrow" />
              </button>
              <button class="action-item" @click="router.push('/checkout')">
                <div class="action-left">
                  <font-awesome-icon icon="tag" class="action-icon" />
                  <span>Checkout</span>
                </div>
                <font-awesome-icon icon="chevron-right" class="action-arrow" />
              </button>
              <button class="action-item logout" @click="handleLogout">
                <div class="action-left">
                  <font-awesome-icon icon="arrow-right" class="action-icon" />
                  <span>Logout</span>
                </div>
                <font-awesome-icon icon="chevron-right" class="action-arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { useCartStore } from '../stores/cartStore.js'
import { useFavouriteStore } from '../stores/favouriteStore.js'

defineOptions({ name: 'UserProfile' })

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const favouriteStore = useFavouriteStore()

const user = computed(() => authStore.user)

const memberSince = computed(() => {
  if (user.value?.metadata?.creationTime) {
    return new Date(user.value.metadata.creationTime).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  return 'Recently joined'
})

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
/* ===== Profile Banner ===== */
.profile-banner {
  position: relative;
  background: linear-gradient(135deg, #F7941D 0%, #FF6B00 40%, #E8850A 100%);
  padding: 3.5rem 2rem 4.5rem;
  text-align: center;
  overflow: hidden;
}

.banner-bg-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.banner-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  background: white;
}

.banner-shape-1 {
  width: 350px;
  height: 350px;
  top: -120px;
  right: -60px;
}

.banner-shape-2 {
  width: 220px;
  height: 220px;
  bottom: -90px;
  left: -40px;
}

.banner-inner {
  position: relative;
  z-index: 1;
}

/* ===== Avatar ===== */
.profile-avatar {
  width: 100px;
  height: 100px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.2rem;
}

.profile-name {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.2rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-email {
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.8);
}

/* ===== Profile Content ===== */
.profile-content {
  max-width: var(--max-width);
  margin: -2rem auto 0;
  padding: 0 1.5rem 3rem;
  position: relative;
  z-index: 2;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

/* ===== Profile Card ===== */
.profile-card {
  background: white;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg-light);
}

.card-icon {
  color: var(--color-primary);
  font-size: 1rem;
}

.card-title {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-dark);
}

.card-body {
  padding: 1.5rem;
}

/* ===== Detail Rows ===== */
.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-border);
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--color-text-light);
}

.detail-value {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--color-text);
}

.detail-uid {
  font-family: monospace;
  font-size: 0.82rem;
  color: var(--color-text-muted);
}

/* ===== Stats Grid ===== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem;
  background: var(--color-bg-light);
  border-radius: var(--radius-md);
  transition: var(--transition);
}

.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.stat-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.stat-value {
  display: block;
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-dark);
  line-height: 1;
}

.stat-label {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

/* ===== Actions Card ===== */
.actions-card {
  grid-column: span 2;
}

.actions-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.action-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 0;
  border-bottom: 1px solid var(--color-border);
  background: none;
  width: 100%;
  font-family: var(--font-body);
  font-size: 0.92rem;
  color: var(--color-text);
  cursor: pointer;
  transition: var(--transition);
}

.action-item:last-child {
  border-bottom: none;
}

.action-item:hover {
  color: var(--color-primary);
}

.action-left {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.action-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-warm);
  color: var(--color-primary);
  border-radius: 50%;
  font-size: 0.8rem;
}

.action-arrow {
  color: var(--color-text-muted);
  font-size: 0.7rem;
  transition: transform 0.3s ease;
}

.action-item:hover .action-arrow {
  transform: translateX(3px);
  color: var(--color-primary);
}

.action-item.logout {
  color: #ef4444;
}

.action-item.logout .action-icon {
  background: #fef2f2;
  color: #ef4444;
}

.action-item.logout:hover {
  color: #dc2626;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }

  .actions-card {
    grid-column: span 1;
  }

  .profile-banner {
    padding: 2.5rem 1.5rem 3.5rem;
  }

  .profile-name {
    font-size: 1.4rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .profile-content {
    padding: 0 1rem 2rem;
  }

  .profile-avatar {
    width: 80px;
    height: 80px;
  }

  .card-body {
    padding: 1rem;
  }

  .detail-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
  }
}
</style>
