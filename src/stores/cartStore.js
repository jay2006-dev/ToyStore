import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])

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

  const total = computed(() => cart.value.reduce((sum, p) => sum + p.price * p.quantity, 0))

  return { cart, addToCart, removeFromCart, updateQuantity, total }
})
