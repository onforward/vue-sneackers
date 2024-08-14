<script setup>
import { ref, watch, computed, inject, onMounted } from 'vue'
import CardList from '../components/CardList.vue'
import SortItems from '../components/SortItems.vue'
import axios from 'axios'
axios.defaults.baseURL = 'https://621256287b80dd07.mokky.dev'

const sortBy = ref('')
const searchQuery = ref('')

const { cart, checkToCart, clickToCart } = inject('cart')
const items = inject('items')
const toggleFavorite = inject('toggleFavorite')
const isAuth = inject('isAuth')

const filteredItems = computed(() => {
  return items.value.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const loadItems = async () => {
  if (isAuth) {
    try {
      const { data } = await axios.get('/items', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      })
      items.value = data.map((obj) => ({
        ...obj,
        isFavorite: false,
        isAdded: false,
        favoriteId: null
      }))
    } catch (error) {
      console.log(error.message)
    }
  }
}
const loadFavorites = async () => {
  if (isAuth) {
    try {
      const { data: favorites } = await axios.get('/favorites', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      })

      if (favorites && Array.isArray(favorites)) {
        items.value = items.value.map((item) => {
          const favorite = favorites.find((fav) => fav.item_id === item.id)
          if (favorite) {
            return {
              ...item,
              isFavorite: true,
              favoriteId: favorite.id
            }
          }
          return item
        })
      } else {
        throw new Error('loadFavorites: favorites is not an array')
      }
    } catch (error) {
      console.error('loadFavorites:', error.message)
    }
  }
}

const sortItems = () => {
  items.value.sort((a, b) => {
    if (sortBy.value === 'title') {
      return a.title > b.title ? 1 : -1
    }
    if (sortBy.value === 'price') {
      return a.price - b.price
    }
    if (sortBy.value === '-price') {
      return b.price - a.price
    }
  })
}

onMounted(async () => {
  await loadItems()
  await loadFavorites()
  checkToCart(items)
})

watch(cart.value, () => {
  checkToCart(items)
})

watch(sortBy, sortItems)
</script>

<template>
  <div class="align-items-center gap-4 flex-wrap mb-5">
    <div class="d-flex justify-content-between flex-wrap align-items-center mb-3">
      <h2 class="fs-2 fw-bold title mb-4">Все кроссовки</h2>
      <SortItems v-model:searchQuery="searchQuery" v-model:sortBy="sortBy" />
    </div>
    <CardList
      :items="filteredItems"
      :onClickFavorite="toggleFavorite"
      :onClickAdd="clickToCart"
      v-auto-animate="{ duration: 500 }"
    />
  </div>
</template>

<style scoped>
.title {
  margin-block: 0.5rem;
}
@media (min-width: 768px) {
  .title {
    margin-block: 1.25rem;
  }
}
</style>
