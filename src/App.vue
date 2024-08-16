<script setup>
import { ref, computed, provide, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { SpeedInsights } from '@vercel/speed-insights/vue'
import TheDrawer from './components/TheDrawer.vue'
import TheHeader from './components/TheHeader.vue'
import axios from 'axios'
axios.defaults.baseURL = 'https://621256287b80dd07.mokky.dev'

const router = useRouter()
router.afterEach(() => {
  if (sessionStorage.getItem('token')) {
    isDisabled.value = false
  }
})

const isDisabled = ref(true)

const items = ref([])
const favorites = ref([])
const cart = ref([])

const isDrawerOpen = ref(false)
const isCartButtonDisabled = ref(false)
const orderId = ref(null)

const totalPrice = computed(() => cart.value.reduce((total, item) => total + item.price, 0))
const faqPrice = computed(() => Math.round(totalPrice.value * 0.05))
const isAuth = computed(() => sessionStorage.getItem('token') !== null)

const openDrawer = () => {
  isDrawerOpen.value = true
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = '17px'
}
const closeDrawer = () => {
  isDrawerOpen.value = false
  orderId.value = null
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

const toggleFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      item.isFavorite = !item.isFavorite
      const { data } = await axios.post(
        '/favorites',
        {
          item_id: item.id,
          item
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        }
      )
      item.favoriteId = data.id
    } else {
      item.isFavorite = !item.isFavorite
      axios({
        method: 'delete',
        url: `/favorites/${item.favoriteId}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      })
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error.message)
  }
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
  localStorage.setItem('cart', JSON.stringify(cart.value))
}
const removeFromCart = (item) => {
  cart.value = cart.value.filter((cartItem) => cartItem.id !== item.id)
  item.isAdded = false
  localStorage.setItem('cart', JSON.stringify(cart.value))
}
const clickToCart = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}
const checkToCart = (items) => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
}

const createOrder = async () => {
  try {
    isCartButtonDisabled.value = true
    const { data } = await axios.post(
      '/orders',
      {
        items: cart.value,
        totalPrice: totalPrice.value,
        createdAt: new Date()
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      }
    )
    cart.value = []
    localStorage.removeItem('cart')
    items.value = items.value.map((item) => ({
      ...item,
      isAdded: false
    }))
    favorites.value = favorites.value.map((item) => ({
      ...item,
      isAdded: false
    }))
    orderId.value = data.id
  } catch (error) {
    console.error('createOrder:', error.message)
  } finally {
    isCartButtonDisabled.value = false
  }
}

onMounted(() => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []
})

provide('cart', {
  cart,
  openDrawer,
  closeDrawer,
  addToCart,
  removeFromCart,
  clickToCart,
  checkToCart
})

provide('items', items)
provide('favorites', favorites)
provide('toggleFavorite', toggleFavorite)
provide('isAuth', isAuth)
</script>

<template>
  <SpeedInsights />
  <TheDrawer
    v-if="isDrawerOpen"
    :closeDrawer="closeDrawer"
    @create-order="createOrder"
    :totalPrice="totalPrice"
    :faqPrice="faqPrice"
    :isCartButtonDisabled="isCartButtonDisabled"
    :orderId="orderId"
  />
  <div
    class="bg-white m-auto rounded-3 mt-5"
    style="
      box-shadow:
        0 20px 25px -5px rgb(0 0 0 / 0.1),
        0 8px 10px -6px rgb(0 0 0 / 0.1);
    "
  >
    <TheHeader @open-drawer="openDrawer" :totalPrice="totalPrice" :isDisabled="isDisabled" />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
div {
  width: 90%;
}
main {
  padding-inline: 1.25rem;
  padding-block: 0.75rem;
}
@media screen and (min-width: 768px) {
  div {
    width: 80%;
  }
  main {
    padding-inline: 2.5rem;
    padding-block: 1.5rem;
  }
}
</style>
