<template>
  <div class="home-page">
    <!-- Discount Banner -->
    <div class="banner"></div>

    <!-- Carousel -->
    <div class="section">
      <h2 class="section-title">New Arrivals</h2>
      <div class="carousel">
        <div v-for="p in newProducts" :key="p.id" class="carousel-item" v-tooltip="p.name">
          <p class="rating">{{ p.rating }}⭐</p>
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
        <div v-for="p in trendingProducts" :key="p.id" class="product-card" v-tooltip="p.name">
          <p class="rating">{{ p.rating }}⭐</p>
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
        <div v-for="p in latestProducts" :key="p.id" class="product-card" v-tooltip="p.name">
          <p class="rating">{{ p.rating }}⭐</p>
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
import { vTooltip } from 'floating-vue'

defineOptions({
  name: 'HomePage',
})
const newProducts = products.filter((p) => p.id % 2 === 0).slice(0, 8)
const trendingProducts = products.filter((p) => p.categoryTag === 'trending').slice(0, 5)
const latestProducts = products.filter((p) => p.categoryTag === 'latest').slice(0, 5)
defineExpose({ vTooltip })
</script>

<style scoped>
.home-page {
  margin: 0 auto;
  padding: 1rem;
}
/* ===== Global Layout ===== */
.section {
  padding: 1rem 1rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937; /* gray-800 */
  margin-bottom: 1rem;
}

/* ===== Discount Banner ===== */
/* ===== Discount Banner ===== */
.banner {
  position: relative;
  background-image: url('https://i.postimg.cc/hv22Khqc/7ff26d04-fbf8-4925-af30-150a5b0a4a78.png');
  background-size: cover;
  background-position: center;
  border-radius: 12px; /* smoother corners */
  margin: 0.75rem auto;

  width: 100%;
  max-width: 1200px; /* keeps it neat in big screens */
  height: 300px; /* fixed height */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 12px rgba(0, 0, 0, 0.2);
}

/* ===== Carousel ===== */
.carousel {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  scroll-snap-type: x mandatory;
  box-shadow: 20 6px 20px rgba(0.5, 0.5, 0.5, 0.1);
}

.carousel-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 24px 24px rgba(0, 0, 0, 0.12);
}

.carousel-item {
  scroll-snap-align: start;
  min-width: 200px;
  min-height: 300px;
  padding-top: 1rem;
  border: 1px solid #e5e7eb; /* gray-200 */
  text-align: center;
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column; /* stack items neatly */
  justify-content: space-between; /* push button down */
}

.carousel::-webkit-scrollbar {
  height: 6px;
}

.carousel::-webkit-scrollbar-thumb {
  background: #cbd5e1; /* gray-300 */
  border-radius: 4px;
}

.rating {
  position: relative;
  right: -10px;
  background-color: rgb(176, 205, 15);
  color: white !important;
  max-width: fit-content;
  padding: 0.25rem 0.25rem;
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 0.875rem;
}
/* ===== Product Grid ===== */
.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

.product-card,
.carousel-item {
  border: 1px solid #e5e7eb;
  border-top: 5px solid #3b82f6; /* Tailwind blue-500 */
  padding: 0.85rem;
  text-align: center;
  width: 80%;
  min-width: 220px;
  min-height: 300px;
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.25s ease;

  display: flex;
  flex-direction: column; /* stack items neatly */
  justify-content: space-between; /* push button down */
}
.product-card img,
.carousel-item img {
  width: 55%; /* adjust as per design */
  height: auto;
  border-radius: 0.5rem;
  margin: 0 auto 0.5rem; /* less gap under image */
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

.product-card h3,
.carousel-item h3 {
  font-size: 1.05rem;
  margin-top: auto;
  font-weight: 600;
  color: #111827;
  margin: 0.25rem 0; /* reduce gap */
}

.product-card p,
.carousel-item p {
  color: #4b5563;
  font-size: 0.9rem;
  margin: 0.25rem 0 0.5rem; /* tighten spacing */
}

.product-card .price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2563eb;
}

/* ===== Links ===== */
.product-link {
  display: inline-block;
  padding: 0.4rem 0.9rem;
  background-color: #3b82f6;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.5rem;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
  transition:
    background-color 0.3s ease,
    transform 0.2s ease,
    box-shadow 0.3s ease;
  margin-top: auto; /* pushes it neatly to bottom */
}

.product-link:hover {
  background: greenyellow; /* darker blue */
}
.product-card button,
.carousel-item button {
  margin-top: auto;
}
/* Mobile responsive styles */
@media (max-width: 640px) {
  .home-page {
    padding: 0.5rem;
  }

  /* Banner smaller & more mobile-friendly */
  .banner {
    height: 160px;
    border-radius: 0.5rem;
    margin: 0.5rem auto;
    box-shadow: none;
  }

  /* Section titles smaller & centered */
  .section-title {
    font-size: 1.25rem;
    text-align: center;
    margin-bottom: 0.75rem;
  }

  /* Carousel */
  .carousel {
    gap: 0.75rem;
    padding: 0.25rem 0;
  }

  .carousel-item {
    min-width: 160px;
    padding: 0.6rem;
  }

  .carousel-item img {
    width: 70%;
  }

  /* Product Grid: 2 per row on mobile */
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6rem;
  }

  .product-card {
    min-width: auto;
    padding: 0.6rem;
  }

  .product-card img {
    width: 70%;
  }

  /* Rating badge smaller */
  .rating {
    font-size: 0.75rem;
    padding: 0.2rem 0.4rem;
  }

  /* Product text sizes */
  .product-card h3,
  .carousel-item h3 {
    font-size: 0.9rem;
  }

  .product-card p,
  .carousel-item p {
    font-size: 0.8rem;
  }

  /* Product link full-width for better tapping */
  .product-link {
    width: 100%;
    padding: 0.5rem;
    font-size: 0.9rem;
  }
}
</style>
