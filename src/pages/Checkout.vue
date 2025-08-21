<template>
  <div class="checkout-container">
    <h2 class="checkout-title">Checkout</h2>

    <div v-if="cartStore.cart.length === 0" class="checkout-empty">
      Your cart is empty. Add products before checkout.
    </div>

    <form v-else @submit.prevent="placeOrder" class="checkout-form">
      <input v-model="name" placeholder="Full Name" class="checkout-input" required />
      <input v-model="email" placeholder="Email" class="checkout-input" type="email" required />
      <textarea
        v-model="address"
        placeholder="Shipping Address"
        class="checkout-textarea"
        required
      ></textarea>

      <div class="checkout-total">Total: ₹{{ cartStore.total }}</div>

      <button type="submit" class="checkout-btn">Place Order</button>
    </form>

    <div v-if="orderPlaced" class="order-success">
      🎉 Order placed successfully! Thank you for shopping with us.
    </div>
    <button v-if="orderPlaced" @click="continueShopping" class="continue-shopping">
      Continue Shoping
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore.js'
defineOptions({
  name: 'CheckoutPage',
})
const name = ref('')
const email = ref('')
const address = ref('')
const orderPlaced = ref(false)
const router = useRouter()

const cartStore = useCartStore()

function placeOrder() {
  // Normally: send order to backend
  orderPlaced.value = true
  cartStore.cart = [] // clear cart after order
}
function continueShopping() {
  orderPlaced.value = false
  cartStore.cart = [] // clear cart after order
  router.push('/products') // redirect to products page
}
</script>

<style scoped>
.checkout-container {
  padding: 1rem;
  max-width: 28rem;
  margin: 0 auto;
  height: 80vh;
}

.checkout-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.checkout-empty {
  color: #6b7280; /* gray-500 */
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.checkout-input,
.checkout-textarea {
  border: 1px solid #d1d5db; /* gray-300 */
  padding: 0.5rem;
  border-radius: 0.375rem;
  width: 100%;
  font-size: 1rem;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.checkout-input:focus,
.checkout-textarea:focus {
  border-color: #3b82f6; /* blue-500 */
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.checkout-total {
  font-weight: bold;
  font-size: 1.125rem;
}

.checkout-btn {
  background-color: #22c55e; /* green-500 */
  color: white;
  padding: 0.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  border: none;
  width: 100%;
  font-weight: 500;
  transition: background-color 0.2s;
}

.checkout-btn:hover {
  background-color: #16a34a; /* green-600 */
}

.order-success {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #dcfce7; /* green-100 */
  border-radius: 0.375rem;
  color: #15803d; /* green-700 */
}
.continue-shopping {
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #2563eb; /* gray-100 */
  border-radius: 0.375rem;
  border: none;
  color: white; /* gray-900 */
  text-align: center;
  cursor: pointer;
}
</style>
