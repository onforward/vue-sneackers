<script setup>
defineProps({
  order: Object
})

let date = new Date()
let hours = date.getHours()
let minutes = date.getMinutes()
let seconds = date.getSeconds()

if (hours < 10) {
  hours = '0' + hours
}
if (minutes < 10) {
  minutes = '0' + minutes
}
if (seconds < 10) {
  seconds = '0' + seconds
}

const time = hours + ':' + minutes + ':' + seconds
</script>

<template>
  <li class="mb-3 border rounded-3 p-3">
    <h3 class="fs-4 fw-bold">Заказ №{{ order.id }}</h3>
    <p>Дата: {{ order.createdAt.slice(0, 10) + ' ' + time }}</p>
    <ul class="d-flex flex-wrap gap-3 mb-3 orders">
      <li v-for="product in order.items" :key="product.id">
        <img :src="product.imageUrl" :alt="product.title" width="150" height="150" />
        <p>{{ product.price }} руб.</p>
      </li>
    </ul>
    <p class="mb-3">Всего позиций: {{ order.items.length }}</p>
    <p class="fw-bold fs-5">Общая стоимость: {{ order.totalPrice }} руб.</p>
  </li>
</template>

<style scoped>
.orders {
  justify-content: center;
}
img {
  width: 100px;
  height: 100px;
}
@media screen and (min-width: 768px) {
  .orders {
    justify-content: start;
  }
  img {
    width: 150px;
    height: 150px;
  }
}
</style>
