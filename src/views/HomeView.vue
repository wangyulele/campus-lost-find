<template>
  <div>
    <NavBar />
    <div class="home-content">
      <div class="welcome-card">
        <h1>欢迎使用校园失物招领系统</h1>
        <p>帮助同学们快速找回丢失的物品，也让拾到的物品尽快物归原主</p>
      </div>

      <!-- 搜索+筛选区域 -->
      <div class="search-filter-wrap">
        <div class="search-box">
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="请输入物品名称、描述进行搜索..."
            @keyup.enter="handleSearch"
          />
          <button @click="handleSearch">搜索</button>
        </div>

        <div class="filter-wrap">
          <span class="filter-label">筛选：</span>
          <select v-model="filterType" @change="handleFilterChange">
            <option value="all">全部</option>
            <option value="lost">寻物启事</option>
            <option value="found">捡到物品</option>
          </select>
        </div>
      </div>

      <!-- 这里后面放物品列表，现在占位 -->
      <div class="item-placeholder">
        <p>搜索筛选结果展示区域（后续接入物品数据）</p>
        <p>搜索关键词：{{ searchKeyword || '无' }}</p>
        <p>筛选类型：{{ filterType === 'all' ? '全部' : filterType === 'lost' ? '寻物启事' : '捡到物品' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from '../components/NavBar.vue'

const searchKeyword = ref('')
const filterType = ref('all')

// 搜索
function handleSearch() {
  console.log('搜索关键词：', searchKeyword.value)
  console.log('当前筛选条件：', filterType.value)
  // 后续这里对接列表查询逻辑
}

// 筛选切换
function handleFilterChange() {
  console.log('切换筛选条件：', filterType.value)
  // 后续这里对接列表查询逻辑
}
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

/* 搜索筛选容器 */
.search-filter-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  margin-bottom: 30px;
}

.search-box {
  display: flex;
  flex: 1;
  gap: 10px;
}

.search-box input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}

.search-box input:focus {
  border-color: #667eea;
}

.search-box button {
  padding: 10px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.search-box button:hover {
  background: #5868d8;
}

.filter-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-label {
  font-size: 14px;
  color: #444;
}

.filter-wrap select {
  padding: 9px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}

.item-placeholder {
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  color: #888;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
</style>
