<template>
  <div class="personal-container">
    <!-- 用户信息卡片 -->
    <div class="user-card">
      <h2>个人中心</h2>
      <div v-if="userInfo">
        <p class="user-item">用户名：<span>{{ userInfo.name }}</span></p>
        <p class="user-item">账号：<span>{{ userInfo.account }}</span></p>
        <button @click="logout" class="logout-btn">退出登录</button>
      </div>
      <div v-else>
        <p>请先登录</p>
        <router-link to="/login" class="login-link">去登录</router-link>
      </div>
    </div>

    <!-- 我的发布 -->
    <div class="section-card">
      <h3>📦 我的发布</h3>
      <div v-if="myPublishList.length === 0" class="empty-tip">暂无发布记录</div>
      <div v-for="item in myPublishList" :key="item.id" class="record-card">
        <span class="type-tag">{{ item.type }}</span>
        <span class="name">{{ item.name }}</span>
        <span class="time">{{ item.time }}</span>
        <div class="btn-group">
          <router-link :to="`/detail/${item.id}`" class="detail-link">查看详情</router-link>
          <button @click="deleteItem(item.id)" class="del-btn">删除</button>
        </div>
      </div>
    </div>

    <!-- 我的认领 -->
    <div class="section-card">
      <h3>✅ 我的认领</h3>
      <div v-if="claimList.length === 0" class="empty-tip">暂无认领记录</div>
      <div v-for="item in claimList" :key="item.id" class="record-card">
        <span class="type-tag">认领物品</span>
        <span class="name">{{ item.name }}</span>
        <span class="time">认领时间：{{ item.claimTime }}</span>
        <router-link :to="`/detail/${item.id}`" class="detail-link">查看详情</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const userInfo = ref(null)
const myPublishList = ref([])
const claimList = ref([])

// 获取本地存储数据
function loadData() {
  userInfo.value = JSON.parse(localStorage.getItem('user'))
  const allLost = JSON.parse(localStorage.getItem('itemList')) || []
  if(userInfo.value){
    myPublishList.value = allLost.filter(item => item.publisher === userInfo.value.account)
  }
  const allClaimList = JSON.parse(localStorage.getItem('claimList')) || []
  // 只筛选当前登录用户的认领记录
  claimList.value = allClaimList.filter(claim => claim.claimUser === userInfo.value.account)
}

// 删除自己发布的物品
function deleteItem(id){
  let list = JSON.parse(localStorage.getItem('itemList')) || []
  list = list.filter(item => item.id !== id)
  localStorage.setItem('itemList', JSON.stringify(list))
  loadData()
}

// 退出登录
function logout(){
  localStorage.removeItem('user')
  router.push('/login')
}

onMounted(()=>{
  loadData()
})
</script>

<style scoped>
.personal-container{
  width: 92%;
  max-width: 900px;
  margin: 40px auto;
}
.user-card{
  background:#fff;
  padding:28px 32px;
  border-radius:14px;
  box-shadow: 0 4px 18px rgba(64,158,255,0.12);
  margin-bottom:24px;
}
.user-card h2{
  color:#2c5282;
  margin:0 0 16px;
}
.user-item{
  font-size:16px;
  color:#4a5568;
}
.user-item span{
  color:#222;
  font-weight:500;
}
.logout-btn{
  margin-top:12px;
  background:#f56c6c;
  color:#fff;
  border:none;
  padding:10px 18px;
  border-radius:10px;
  cursor:pointer;
  font-size:15px;
  transition: opacity 0.2s;
}
.logout-btn:hover{
  opacity:0.9;
}
.login-link{
  color:#409eff;
  text-decoration:none;
}
.section-card{
  background:#fff;
  padding:24px 28px;
  border-radius:14px;
  box-shadow: 0 4px 18px rgba(64,158,255,0.12);
  margin-bottom:24px;
}
.section-card h3{
  color:#2c5282;
  margin:0 0 18px;
  font-size:19px;
}
.record-card{
  display:flex;
  align-items:center;
  gap:16px;
  border: none;
  background:#f8fafc;
  padding:16px;
  border-radius:12px;
  margin-bottom:14px;
  box-shadow:0 2px 8px rgba(0,0,0,0.04);
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
.btn-group{
  display:flex;
  gap:10px;
}
.detail-link{
  color:#409eff;
  text-decoration: none;
  font-weight:500;
}
.detail-link:hover{
  text-decoration: underline;
}
.del-btn{
  background:#ff9500;
  color:#fff;
  border:none;
  padding:6px 10px;
  border-radius:8px;
  cursor:pointer;
}
.empty-tip{
  padding:30px;
  text-align:center;
  color:#888;
  background:#f8fafc;
  border-radius:12px;
}
</style>
