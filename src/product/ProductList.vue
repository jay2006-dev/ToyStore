<template>
  <div class="products-page">
    <!-- Page Hero Banner -->
    <section class="page-banner">
      <div class="banner-bg-shapes">
        <div class="banner-shape banner-shape-1"></div>
        <div class="banner-shape banner-shape-2"></div>
      </div>
      <div class="banner-inner">
        <h1 class="banner-title">Our Products</h1>
        <p class="banner-subtitle">Explore our amazing collection of toys for kids of all ages</p>
      </div>
    </section>

    <!-- Filters Bar -->
    <div class="filters-section">
      <div class="filters-inner">
        <div class="filters-left">
          <span class="results-count">{{ displayedProducts.length }} products found</span>
        </div>
        <div class="filters-right">
          <div class="filter-group">
            <label class="filter-label">Category</label>
            <select v-model="filter" class="filter-select">
              <option value="">All</option>
              <option value="trending">Trending</option>
              <option value="latest">Latest</option>
              <option value="best">Best Selling</option>
            </select>
          </div>
          <div class="filter-group">
            <label class="filter-label">Sort By</label>
            <select v-model="sortOption" class="filter-select">
              <option value="">Default</option>
              <option value="lowToHigh">Price: Low → High</option>
              <option value="highToLow">Price: High → Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Grid -->
    <section class="products-section">
      <div class="product-grid">
        <div
          v-for="p in paginatedProducts"
          :key="p.id"
          class="product-card"
          v-tooltip="p.name"
        >
          <div class="product-img-wrap" @click="router.push(`/products/${p.id}`)">
            <img :src="p.image" :alt="p.name" class="product-img" />
            <span class="rating-badge">
              <font-awesome-icon icon="star" class="badge-star" />
              {{ p.rating }}
            </span>
            <button
              class="wishlist-btn"
              @click.stop="toggleFavourite(p)"
              :class="{ active: favouriteMap[p.id] }"
            >
              <font-awesome-icon icon="heart" />
            </button>
          </div>
          <div class="product-info">
            <span class="product-category">{{ p.category }}</span>
            <h3 class="product-name" @click="router.push(`/products/${p.id}`)">{{ p.name }}</h3>
            <p class="product-desc">{{ p.description }}</p>
            <div class="product-bottom">
              <span class="product-price">₹{{ p.price.toLocaleString() }}</span>
              <button
                @click="toggleCart(p)"
                class="cart-btn"
                :class="{ added: cartItemsMap[p.id] }"
              >
                <font-awesome-icon :icon="cartItemsMap[p.id] ? 'check' : 'shopping-cart'" />
                {{ cartItemsMap[p.id] ? 'Added' : 'Add to Cart' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button class="page-btn" @click="prevPage" :disabled="currentPage === 1">
          <font-awesome-icon icon="chevron-left" />
          Previous
        </button>
        <div class="page-numbers">
          <button
            v-for="page in visiblePages"
            :key="page"
            class="page-num"
            :class="{ active: currentPage === page }"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
        </div>
        <button class="page-btn" @click="nextPage" :disabled="currentPage === totalPages">
          Next
          <font-awesome-icon icon="chevron-right" />
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, computed, watchEffect } from 'vue'
import { products } from './productsData'
import { vTooltip } from 'floating-vue'
import { useCartStore } from '../stores/cartStore.js'
import { useFavouriteStore } from '../stores/favouriteStore.js'
import { toast } from 'vue3-toastify'
import { useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()
const favouriteStore = useFavouriteStore()
const cartItemsMap = ref({})
const favouriteMap = ref({})
const filter = ref('')
const sortOption = ref('')
const props = defineProps({
  searchQuery: String,
})

const currentPage = ref(1)
const itemsPerPage = 12

watchEffect(() => {
  products.forEach((p) => {
    cartItemsMap.value[p.id] = cartStore.items?.some((item) => item.id === p.id) || false
    favouriteMap.value[p.id] =
      favouriteStore.favouriteItems?.some((item) => item.id === p.id) || false
  })
})

const displayedProducts = computed(() => {
  let base = [...products]
  const q = (route.query.search || '').toLowerCase().trim()

  if (filter.value) {
    base = base.filter((p) => p.categoryTag === filter.value)
  }

  if (q) {
    base = base.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
    )
  }

  if (props.searchQuery) {
    const q = props.searchQuery.toLowerCase().trim()
    base = base.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
    )
  }

  if (sortOption.value === 'lowToHigh') {
    base.sort((a, b) => a.price - b.price)
  } else if (sortOption.value === 'highToLow') {
    base.sort((a, b) => b.price - a.price)
  }

  return base
})

const totalPages = computed(() => Math.ceil(displayedProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return displayedProducts.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  const start = Math.max(1, current - 2)
  const end = Math.min(total, current + 2)
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

function toggleCart(p) {
  if (!cartItemsMap.value[p.id]) {
    cartStore.addToCart(p)
    cartItemsMap.value[p.id] = true
    toast.success('Added to cart!', { position: 'top-center' })
  } else {
    cartStore.removeFromCart(p.id)
    cartItemsMap.value[p.id] = false
  }
}

function toggleFavourite(p) {
  if (favouriteStore.favouriteItems.some((item) => item.id === p.id)) {
    favouriteStore.removeFromFavourites(p.id)
    favouriteMap.value[p.id] = false
    toast.info('Removed from favourites', { position: 'top-center' })
  } else {
    favouriteStore.addToFavourites(p)
    favouriteMap.value[p.id] = true
    toast.success('Added to favourites!', { position: 'top-center' })
  }
}

defineExpose({ vTooltip })
</script>

<style scoped>
/* ===== Page Banner ===== */
.page-banner {
  position: relative;
  background: linear-gradient(135deg, #F7941D 0%, #FF6B00 40%, #E8850A 100%);
  padding: 3rem 2rem;
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
  width: 300px;
  height: 300px;
  top: -100px;
  right: -50px;
}

.banner-shape-2 {
  width: 200px;
  height: 200px;
  bottom: -80px;
  left: -40px;
}

.banner-inner {
  position: relative;
  z-index: 1;
  max-width: var(--max-width);
  margin: 0 auto;
}

.banner-title {
  font-family: var(--font-heading);
  font-size: 2.8rem;
  font-weight: 900;
  color: white;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.banner-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.05rem;
  max-width: 500px;
  margin: 0 auto;
}

/* ===== Filters Section ===== */
.filters-section {
  background: white;
  border-bottom: 1px solid var(--color-border);
  padding: 1rem 0;
  position: sticky;
  top: 68px;
  z-index: 50;
  box-shadow: var(--shadow-sm);
}

.filters-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.results-count {
  font-size: 0.92rem;
  color: var(--color-text-light);
  font-weight: 500;
}

.filters-right {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-text-light);
  white-space: nowrap;
}

.filter-select {
  appearance: none;
  padding: 0.5rem 2.2rem 0.5rem 1rem;
  border-radius: var(--radius-xl);
  font-size: 0.88rem;
  font-weight: 500;
  font-family: var(--font-body);
  color: var(--color-text);
  background: var(--color-bg-light);
  border: 1.5px solid var(--color-border);
  cursor: pointer;
  transition: var(--transition);
  background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='16' viewBox='0 0 24 24' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 0.6rem center;
  background-size: 1rem;
}

.filter-select:hover {
  border-color: var(--color-primary);
}

.filter-select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(247, 148, 29, 0.12);
}

/* ===== Products Section ===== */
.products-section {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
}

/* ===== Product Grid ===== */
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

/* ===== Product Card ===== */
.product-card {
  background: white;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: transparent;
}

.product-img-wrap {
  position: relative;
  background: var(--color-bg-light);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  overflow: hidden;
  cursor: pointer;
}

.product-img {
  width: 70%;
  height: 70%;
  object-fit: contain;
  transition: transform 0.4s ease;
}

.product-card:hover .product-img {
  transform: scale(1.08);
}

/* ===== Rating Badge ===== */
.rating-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: linear-gradient(135deg, var(--color-primary), #FF6B00);
  color: white;
  font-weight: 700;
  font-size: 0.75rem;
  padding: 0.3rem 0.6rem;
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  box-shadow: 0 2px 8px rgba(247, 148, 29, 0.3);
}

.badge-star {
  font-size: 0.65rem;
}

/* ===== Wishlist Button ===== */
.wishlist-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: white;
  color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  opacity: 0;
  border: none;
  cursor: pointer;
}

.product-card:hover .wishlist-btn {
  opacity: 1;
}

.wishlist-btn:hover,
.wishlist-btn.active {
  color: var(--color-sale);
  transform: scale(1.1);
}

.wishlist-btn.active {
  opacity: 1;
}

/* ===== Product Info ===== */
.product-info {
  padding: 1rem 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-category {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 0.3rem;
}

.product-name {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-dark);
  margin-bottom: 0.3rem;
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-name:hover {
  color: var(--color-primary);
}

.product-desc {
  font-size: 0.82rem;
  color: var(--color-text-light);
  line-height: 1.5;
  margin-bottom: 0.8rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.product-price {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-dark);
}

/* ===== Cart Button ===== */
.cart-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.9rem;
  background: var(--color-primary);
  color: white;
  font-weight: 600;
  font-size: 0.78rem;
  border-radius: var(--radius-xl);
  border: none;
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;
}

.cart-btn:hover {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(247, 148, 29, 0.3);
}

.cart-btn.added {
  background: #22c55e;
}

.cart-btn.added:hover {
  background: #16a34a;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

/* ===== Pagination ===== */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin-top: 2.5rem;
  padding: 1rem 0;
}

.page-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  background: white;
  color: var(--color-text);
  font-weight: 600;
  font-size: 0.88rem;
  border-radius: var(--radius-xl);
  border: 1.5px solid var(--color-border);
  cursor: pointer;
  transition: var(--transition);
}

.page-btn:hover:not(:disabled) {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: var(--color-bg-warm);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.35rem;
}

.page-num {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: white;
  color: var(--color-text);
  font-weight: 600;
  font-size: 0.88rem;
  border: 1.5px solid var(--color-border);
  cursor: pointer;
  transition: var(--transition);
}

.page-num:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.page-num.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

/* ===== Responsive ===== */
@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .banner-title {
    font-size: 2.2rem;
  }
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .filters-inner {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .filters-right {
    flex-direction: row;
    width: 100%;
  }

  .filter-group {
    flex: 1;
  }

  .filter-select {
    width: 100%;
  }

  .banner-title {
    font-size: 1.8rem;
  }

  .banner-subtitle {
    font-size: 0.9rem;
  }

  .page-banner {
    padding: 2rem 1.5rem;
  }

  .filters-section {
    top: 56px;
  }
}

@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .products-section {
    padding: 1.5rem 1rem 2rem;
  }

  .product-info {
    padding: 0.75rem;
  }

  .product-name {
    font-size: 0.88rem;
  }

  .product-desc {
    display: none;
  }

  .product-price {
    font-size: 1rem;
  }

  .cart-btn {
    padding: 0.4rem 0.7rem;
    font-size: 0.72rem;
  }

  .rating-badge {
    font-size: 0.68rem;
    padding: 0.2rem 0.5rem;
  }

  .page-btn {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
  }

  .page-num {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
  }

  .banner-title {
    font-size: 1.5rem;
  }
}
</style>
