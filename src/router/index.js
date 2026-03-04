import { createRouter, createWebHistory } from 'vue-router'
import BackendLayout from '@/components/BackendLayout.vue'

// 路由配置 前台路由和后台路由分别配置
const backendRouter = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/back',
      component: BackendLayout,
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/dashboard.vue'),
          meta: {
            title: '数据分析',
            icon: 'PieChart'
          }
        },
        {
          path: 'knowledge',
          component: () => import('@/views/knowledge.vue'),
          meta: {
            title: '知识文章',
            icon: 'ChatLineSquare'
          }
        },
        {
          path: 'consultations',
          component: () => import('@/views/consultations.vue'),
          meta: {
            title: '咨询记录',
            icon: 'Message'
          }
        },
        {
          path: 'emotion',
          component: () => import('@/views/emotion.vue'),
          meta: {
            title: '情感记录',
            icon: 'User'
          }
        }
      ]
    }
  ]
})

export default backendRouter
