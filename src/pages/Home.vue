<template>
  <div>
    <!-- Discount Banner -->
    <div class="discount-banner"></div>

    <!-- Carousel -->
    <div class="section">
      <h2 class="section-title">New Arrivals</h2>
      <div class="carousel">
        <div v-for="p in newProducts" :key="p.id" class="carousel-item">
          <img :src="p.image" alt="Product Image" class="product-image arrivals" />
          <h3>{{ p.name }}</h3>
          <p>₹{{ p.price }}</p>
          <router-link :to="`/products/${p.id}`" class="product-link"> View </router-link>
        </div>
      </div>
    </div>

    <!-- Trending Section -->
    <div class="section">
      <h2 class="section-title">Trending</h2>
      <div class="product-grid">
        <div v-for="p in trendingProducts" :key="p.id" class="product-card">
          <img :src="p.image" alt="Product Image" class="product-image" />
          <h3>{{ p.name }}</h3>
          <p>₹{{ p.price }}</p>
          <router-link :to="`/products/${p.id}`" class="product-link"> View </router-link>
        </div>
      </div>
    </div>

    <!-- Latest Section -->
    <div class="section">
      <h2 class="section-title">Latest</h2>
      <div class="product-grid">
        <div v-for="p in latestProducts" :key="p.id" class="product-card">
          <img :src="p.image" alt="Product Image" class="product-image" />
          <h3>{{ p.name }}</h3>
          <p>₹{{ p.price }}</p>
          <router-link :to="`/products/${p.id}`" class="product-link"> View </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { products } from '../product/productsData'

defineOptions({
  name: 'HomePage',
})
const newProducts = products.slice(0, 5)
const trendingProducts = products.filter((p) => p.categoryTag === 'trending')
const latestProducts = products.filter((p) => p.categoryTag === 'latest')
</script>

<style scoped>
/* ===== Global Layout ===== */
.section {
  padding: 2rem 1rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937; /* gray-800 */
  margin-bottom: 1rem;
}

/* ===== Discount Banner ===== */
/* ===== Discount Banner ===== */
.discount-banner {
  position: relative;
  background-image: url('https://img.freepik.com/free-vector/hand-drawn-twitch-banner-template-kids_23-2149553064.jpg?semt=ais_hybrid&w=740&q=80');
  background-size: cover;
  background-position: center;
  border-radius: 0.75rem;
  overflow: hidden;
  margin: 1rem auto;
  overflow: hidden;
  width: 95%;
  height: 260px; /* fixed height for banner */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* ===== Carousel ===== */
.carousel {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  scroll-snap-type: x mandatory;
}

.carousel::-webkit-scrollbar {
  height: 6px;
}

.carousel::-webkit-scrollbar-thumb {
  background: #cbd5e1; /* gray-300 */
  border-radius: 4px;
}

.carousel-item {
  min-width: 220px;
  border: 1px solid #e5e7eb;
  padding: 1rem;
  width: 100%;
  border-radius: 0.75rem;
  background: #ffffff;
  scroll-snap-align: start;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  transition: all 0.25s ease;
}

.carousel-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

/* ===== Product Grid ===== */
.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.product-card {
  border: 1px solid #e5e7eb;
  padding: 1rem;
  width: 90%;
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.25s ease;
}
.product-card img {
  width: 50%;
  height: auto;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
}
.arrivals {
  width: 50%;
  height: auto;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}
.product-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.product-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.product-card p {
  color: #4b5563;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.product-card .price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2563eb;
}

/* ===== Links ===== */
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
  color: #1d4ed8; /* darker blue */
}
</style>
