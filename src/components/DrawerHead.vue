<script setup>
import { inject } from 'vue'

const { closeDrawer } = inject('cart')
</script>

<template>
  <div class="d-flex align-items-center gap-5 mb-5">
    <svg
      @click="closeDrawer"
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 7H14.7143"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.71436 1L14.7144 7L8.71436 13"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <h2 class="fs-3 fw-bold">Корзина</h2>
  </div>
</template>

<style scoped>
svg {
  opacity: 0.3;
  cursor: pointer;
  rotate: 180deg;
}
svg:hover {
  opacity: 1;
  transform: translateX(-3px);
}
</style>
