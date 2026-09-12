<template>
  <div class="home-container">
    <!-- 顶部导航栏，蓝色背景 -->
    <div class="top-nav">
      <div class="nav-left">
        <router-link to="/">首页</router-link>
        <router-link to="/publish">失物登记</router-link>
        <router-link to="/personal">个人中心</router-link>
      </div>
    </div>

    <!-- 搜索和筛选 -->
    <div class="search-bar">
      <input
        v-model="keyword"
        type="text"
        placeholder="输入物品名称搜索..."
        class="search-input"
      >
      <select v-model="filterType" class="filter-select">
        <option value="">全部类型</option>
        <option value="丢失物品">丢失物品</option>
        <option value="拾取物品">拾取物品</option>
      </select>
    </div>

    <!-- 最新登记记录 -->
    <div class="record-area">
      <h3>最新登记记录</h3>
      <div v-if="filterRecordList.length === 0" class="empty">暂无待认领的登记记录</div>
      <div v-for="item in filterRecordList" :key="item.id" class="record-card">
        <span class="type-tag">{{ item.type }}</span>
        <span class="name">{{ item.name }}</span>
        <span class="time">{{ item.time }}</span>
        <router-link :to="`/detail/${item.id}`" class="detail-link">查看详情</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
const keyword = ref('')
const filterType = ref('')
const allRecord = ref([])

// 读取所有登记信息
function loadRecords() {
  const allData = JSON.parse(localStorage.getItem('itemList')) || []
  allRecord.value = allData
}

// 搜索+筛选逻辑，自动过滤，只显示待认领
const filterRecordList = computed(() => {
  return allRecord.value.filter(item => {
    // 名称模糊搜索
    const nameMatch = item.name.includes(keyword.value)
    // 类型筛选，空=全部
    const typeMatch = filterType.value ? item.type === filterType.value : true
    // 只保留待认领，已认领的直接过滤掉，不在首页展示
    const statusMatch = item.status === 'pending'
    return nameMatch && typeMatch && statusMatch
  }).slice(0,5) // 筛选之后，只保留前5条
})

onMounted(()=>{
  loadRecords()
})
</script>

<style scoped>
.home-container {
  width: 92%;
  max-width: 1000px;
  margin: 0 auto;
}
/* 导航栏 蓝色背景 */
.top-nav {
  display: flex;
  align-items: center;
  padding:18px 24px;
  background-color: #409eff;
  border-radius: 0 0 12px 12px;
  margin-bottom:32px;
  box-shadow: 0 2px 6px rgba(64,158,255,0.25);
}
.nav-left{
  display:flex;
  gap:28px;
}
.nav-left a{
  text-decoration:none;
  color:#ffffff;
  font-size:17px;
  transition: color 0.2s;
}
.nav-left a:hover{
  color:#e8f4ff;
}
/* 搜索栏靠右 */
.search-bar {
  display: flex;
  gap:12px;
  justify-content: flex-end;
  margin-bottom:28px;
}
.search-input{
  padding:11px 16px;
  border:1px solid #cbd5e0;
  border-radius:10px;
  outline:none;
  width:260px;
  transition: border-color 0.2s;
}
.search-input:focus{
  border-color:#409eff;
}
.filter-select{
  padding:11px 14px;
  border:1px solid #cbd5e0;
  border-radius:10px;
  transition: border-color 0.2s;
}
.filter-select:focus{
  border-color:#409eff;
}
.record-area h3{
  color:#2c5282;
  margin-bottom:18px;
  font-size:20px;
}
.record-card{
  display:flex;
  align-items:center;
  gap:16px;
  background:#fff;
  border:none;
  padding:16px 20px;
  border-radius:12px;
  margin-bottom:14px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  transition: transform 0.2s;
}
.record-card:hover{
  transform: translateY(-2px);
}
.type-tag{
  background:#409eff;
  color:#fff;
  padding:4px 10px;
  border-radius:20px;
  font-size:13px;
  white-space: nowrap;
}
.name{
  flex:1;
  color:#222;
  font-size:16px;
}
.time{
  color:#666;
  font-size:14px;
  white-space: nowrap;
}
.detail-link{
  color:#409eff;
  text-decoration: none;
  font-weight:500;
}
.detail-link:hover{
  text-decoration: underline;
}
.empty{
  padding:40px;
  text-align:center;
  color:#888;
  font-size:16px;
  background:#f8fafc;
  border-radius:12px;
}
</style>
