import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'
import Profile from './pages/Profile.vue'
import RegisterPage from './pages/RegisterPage.vue'
import LoginPage from './pages/LoginPage.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    alias: '/'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'register' && to.name !== 'login' && !sessionStorage.getItem('token')) {
    next({ path: from.path })
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  if ((to.name === 'register' || to.name === 'login') && sessionStorage.getItem('token')) {
    next({ path: '/home' })
  } else {
    next()
  }
})

export default router
