import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useFavouriteStore = defineStore('favourite', () => {
  const favouriteItems = ref([])

  function addToFavourites(item) {
    if (!favouriteItems.value.includes(item)) {
      favouriteItems.value.push(item)
      item.isFavourite = true // Set isFavourite to true when added
    } else {
      removeFromFavourites(item)
    }
  }

  function removeFromFavourites(item) {
    const index = favouriteItems.value.findIndex((i) => i.id === item.id)
    if (index > -1) {
      favouriteItems.value.splice(index, 1)
      item.isFavourite = false // Set isFavourite to false when removed
    }
  }
  function isFavourite(item) {
    return favouriteItems.value.some((i) => i.id === item.id)
  }
  return { favouriteItems, addToFavourites, removeFromFavourites, isFavourite }
})
