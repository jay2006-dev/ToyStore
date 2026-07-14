import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

// Load persisted cart from sessionStorage (scoped to tab, cleared on close)
function loadCart() {
  try {
    const data = sessionStorage.getItem('toystore_cart')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', () => {
  const cart = ref(loadCart())

  // Persist cart to sessionStorage on every change
  watch(cart, (val) => {
    try {
      sessionStorage.setItem('toystore_cart', JSON.stringify(val))
    } catch {
      // storage full or unavailable — silently fail
    }
  }, { deep: true })

  function addToCart(product) {
    const item = cart.value.find((p) => p.id === product.id)
    if (item) {
      item.quantity++
    } else {
      cart.value.push({ ...product, quantity: 1 })
    }
  }

  function removeFromCart(id) {
    cart.value = cart.value.filter((p) => p.id !== id)
  }

  function updateQuantity(id, qty) {
    const item = cart.value.find((p) => p.id === id)
    if (item) item.quantity = qty
  }

  function clearCart() {
    cart.value = []
    sessionStorage.removeItem('toystore_cart')
  }

  const total = computed(() => cart.value.reduce((sum, p) => sum + p.price * p.quantity, 0))

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart, total }
})
