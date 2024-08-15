<script setup>
import CardItem from './CardItem.vue'

defineProps({
  items: Array,
  onClickFavorite: Function,
  onClickAdd: Function
})
</script>

<template>
  <ul class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-gap-3">
    <li v-for="item in items" :key="item.id" class="col d-flex justify-content-center">
      <CardItem
        :imageUrl="item.imageUrl"
        :title="item.title"
        :price="item.price"
        :isFavorite="item.isFavorite"
        :isAdded="item.isAdded"
        :onClickFavorite="() => onClickFavorite(item)"
        :onClickAdd="() => onClickAdd(item)"
      />
    </li>
  </ul>
</template>
