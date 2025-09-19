<template>
  <div>
    <div class="favourite-container">
      <h2 class="favourite-title">Wishlist ❤</h2>

      <div v-if="favouriteStore.favouriteItems.length === 0" class="empty-message">
        No favourite items yet.
      </div>

      <div
        v-else
        v-for="item in favouriteStore.favouriteItems"
        :key="item.id"
        class="favourite-item"
      >
        <div class="item-info">
          <div class="item-details">
            <img :src="item.image" :alt="item.name" class="item-image" />
            <div>
              <h3 class="item-name">{{ item.name }}</h3>
              <p class="item-price">₹{{ item.price }}</p>
            </div>
          </div>

          <div class="item-actions">
            <button class="remove-button" @click="favouriteStore.removeFromFavourites(item)">
              Remove
            </button>

            <button @click="toggleCart(item)" :class="['add-btn', { 'added-btn': cartitem }]">
              {{ cartitem ? 'Added to Cart' : 'Add to Cart' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import { useFavouriteStore } from '../stores/favouriteStore.js'
import { useCartStore } from '../stores/cartStore.js'
const cartStore = useCartStore()
const cartitem = ref(false)

defineOptions({
  name: 'FavouriteItem',
})
const favouriteStore = useFavouriteStore()
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
.favourite-container {
  max-width: 800px;
  margin: 20px auto;
  height: 500px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.favourite-title {
  /* text-align: center; */
  margin-bottom: 20px;
  margin-left: 20px;
  font-size: 24px;
  color: #333;
}
.empty-message {
  text-align: center;
  color: #777;
  font-size: 18px;
  margin-top: 40px;
}
.favourite-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e0e0e0;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
}
.item-info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}
.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 20px;
}
.item-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}
.item-price {
  font-size: 16px;
  color: #666;
}
.item-details {
  display: flex;
  justify-content: space-around;
  /* align-items: center; */
  width: 300px;
}
.item-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}
.remove-button {
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.remove-button:hover {
  background-color: #ff7875;
}
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
</style>
