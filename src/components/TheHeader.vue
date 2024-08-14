<script setup>
import { onMounted, ref } from 'vue'

defineEmits(['openDrawer'])

defineProps({
  totalPrice: Number,
  isDisabled: Boolean
})

const typingText = ref('Лучших кроссовок')
const textLoad = () => {
  setTimeout(() => {
    typingText.value = 'Афигенных кроссовок'
  }, 7100)
  setTimeout(() => {
    typingText.value = 'Прекрасных кроссовок'
  }, 13000)
  setTimeout(() => {
    typingText.value = 'Лучших кроссовок'
  }, 19000)
}
onMounted(() => {
  textLoad()
})
onMounted(() => {
  setInterval(textLoad, 18000)
})
</script>
<template>
  <header class="d-flex flex-wrap gap-3 border-bottom border-dark-subtle overflow-hidden">
    <RouterLink to="/home" style="cursor: pointer">
      <div class="d-flex align-items-center gap-3">
        <img src="/logo.png" alt="Logo" loading="lazy" width="40" height="40" />
        <div>
          <h1 class="fs-4 fw-bold text-uppercase text-black">Vue Sneackers</h1>
          <div class="d-flex justify-content-start gap-1">
            <p class="text first-text bg-wight">Магазин</p>
            <p class="text sec-text">{{ typingText }}</p>
          </div>
        </div>
      </div>
    </RouterLink>
    <ul
      class="d-flex align-items-center justify-content-center flex-wrap gap-4 z-2"
      v-if="!isDisabled"
    >
      <li class="d-flex align-items-center gap-2" @click="$emit('openDrawer')">
        <img src="/cart.svg" alt="Basket" loading="lazy" width="20" height="20" />
        <b>Корзина: {{ totalPrice }} руб.</b>
      </li>
      <li class="d-flex align-items-center gap-2">
        <img src="/heart.svg" alt="" loading="lazy" width="20" height="20" />
        <RouterLink to="/favorites">Закладки</RouterLink>
      </li>
      <li class="d-flex align-items-center gap-2">
        <img src="/profile.svg" alt="" loading="lazy" width="20" height="20" />
        <RouterLink to="/profile">Профиль</RouterLink>
      </li>
    </ul>
  </header>
</template>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
header {
  padding: 0.75rem;
  justify-content: center;
}
@media screen and (min-width: 768px) {
  header {
    padding: 1.5rem;
  }
}
@media screen and (min-width: 1024px) {
  header {
    padding: 2.5rem;
    justify-content: space-between;
  }
}
li {
  color: rgb(107 114 128);
  cursor: pointer;
}
.openDrawer:hover {
  color: #000;
}
.text {
  position: relative;
  color: #4070f4;
  font-weight: 700;
}
.sec-text:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #fff;
  border-left: 2px solid #4070f4;
  animation: animate 6s steps(20) infinite;
  animation-delay: 1s;
}
@keyframes animate {
  40%,
  60% {
    left: 100%;
  }
  100% {
    left: 0%;
  }
}
</style>
