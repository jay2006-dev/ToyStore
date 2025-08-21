<template>
  <div class="product-container">
    <div class="product-card">
      <img :src="product.image" alt="Product Image" class="product-image" />
      <h2 class="product-title">{{ product.name }}</h2>
      <p class="product-category">
        Category: <span>{{ product.category }}</span>
      </p>
      <p class="product-rating">⭐ {{ product.rating }}</p>
      <p class="product-description">{{ product.description }}</p>
      <p class="product-price">₹{{ product.price }}</p>

      <button @click="addToCart(product)" class="add-btn">{{ cartpara }}</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useCartStore } from '../stores/cartStore.js'
import { products } from './productsData'

const route = useRoute()
const cartStore = useCartStore()
const product = ref(products.find((p) => p.id == route.params.id))
const cartpara = ref('Add to Cart')
function addToCart(p) {
  cartStore.addToCart(p)
  cartpara.value = 'Added to Cart'
}
</script>

<style scoped>
/* Page Container */
.product-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

/* Card */
.product-card {
  background: #ffffff;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  border-radius: 1rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}
/* Image */
.product-image {
  width: 50%;
  height: auto;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

/* Title */
.product-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
}

/* Category */
.product-category {
  color: #4b5563;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.product-category span {
  font-weight: 600;
  color: #111827;
}

/* Rating */
.product-rating {
  color: #f59e0b;
  font-size: 1rem;
  margin-bottom: 1rem;
}

/* Description */
.product-description {
  color: #374151;
  line-height: 1.5;
  margin-bottom: 1.25rem;
}

/* Price */
.product-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1.5rem;
}

/* Add to Cart Button */
.add-btn {
  background: #3b82f6;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.2s;
}

.add-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}
</style>
