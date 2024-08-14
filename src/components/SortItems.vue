<script setup>
const sortBy = defineModel('sortBy')
const searchQuery = defineModel('searchQuery')
</script>

<template>
  <div class="d-flex gap-4 align-items-center justify-content-center wrapper mb-3">
    <select class="form-select flex-grow-1" v-model="sortBy" style="max-width: 12rem">
      <option value="" selected disabled>Сортировать</option>
      <option value="title">По названию</option>
      <option value="price">По цене (дешевые)</option>
      <option value="-price">По цене (дорогие)</option>
    </select>
    <div class="position-relative flex-grow-1" style="max-width: 12rem">
      <img
        src="/search.svg"
        alt=""
        width="16"
        height="16"
        loading="lazy"
        class="position-absolute search"
      />
      <input type="text" placeholder="Поиск..." class="form-control ps-5" v-model="searchQuery" />
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-width: 550px) {
  .wrapper {
    flex-wrap: wrap;
  }
}
.search {
  left: 0.75rem;
  top: 0.75rem;
}
</style>
