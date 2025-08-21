<template>
  <div class="products-container">
    <h2 class="title">All Products</h2>

    <!-- Filter Dropdown -->
    <select v-model="filter" class="filter-select">
      <option value="">All</option>
      <option value="trending">Trending</option>
      <option value="latest">Latest</option>
      <option value="best">Best Selling</option>
    </select>

    <!-- Product Grid -->
    <div class="product-grid">
      <div v-for="p in filteredProducts" :key="p.id" class="product-card">
        <div>
          <img :src="p.image" alt="Product Image" class="product-image" />
        </div>
        <div>
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

const filter = ref('')

const filteredProducts = computed(() => {
  if (!filter.value) return products
  return products.filter((p) => p.categoryTag === filter.value)
})
</script>

<style scoped>
/* Container */
.products-container {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Title */
.title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
}

/* Filter Select */
.filter-select {
  border: 1px solid #d1d5db;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.filter-select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  outline: none;
}

/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

/* Product Card */
.product-card {
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem;
  background: #ffffff;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
/*Image*/

.product-image {
  width: 100%;
  height: 50%;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
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
</style>
