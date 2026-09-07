<template>
  <div>
    <NavBar />
    <div class="home-content">
      <div class="welcome-card">
        <h1>欢迎使用校园失物招领系统</h1>
        <p>帮助同学们快速找回丢失的物品，也让拾到的物品尽快物归原主</p>
      </div>
      
      <div class="function-cards">
        <div class="func-card" @click="$router.push('/publish')">
          <div class="icon">📝</div>
          <h3>发布信息</h3>
          <p>发布丢失物品或拾到物品的信息</p>
        </div>
        <div class="func-card" @click="$router.push('/list')">
          <div class="icon">🔍</div>
          <h3>物品列表</h3>
          <p>浏览全部失物招领信息，搜索筛选</p>
        </div>
        <div class="func-card" @click="$router.push('/personal')">
          <div class="icon">👤</div>
          <h3>个人中心</h3>
          <p>管理我发布的信息，标记物品认领状态</p>
        </div>
        <div class="func-card" @click="$router.push('/stats')">
          <div class="icon">📊</div>
          <h3>数据统计</h3>
          <p>查看失物招领数据统计分析</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
</script>

<style scoped>
.home-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.welcome-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px;
  border-radius: 12px;
  margin-bottom: 30px;
  text-align: center;
}

.welcome-card h1 {
  margin: 0 0 12px 0;
  font-size: 28px;
}

.welcome-card p {
  margin: 0;
  opacity: 0.9;
  font-size: 16px;
}

.function-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.func-card {
  background: white;
  border-radius: 12px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.func-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.icon {
  font-size: 40px;
  margin-bottom: 16px;
}

.func-card h3 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 18px;
}

.func-card p {
  margin: 0;
  color: #888;
  font-size: 13px;
  line-height: 1.5;
}
</style>
