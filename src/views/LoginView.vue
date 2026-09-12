<template>
  <div class="page-wrap">
    <div class="login-box">
      <div class="title">{{ isRegister ? '账号注册' : '用户登录' }}</div>
      <div class="form-item">
        <label>账号</label>
        <input v-model="form.account" type="text" placeholder="请输入账号">
      </div>
      <div class="form-item">
        <label>密码</label>
        <input v-model="form.pwd" type="password" placeholder="请输入密码">
      </div>
      <div v-if="isRegister" class="form-item">
        <label>用户名</label>
        <input v-model="form.name" type="text" placeholder="请输入你的昵称">
      </div>
      <button @click="submit" class="submit-btn">{{ isRegister ? '注册' : '登录' }}</button>
      <p class="tip">
        {{ isRegister ? '已有账号？' : '没有账号？' }}
        <span @click="isRegister = !isRegister" class="switch">
          {{ isRegister ? '去登录' : '去注册' }}
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const isRegister = ref(false)
const form = ref({
  account: '',
  pwd: '',
  name: ''
})

function getUserList() {
  return JSON.parse(localStorage.getItem('userList')) || []
}

function submit() {
  const userList = getUserList()
  if (isRegister.value) {
    const hasUser = userList.find(u => u.account === form.value.account)
    if (hasUser) {
      alert('账号已存在！')
      return
    }
    if (!form.value.account || !form.value.pwd || !form.value.name) {
      alert('请填写完整信息')
      return
    }
    userList.push({
      account: form.value.account,
      pwd: form.value.pwd,
      name: form.value.name
    })
    localStorage.setItem('userList', JSON.stringify(userList))
    alert('注册成功，请登录！')
    isRegister.value = false
  } else {
    const findUser = userList.find(u => u.account === form.value.account && u.pwd === form.value.pwd)
    if (!findUser) {
      alert('账号密码错误！')
      return
    }
    localStorage.setItem('user', JSON.stringify(findUser))
    router.push('/')
  }
}
</script>

<style scoped>
.page-wrap{
  min-height: 100vh;
  /* 浅蓝渐变背景，校园风格 */
  background: linear-gradient(135deg, #e8f4ff, #f0f7ff);
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-box {
  width: 380px;
  padding: 36px;
  background: #ffffff;
  border-radius: 14px;
  /* 卡片阴影，更有层次感 */
  box-shadow: 0 4px 16px rgba(0, 80, 160, 0.12);
}
.title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 28px;
  color: #2c5282;
  font-weight: 600;
}
.form-item {
  margin-bottom: 18px;
}
.form-item label {
  display:block;
  margin-bottom:6px;
  color:#4a5568;
}
.form-item input {
  width:100%;
  box-sizing: border-box;
  padding:10px 12px;
  border:1px solid #cbd5e0;
  border-radius:8px;
  outline: none;
  transition: border 0.2s;
}
.form-item input:focus{
  border-color:#409eff;
}
.submit-btn {
  width:100%;
  padding:11px;
  background:#409eff;
  color:white;
  border:none;
  border-radius:8px;
  cursor:pointer;
  font-size:16px;
  transition: background 0.3s;
}
.submit-btn:hover{
  background:#337ecc;
}
.tip {
  text-align:center;
  margin-top:20px;
  color:#718096;
}
.switch {
  color:#409eff;
  cursor:pointer;
  margin-left:4px;
}
.switch:hover{
  text-decoration: underline;
}
</style>
