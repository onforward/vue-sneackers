<script setup>
defineProps({
  item: Object,
  removeFromCart: Function
})
</script>

<template>
  <div
    class="border border-light-subtle p-3 rounded-2 d-flex align-items-center gap-3 position-relative"
  >
    <img :src="item.imageUrl" :alt="item.title" loading="lazy" width="70" height="70" />
    <div class="d-flex flex-column">
      <p>{{ item.title }}</p>
      <div class="d-flex mt-2">
        <b>{{ item.price }} руб.</b>
        <img
          src="/close.svg"
          aria-label="Удалить из корзины"
          alt=""
          loading="lazy"
          class="close"
          @click="removeFromCart"
        />
      </div>
    </div>
  </div>
</template>

<style>
.close {
  opacity: 0.5;
  transition: all 0.3s ease;
  cursor: pointer;
  position: absolute;
  right: 20px;
  bottom: 10px;
}
.close:hover {
  opacity: 1;
}
</style>
