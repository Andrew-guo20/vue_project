import service from '@/utils/request'

// 注册用户
export function register(data) {
  return service.post('/user/add', data)
}

// 创建新的会话
export function startSession(data) {
  return service.post('/psychological-chat/session/start', data)
}

export function getSessionList(params) {
  return service.get('/psychological-chat/sessions', { params })
}

// 删除咨询会话
export function deleteSession(sessionId) {
  return service.delete(`/psychological-chat/sessions/${sessionId}`)
}

// 获取会话消息列表
export function getSessionDetail(sessionId) {
  return service.get(`/psychological-chat/sessions/${sessionId}/messages`)
}

// 获取会话情绪分析结果
export function getSessionEmotion(sessionId) {
  return service.get(`/psychological-chat/session/${sessionId}/emotion`)
}

// 创建或更新情绪日记
export function addEmotionDiary(data) {
  return service.post('/emotion-diary', data)
}

// 查询知识文章列表
export function getKnowledgeList(params) {
  return service.get('/knowledge/article/page', { params })
}

//获取知识文章详情
export function getArticleDetail(articleId) {
  return service.get(`/knowledge/article/${articleId}`)
}
