<script setup>
import DrawerHead from './DrawerHead.vue'
import CartList from './CartList.vue'
import InfoBlock from './InfoBlock.vue'
import ButtonBack from './ButtonBack.vue'

defineProps({
  totalPrice: Number,
  faqPrice: Number,
  isCartButtonDisabled: Boolean,
  closeDrawer: Function,
  orderId: Number
})

defineEmits(['createOrder'])
</script>

<template>
  <div
    class="position-fixed top-0 start-0 h-100 w-100 z-3 bg-dark opacity-75"
    @click="closeDrawer"
  ></div>
  <div
    class="drawer bg-white h-100 position-fixed end-0 top-0 z-3 p-4 overflow-auto d-flex flex-column"
    v-auto-animate="{ duration: 500 }"
  >
    <DrawerHead />
    <CartList v-if="totalPrice" />
    <div v-if="!totalPrice || orderId">
      <InfoBlock
        v-if="!totalPrice && !orderId"
        image-url="/package-icon.png"
        title="Корзина пустая"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
      >
        <ButtonBack @click="closeDrawer" />
      </InfoBlock>

      <InfoBlock
        v-if="orderId"
        image-url="/order-success-icon.png"
        title="Заказ оформлен!"
        :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
        color-title="green"
      >
        <ButtonBack @click="closeDrawer" />
      </InfoBlock>
    </div>

    <div class="d-flex flex-column gap-4 mt-3" v-if="totalPrice">
      <div class="d-flex gap-2 p-2" style="border-bottom: 2px dashed rgb(203 213 225)">
        <span>Итого:</span>
        <div class="flex-1 border-bottom-1"></div>
        <b>{{ totalPrice }} руб.</b>
      </div>
      <div class="d-flex gap-2 p-2" style="border-bottom: 2px dashed rgb(203 213 225)">
        <span>Налог 5%:</span>
        <div class="flex-1"></div>
        <b>{{ faqPrice }} руб.</b>
      </div>
      <button
        type="button"
        class="w-100 rounded-3 py-3 text-light"
        @click="$emit('createOrder')"
        :disabled="totalPrice === 0 || isCartButtonDisabled"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>

<style scoped>
.drawer {
  max-width: 80%;
}
button {
  background-color: rgb(132 204 22);
  max-width: 20rem;
  margin: 0 auto;
  transition: all 0.3s ease;
  cursor: pointer;
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
</style>
