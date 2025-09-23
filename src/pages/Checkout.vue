<template>
  <div class="checkout-container">
    <h2 class="checkout-title">Checkout</h2>

    <!-- Empty Cart -->
    <div v-if="cartStore.cart.length === 0" class="checkout-empty">
      Your cart is empty. Add products before checkout.
    </div>

    <!-- Checkout Form -->
    <form v-else @submit.prevent="startPayment" class="checkout-form">
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

    <!-- Success Message -->
    <div v-if="orderPlaced" class="order-success">
      🎉 Order placed successfully! Thank you for shopping with us.
    </div>
    <button v-if="orderPlaced" @click="continueShopping" class="continue-shopping">
      Continue Shopping
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore.js'
import { toast } from 'vue3-toastify'
defineOptions({
  name: 'CheckoutPage',
})

const name = ref('')
const email = ref('')
const address = ref('')
const orderPlaced = ref(false)

const router = useRouter()
const cartStore = useCartStore()

// ✅ Go back to shop
function continueShopping() {
  orderPlaced.value = false
  cartStore.cart = [] // clear cart after order
  router.go(-1) // back to products page
}

// ✅ Start Razorpay Payment
const startPayment = async () => {
  try {
    // Call backend to create an order
    const res = await fetch('http://localhost:3000/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItems: cartStore.cart, total: cartStore.total }),
    })
    const order = await res.json()
    console.log('✅ Order created:', order)

    // Razorpay options
    const options = {
      key: 'rzp_test_RGeGMOEnLzUqYw', // test key
      amount: cartStore.total * 100, // in paise
      currency: order.currency,
      name: 'Grocery Store',
      description: 'Cart Checkout',
      order_id: order.id,
      handler: function (response) {
        verifyPayment(response)
      },
      prefill: {
        name: name.value,
        email: email.value,
        contact: '6301168711', // can be dynamic if needed
      },
      theme: { color: '#F43F5E' },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  } catch (err) {
    console.error('❌ Payment failed', err)
    toast.error('Payment initialization failed', { position: 'top-center' })
  }
}

// ✅ Verify Payment
const verifyPayment = async (response) => {
  try {
    const res = await fetch('http://localhost:3000/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response),
    })
    const data = await res.json()

    if (data.success) {
      toast.success('✅ Payment Verified! Thank you for shopping 🛒', {
        position: 'top-center',
      })
      cartStore.cart = [] // clear cart after order
      orderPlaced.value = true
      name.value = ''
      email.value = ''
      address.value = ''
    } else {
      // toast.error('❌ Payment Verification Failed', { position: 'top-center' })
    }
  } catch (err) {
    console.error('❌ Verification error:', err)
    toast.error('Verification request failed', { position: 'top-center' })
  }
}

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://checkout.razorpay.com/v1/checkout.js'
  script.async = true
  document.body.appendChild(script)
})
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
  background-color: #2563eb;
  border-radius: 0.375rem;
  border: none;
  color: white;
  text-align: center;
  cursor: pointer;
}

/* Mobile responsive styles */
@media (max-width: 640px) {
  .checkout-container {
    padding: 0.75rem;
    max-width: 100%;
    height: auto;
  }

  .checkout-title {
    font-size: 1.25rem;
    text-align: center;
  }

  .checkout-form {
    gap: 0.75rem;
  }

  .checkout-input,
  .checkout-textarea {
    font-size: 0.95rem;
    padding: 0.6rem;
  }

  .checkout-textarea {
    min-height: 100px;
  }

  .checkout-total {
    font-size: 1rem;
    text-align: center;
    margin-top: 0.5rem;
  }

  .checkout-btn {
    padding: 0.75rem;
    font-size: 1rem;
    border-radius: 0.5rem;
  }

  .order-success {
    font-size: 0.95rem;
    text-align: center;
  }

  .continue-shopping {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    border-radius: 0.5rem;
  }
}
</style>
