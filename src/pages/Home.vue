<template>
  <div class="home-page">
    <!-- ===== Hero Banner ===== -->
    <section class="hero-section">
      <div class="hero-bg-shapes">
        <div class="hero-shape hero-shape-1"></div>
        <div class="hero-shape hero-shape-2"></div>
        <div class="hero-shape hero-shape-3"></div>
      </div>
      <div class="hero-inner">
        <div class="hero-content">
          <span class="hero-badge">Best Collection</span>
          <h1 class="hero-title">Action<br />Figures</h1>
          <p class="hero-subtitle">Amazing toys for all ages. Explore our bestselling collection!</p>
          <button class="hero-cta" @click="router.push('/products')">
            Buy Now
            <font-awesome-icon icon="arrow-right" class="cta-arrow" />
          </button>
        </div>
        <div class="hero-image-area">
          <img
            src="https://m.media-amazon.com/images/I/91ji3PI53AL._UF1000,1000_QL80_.jpg"
            alt="Action Figures Collection"
            class="hero-toy-img"
          />
        </div>
      </div>
    </section>

    <!-- ===== Featured Products ===== -->
    <section class="section featured-section">
      <div class="section-header">
        <span class="section-label">Featured Collection</span>
        <h2 class="section-title">Featured Products</h2>
      </div>
      <div class="tab-bar">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="tab-btn"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>
      <div class="product-grid-4">
        <div
          v-for="p in filteredProducts"
          :key="p.id"
          class="product-card"
          @click="router.push(`/products/${p.id}`)"
        >
          <div class="product-img-wrap">
            <img :src="p.image" :alt="p.name" class="product-img" />
            <button class="wishlist-btn" @click.stop>
              <font-awesome-icon icon="heart" />
            </button>
          </div>
          <div class="product-info">
            <div class="product-rating">
              <span class="stars">
                <font-awesome-icon v-for="s in Math.floor(p.rating)" :key="s" icon="star" class="star-filled" />
                <font-awesome-icon v-if="p.rating % 1 >= 0.5" icon="star-half-alt" class="star-filled" />
              </span>
              <span class="rating-count">({{ p.rating }})</span>
            </div>
            <h3 class="product-name">{{ p.name }}</h3>
            <p class="product-price">₹{{ p.price.toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Kids' Toys by Age ===== -->
    <section class="section age-section">
      <div class="section-header">
        <span class="section-label">Product Categories</span>
        <h2 class="section-title">Kids' Toys by Age</h2>
      </div>
      <div class="age-grid">
        <div
          v-for="(age, idx) in ageCategories"
          :key="idx"
          class="age-card"
          :class="age.size"
          :style="{ background: age.bg }"
          @click="setCategory(age.search)"
        >
          <img :src="age.image" :alt="age.label" class="age-img" />
          <div class="age-overlay">
            <span class="age-label">{{ age.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Latest Products + On Sale ===== -->
    <section class="section split-section">
      <div class="split-grid">
        <!-- Latest Products -->
        <div class="split-left">
          <h2 class="section-title">Latest Products</h2>
          <div class="latest-grid">
            <div
              v-for="p in latestProducts"
              :key="p.id"
              class="product-card"
              @click="router.push(`/products/${p.id}`)"
            >
              <div class="product-img-wrap">
                <img :src="p.image" :alt="p.name" class="product-img" />
              </div>
              <div class="product-info">
                <div class="product-rating">
                  <span class="stars">
                    <font-awesome-icon v-for="s in Math.floor(p.rating)" :key="s" icon="star" class="star-filled" />
                  </span>
                </div>
                <h3 class="product-name">{{ p.name }}</h3>
                <p class="product-price">₹{{ p.price.toLocaleString() }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- On Sale -->
        <div class="split-right">
          <h2 class="section-title">On Sale</h2>
          <div class="sale-list">
            <div
              v-for="p in saleProducts"
              :key="p.id"
              class="sale-item"
              @click="router.push(`/products/${p.id}`)"
            >
              <div class="sale-img-wrap">
                <img :src="p.image" :alt="p.name" class="sale-img" />
                <span class="sale-badge">-{{ p.discount }}%</span>
              </div>
              <div class="sale-info">
                <h4 class="sale-name">{{ p.name }}</h4>
                <div class="sale-prices">
                  <span class="sale-original">₹{{ p.originalPrice.toLocaleString() }}</span>
                  <span class="sale-current">₹{{ p.price.toLocaleString() }}</span>
                </div>
                <div class="sale-rating">
                  <font-awesome-icon v-for="s in Math.floor(p.rating)" :key="s" icon="star" class="star-filled" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Countdown Banner ===== -->
    <section class="countdown-section">
      <div class="countdown-bg-shapes">
        <div class="cd-shape cd-shape-1"></div>
        <div class="cd-shape cd-shape-2"></div>
      </div>
      <div class="countdown-inner">
        <div class="countdown-content">
          <span class="countdown-badge">We can't</span>
          <h2 class="countdown-title">Keep these in stock!</h2>
          <p class="countdown-subtitle">Hurry! Limited time offer on our hottest toys.</p>
        </div>
        <div class="countdown-timer">
          <div class="timer-unit">
            <span class="timer-value">{{ countdown.days }}</span>
            <span class="timer-label">Days</span>
          </div>
          <span class="timer-sep">:</span>
          <div class="timer-unit">
            <span class="timer-value">{{ countdown.hours }}</span>
            <span class="timer-label">Hours</span>
          </div>
          <span class="timer-sep">:</span>
          <div class="timer-unit">
            <span class="timer-value">{{ countdown.minutes }}</span>
            <span class="timer-label">Mins</span>
          </div>
          <span class="timer-sep">:</span>
          <div class="timer-unit">
            <span class="timer-value">{{ countdown.seconds }}</span>
            <span class="timer-label">Secs</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Blog Section ===== -->
    <section class="section blog-section">
      <div class="section-header">
        <span class="section-label">Latest News</span>
        <h2 class="section-title">From the Blog</h2>
      </div>
      <div class="blog-grid">
        <div v-for="(post, idx) in blogPosts" :key="idx" class="blog-card">
          <div class="blog-img-wrap">
            <img :src="post.image" :alt="post.title" class="blog-img" />
            <span class="blog-date">
              <font-awesome-icon icon="calendar" /> {{ post.date }}
            </span>
          </div>
          <div class="blog-info">
            <h3 class="blog-title">{{ post.title }}</h3>
            <p class="blog-excerpt">{{ post.excerpt }}</p>
            <span class="blog-read-more">
              Read More <font-awesome-icon icon="arrow-right" />
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Newsletter Section ===== -->
    <section class="newsletter-section">
      <div class="newsletter-inner">
        <div class="newsletter-content">
          <h2 class="newsletter-title">Subscribe to Newsletter</h2>
          <p class="newsletter-subtitle">Get the latest updates on new toys, deals, and more!</p>
        </div>
        <div class="newsletter-form">
          <input type="email" placeholder="Enter your email address" class="newsletter-input" />
          <button class="newsletter-btn">Subscribe</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { products } from '../product/productsData'

const router = useRouter()

defineOptions({ name: 'HomePage' })

// ===== Tab filtering =====
const tabs = [
  { key: 'action', label: 'Action Figures' },
  { key: 'cars', label: 'Cars & Vehicles' },
  { key: 'educational', label: 'Learning Toys' },
]

const activeTab = ref('action')

const tabCategoryMap = {
  action: 'Action',
  cars: 'Cars',
  educational: 'Educational',
}

const filteredProducts = computed(() => {
  const cat = tabCategoryMap[activeTab.value]
  return products.filter((p) => p.category === cat).slice(0, 8)
})

// ===== Category Navigation =====
function setCategory(category) {
  router.push({ path: '/products', query: { search: category } })
}

// ===== Latest & Sale Products =====
const latestProducts = products.filter((p) => p.categoryTag === 'latest').slice(0, 4)

const saleProducts = products
  .filter((p) => p.categoryTag === 'best')
  .slice(0, 4)
  .map((p) => ({
    ...p,
    discount: Math.floor(Math.random() * 20) + 10,
    originalPrice: Math.round(p.price * 1.3),
  }))

// ===== Age Categories =====
const ageCategories = [
  {
    label: '0 to 12 Months',
    search: 'Soft Toys',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=300&fit=crop',
    bg: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)',
    size: 'age-sm',
  },
  {
    label: '14 Years & Up',
    search: 'Electronics',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=400&h=400&fit=crop',
    bg: 'linear-gradient(135deg, #E8EAF6, #C5CAE9)',
    size: 'age-lg',
  },
  {
    label: '10 to 15 Years',
    search: 'Brain Games',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=400&fit=crop',
    bg: 'linear-gradient(135deg, #E0F7FA, #B2EBF2)',
    size: 'age-lg',
  },
  {
    label: '1 to 3 Years',
    search: 'Classic Toys',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop',
    bg: 'linear-gradient(135deg, #FCE4EC, #F8BBD0)',
    size: 'age-sm',
  },
  {
    label: '3 to 5 Years',
    search: 'Role Play',
    image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop',
    bg: 'linear-gradient(135deg, #F3E5F5, #E1BEE7)',
    size: 'age-sm',
  },
  {
    label: '5 to 7 Years',
    search: 'Sports',
    image: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=400&h=300&fit=crop',
    bg: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)',
    size: 'age-sm',
  },
]

// ===== Countdown Timer =====
const countdown = ref({ days: '00', hours: '00', minutes: '00', seconds: '00' })
let countdownInterval = null

function updateCountdown() {
  const target = new Date()
  target.setDate(target.getDate() + 3)
  target.setHours(0, 0, 0, 0)

  const savedTarget = localStorage.getItem('toystore_countdown_target')
  let endDate
  if (savedTarget) {
    endDate = new Date(savedTarget)
    if (endDate < new Date()) {
      endDate = target
      localStorage.setItem('toystore_countdown_target', target.toISOString())
    }
  } else {
    endDate = target
    localStorage.setItem('toystore_countdown_target', target.toISOString())
  }

  const now = new Date()
  const diff = endDate - now

  if (diff <= 0) {
    countdown.value = { days: '00', hours: '00', minutes: '00', seconds: '00' }
    return
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  countdown.value = {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  }
}

// ===== Blog Posts =====
const blogPosts = [
  {
    title: 'Top 10 Toys for Kids in 2025',
    excerpt: 'Discover the most popular toys that kids are loving this year. From educational to fun!',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&h=320&fit=crop',
    date: 'Jul 10, 2025',
  },
  {
    title: 'How to Choose Age-Appropriate Toys',
    excerpt: 'A parent\'s guide to selecting the best toys that match your child\'s developmental stage.',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=320&fit=crop',
    date: 'Jul 05, 2025',
  },
  {
    title: 'The Benefits of Educational Play',
    excerpt: 'Learn how the right toys can boost creativity, problem-solving, and social skills.',
    image: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=500&h=320&fit=crop',
    date: 'Jun 28, 2025',
  },
]

onMounted(() => {
  updateCountdown()
  countdownInterval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  clearInterval(countdownInterval)
})
</script>

<style scoped>
/* ===== Hero Section ===== */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #F7941D 0%, #FF6B00 40%, #E8850A 100%);
  overflow: hidden;
  padding: 0;
}

.hero-bg-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  background: white;
}

.hero-shape-1 {
  width: 400px;
  height: 400px;
  top: -100px;
  right: -100px;
}

.hero-shape-2 {
  width: 250px;
  height: 250px;
  bottom: -60px;
  left: -60px;
}

.hero-shape-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  left: 40%;
}

.hero-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  position: relative;
  z-index: 1;
}

.hero-content {
  flex: 1;
  max-width: 500px;
  animation: slideInLeft 0.8s ease;
}

.hero-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(6px);
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: var(--radius-xl);
  margin-bottom: 1.2rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: 4rem;
  font-weight: 900;
  color: white;
  line-height: 1.05;
  margin-bottom: 1rem;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
}

.hero-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 380px;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 2.2rem;
  background: white;
  color: var(--color-primary);
  font-size: 1rem;
  font-weight: 700;
  border-radius: var(--radius-xl);
  border: none;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.hero-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.cta-arrow {
  transition: transform 0.3s ease;
}

.hero-cta:hover .cta-arrow {
  transform: translateX(4px);
}

.hero-image-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: slideInRight 0.8s ease;
}

.hero-toy-img {
  width: 100%;
  max-width: 420px;
  border-radius: var(--radius-lg);
  object-fit: cover;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.2));
  animation: float 4s ease-in-out infinite;
}

/* ===== Section Common ===== */
.section {
  padding: 4rem 1.5rem;
  max-width: var(--max-width);
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.section-label {
  display: inline-block;
  color: var(--color-primary);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 0.5rem;
}

.section-title {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--color-dark);
}

/* ===== Tabs ===== */
.tab-bar {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 0.55rem 1.5rem;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: white;
  color: var(--color-text-light);
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  transition: var(--transition);
}

.tab-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.tab-btn.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

/* ===== Product Grid ===== */
.product-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.product-card {
  background: white;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border);
  transition: var(--transition);
  cursor: pointer;
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
}

.product-img {
  width: 75%;
  height: 75%;
  object-fit: contain;
  transition: transform 0.4s ease;
}

.product-card:hover .product-img {
  transform: scale(1.08);
}

.wishlist-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 34px;
  height: 34px;
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
}

.product-card:hover .wishlist-btn {
  opacity: 1;
}

.wishlist-btn:hover {
  color: var(--color-sale);
  transform: scale(1.1);
}

.product-info {
  padding: 1rem 1.2rem 1.2rem;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 0.4rem;
}

.stars {
  display: flex;
  gap: 2px;
}

.star-filled {
  color: var(--color-star);
  font-size: 0.75rem;
}

.rating-count {
  color: var(--color-text-muted);
  font-size: 0.78rem;
}

.product-name {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.35rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-price {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-primary);
}

/* ===== Age Section ===== */
.age-section {
  background: var(--color-bg-light);
  max-width: 100%;
  padding: 4rem 1.5rem;
}

.age-section .section-header,
.age-section .age-grid {
  max-width: var(--max-width);
  margin-left: auto;
  margin-right: auto;
}

.age-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto;
  gap: 1.2rem;
}

.age-card {
  border-radius: var(--radius-md);
  overflow: hidden;
  position: relative;
  cursor: pointer;
  min-height: 180px;
  transition: var(--transition);
}

.age-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.age-card.age-sm {
  grid-column: span 1;
}

.age-card.age-lg {
  grid-column: span 2;
}

.age-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  inset: 0;
  transition: transform 0.5s ease;
}

.age-card:hover .age-img {
  transform: scale(1.08);
}

.age-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 60%);
  display: flex;
  align-items: flex-end;
  padding: 1.2rem;
}

.age-label {
  color: white;
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

/* ===== Split Section (Latest + On Sale) ===== */
.split-section {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.split-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2.5rem;
}

.latest-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
}

/* ===== Sale Items ===== */
.sale-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sale-item {
  display: flex;
  gap: 1rem;
  padding: 0.8rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: var(--transition);
  background: white;
}

.sale-item:hover {
  box-shadow: var(--shadow-md);
  border-color: transparent;
}

.sale-img-wrap {
  position: relative;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  background: var(--color-bg-light);
  border-radius: var(--radius-sm);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sale-img {
  width: 90%;
  height: 90%;
  object-fit: contain;
}

.sale-badge {
  position: absolute;
  top: 4px;
  left: 4px;
  background: var(--color-sale);
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
}

.sale-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sale-name {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sale-prices {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.sale-original {
  text-decoration: line-through;
  color: var(--color-text-muted);
  font-size: 0.8rem;
}

.sale-current {
  color: var(--color-sale);
  font-weight: 700;
  font-size: 0.95rem;
}

.sale-rating {
  display: flex;
  gap: 2px;
}

.sale-rating .star-filled {
  font-size: 0.65rem;
}

/* ===== Countdown Banner ===== */
.countdown-section {
  position: relative;
  background: linear-gradient(135deg, #FFD700 0%, var(--color-primary) 50%, #FF6B00 100%);
  padding: 3.5rem 2rem;
  overflow: hidden;
}

.countdown-bg-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.cd-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.cd-shape-1 {
  width: 300px;
  height: 300px;
  top: -120px;
  right: 10%;
}

.cd-shape-2 {
  width: 200px;
  height: 200px;
  bottom: -80px;
  left: 5%;
}

.countdown-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  position: relative;
  z-index: 1;
}

.countdown-badge {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.3rem;
}

.countdown-title {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.countdown-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  margin-top: 0.5rem;
}

.countdown-timer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.timer-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: var(--radius-md);
  padding: 1rem 1.2rem;
  min-width: 72px;
}

.timer-value {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 900;
  color: white;
  line-height: 1;
}

.timer-label {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0.3rem;
}

.timer-sep {
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
}

/* ===== Blog Section ===== */
.blog-section {
  background: var(--color-bg-light);
  max-width: 100%;
  padding: 4rem 1.5rem;
}

.blog-section .section-header,
.blog-section .blog-grid {
  max-width: var(--max-width);
  margin-left: auto;
  margin-right: auto;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.blog-card {
  background: white;
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: var(--transition);
  border: 1px solid var(--color-border);
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: transparent;
}

.blog-img-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16/10;
}

.blog-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.blog-card:hover .blog-img {
  transform: scale(1.06);
}

.blog-date {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: var(--color-primary);
  color: white;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.3rem 0.7rem;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.blog-info {
  padding: 1.2rem;
}

.blog-title {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-dark);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.blog-excerpt {
  font-size: 0.85rem;
  color: var(--color-text-light);
  line-height: 1.5;
  margin-bottom: 0.8rem;
}

.blog-read-more {
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.88rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  transition: var(--transition);
}

.blog-read-more:hover {
  gap: 0.6rem;
}

/* ===== Newsletter ===== */
.newsletter-section {
  background: linear-gradient(135deg, var(--color-accent-purple) 0%, #1a1040 100%);
  padding: 3rem 2rem;
}

.newsletter-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.newsletter-title {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.3rem;
}

.newsletter-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.92rem;
}

.newsletter-form {
  display: flex;
  gap: 0;
  flex-shrink: 0;
}

.newsletter-input {
  width: 300px;
  padding: 0.85rem 1.2rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-right: none;
  border-radius: var(--radius-xl) 0 0 var(--radius-xl);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-family: var(--font-body);
  font-size: 0.9rem;
  outline: none;
  transition: var(--transition);
}

.newsletter-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.newsletter-input:focus {
  border-color: var(--color-primary);
  background: rgba(255, 255, 255, 0.15);
}

.newsletter-btn {
  padding: 0.85rem 1.8rem;
  background: var(--color-primary);
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  border-radius: 0 var(--radius-xl) var(--radius-xl) 0;
  transition: var(--transition);
}

.newsletter-btn:hover {
  background: var(--color-primary-dark);
}

/* ===== Responsive ===== */
@media (max-width: 1024px) {
  .product-grid-4 {
    grid-template-columns: repeat(3, 1fr);
  }

  .hero-title {
    font-size: 3rem;
  }

  .split-grid {
    grid-template-columns: 1fr;
  }

  .age-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .age-card.age-lg {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .hero-inner {
    flex-direction: column;
    text-align: center;
    padding: 2.5rem 1.5rem;
    gap: 2rem;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-subtitle {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-title {
    font-size: 2.8rem;
  }

  .hero-toy-img {
    max-width: 280px;
  }

  .product-grid-4 {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .age-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .blog-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
  }

  .countdown-inner {
    flex-direction: column;
    text-align: center;
  }

  .countdown-title {
    font-size: 1.8rem;
  }

  .newsletter-inner {
    flex-direction: column;
    text-align: center;
  }

  .newsletter-form {
    width: 100%;
  }

  .newsletter-input {
    width: 100%;
    flex: 1;
  }

  .latest-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.2rem;
  }

  .hero-inner {
    padding: 2rem 1rem;
  }

  .section {
    padding: 2.5rem 1rem;
  }

  .tab-btn {
    padding: 0.45rem 1rem;
    font-size: 0.8rem;
  }

  .product-grid-4 {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .product-info {
    padding: 0.75rem;
  }

  .product-name {
    font-size: 0.82rem;
  }

  .product-price {
    font-size: 0.95rem;
  }

  .age-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .timer-unit {
    padding: 0.7rem 0.8rem;
    min-width: 56px;
  }

  .timer-value {
    font-size: 1.4rem;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .newsletter-input {
    border-radius: var(--radius-xl);
    border-right: 2px solid rgba(255, 255, 255, 0.2);
  }

  .newsletter-btn {
    border-radius: var(--radius-xl);
  }
}
</style>
