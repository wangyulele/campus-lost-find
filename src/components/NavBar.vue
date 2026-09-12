<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="logo">校园失物招领</div>
      <div class="nav-links">
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link to="/publish" class="nav-link">发布信息</router-link>
        <router-link to="/list" class="nav-link">物品列表</router-link>
        <router-link to="/personal" class="nav-link">个人中心</router-link>
        <button @click="handleLogout" class="logout-btn">退出登录</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { removeStorage } from '../utils/storage'

const router = useRouter()

function handleLogout() {
  if (confirm('确定要退出登录吗？')) {
    removeStorage('isLogin')
    removeStorage('userInfo')
    router.push('/login')
  }
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.logo {
  color: white;
  font-size: 18px;
  font-weight: bold;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-link {
  color: rgba(255,255,255,0.85);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: white;
  font-weight: bold;
}

.logout-btn {
  background: rgba(255,255,255,0.2);
  color: white;
  border: 1px solid rgba(255,255,255,0.3);
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.logout-btn:hover {
  background: rgba(255,255,255,0.3);
}
</style>
