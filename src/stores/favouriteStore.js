import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

// Load persisted favourites from localStorage
function loadFavourites() {
  try {
    const data = localStorage.getItem('toystore_favourites')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const useFavouriteStore = defineStore('favourite', () => {
  const favouriteItems = ref(loadFavourites())

  // Persist favourites to localStorage on every change
  watch(favouriteItems, (val) => {
    try {
      localStorage.setItem('toystore_favourites', JSON.stringify(val))
    } catch {
      // storage full or unavailable
    }
  }, { deep: true })

  function addToFavourites(item) {
    if (!favouriteItems.value.some((i) => i.id === item.id)) {
      favouriteItems.value.push({ ...item, isFavourite: true })
    } else {
      removeFromFavourites(item)
    }
  }

  function removeFromFavourites(item) {
    const id = typeof item === 'object' ? item.id : item
    const index = favouriteItems.value.findIndex((i) => i.id === id)
    if (index > -1) {
      favouriteItems.value.splice(index, 1)
    }
  }

  function isFavourite(item) {
    return favouriteItems.value.some((i) => i.id === item.id)
  }

  return { favouriteItems, addToFavourites, removeFromFavourites, isFavourite }
})
