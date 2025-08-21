<template>
  <div class="cart-container">
    <h2 class="cart-title">Your Cart</h2>

    <div v-if="cartStore.cart.length === 0" class="cart-empty">Your cart is empty.</div>

    <div v-else class="cart-items">
      <div v-for="item in cartStore.cart" :key="item.id" class="cart-item">
        <div class="item-info">
          <img :src="item.image" alt="Product Image" class="item-image" />
          <h3 class="item-name">{{ item.name }}</h3>
          <p class="item-price">₹{{ item.price }} x {{ item.quantity }}</p>
        </div>

        <div class="item-actions">
          <input
            type="number"
            v-model.number="item.quantity"
            min="1"
            class="quantity-input"
            @change="updateQuantity(item.id, item.quantity)"
          />
          <button @click="removeItem(item.id)" class="remove-btn">Remove</button>
        </div>
      </div>

      <div class="cart-total">Total: ₹{{ cartStore.total }}</div>

      <router-link to="/checkout" class="checkout-btn"> Proceed to Checkout </router-link>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore.js'
defineOptions({
  name: 'CartPage',
})
const cartStore = useCartStore()

function removeItem(id) {
  cartStore.removeFromCart(id)
}

function updateQuantity(id, qty) {
  cartStore.updateQuantity(id, qty)
}
</script>

<style scoped>
.cart-container {
  padding: 1rem;
  height: 80vh;
}

.cart-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.cart-empty {
  color: #6b7280; /* Tailwind gray-500 */
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #d1d5db; /* gray-300 */
  padding: 0.5rem;
  border-radius: 0.375rem;
  background-color: #f9fafb; /* gray-50 */
  transition: background-color 0.2s;
}

.cart-item:hover {
  background-color: #f3f4f6; /* gray-100 */
}

.item-info {
  display: flex;
  flex-direction: column;
}

.item-name {
  font-weight: bold;
}

.item-price {
  font-size: 0.9rem;
  color: #374151; /* gray-700 */
}

.item-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 0.375rem;
}
.item-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-input {
  border: 1px solid #d1d5db;
  padding: 0.25rem;
  width: 4rem;
  height: 2rem;
  border-radius: 0.375rem;
  text-align: center;
}

.remove-btn {
  background-color: #ef4444; /* red-500 */
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s;
}

.remove-btn:hover {
  background-color: #dc2626; /* red-600 */
}

.cart-total {
  text-align: right;
  font-weight: bold;
  font-size: 1.125rem;
  margin-top: 0.5rem;
}

.checkout-btn {
  display: block;
  background-color: #3b82f6; /* blue-500 */
  color: white;
  text-align: center;
  padding: 0.5rem;
  border-radius: 0.375rem;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
  margin-top: 0.5rem;
}

.checkout-btn:hover {
  background-color: #2563eb; /* blue-600 */
}
</style>
