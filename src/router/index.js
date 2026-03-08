import { createRouter, createWebHistory } from 'vue-router'
import BackendLayout from '@/components/BackendLayout.vue'
import FrontendLayout from '@/components/FrontendLayout.vue'
import AuthLayout from '@/components/AuthLayout.vue'

// 路由配置 前台路由和后台路由分别配置
const backendRouter = [
  {
    path: '/back',
    redirect: '/back/dashboard',
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
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        // 子路由路径去掉开头'/'
        path: 'login',
        component: () => import('@/views/login.vue'),
        meta: {
          title: '登录',
        }
      },
      {
        path: 'register',
        component: () => import('@/views/register.vue'),
        meta: {
          title: '注册',
        }
      }
    ]
  }
]

const frontendRouter = [
  {
    path: '/',
    component: FrontendLayout,
    children: [
      {
        path: '',
        component: () => import('@/views/home.vue'),
      },
      {
        path: 'consultation',
        component: () => import('@/views/consultation.vue'),
      },
      {
        path: 'emotion-diary',
        component: () => import('@/views/emotionDiary.vue'),
      },
      {
        path: 'knowledge',
        component: () => import('@/views/frontendKnowledge.vue'),
      },
      {
        path: 'knowledge/article/:id',
        component: () => import('@/views/articleDetail.vue'),
        props: true, // 开启路由模式，可以通过props获取路由参数id
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: [...backendRouter, ...frontendRouter]
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // 当前用户是否登录 有token表示用户已登录
  if (token) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    // 如果是后台用户
    if (userInfo.userType === 2) {
      if (to.path.startsWith('/back')) {
        next()
      } else {
        next('/back/dashboard')
      }
    }
    // 如果是前台用户
    else if (userInfo.userType === 1) {
      // 对于用户端账号 只能访问前台路由
      if (to.path.startsWith('/back') || to.path.startsWith('/auth')) {
        next('/')
      } else {
        next()
      }
    }
  } else {
    if (to.path.startsWith('/back')) {
      // 如果是后台路由，且用户未登录，重定向到登录页
      next('/auth/login')
    } else {
      next()
    }
  }
})

export default router
