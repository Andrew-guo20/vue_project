import service from '@/utils/request'

// 登录接口
export function login(data) {
  return service.post('/user/login', data)
}

// 获取分类
export function categoryTree() {
  return service.get('/knowledge/category/tree')
}

// 知识文章列表
export function articlePage(params) {
  // 一定要注意 接口的请求方式
  return service.get('/knowledge/article/page', { params })
}

// 文件上传接口
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
// 文章新增接口
export function createArticle(data) {
  // 一定要注意 接口的请求方式
  return service.post('/knowledge/article', data)
}

// 获取知识文章详情接口
export function getArticleDetail(id) {
  // 一定要注意 接口的请求方式
  return service.get(`/knowledge/article/${id}`)
}

// 更新知识文章接口
export function updateArticle(id, data) {
  // 一定要注意 接口的请求方式
  return service.put(`/knowledge/article/${id}`, data)
}

// 更新文章状态
export function changeArticleStatus(id, data) {
  // 一定要注意 接口的请求方式，使用put方法
  return service.put(`/knowledge/article/${id}/status`, data)
}

// 删除知识文章接口
export function deleteArticle(id) {
  // 一定要注意 接口的请求方式，使用delete方法
  return service.delete(`/knowledge/article/${id}`)
}

// 分页查询咨询会话接口
export function getConsultations(params) {
  // 一定要注意 接口的请求方式
  return service.get('/psychological-chat/sessions', { params })
}

// 获取会话消息列表
export function getSessionDetail(sessionId) {
  // 一定要注意 接口的请求方式
  return service.get(`/psychological-chat/sessions/${sessionId}/messages`)
}

// 分页查询情绪日记
export function getEmotionalPage(params) {
  // 一定要注意 接口的请求方式
  return service.get('/emotion-diary/admin/page', { params })
}

// 删除情绪日记接口
export function deleteEmotional(id) {
  // 一定要注意 接口的请求方式，使用delete方法
  return service.delete(`/emotion-diary/admin/${id}`)
}

// 获取综合数据分析接口
export function getAnalyticsOverview() {
  // 一定要注意 接口的请求方式
  return service.get('/data-analytics/overview')
}

// 用户退出登录接口
export function logout() {
  return service.post('/user/logout')
}