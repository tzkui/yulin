import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    component: () => import('@/components/info/home.vue'),
    meta: { title: 'Home' },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '资源一张图' }
      },
      {
        path: '/safePage',
        component: () => import('@/views/safe/index.vue'),
        meta: { title: '安全生产' }
      },
      {
        path: '/natural',
        component: () => import('@/views/natural/index.vue'),
        meta: { title: '自然灾害' }
      },
      {
        path: '/decisionAnalysis',
        component: () => import('@/views/decisionAnalysis/index.vue'),
        meta: { title: '决策分析' }
      }
    ]
  },
]
const router = createRouter({
  history: createWebHashHistory("http://171.217.93.33:9007"), // 后端服务器文件包路径
  routes,
})

export default router
