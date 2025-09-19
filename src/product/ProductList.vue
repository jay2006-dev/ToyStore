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
      <div v-for="p in displayedProducts" :key="p.id" class="product-card" v-tooltip="p.name">
        <div class="product-top">
          <p class="rating-badge">{{ p.rating }}⭐</p>
        </div>
        <div>
          <img :src="p.image" alt="Product Image" class="product-image" />
        </div>
        <div class="product-details">
          <h3 class="product-name">{{ p.name }}</h3>
          <p class="product-price">₹{{ p.price }}</p>
          <router-link :to="`/products/${p.id}`" class="product-link"> View </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { products } from './productsData'
import { vTooltip } from 'floating-vue'

const filter = ref('')
const sortOption = ref('')
const props = defineProps({
  searchQuery: String,
})

// Final displayed products
const displayedProducts = computed(() => {
  let base = [...products]

  // Apply filter first
  if (filter.value) {
    base = base.filter((p) => p.categoryTag === filter.value)
  }

  // Apply search second
  if (props.searchQuery) {
    base = base.filter((p) => p.name.toLowerCase().includes(props.searchQuery.toLowerCase().trim()))
  }

  if (sortOption.value === 'lowToHigh') {
    base.sort((a, b) => a.price - b.price)
  } else if (sortOption.value === 'highToLow') {
    base.sort((a, b) => b.price - a.price)
  }

  return base
})
defineExpose({ vTooltip })
</script>

<style scoped>
/* Container */
.products-container {
  padding: 1rem;
  max-width: 1200px;
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

/* Filter Select */
.filter-controls {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 1rem;
}

/* Base select style */
.filter-select {
  appearance: none; /* remove default browser arrow */
  border: 1px solid #d1d5db;
  padding: 0.5rem 2.5rem 0.5rem 1rem; /* extra right padding for custom arrow */
  border-radius: 0.75rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #374151;
  background-color: #f9fafb;
  cursor: pointer;
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    background-color 0.2s;
  position: relative;
}

/* Hover & focus */
.filter-select:hover {
  background-color: #f3f4f6;
}
.filter-select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
  outline: none;
}

/* Add a custom dropdown arrow */
.filter-select {
  background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
}

/* Optional: shrink on small screens */
@media (max-width: 640px) {
  .filter-controls {
    flex-direction: column;
    align-items: stretch;
  }
  .filter-select {
    width: 100%;
  }
}

.filters {
  display: flex;
  gap: 1rem;
}

/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

/* Product Card */
.product-card {
  position: relative;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 0.75rem;
  background: #ffffff;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  display: flex;
  flex-direction: column;
}
.product-top {
  position: relative;
}
.rating-badge {
  position: absolute;
  top: -8px; /* 👈 moves outside */
  left: -8px; /* 👈 sticks to left */
  background: violet;
  color: black;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 14px;
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
  text-align: center;
  margin-top: auto; /* pushes this block to bottom if space is left */
  display: flex;
  flex-direction: column;
  align-items: center;
}
/* Product Name */
.product-name {
  font-weight: 600;
  font-size: 1rem;
  color: #111827;
  margin-bottom: 0.5rem;
}

/* Product Price */
.product-price {
  color: #374151;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

/* Link */
.product-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #3b82f6; /* blue-500 */
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.5rem; /* rounded corners */
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
  transition:
    background-color 0.3s ease,
    transform 0.2s ease,
    box-shadow 0.3s ease;
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
    padding: 0.75rem;
  }

  .product-image {
    max-height: 120px;
    margin-bottom: 0.5rem;
  }

  .product-name {
    font-size: 0.9rem;
  }

  .product-price {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
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
