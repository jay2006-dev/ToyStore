<template>
  <div class="home-page">
    <!-- Discount Banner -->
    <div class="banner"></div>

    <div class="category-section">
      <h2 class="category-title">Shop by Category</h2>
      <div class="category-grid">
        <div class="category" @click="setCategory('Action')">
          <img
            src="https://m.media-amazon.com/images/I/91ji3PI53AL._UF1000,1000_QL80_.jpg"
            width="200px"
          />
        </div>
        <div class="category" @click="setCategory('Cars')">
          <img
            src="https://t4.ftcdn.net/jpg/02/48/27/97/360_F_248279748_Re9qnj7RFjtf2lbLVqnr5SAQ7hWGx3DE.jpg"
            width="200px"
          />
        </div>
        <div class="category" @click="setCategory('Sports')">
          <img
            src="https://thumbs.dreamstime.com/b/sports-equipment-isolate-objects-vector-cartoon-illustration-football-soccer-tennis-cricket-baseball-game-symbols-127592354.jpg"
            width="200px"
          />
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">New Arrivals</h2>
      <div class="product-grid">
        <div v-for="p in newProducts" :key="p.id" class="product-card" v-tooltip="p.name">
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
import { useRouter } from 'vue-router'
import { products } from '../product/productsData'
import { vTooltip } from 'floating-vue'
// import ProductList from '../product/ProductList.vue'

const router = useRouter()

function setCategory(category) {
  router.push({ path: '/products', query: { search: category } })
}

defineOptions({
  name: 'HomePage',
})
const newProducts = products.filter((p) => p.id % 2 === 0).slice(0, 5)
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

  /* width: 100%; */
  /* max-width: 1200px; keeps it neat in big screens */
  height: 400px; /* fixed height */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 12px rgba(0, 0, 0, 0.2);
}

.category-section {
  padding: 1rem 1rem;
  margin-top: 1rem;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937; /* gray-800 */
  margin-bottom: 1rem;
  text-align: center;
}

.category-grid {
  display: flex;
  gap: 4rem;
  margin-top: 1rem;
  flex-direction: row;
  justify-content: center;
}

.rating {
  position: absolute;
  top: -14px; /* inside the card */
  right: 0px; /* top-right corner */
  background: linear-gradient(to right, #1e90ff, #7d11e2);
  color: white !important; /* dark text */
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
/* ===== Product Grid ===== */
.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
}

.category {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  border-radius: 50%;
  box-shadow: 10px 24px 18px rgba(0, 0, 0, 0.1);
}

.category img {
  border-radius: 50%;
  transition: border-radius 0.3s ease;
}
.category:hover {
  transform: scale(1.05);
  box-shadow: 0 32px 24px rgba(0, 0, 0, 0.15);
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

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
  padding-bottom: 0.5rem;
  align-items: center;
  flex-direction: column;
}
.product-card img {
  width: 55%; /* adjust as per design */
  height: auto;
  border-radius: 0.5rem;
  margin: 0 auto 0.5rem; /* less gap under image */
}
.arrivals {
  width: 50%;
  height: 50vh;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}
.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); /* ✅ stronger on hover */
}

.product-card h3 {
  font-size: 1.05rem;
  margin-top: auto;
  font-weight: 600;
  color: #111827;
  margin: 0.25rem 0; /* reduce gap */
}

.product-card p {
  color: #4b5563;
  font-size: 0.9rem;
  /* margin: 0.25rem 0 0.5rem; tighten spacing */
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
  /* margin-top: auto; pushes it neatly to bottom */
}

.product-link:hover {
  background: greenyellow; /* darker blue */
}
.product-card button {
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
    position: absolute;
    top: -8px; /* inside the card */
    right: -8px; /* top-right corner */
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

  /* Product text sizes */
  .product-card h3 {
    font-size: 0.9rem;
  }

  .product-card p {
    font-size: 0.8rem;
  }

  /* Product link full-width for better tapping */
  .product-link {
    width: 100%;
    /* padding: 0.5rem; */
    font-size: 0.9rem;
  }
}
</style>
