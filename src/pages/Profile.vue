<script setup>
import { ref, onMounted, inject } from 'vue'
import ButtonBack from '../components/ButtonBack.vue'
import InfoBlock from '../components/InfoBlock.vue'
import OrderItem from '../components/OrderItem.vue'
import axios from 'axios'
axios.defaults.baseURL = 'https://621256287b80dd07.mokky.dev'

const isLoading = ref(false)
const orders = ref([])

const isAuth = inject('isAuth')

const getOrders = async () => {
  if (!isAuth) return
  isLoading.value = true
  try {
    const { data } = await axios.get('/orders', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    orders.value = data
  } catch (error) {
    console.log(error.message)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getOrders()
})
</script>

<template>
  <div class="my-3 d-flex gap-4 align-items-center" v-if="orders.length">
    <router-link to="/home" class="bg-white p-3 rounded-3 border d-flex align-items-center">
      <img src="/arrow-right.svg" alt="" style="rotate: 180deg" />
    </router-link>
    <h2 class="fs-2 fw-bold">Мои заказы</h2>
  </div>
  <p class="mb-3" style="color: rgb(100 116 139)" v-if="orders.length">
    Всего заказов: {{ orders.length }}
  </p>
  <InfoBlock
    v-if="!orders.length && !isLoading"
    image-url="/emoji-2.png"
    title="У вас нет заказов"
    description="Вы ничего не заказывали? Оформите хотя бы один заказ."
  >
    <RouterLink to="/home">
      <ButtonBack />
    </RouterLink>
  </InfoBlock>
  <div v-auto-animate="{ duration: 500 }">
    <ul>
      <OrderItem v-for="item in orders" :key="item.id" :order="item" />
    </ul>
  </div>
</template>
