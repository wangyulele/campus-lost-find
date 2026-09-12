<template>
  <div class="detail-container" v-if="item">
    <div class="detail-card">
      <div class="head">
        <span class="type-tag">{{ item.type }}</span>
        <span class="status" :class="{claimed:item.status==='claimed'}">
          {{ item.status === 'pending' ? '待认领' : '✅ 已认领' }}
        </span>
      </div>

      <h2 class="title">{{ item.name }}</h2>

      <div class="info-row">
        <label>丢失/拾取时间：</label>
        <span>{{ item.time }}</span>
      </div>
      <div class="info-row">
        <label>物品描述：</label>
        <span>{{ item.desc || '无描述' }}</span>
      </div>
      <div class="info-row">
        <label>发布人：</label>
        <span>{{ item.publisher }}</span>
      </div>

      <div class="btn-area">
        <button
          v-if="item.status === 'pending'"
          class="claim-btn"
          @click="handleClaim"
        >认领该物品</button>
        <router-link to="/" class="back-link">返回首页</router-link>
      </div>
    </div>
  </div>

  <div v-else class="loading">
    <p>没有找到该物品信息</p>
    <router-link to="/" class="back-link">返回首页</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const item = ref(null)

function loadItem(){
  const id = route.params.id
  const allList = JSON.parse(localStorage.getItem('itemList')) || []
  item.value = allList.find(i=>i.id === id)
}

// 认领物品
function handleClaim() {
  if (!confirm('确认认领该物品？')) return
  const user = JSON.parse(localStorage.getItem('user')) || {}
  const claimList = JSON.parse(localStorage.getItem('claimList')) || []

  // 更新物品状态为已认领
  const allList = JSON.parse(localStorage.getItem('itemList')) || []
  const target = allList.find(i=>i.id === item.value.id)
  if(target){
    target.status = 'claimed'
    localStorage.setItem('itemList', JSON.stringify(allList))
  }

  // 添加到认领记录
  claimList.push({
    itemId: item.value.id,
    name: item.value.name,
    claimUser: user.account,
    claimTime: new Date().toLocaleString()
  })
  localStorage.setItem('claimList', JSON.stringify(claimList))

  alert('认领成功！')
  loadItem()
}

onMounted(()=>{
  loadItem()
})
</script>

<style scoped>
.detail-container{
  width:92%;
  max-width:700px;
  margin:40px auto;
}
.detail-card{
  background:#fff;
  padding:36px 40px;
  border-radius:14px;
  box-shadow: 0 4px 18px rgba(64,158,255,0.12);
}
.head{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:16px;
}
.type-tag{
  background:#409eff;
  color:#fff;
  padding:5px 14px;
  border-radius:20px;
  font-size:14px;
}
.status{
  color:#999;
  font-size:15px;
}
.status.claimed{
  color:#67c23a;
  font-weight:500;
}
.title{
  color:#2c5282;
  margin:0 0 24px;
  font-size:26px;
}
.info-row{
  display:flex;
  padding:12px 0;
  border-bottom:1px solid #f0f4f8;
  font-size:16px;
}
.info-row label{
  color:#4a5568;
  width:140px;
  flex-shrink:0;
}
.info-row span{
  color:#222;
}
.btn-area{
  display:flex;
  align-items:center;
  gap:20px;
  margin-top:28px;
}
.claim-btn{
  background:linear-gradient(135deg, #67c23a, #4dab28);
  color:#fff;
  border:none;
  padding:12px 28px;
  border-radius:10px;
  cursor:pointer;
  font-size:16px;
  transition: opacity 0.2s;
}
.claim-btn:hover{
  opacity:0.9;
}
.back-link{
  color:#409eff;
  text-decoration:none;
  font-size:15px;
}
.back-link:hover{
  text-decoration:underline;
}
.loading{
  text-align:center;
  padding:60px;
  color:#888;
}
.loading .back-link{
  display:inline-block;
  margin-top:16px;
}
</style>
