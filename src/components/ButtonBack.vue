<template>
  <button type="button" class="w-100 rounded-4 py-3 px-4 text-light mb-4">
    <img src="/arrow-next.svg" alt="" />
    <span class="">Вернуться назад</span>
  </button>
</template>

<style scoped>
button {
  background-color: rgb(132 204 22);
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 14rem;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}
button:hover {
  background-color: rgb(101 163 13);
}
button:active {
  background-color: rgb(77 124 15);
}
button:disabled {
  background-color: rgb(203 213 225);
}
img {
  rotate: 180deg;
}
</style>
