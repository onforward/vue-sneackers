<script setup>
defineProps({
  imageUrl: String,
  title: String,
  description: String,
  colorTitle: String
})
</script>

<template>
  <div class="d-flex flex-grow-1 flex-column gap-2 justify-content-center align-items-center">
    <img :src="imageUrl" :alt="title" width="100" height="100" />
    <h2 class="fs-3 fw-semibold" :class="colorTitle === 'green' ? 'text-green-600' : ''">
      {{ title }}
    </h2>
    <p class="text-center mb-3" style="color: rgb(100 116 139)">{{ description }}</p>
    <slot></slot>
  </div>
</template>
