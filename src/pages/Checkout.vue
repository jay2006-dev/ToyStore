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
      <input v-model="number" placeholder="PhoneNo" class="checkout-input" type="number" required />
      <select v-model="district" required class="checkout-input">
        <option value="" disabled>Select District</option>
        <option v-for="d in districts" :key="d" :value="d">
          {{ d }}
        </option>
      </select>
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

const district = ref('')

const districts = [
  'Hyderabad',
  'Ranga Reddy',
  'Medchal',
  'Warangal',
  'Siddipet',
  'JayaShankar Bhupalpally',
  'Karimnagar',
  'Nizamabad',
  'Khammam',
  'Mahbubnagar',
  'Adilabad',
  'Nalgonda',
]

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
  max-width: 800px;
  margin: 2rem auto;
  min-height: 600px !important;
  height: auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
}

.checkout-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #f3f4f6;
  padding-bottom: 0.75rem;
}

.checkout-empty {
  text-align: center;
  color: #6b7280;
  font-size: 1.1rem;
  padding: 2rem 0;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.checkout-row {
  display: flex;
  gap: 1rem;
}

.checkout-input,
.checkout-textarea {
  flex: 1;
  border: 1px solid #d1d5db;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 1rem;
  color: #374151;
  transition: all 0.2s ease;
}

.checkout-input:focus,
.checkout-textarea:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  outline: none;
}

.checkout-textarea {
  min-height: 120px;
  resize: vertical;
}

.checkout-summary {
  background: #f9fafb;
  padding: 1rem 1.25rem;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}

.checkout-summary h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #111827;
}

.checkout-summary ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.checkout-summary li {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 0;
  font-size: 0.95rem;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
}

.checkout-summary li:last-child {
  border-bottom: none;
}

.checkout-total {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1.1rem;
  margin-top: 0.75rem;
  color: #111827;
}

.checkout-btn {
  background: linear-gradient(to right, #ef4444, #ec4899);
  color: white;
  padding: 0.9rem;
  border: none;
  border-radius: 10px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background 0.3s ease;
}

.checkout-btn:hover {
  transform: scale(1.02);
  background: linear-gradient(to right, #dc2626, #db2777);
}

.order-success {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #dcfce7;
  border: 1px solid #bbf7d0;
  border-radius: 10px;
  color: #15803d;
  text-align: center;
  font-weight: 500;
}

.continue-shopping {
  margin-top: 1rem;
  padding: 0.9rem;
  width: 100%;
  background: #2563eb;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.continue-shopping:hover {
  background: #1e40af;
}

/* Responsive */
@media (max-width: 768px) {
  .checkout-container {
    padding: 1.25rem;
    margin: 1rem;
  }

  .checkout-title {
    font-size: 1.5rem;
    text-align: center;
  }

  .checkout-row {
    flex-direction: column;
  }

  .checkout-btn,
  .continue-shopping {
    font-size: 1rem;
    padding: 0.8rem;
  }

  .checkout-summary h3 {
    text-align: center;
  }

  .checkout-total {
    font-size: 1rem;
  }
}
</style>
