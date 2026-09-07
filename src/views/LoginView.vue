<template>
  <div class="login-container">
    <div class="login-box">
      <h2>校园失物招领系统</h2>
      <p class="subtitle">用户登录</p>
      
      <form @submit.prevent="handleLogin">
        <div class="form-item">
          <label>账号</label>
          <input 
            type="text" 
            v-model="form.username" 
            placeholder="请输入账号"
          />
          <span v-if="errors.username" class="error">{{ errors.username }}</span>
        </div>
        
        <div class="form-item">
          <label>密码</label>
          <input 
            type="password" 
            v-model="form.password" 
            placeholder="请输入密码"
          />
          <span v-if="errors.password" class="error">{{ errors.password }}</span>
        </div>
        
        <button type="submit" class="login-btn">登 录</button>
      </form>
      
      <p class="tip">提示：本系统为教学演示，测试账号 admin / 123456</p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { setStorage } from '../utils/storage'

const router = useRouter()

const form = reactive({
  username: '',
  password: ''
})

const errors = reactive({
  username: '',
  password: ''
})

function validateForm() {
  let valid = true
  errors.username = ''
  errors.password = ''
  
  if (!form.username.trim()) {
    errors.username = '请输入账号'
    valid = false
  }
  if (!form.password.trim()) {
    errors.password = '请输入密码'
    valid = false
  } else if (form.password.length < 6) {
    errors.password = '密码长度不能少于6位'
    valid = false
  }
  return valid
}

function handleLogin() {
  if (!validateForm()) return
  
  if (form.username === 'admin' && form.password === '123456') {
    setStorage('userInfo', {
      username: form.username,
      loginTime: new Date().toLocaleString()
    })
    setStorage('isLogin', true)
    
    alert('登录成功！')
    router.push('/')
  } else {
    alert('账号或密码错误！测试账号：admin / 123456')
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  width: 400px;
}

.login-box h2 {
  text-align: center;
  color: #333;
  margin: 0 0 8px 0;
}

.subtitle {
  text-align: center;
  color: #999;
  margin: 0 0 30px 0;
}

.form-item {
  margin-bottom: 20px;
}

.form-item label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-size: 14px;
}

.form-item input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.3s;
}

.form-item input:focus {
  border-color: #667eea;
}

.error {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.login-btn:hover {
  opacity: 0.9;
}

.tip {
  text-align: center;
  color: #999;
  font-size: 12px;
  margin-top: 20px;
}
</style>
