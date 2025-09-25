<template>
  <div class="products-container">
    <div class="products-header">
      <h2 class="title">All Products</h2>

      <!-- Filter Dropdown -->
      <div class="filters">
        <select v-model="filter" class="filter-select">
          <option value="">All</option>
          <option value="trending">Trending</option>
          <option value="latest">Latest</option>
          <option value="best">Best Selling</option>
        </select>
        <select v-model="sortOption" class="filter-select">
          <option value="">Sort By</option>
          <option value="lowToHigh">Price: Low → High</option>
          <option value="highToLow">Price: High → Low</option>
        </select>
      </div>
    </div>

    <!-- Product Grid -->
    <div class="product-grid">
      <div v-for="p in paginatedProducts" :key="p.id" class="product-card" v-tooltip="p.name">
        <div class="product-top">
          <p class="rating-badge">{{ p.rating }}⭐</p>
        </div>
        <div>
          <img
            :src="p.image"
            alt="Product Image"
            class="product-image"
            @click="router.push(`/products/${p.id}`)"
          />
        </div>
        <div class="product-details">
          <h3 class="product-name">{{ p.name }}</h3>
          <p>{{ p.description }}</p>
          <div class="line">
            <p
              class="fav"
              @click="toggleFavourite(p)"
              :class="['favourite-btn', { favourited: favouriteMap[p.id] }]"
            >
              {{ favouriteMap[p.id] ? '❤️' : '🩶' }}
            </p>
            <p class="product-link">₹{{ p.price }}</p>
          </div>
          <button
            @click="toggleCart(p)"
            class="add"
            :class="['add-btn', { 'added-btn': cartItemsMap[p.id] }]"
          >
            {{ cartItemsMap[p.id] ? 'Added to Cart' : 'Add to Cart' }}
          </button>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">⬅ Prev</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next ➡</button>
    </div>
  </div>
  <!-- </div> -->
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
const cartItemsMap = ref({}) // key: product id, value: true/false
const favouriteMap = ref({}) // key: product id, value: true/false
const filter = ref('')
const sortOption = ref('')
const props = defineProps({
  searchQuery: String,
})

// 🟢 Pagination state
const currentPage = ref(1)
const itemsPerPage = 12

watchEffect(() => {
  products.forEach((p) => {
    cartItemsMap.value[p.id] = cartStore.items?.some((item) => item.id === p.id) || false
    favouriteMap.value[p.id] =
      favouriteStore.favouriteItems?.some((item) => item.id === p.id) || false
  })
})
// Final displayed products
const displayedProducts = computed(() => {
  let base = [...products]
  const q = (route.query.search || '').toLowerCase().trim()

  // Apply filter first
  if (filter.value) {
    base = base.filter((p) => p.categoryTag === filter.value)
  }

  if (q) {
    base = base.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
    )
  }

  // Apply search second
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

// Slice products for current page
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return displayedProducts.value.slice(start, end)
})

// Pagination controls
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
    toast.info('Removed from favourites', { position: 'top-center' })
  } else {
    favouriteStore.addToFavourites(p)
    toast.success('Added to favourites!', { position: 'top-center' })
  }
}

defineExpose({ vTooltip })
</script>

<style scoped>
/* Container */
.products-container {
  /* padding: 1rem; */
  max-width: 1200px !important;
  height: auto;
  margin: 0 auto;
}

.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
/* Title */
.title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
}

.line {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
/* Base select style */
.filter-select {
  appearance: none; /* Remove default arrow */
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #374151;
  background: #ffffff;
  border: 1px solid #d1d5db;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Hover & focus effects */
.filter-select:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.1);
}

.filter-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

/* Custom arrow using SVG */
.filter-select {
  background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='16' viewBox='0 0 24 24' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
}

.filters {
  gap: 1rem;
  /* padding: 10px; */
  display: flex;
  margin-bottom: 1rem; /* optional spacing from other content */
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 20px;
}
.pagination button {
  padding: 6px 12px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}
.pagination button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .filters {
    flex-direction: column;
    gap: 0.75rem;
  }
  .filter-select {
    width: 100%;
  }
}

/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

/* Product Card */
.product-card {
  position: relative;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16); /* ✅ subtle base shadow */
  background: #ffffff;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); /* ✅ stronger on hover */
}

.product-top {
  position: relative;
}
.rating-badge {
  position: absolute;
  top: -24px; /* inside the card */
  right: -12px; /* top-right corner */
  background: linear-gradient(to right, #1e90ff, #7d11e2);
  color: white; /* dark text */
  font-weight: 600;
  font-size: 0.8rem;
  padding: 4px;
  border-radius: 0 20% 0 40%; /* circular */
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px; /* ensures circle shape */
  height: 32px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  z-index: 2; /* stays above the image */
}

/*Image*/

.product-image {
  width: 100%;
  max-height: 160px; /* 👈 limit height but don’t force % */
  object-fit: contain;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}

.product-details {
  text-align: start;
  display: flex;
  flex-direction: column;
}
/* Product Name */
.product-name {
  font-weight: 600;
  font-size: 1.325rem;
  color: #111827;
  margin-bottom: 0.25rem;
  text-align: start !important;
}

/* Product Price */
.add {
  /* position: absolute; */
  bottom: -24px; /* inside the card */
  left: -12px; /* top-right corner */
  background: linear-gradient(to right, #1e90ff, #7d11e2);
  color: white; /* dark text */
  font-weight: 600;
  font-size: 1rem;
  border: none;
  /* padding: 4px; */
  border-radius: 0 20% 0 40%; /* circular */
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px; /* ensures circle shape */
  height: 32px;
  cursor: crosshair;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  z-index: 2; /* stays above the image */
}

/* Link */
.product-link {
  display: inline-block;
  text-align: end !important;
  font-weight: bold;
  font-size: 1.325rem;
}

.product-link:hover {
  color: white;
}
/* 📱 Mobile Responsive Styles */
@media (max-width: 768px) {
  .products-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  /* Title adjusts */
  .title {
    font-size: 1.25rem;
    text-align: center;
    width: 100%;
  }

  /* Filters stack */
  .filters {
    width: 100%;
    flex-direction: column;
    gap: 0.5rem;
  }

  .filter-select {
    width: 100%;
    font-size: 0.9rem;
    padding: 0.6rem 2.5rem 0.6rem 1rem;
  }

  /* Product Grid shrinks to 2 per row */
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  /* Product Card */
  .product-card {
    padding: 0.8rem;
  }

  .product-image {
    height: 150px;
  }

  .product-name {
    font-size: 0.95rem;
  }

  .add {
    font-size: 1rem;
  }
  .product-link {
    width: 100%;
    padding: 0.6rem;
    font-size: 0.9rem;
  }
}

/* 📱 Extra small devices (like phones under 480px) */
@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: 1fr; /* only one product per row */
  }

  .product-card {
    padding: 1rem;
  }

  .product-image {
    max-height: 140px;
  }

  .title {
    font-size: 1.1rem;
  }
}
</style>
