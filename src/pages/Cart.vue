<template>
  <div class="cart-container">
    <h2 class="cart-title">Your Cart</h2>

    <div v-if="cartStore.cart.length === 0" class="cart-empty">Your cart is empty.</div>

    <div v-else class="cart-items">
      <div v-for="item in cartStore.cart" :key="item.id" class="cart-item">
        <div class="item-info">
          <div>
            <img :src="item.image" alt="Product Image" class="item-image" />
          </div>
          <div class="item-details">
            <h3 class="item-name">{{ item.name }}</h3>
            <p style="padding-bottom: 15px">{{ item.description }}</p>
            <p class="item-price">₹{{ item.price }} x {{ item.quantity }}</p>
          </div>
        </div>

        <div class="item-actions">
          <div>
            <p class="quantity-operator" @click="item.quantity > 1 && item.quantity--">-</p>
            <input
              type="number"
              v-model.number="item.quantity"
              min="1"
              class="quantity-input"
              @change="updateQuantity(item.id, item.quantity)"
            />
            <p class="quantity-operator" @click="item.quantity++">+</p>
          </div>

          <button @click="removeItem(item.id)" class="remove-btn">Remove</button>
        </div>
      </div>
      <div>
        <div class="cart-total">
          <p style="justify-content: flex-start">Total: ₹{{ cartStore.total }}</p>
          <router-link to="/checkout" class="checkout-btn"> Proceed to Checkout </router-link>
        </div>
      </div>
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
  max-width: 900px;
  margin: 20px auto;
  min-height: 600px !important;
  height: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.cart-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.empty-cart {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
  text-align: center;
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
  flex-direction: row;
  padding-right: 20px;
}

.item-details {
  margin-left: 1rem;
}

.quantity-operator {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 24px;
  text-align: center;
  background-color: #e5e7eb; /* gray-300 */
  color: #374151; /* gray-700 */
  border-radius: 0.375rem;
  cursor: pointer;
  user-select: none;
  font-weight: bold;
  margin: 0 0.25rem;
}

.item-name {
  font-weight: bold;
}

.item-price {
  font-size: 0.9rem;
  color: #374151; /* gray-700 */
}

.item-image {
  width: 150px;
  height: 150px;
  padding-left: 20px;
  padding-right: 10%;
  object-fit: cover;
  border-radius: 0.375rem;
}
.item-actions {
  display: flex;
  flex-direction: row;
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
  display: flex;
  flex-direction: column;
}

.checkout-btn {
  display: block;
  background-color: #3b82f6; /* blue-500 */
  width: 200px;
  color: white;
  justify-content: flex-end;
  align-self: flex-end;
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
/* Mobile responsive styles */
@media (max-width: 640px) {
  .cart-container {
    padding: 0.5rem;
    height: auto;
  }

  .cart-title {
    font-size: 1.25rem;
    text-align: center;
  }

  .cart-items {
    gap: 0.75rem;
  }

  .cart-item {
    flex-direction: column;
    align-items: flex-start;
    padding: 0.75rem;
  }

  .item-info {
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
  }

  .item-image {
    width: 60px;
    height: 60px;
  }

  .item-name {
    font-size: 1rem;
  }

  .item-price {
    font-size: 0.85rem;
  }

  .item-actions {
    margin-top: 0.5rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .quantity-input {
    width: 3rem;
    height: 1.8rem;
    font-size: 0.9rem;
  }

  .remove-btn {
    flex: 1;
    text-align: center;
    max-width: 120px;
  }

  .cart-total {
    font-size: 1rem;
    text-align: center;
  }

  .checkout-btn {
    width: 100%;
    font-size: 1rem;
    padding: 0.75rem;
  }
}
</style>
