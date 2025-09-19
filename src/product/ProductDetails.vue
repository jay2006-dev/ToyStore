<template>
  <div class="product-container">
    <div class="product-card">
      <div class="product-image-container">
        <img :src="product.image" alt="Product Image" class="product-image" />
      </div>
      <div class="product-info">
        <h2 class="product-title">{{ product.name }}</h2>
        <p class="product-category">
          Category: <span>{{ product.category }}</span>
        </p>
        <p class="product-rating">⭐ {{ product.rating }}</p>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">₹{{ product.price }}</p>

        <button @click="toggleCart(product)" :class="['add-btn', { 'added-btn': cartitem }]">
          {{ cartitem ? 'Added to Cart' : 'Add to Cart' }}
        </button>
        <button @click="toggleFavourite(product)" class="favourites">Add to Favourites</button>
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
}

/* Card */
.product-card {
  background: #ffffff;
  padding: 2rem;
  max-width: 1500px;
  width: 100%;
  display: flex;
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
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.product-image-container {
  display: flex;
  flex: 1;
  justify-content: center;
  /* box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08); */
  border: 1px solid #caccd0;
  align-items: center;
}

.product-info {
  flex: 1;
  margin-left: 2rem;
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  width: 50%;
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
.favourites {
  background: orange;
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
  margin-top: 10px;
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

.added-btn {
  background-color: greenyellow;
}
/* 📱 Mobile Responsive Styles */
@media (max-width: 768px) {
  .product-container {
    padding: 1rem;
  }

  .product-card {
    padding: 1.25rem;
    max-width: 100%;
  }

  /* Image takes full width on small screens */
  .product-image {
    width: 100%;
    margin-bottom: 1.5rem;
  }

  /* Text adjustments */
  .product-title {
    font-size: 1.5rem;
    text-align: center;
  }

  .product-category,
  .product-rating,
  .product-description,
  .product-price {
    font-size: 0.95rem;
    text-align: center;
  }

  /* Price bigger for mobile */
  .product-price {
    font-size: 1.5rem;
    margin-top: 1rem;
  }

  /* Button full width */
  .add-btn {
    width: 100%;
    padding: 0.9rem;
    font-size: 1rem;
    margin-top: 1rem;
  }
}
</style>
