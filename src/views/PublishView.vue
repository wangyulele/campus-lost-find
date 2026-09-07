<template>
  <div>
    <NavBar />
    <div class="publish-wrap">
      <div class="publish-card">
        <h2>发布失物招领信息</h2>
        <form @submit.prevent="handleSubmit">
          <!-- 类型选择：寻物 / 拾物 -->
          <div class="form-item">
            <label>信息类型 <span class="red">*</span></label>
            <div class="radio-group">
              <label>
                <input v-model="form.type" type="radio" value="lost" />
                🔍 寻物启事（我丢了东西）
              </label>
              <label>
                <input v-model="form.type" type="radio" value="found" />
                ✨ 捡到物品（我拾到东西）
              </label>
            </div>
            <div class="error">{{ errors.type }}</div>
          </div>

          <div class="form-item">
            <label>物品名称 <span class="red">*</span></label>
            <input v-model="form.name" type="text" placeholder="例如：黑色蓝牙耳机、校园卡" />
            <div class="error">{{ errors.name }}</div>
          </div>

          <div class="form-item">
            <label>物品分类 <span class="red">*</span></label>
            <select v-model="form.category">
              <option value="">请选择分类</option>
              <option value="electronics">电子产品</option>
              <option value="card">证件卡片</option>
              <option value="clothes">衣物配饰</option>
              <option value="book">书籍文具</option>
              <option value="other">其他</option>
            </select>
            <div class="error">{{ errors.category }}</div>
          </div>

          <div class="form-item">
            <label>丢失/捡拾地点 <span class="red">*</span></label>
            <input v-model="form.place" type="text" placeholder="例如：教学楼A302、食堂二楼" />
            <div class="error">{{ errors.place }}</div>
          </div>

           <div class="form-item">
             <label>丢失/捡拾时间 <span class="red">*</span></label>
             <input v-model="form.time" type="text" placeholder="例：2026/09/07" />
            <div class="error">{{ errors.time }}</div>
          </div>


          <div class="form-item">
            <label>物品描述</label>
            <textarea v-model="form.desc" rows="4" placeholder="描述物品特征，颜色、记号等信息"></textarea>
          </div>

          <div class="form-item">
            <label>联系人 <span class="red">*</span></label>
            <input v-model="form.contactName" type="text" placeholder="你的姓名" />
            <div class="error">{{ errors.contactName }}</div>
          </div>

          <div class="form-item">
            <label>联系方式 <span class="red">*</span></label>
            <input v-model="form.contactPhone" type="text" placeholder="手机号/QQ号" />
            <div class="error">{{ errors.contactPhone }}</div>
          </div>

          <div class="btn-group">
            <button class="submit-btn" type="submit">提交发布</button>
            <button class="reset-btn" type="button" @click="resetForm">重置表单</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import { getStorage, setStorage, generateId } from '../utils/storage'

const router = useRouter()

const form = reactive({
  type: 'lost',
  name: '',
  category: '',
  place: '',
  time: '',
  desc: '',
  contactName: '',
  contactPhone: ''
})

const errors = reactive({
  type: '',
  name: '',
  category: '',
  place: '',
  time: '',
  contactName: '',
  contactPhone: ''
})

// 表单校验
function validate() {
  Object.keys(errors).forEach(k => errors[k] = '')
  let ok = true

  if (!form.name.trim()) { errors.name = '请填写物品名称'; ok = false }
  if (!form.category) { errors.category = '请选择物品分类'; ok = false }
  if (!form.place.trim()) { errors.place = '请填写地点'; ok = false }
  if (!form.time) { errors.time = '请选择时间'; ok = false }
  if (!form.contactName.trim()) { errors.contactName = '请填写联系人'; ok = false }
  if (!form.contactPhone.trim()) { errors.contactPhone = '请填写联系方式'; ok = false }
  return ok
}

// 提交
function handleSubmit() {
  if (!validate()) return

  const list = getStorage('itemList', [])
  const newItem = {
    id: generateId(),
    ...form,
    createTime: new Date().toLocaleString(),
    status: 'pending' // pending待认领，done已完成
  }
  list.unshift(newItem)
  setStorage('itemList', list)

  alert('发布成功！')
  router.push('/list') // 发布完成跳转到物品列表页
}

// 重置
function resetForm() {
  form.type = 'lost'
  form.name = ''
  form.category = ''
  form.place = ''
  form.time = ''
  form.desc = ''
  form.contactName = ''
  form.contactPhone = ''
  Object.keys(errors).forEach(k => errors[k] = '')
}
</script>

<style scoped>
.publish-wrap {
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 20px;
}
.publish-card {
  background: #fff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 14px rgba(0,0,0,0.08);
}
.publish-card h2 {
  text-align: center;
  margin:0 0 28px;
  color:#333;
}
.form-item {
  margin-bottom:20px;
}
.form-item label {
  display:block;
  margin-bottom:6px;
  font-size:14px;
  color:#444;
}
.red {
  color:#e53e3e;
}
.radio-group {
  display:flex;
  gap:24px;
}
.form-item input,
.form-item select,
.form-item textarea {
  width:100%;
  box-sizing:border-box;
  padding:10px 12px;
  border:1px solid #ddd;
  border-radius:6px;
  font-size:14px;
}
.form-item input:focus,
.form-item select:focus,
.form-item textarea:focus {
  border-color:#667eea;
  outline:none;
}
.error {
  font-size:12px;
  color:#e53e3e;
  margin-top:4px;
  min-height:16px;
}
.btn-group {
  display:flex;
  gap:16px;
  margin-top:30px;
}
.submit-btn {
  flex:1;
  padding:12px;
  background: #667eea;
  color:white;
  border:none;
  border-radius:6px;
  cursor:pointer;
  font-size:15px;
}
.reset-btn {
  flex:1;
  padding:12px;
  background:#eee;
  border:none;
  border-radius:6px;
  cursor:pointer;
  font-size:15px;
}
</style>
