// 本地存储封装工具

export function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (e) {
    console.error('保存数据失败:', e)
    return false
  }
}

// 读取数据
export function getStorage(key, defaultValue = null) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : defaultValue
  } catch (e) {
    console.error('读取数据失败:', e)
    return defaultValue
  }
}

// 删除数据
export function removeStorage(key) {
  try {
    localStorage.removeItem(key)
    return true
  } catch (e) {
    console.error('删除数据失败:', e)
    return false
  }
}

// 生成唯一ID
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
