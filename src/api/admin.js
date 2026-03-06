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

export function uploadFile(file, businessInfo) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('businessType', 'ARTICLE')
  formData.append('businessId', businessInfo.businessId)
  formData.append('businessField', 'cover')
  return service.post('/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function createArticle(data) {
  // 一定要注意 接口的请求方式
  return service.post('/knowledge/article', data)
}

export function getArticleDetail(id) {
  // 一定要注意 接口的请求方式
  return service.get(`/knowledge/article/${id}`)
}

export function updateArticle(id, data) {
  // 一定要注意 接口的请求方式
  return service.put(`/knowledge/article/${id}`, data)
}

export function changeArticleStatus(id, data) {
  // 一定要注意 接口的请求方式，使用put方法
  return service.put(`/knowledge/article/${id}/status`, data)
}

export function deleteArticle(id) {
  // 一定要注意 接口的请求方式，使用delete方法
  return service.delete(`/knowledge/article/${id}`)
}

export function getConsultations(params) {
  // 一定要注意 接口的请求方式
  return service.get('/psychological-chat/sessions', { params })
}