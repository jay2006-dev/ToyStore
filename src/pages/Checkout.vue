<template>
  <div class="checkout-page">
    <!-- Breadcrumb -->
    <div class="breadcrumb-bar">
      <div class="breadcrumb-inner">
        <router-link to="/" class="crumb">Home</router-link>
        <span class="crumb-sep">
          <font-awesome-icon icon="chevron-right" />
        </span>
        <router-link to="/cart" class="crumb">Cart</router-link>
        <span class="crumb-sep">
          <font-awesome-icon icon="chevron-right" />
        </span>
        <span class="crumb-current">Checkout</span>
      </div>
    </div>

    <div class="checkout-container">
      <div class="checkout-card">
        <h2 class="checkout-title">
          <font-awesome-icon icon="shield-alt" class="title-icon" />
          Checkout Details
        </h2>

        <!-- Empty Cart -->
        <div v-if="cartStore.cart.length === 0 && !orderPlaced" class="checkout-empty">
          <div class="empty-icon">🛒</div>
          <p>Your cart is empty. Add products before checking out.</p>
          <button @click="router.push('/products')" class="btn-primary mt-4">
            Go to Shop
          </button>
        </div>

        <!-- Success Message -->
        <div v-else-if="orderPlaced" class="order-success">
          <div class="success-icon">🎉</div>
          <h3>Order Placed Successfully!</h3>
          <p>Thank you for shopping with ToyStore. Your toys are on their way! 🧸</p>
          <button @click="continueShopping" class="btn-primary">
            Continue Shopping
          </button>
        </div>

        <!-- Checkout Form -->
        <form v-else @submit.prevent="startPayment" class="checkout-form">
          <div class="form-grid">
            <div class="input-group">
              <label class="input-label">Full Name</label>
              <input v-model="name" placeholder="John Doe" class="input-field" required />
            </div>

            <div class="input-group">
              <label class="input-label">Email Address</label>
              <input v-model="email" placeholder="john@example.com" class="input-field" type="email" required />
            </div>

            <div class="input-group">
              <label class="input-label">Phone Number</label>
              <input v-model="number" placeholder="Phone Number" class="input-field" type="tel" required />
            </div>

            <div class="input-group">
              <label class="input-label">District</label>
              <select v-model="district" required class="input-field select-field">
                <option value="" disabled>Select District</option>
                <option v-for="d in districts" :key="d" :value="d">
                  {{ d }}
                </option>
              </select>
            </div>

            <div class="input-group full-width">
              <label class="input-label">Shipping Address</label>
              <textarea
                v-model="address"
                placeholder="Enter your complete shipping address"
                class="input-field textarea-field"
                required
              ></textarea>
            </div>
          </div>

          <!-- Order Summary Section -->
          <div class="order-summary-box">
            <h3 class="summary-title">Order Summary</h3>
            <div class="summary-details">
              <div v-for="item in cartStore.cart" :key="item.id" class="summary-item">
                <span class="item-name">{{ item.name }} x{{ item.quantity }}</span>
                <span class="item-price">₹{{ (item.price * item.quantity).toLocaleString() }}</span>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-total-row">
                <span class="total-label">Total Amount</span>
                <span class="total-value">₹{{ cartStore.total.toLocaleString() }}</span>
              </div>
            </div>
          </div>

          <button type="submit" class="btn-submit">
            <font-awesome-icon icon="shopping-cart" />
            Pay & Place Order
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore.js'
import { toast } from 'vue3-toastify'
import { api } from '../services/api.js'

defineOptions({
  name: 'CheckoutPage',
})

const name = ref('')
const email = ref('')
const number = ref('')
const address = ref('')
const orderPlaced = ref(false)
const district = ref('')

const router = useRouter()
const cartStore = useCartStore()

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

function continueShopping() {
  orderPlaced.value = false
  cartStore.clearCart()
  router.push('/products')
}

// Start Razorpay Payment
const startPayment = async () => {
  try {
    // Call secure backend route with authorization interceptor automatically applied
    const res = await api.post('/api/create-order', {
      cartItems: cartStore.cart.map(item => ({
        id: item.id,
        price: item.price,
        qty: item.quantity,
        name: item.name
      }))
    })
    const order = res.data
    console.log('✅ Order created:', order)

    // Razorpay options
    const options = {
      key: 'rzp_test_RGeGMOEnLzUqYw', // test key
      amount: cartStore.total * 100, // in paise
      currency: order.currency,
      name: 'ToyStore Checkout',
      description: 'Pay for your order securely',
      order_id: order.id,
      handler: function (response) {
        verifyPayment(response)
      },
      prefill: {
        name: name.value,
        email: email.value,
        contact: number.value,
      },
      theme: { color: '#F7941D' },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  } catch (err) {
    console.error('❌ Payment failed', err)
    toast.error('Payment initialization failed', { position: 'top-center' })
  }
}

// Verify Payment on Backend
const verifyPayment = async (response) => {
  try {
    const res = await api.post('/api/verify-payment', response)
    const data = res.data

    if (data.success) {
      toast.success('✅ Payment Verified! Thank you for shopping 🛒', {
        position: 'top-center',
      })
      cartStore.clearCart()
      orderPlaced.value = true
      name.value = ''
      email.value = ''
      address.value = ''
      number.value = ''
      district.value = ''
    } else {
      toast.error('❌ Payment Verification Failed', { position: 'top-center' })
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
/* ===== Breadcrumb ===== */
.breadcrumb-bar {
  background: var(--color-bg-light);
  border-bottom: 1px solid var(--color-border);
  padding: 0.9rem 0;
}

.breadcrumb-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.crumb {
  color: var(--color-text-light);
  font-weight: 500;
  transition: var(--transition);
}

.crumb:hover {
  color: var(--color-primary);
}

.crumb-sep {
  color: var(--color-text-muted);
  font-size: 0.6rem;
}

.crumb-current {
  color: var(--color-text);
  font-weight: 600;
}

/* ===== Layout ===== */
.checkout-page {
  background: var(--color-bg-light);
  min-height: calc(100vh - 68px);
}

.checkout-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1.5rem 3rem;
}

.checkout-card {
  background: white;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  padding: 2.5rem;
}

.checkout-title {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--color-dark);
  margin-bottom: 1.8rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.title-icon {
  color: var(--color-primary);
}

/* ===== Empty Cart & Success ===== */
.checkout-empty,
.order-success {
  text-align: center;
  padding: 2rem 0;
}

.empty-icon,
.success-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.order-success h3 {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: #15803d;
  margin-bottom: 0.5rem;
}

.order-success p {
  color: var(--color-text-light);
  margin-bottom: 1.5rem;
}

/* ===== Form Layout ===== */
.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.input-group.full-width {
  grid-column: span 2;
}

.input-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text);
}

.input-field {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.92rem;
  font-family: var(--font-body);
  color: var(--color-text);
  background: var(--color-bg-light);
  outline: none;
  transition: var(--transition);
}

.input-field:focus {
  border-color: var(--color-primary);
  background: white;
  box-shadow: 0 0 0 3px rgba(247, 148, 29, 0.1);
}

.select-field {
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='16' viewBox='0 0 24 24' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
}

.textarea-field {
  min-height: 100px;
  resize: vertical;
}

/* ===== Order Summary Box ===== */
.order-summary-box {
  background: var(--color-bg-light);
  border: 1.5px dashed var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  margin-top: 0.5rem;
}

.summary-title {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-dark);
  margin-bottom: 1rem;
}

.summary-details {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.88rem;
  color: var(--color-text-light);
}

.summary-divider {
  height: 1px;
  background: var(--color-border);
  margin: 0.4rem 0;
}

.summary-total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-label {
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-dark);
}

.total-value {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--color-primary);
}

/* ===== Buttons ===== */
.btn-submit {
  width: 100%;
  padding: 0.9rem 1.5rem;
  background: linear-gradient(135deg, var(--color-primary), #FF6B00);
  color: white;
  font-weight: 700;
  font-size: 1rem;
  font-family: var(--font-body);
  border: none;
  border-radius: var(--radius-xl);
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 4px 16px rgba(247, 148, 29, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(247, 148, 29, 0.4);
}

.btn-primary {
  padding: 0.75rem 1.8rem;
  background: linear-gradient(135deg, var(--color-primary), #FF6B00);
  color: white;
  font-weight: 700;
  font-size: 0.92rem;
  border-radius: var(--radius-xl);
  transition: var(--transition);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(247, 148, 29, 0.3);
}

.mt-4 {
  margin-top: 1rem;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .checkout-container {
    padding: 0 1rem;
    margin: 1rem auto;
  }

  .checkout-card {
    padding: 1.5rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }

  .input-group.full-width {
    grid-column: span 1;
  }

  .btn-submit {
    font-size: 0.95rem;
    padding: 0.8rem 1.2rem;
  }
}
</style>
