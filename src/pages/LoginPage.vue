<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import AppLoader from '../components/AppLoader.vue'
import axios from 'axios'
axios.defaults.baseURL = 'https://621256287b80dd07.mokky.dev'

const router = useRouter()

const isLoading = ref(false)
const alertIsVisible = ref(false)
const userEmail = ref('')
const userPassword = ref('')

const isAuth = inject('isAuth')

const authorizeUser = async () => {
  try {
    isLoading.value = true
    const response = await axios.post('/auth', {
      email: userEmail.value,
      password: userPassword.value
    })
    const token = response.data.token
    if (token) {
      sessionStorage.setItem('token', token)
      isAuth.value = true
      router.replace('/home')
    }
  } catch (error) {
    console.log(error.message)
    alertIsVisible.value = true
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="alertIsVisible">
    <strong>Неверная почта или пароль</strong>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
      @click="alertIsVisible = false"
    ></button>
  </div>
  <form @submit.prevent="authorizeUser" v-if="!isLoading">
    <div class="form-floating mb-3">
      <input
        v-model="userEmail"
        type="email"
        class="form-control"
        id="email"
        placeholder="Введите email..."
        pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
        required
      />
      <label for="email">Почта</label>
    </div>
    <div class="form-floating mb-3">
      <input
        v-model="userPassword"
        type="password"
        class="form-control"
        id="password"
        placeholder="Введите пароль..."
        required
      />
      <label for="password">Пароль</label>
      <div class="form-text">
        Пароль должен содержать от 6 символов с использованием цифр, спец. символов, латиницы,
        наличием строчных и прописных символов
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Войти</button>
    <p class="form-text">
      Нет аккаунта? <RouterLink to="/register">Зарегистрироваться</RouterLink>
    </p>
  </form>
  <AppLoader v-else />
</template>
