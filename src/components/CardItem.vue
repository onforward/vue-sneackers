<script setup>
defineProps({
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function
})
</script>

<template>
  <article>
    <div class="like position-relative bg-white border border-light-subtle rounded-4 px-3 py-4">
      <img
        :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
        alt=""
        class="position-absolute"
        @click="onClickFavorite"
      />
      <img :src="imageUrl" :alt="title" width="133" height="112" />
      <h3 class="mt-2">{{ title }}</h3>
      <div class="d-flex justify-content-between mt-4">
        <div class="d-flex flex-column">
          <span style="color: rgb(148 163 184)">Цена:</span>
          <b>{{ price }} руб.</b>
        </div>
        <button type="button">
          <img :src="!isAdded ? '/plus.svg' : 'checked.svg'" alt="" @click="onClickAdd" />
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.like {
  cursor: pointer;
  max-width: 14rem;
  transition: all 0.3s ease;
}
.like:hover {
  transform: translateY(-0.5rem);
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}
.like + img {
  top: 2rem;
  left: 2rem;
}
</style>
