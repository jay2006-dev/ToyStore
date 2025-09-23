<template>
  <div class="product-container">
    <div class="product-card">
      <!-- Left Image Section -->
      <div class="product-image-container">
        <img :src="product.image" alt="Product Image" class="product-image" />
      </div>

      <!-- Right Info Section -->
      <div class="product-info">
        <h2 class="product-title">{{ product.name }}</h2>

        <p class="product-category">
          Category: <span>{{ product.category }}</span>
        </p>

        <p class="product-rating">⭐ {{ product.rating }}</p>

        <p class="product-description">
          {{ product.description }}
        </p>

        <p class="product-price">₹{{ product.price }}</p>

        <div class="btn-group">
          <button @click="toggleCart(product)" :class="['add-btn', { 'added-btn': cartitem }]">
            {{ cartitem ? '✓ Added' : 'Add to Cart' }}
          </button>

          <button @click="toggleFavourite(product)" class="favourites">❤️ Favourite</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useCartStore } from '../stores/cartStore.js'
import { products } from './productsData'
import { useFavouriteStore } from '../stores/favouriteStore.js'
import { toast } from 'vue3-toastify'

const route = useRoute()
const cartStore = useCartStore()
const favouriteStore = useFavouriteStore()
const product = ref(products.find((p) => p.id == route.params.id))
const cartitem = ref(false)
function toggleFavourite(p) {
  favouriteStore.addToFavourites(p)
  toast.success('Added to favourites!', { position: 'top-center' })
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
</script>

<style scoped>
/* Page Container */
.product-container {
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f9fafb, #f3f4f6);
  min-height: 90vh;
}

/* Card */
.product-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  padding: 2rem;
  max-width: 1000px;
  width: 100%;
  display: flex;
  border-radius: 1.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
}

/* Image */
.product-image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  overflow: hidden;
  background: #f3f4f6;
}

.product-image {
  width: 90%;
  height: auto;
  object-fit: contain;
  transition: transform 0.4s ease;
}

.product-image-container:hover .product-image {
  transform: scale(1.05);
}

/* Info */
.product-info {
  flex: 1;
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.product-title {
  font-size: 2rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 0.75rem;
}

.product-category {
  color: #6b7280;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.product-category span {
  font-weight: 600;
  color: #111827;
}

.product-rating {
  display: inline-block;
  background: #fde68a;
  color: #92400e;
  font-size: 0.95rem;
  font-weight: 600;
  width: 50px;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  margin-bottom: 1rem;
}

.product-description {
  color: #374151;
  line-height: 1.6;
  margin-bottom: 1.25rem;
  font-size: 1rem;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1.5rem;
}

/* Buttons */
.btn-group {
  display: flex;
  gap: 1rem;
}

.add-btn {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #ffffff;
  padding: 0.9rem 1.8rem;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(37, 99, 235, 0.4);
  transition: all 0.3s ease;
}

.add-btn:hover {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  transform: translateY(-2px);
}

.added-btn {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  box-shadow: 0 6px 14px rgba(34, 197, 94, 0.4);
}

.favourites {
  background: linear-gradient(135deg, #f97316, #ea580c);
  color: #ffffff;
  padding: 0.9rem 1.8rem;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(234, 88, 12, 0.4);
  transition: all 0.3s ease;
}

.favourites:hover {
  background: linear-gradient(135deg, #ea580c, #c2410c);
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .product-card {
    flex-direction: column;
    padding: 1.5rem;
  }

  .product-image-container {
    margin-bottom: 1.5rem;
  }

  .product-info {
    margin-left: 0;
    text-align: center;
  }

  .btn-group {
    flex-direction: column;
  }

  .add-btn,
  .favourites {
    width: 100%;
  }
}
</style>
