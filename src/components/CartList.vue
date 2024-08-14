<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const { cart } = inject('cart')
const { removeFromCart } = inject('cart')
</script>

<template>
  <ul class="d-flex flex-column gap-3 flex-grow-1" v-auto-animate="{ duration: 500 }">
    <li v-for="item in cart" :key="item.id">
      <CartItem :item="item" :removeFromCart="() => removeFromCart(item)" />
    </li>
  </ul>
</template>
