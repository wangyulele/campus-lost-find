import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import PublishView from '../views/PublishView.vue'
import ListView from '../views/ListView.vue'
import DetailView from '../views/DetailView.vue'
import PersonalView from '../views/PersonalView.vue'
import StatsView from '../views/StatsView.vue'

const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/publish',
    component: PublishView
  },
  {
    path: '/list',
    component: ListView
  },
  {
    path: '/detail/:id',
    component: DetailView
  },
  {
    path: '/personal',
    component: PersonalView
  },
  {
    path: '/stats',
    component: StatsView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫：未登录跳转到登录页
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('isLogin')
  if (to.path !== '/login' && !isLogin) {
    next('/login')
  } else if (to.path === '/login' && isLogin) {
    next('/')
  } else {
    next()
  }
})

export default router
