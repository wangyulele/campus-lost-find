<template>
  <div class="publish-container">
    <div class="publish-card">
      <h2>失物 / 招领登记</h2>
      <p class="subtitle">填写信息，帮助同学更快找到物品</p>

      <div class="form-item">
        <label>信息类型</label>
        <div class="radio-group">
          <label class="radio-label">
            <input v-model="form.type" type="radio" value="丢失物品">
            <span class="radio-text">🔍 丢失物品</span>
          </label>
          <label class="radio-label">
            <input v-model="form.type" type="radio" value="拾取物品">
            <span class="radio-text">✨ 拾取物品</span>
          </label>
        </div>
      </div>

      <div class="form-item">
        <label>物品名称</label>
        <input v-model="form.name" type="text" placeholder="请输入物品名称，例如：蓝色雨伞">
      </div>

      <div class="form-item">
        <label>丢失 / 拾取时间</label>
        <!-- 改成日期选择器 -->
        <input v-model="rawDate" type="date">
      </div>

      <div class="form-item">
        <label>物品描述</label>
        <textarea v-model="form.desc" rows="4" placeholder="简单描述物品特征、地点"></textarea>
      </div>

      <button @click="handleSubmit" class="submit-btn">提交登记</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const form = ref({
  type: '丢失物品',
  name: '',
  time: '',
  desc: ''
})
// 原生date选择器绑定变量（格式 yyyy-MM-dd）
const rawDate = ref('')

// 生成唯一ID
function generateId() {
  return Date.now() + '-' + Math.floor(Math.random() * 1000)
}

function handleSubmit() {
  if (!form.value.name || !rawDate.value) {
    alert('请填写物品名称并选择日期！')
    return
  }
  // 将 2026-09-12 转为 2026/09/12
  form.value.time = rawDate.value.replaceAll('-','/')

  const user = JSON.parse(localStorage.getItem('user')) || { account: '游客' }
  const newItem = {
    id: generateId(),
    ...form.value,
    publisher: user.account,
    createTime: new Date().toLocaleString(),
    status: 'pending'
  }

  const list = JSON.parse(localStorage.getItem('itemList')) || []
  list.unshift(newItem)
  localStorage.setItem('itemList', JSON.stringify(list))

  alert('发布成功！')
  router.push('/')
}
</script>

<style scoped>
.publish-container {
  width: 92%;
  max-width: 600px;
  margin: 40px auto;
}
.publish-card {
  background: #fff;
  padding: 36px 40px;
  border-radius: 14px;
  box-shadow: 0 4px 18px rgba(64,158,255,0.12);
}
h2 {
  text-align: center;
  color: #2c5282;
  margin: 0 0 6px 0;
  font-size: 24px;
}
.subtitle {
  text-align: center;
  color: #9aa7b5;
  font-size: 14px;
  margin: 0 0 28px 0;
}
.form-item {
  margin-bottom: 22px;
}
.form-item label {
  display: block;
  margin-bottom: 8px;
  color: #4a5568;
  font-size: 15px;
  font-weight: 500;
}
.radio-group {
  display: flex;
  gap: 28px;
}
.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 15px;
  color: #4a5568;
}
.form-item input,
.form-item textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 14px;
  border: 1px solid #dbe3ec;
  border-radius: 10px;
  outline: none;
  font-size: 15px;
  transition: border-color 0.2s;
}
.form-item input:focus,
.form-item textarea:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 3px rgba(64,158,255,0.12);
}
.submit-btn {
  width: 100%;
  padding: 13px;
  background: linear-gradient(135deg, #409eff, #337ecc);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: opacity 0.2s;
}
.submit-btn:hover {
  opacity: 0.9;
}
</style>
