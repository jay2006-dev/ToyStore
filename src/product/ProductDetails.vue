<template>
  <div class="detail-page">
    <!-- Breadcrumb -->
    <div class="breadcrumb-bar">
      <div class="breadcrumb-inner">
        <router-link to="/" class="crumb">Home</router-link>
        <span class="crumb-sep">
          <font-awesome-icon icon="chevron-right" />
        </span>
        <router-link to="/products" class="crumb">Products</router-link>
        <span class="crumb-sep">
          <font-awesome-icon icon="chevron-right" />
        </span>
        <span class="crumb-current">{{ product.name }}</span>
      </div>
    </div>

    <!-- Product Detail Card -->
    <section class="detail-section">
      <div class="detail-card">
        <!-- Image Side -->
        <div class="detail-img-side">
          <div class="detail-img-wrap">
            <img :src="product.image" :alt="product.name" class="detail-img" />
          </div>
        </div>

        <!-- Info Side -->
        <div class="detail-info-side">
          <span class="detail-category">
            <font-awesome-icon icon="tag" />
            {{ product.category }}
          </span>

          <h1 class="detail-title">{{ product.name }}</h1>

          <div class="detail-rating">
            <div class="stars-row">
              <font-awesome-icon
                v-for="s in Math.floor(product.rating)"
                :key="s"
                icon="star"
                class="star-filled"
              />
              <font-awesome-icon
                v-if="product.rating % 1 >= 0.5"
                icon="star-half-alt"
                class="star-filled"
              />
            </div>
            <span class="rating-text">{{ product.rating }} Rating</span>
          </div>

          <p class="detail-description">{{ product.description }}</p>

          <div class="detail-price-row">
            <span class="detail-price">₹{{ product.price.toLocaleString() }}</span>
            <span class="detail-stock">✓ In Stock</span>
          </div>

          <div class="detail-divider"></div>

          <!-- Features -->
          <div class="detail-features">
            <div class="feature-item">
              <font-awesome-icon icon="truck" class="feature-icon" />
              <div>
                <span class="feature-title">Free Delivery</span>
                <span class="feature-sub">On orders over ₹500</span>
              </div>
            </div>
            <div class="feature-item">
              <font-awesome-icon icon="undo" class="feature-icon" />
              <div>
                <span class="feature-title">Easy Returns</span>
                <span class="feature-sub">7-day return policy</span>
              </div>
            </div>
            <div class="feature-item">
              <font-awesome-icon icon="shield-alt" class="feature-icon" />
              <div>
                <span class="feature-title">Secure Payment</span>
                <span class="feature-sub">100% secure checkout</span>
              </div>
            </div>
          </div>

          <div class="detail-divider"></div>

          <!-- Action Buttons -->
          <div class="detail-actions">
            <button
              @click="toggleCart(product)"
              class="btn-primary"
              :class="{ added: cartitem }"
            >
              <font-awesome-icon :icon="cartitem ? 'check' : 'shopping-cart'" />
              {{ cartitem ? 'Added to Cart' : 'Add to Cart' }}
            </button>
            <button
              @click="toggleFavourite(product)"
              class="btn-secondary"
              :class="{ fav: isFav }"
            >
              <font-awesome-icon icon="heart" />
              {{ isFav ? 'Favourited' : 'Add to Wishlist' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Products -->
    <section class="related-section" v-if="relatedProducts.length > 0">
      <div class="related-inner">
        <h2 class="related-title">You Might Also Like</h2>
        <div class="related-grid">
          <div
            v-for="rp in relatedProducts"
            :key="rp.id"
            class="related-card"
            @click="goToProduct(rp.id)"
          >
            <div class="related-img-wrap">
              <img :src="rp.image" :alt="rp.name" class="related-img" />
            </div>
            <div class="related-info">
              <h3 class="related-name">{{ rp.name }}</h3>
              <span class="related-price">₹{{ rp.price.toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cartStore.js'
import { products } from './productsData'
import { useFavouriteStore } from '../stores/favouriteStore.js'
import { toast } from 'vue3-toastify'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const favouriteStore = useFavouriteStore()
const product = ref(products.find((p) => p.id == route.params.id))
const cartitem = ref(cartStore.items?.some((item) => item.id === product.value.id) || false)

const isFav = computed(() =>
  favouriteStore.favouriteItems?.some((item) => item.id === product.value.id) || false
)

const relatedProducts = computed(() =>
  products
    .filter((p) => p.category === product.value.category && p.id !== product.value.id)
    .slice(0, 4)
)

function toggleFavourite(p) {
  if (isFav.value) {
    favouriteStore.removeFromFavourites(p.id)
    toast.info('Removed from favourites', { position: 'top-center' })
  } else {
    favouriteStore.addToFavourites(p)
    toast.success('Added to favourites!', { position: 'top-center' })
  }
}

function toggleCart(p) {
  if (!cartitem.value) {
    cartStore.addToCart(p)
    cartitem.value = true
    toast.success('Added to cart!', { position: 'top-center' })
  } else {
    cartStore.removeFromCart(p.id)
    cartitem.value = false
  }
}

function goToProduct(id) {
  router.push(`/products/${id}`)
  // Reload with new product data
  window.location.reload()
}
</script>

<style scoped>
/* ===== Breadcrumb ===== */
.breadcrumb-bar {
  background: var(--color-bg-light);
  border-bottom: 1px solid var(--color-border);
  padding: 0.9rem 0;
}

.breadcrumb-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.crumb {
  color: var(--color-text-light);
  font-weight: 500;
  transition: var(--transition);
}

.crumb:hover {
  color: var(--color-primary);
}

.crumb-sep {
  color: var(--color-text-muted);
  font-size: 0.6rem;
}

.crumb-current {
  color: var(--color-text);
  font-weight: 600;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ===== Detail Section ===== */
.detail-section {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
}

.detail-card {
  display: flex;
  gap: 3rem;
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
}

/* ===== Image Side ===== */
.detail-img-side {
  flex: 1;
  min-width: 0;
}

.detail-img-wrap {
  background: var(--color-bg-light);
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 450px;
}

.detail-img {
  max-width: 85%;
  max-height: 380px;
  object-fit: contain;
  transition: transform 0.5s ease;
}

.detail-img-wrap:hover .detail-img {
  transform: scale(1.05);
}

/* ===== Info Side ===== */
.detail-info-side {
  flex: 1;
  padding: 2.5rem 2.5rem 2.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.detail-category {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.6rem;
}

.detail-title {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-dark);
  line-height: 1.2;
  margin-bottom: 0.8rem;
}

/* ===== Rating ===== */
.detail-rating {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.stars-row {
  display: flex;
  gap: 2px;
}

.star-filled {
  color: var(--color-star);
  font-size: 0.9rem;
}

.rating-text {
  font-size: 0.88rem;
  color: var(--color-text-light);
  font-weight: 500;
}

.detail-description {
  font-size: 0.95rem;
  color: var(--color-text-light);
  line-height: 1.7;
  margin-bottom: 1.2rem;
}

/* ===== Price ===== */
.detail-price-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.detail-price {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 900;
  color: var(--color-primary);
}

.detail-stock {
  font-size: 0.82rem;
  font-weight: 600;
  color: #22c55e;
  background: #f0fdf4;
  padding: 0.3rem 0.8rem;
  border-radius: var(--radius-xl);
}

.detail-divider {
  height: 1px;
  background: var(--color-border);
  margin: 1rem 0;
}

/* ===== Features ===== */
.detail-features {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.feature-icon {
  color: var(--color-primary);
  font-size: 1.1rem;
  width: 36px;
  height: 36px;
  background: var(--color-bg-warm);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  flex-shrink: 0;
}

.feature-title {
  display: block;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-text);
}

.feature-sub {
  display: block;
  font-size: 0.72rem;
  color: var(--color-text-muted);
}

/* ===== Action Buttons ===== */
.detail-actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 2rem;
  background: linear-gradient(135deg, var(--color-primary), #FF6B00);
  color: white;
  font-weight: 700;
  font-size: 0.95rem;
  border-radius: var(--radius-xl);
  border: none;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 4px 16px rgba(247, 148, 29, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(247, 148, 29, 0.4);
}

.btn-primary.added {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  box-shadow: 0 4px 16px rgba(34, 197, 94, 0.3);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 2rem;
  background: white;
  color: var(--color-text);
  font-weight: 700;
  font-size: 0.95rem;
  border-radius: var(--radius-xl);
  border: 2px solid var(--color-border);
  cursor: pointer;
  transition: var(--transition);
}

.btn-secondary:hover {
  border-color: var(--color-sale);
  color: var(--color-sale);
  background: #fef2f2;
}

.btn-secondary.fav {
  border-color: var(--color-sale);
  color: var(--color-sale);
  background: #fef2f2;
}

/* ===== Related Products ===== */
.related-section {
  background: var(--color-bg-light);
  padding: 3rem 0;
}

.related-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
}

.related-title {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--color-dark);
  margin-bottom: 1.5rem;
  text-align: center;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.related-card {
  background: white;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: var(--transition);
}

.related-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: transparent;
}

.related-img-wrap {
  background: var(--color-bg-light);
  padding: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
}

.related-img {
  width: 70%;
  height: 70%;
  object-fit: contain;
  transition: transform 0.4s ease;
}

.related-card:hover .related-img {
  transform: scale(1.06);
}

.related-info {
  padding: 0.8rem 1rem;
}

.related-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.related-price {
  font-family: var(--font-heading);
  font-weight: 700;
  color: var(--color-primary);
  font-size: 1rem;
}

/* ===== Responsive ===== */
@media (max-width: 900px) {
  .detail-card {
    flex-direction: column;
    gap: 0;
  }

  .detail-info-side {
    padding: 2rem;
  }

  .detail-img-wrap {
    min-height: 300px;
    padding: 2rem;
  }

  .detail-features {
    flex-direction: column;
    gap: 0.8rem;
  }

  .related-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .detail-section {
    padding: 1rem;
  }

  .detail-info-side {
    padding: 1.5rem;
  }

  .detail-title {
    font-size: 1.5rem;
  }

  .detail-price {
    font-size: 1.5rem;
  }

  .detail-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
    padding: 0.8rem 1.5rem;
    font-size: 0.88rem;
  }

  .detail-img-wrap {
    min-height: 240px;
    padding: 1.5rem;
  }

  .related-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .breadcrumb-inner {
    font-size: 0.78rem;
  }
}
</style>
