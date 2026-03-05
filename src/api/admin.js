import service from '@/utils/request'

export function login(data) {
  return service.post('/user/login', data)
}

export function categoryTree() {
  return service.get('/knowledge/category/tree')
}

export function articlePage(params) {
  // 一定要注意 接口的请求方式
  return service.get('/knowledge/article/page', { params })
}