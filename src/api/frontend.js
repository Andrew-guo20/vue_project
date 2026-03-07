import service from '@/utils/request'

export function register(data) {
  return service.post('/user/add', data)
}