import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import PublishView from '../views/PublishView.vue'
import DetailView from '../views/DetailView.vue'
import PersonalView from '../views/PersonalView.vue'

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
    path: '/detail/:id',
    component: DetailView
  },
  {
    path: '/personal',
    component: PersonalView
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
// 路由守卫：未登录强制跳转登录页
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user')
  // 如果没有登录，只能访问 /login
  if (!user && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})
export default router
