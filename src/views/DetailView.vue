<template>
  <div>
    <NavBar />
    <div class="detail-wrap">
      <div v-if="item" class="detail-card">
        <div class="head">
          <span class="tag" :class="{lost:item.type==='lost',found:item.type==='found'}">
            {{ item.type === 'lost' ? '寻物启事' : '捡到物品' }}
          </span>
          <span class="status" :class="{done:item.status==='done'}">
            {{ item.status === 'done' ? '✅已认领' : '⏳待认领' }}
          </span>
        </div>

        <h2 class="title">{{ item.name }}</h2>

        <div class="info-block">
          <div class="row">
            <label>物品分类：</label>
            <span>{{ getCategoryText(item.category) }}</span>
          </div>
          <div class="row">
            <label>地点：</label>
            <span>{{ item.place }}</span>
          </div>
          <div class="row">
            <label>时间：</label>
            <span>{{ item.time }}</span>
          </div>
          <div class="row">
            <label>发布时间：</label>
            <span>{{ item.createTime }}</span>
          </div>
        </div>

        <div class="desc-block">
          <h4>物品描述</h4>
          <p>{{ item.desc || '无补充描述' }}</p>
        </div>

        <div class="contact-block">
          <h4>联系方式</h4>
          <p>联系人：{{ item.contactName }}</p>
          <p>联系：{{ item.contactPhone }}</p>
        </div>

        <div class="btn-area">
          <button v-if="item.status === 'pending'" class="done-btn" @click="handleMarkDone">标记为已认领</button>
          <button class="back-btn" @click="$router.back()">返回列表</button>
        </div>
      </div>

      <div v-else class="loading">
        数据加载中或该信息不存在
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import { getStorage, setStorage } from '../utils/storage'

const route = useRoute()
const router = useRouter()
const item = ref(null)

// 分类文字映射
function getCategoryText(val) {
  const map = {
    electronics: '电子产品',
    card: '证件卡片',
    clothes: '衣物配饰',
    book: '书籍文具',
    other: '其他'
  }
  return map[val] || val
}

onMounted(() => {
  const id = route.params.id
  const list = getStorage('itemList', [])
  item.value = list.find(i => i.id === id)
})

// 标记已认领
function handleMarkDone() {
  if (!confirm('确定标记该物品已经认领完成？')) return
  const list = getStorage('itemList', [])
  const index = list.findIndex(i => i.id === item.value.id)
  if (index > -1) {
    list[index].status = 'done'
    setStorage('itemList', list)
    item.value.status = 'done'
    alert('操作成功')
  }
}
</script>

<style scoped>
.detail-wrap {
  max-width: 720px;
  margin: 0 auto;
  padding: 40px 20px;
}
.detail-card {
  background: #fff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 14px rgba(0,0,0,0.08);
}
.head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}
.tag {
  padding:4px 12px;
  border-radius:4px;
  font-size:13px;
}
.tag.lost {
  background:#fff3cd;
  color:#856404;
}
.tag.found {
  background:#d4edda;
  color:#155724;
}
.status {
  font-size:13px;
  color:#999;
}
.status.done {
  color:#28a745;
  font-weight:bold;
}
.title {
  margin:0 0 24px;
  font-size:24px;
  color:#222;
}
.info-block {
  margin-bottom:24px;
}
.row {
  display:flex;
  padding:8px 0;
  font-size:15px;
}
.row label {
  width:100px;
  color:#666;
}
.desc-block, .contact-block {
  margin-bottom:24px;
}
.desc-block h4, .contact-block h4 {
  margin:0 0 10px;
  color:#333;
}
.desc-block p, .contact-block p {
  margin:4px 0;
  line-height:1.7;
  color:#555;
}
.btn-area {
  display:flex;
  gap:16px;
  margin-top:30px;
}
.done-btn {
  flex:1;
  padding:11px;
  background:#28a745;
  color:#fff;
  border:none;
  border-radius:6px;
  cursor:pointer;
}
.back-btn {
  flex:1;
  padding:11px;
  background:#eee;
  border:none;
  border-radius:6px;
  cursor:pointer;
}
.loading {
  text-align:center;
  padding:60px;
  color:#888;
}
</style>
