// - 引入 axios 库
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios示例
const service = axios.create({
  baseURL: '/api',// 请求的基地址 
  timeout: 5000, // 请求超时时间
})


// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 从 localStorage 中获取 token 并添加到请求头中
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    // 解构响应数据
    const { data, config } = response
    // 处理业务状态码 200 -- 成功响应
    if (data.code === '200') {
      return data.data
    } else {
      // 处理所有非 200 的情况
      ElMessage.error(data.msg || '请求失败')
      return Promise.reject(data)
    }
  },
  error => {
    // 对响应错误做点什么
    ElMessage.error('网络请求失败')
    return Promise.reject(error)
  }
)

export default service