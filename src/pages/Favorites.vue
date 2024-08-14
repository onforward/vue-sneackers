<script setup>
import { onMounted, inject, watch, ref } from 'vue'
import CardList from '../components/CardList.vue'
import InfoBlock from '../components/InfoBlock.vue'
import ButtonBack from '../components/ButtonBack.vue'
import axios from 'axios'
axios.defaults.baseURL = 'https://621256287b80dd07.mokky.dev'

const isLoading = ref(false)

const favoriteItems = inject('favorites', [])
const { checkToCart, clickToCart, cart } = inject('cart')
const isAuth = inject('isAuth')

const getFavorites = async () => {
  if (!isAuth) return
  isLoading.value = true
  try {
    const { data } = await axios.get('/favorites', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    favoriteItems.value = data.map((obj) => ({
      ...obj.item,
      favoriteId: obj.id,
      isFavorite: true
    }))
    checkToCart(favoriteItems)
  } catch (error) {
    console.log(error.message)
  } finally {
    isLoading.value = false
  }
}

const removeFromFavorites = async (item) => {
  if (!isAuth) return
  try {
    item.isFavorite = false
    await axios({
      method: 'delete',
      url: `/favorites/${item.favoriteId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    favoriteItems.value = favoriteItems.value.filter((favoriteItem) => favoriteItem.id !== item.id)
  } catch (error) {
    console.log(error.message)
  }
}

onMounted(getFavorites)

watch(cart.value, () => {
  checkToCart(favoriteItems)
})
</script>

<template>
  <div class="my-5 d-flex gap-4 align-items-center mb-5" v-if="favoriteItems.length">
    <router-link to="/home" class="bg-white p-3 rounded-3 border d-flex align-items-center">
      <img src="/arrow-right.svg" alt="" style="rotate: 180deg" />
    </router-link>
    <h2 class="fs-2 fw-bold">Мои закладки</h2>
  </div>
  <div v-auto-animate="{ duration: 500 }">
    <CardList
      v-if="favoriteItems.length"
      :items="favoriteItems"
      :onClickAdd="clickToCart"
      :onClickFavorite="removeFromFavorites"
      v-auto-animate="{ duration: 500 }"
    />
  </div>
  <InfoBlock
    v-if="!favoriteItems.length && !isLoading"
    image-url="/emoji-1.png"
    title="Закладок нет :("
    description="Вы ничего не добавляли в закладки"
  >
    <RouterLink to="/home">
      <ButtonBack />
    </RouterLink>
  </InfoBlock>
</template>
