import service from '@/utils/request'

// 注册用户
export function register(data) {
  return service.post('/user/add', data)
}

// 创建新的会话
export function startSession(data) {
  return service.post('/psychological-chat/session/start', data)
}
