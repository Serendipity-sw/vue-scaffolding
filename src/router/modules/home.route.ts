import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/home/index.jsx')
  },
  {
    path: '/home/:projectId/project',
    name: 'project',
    component: () => import('@/views/home/project.jsx')
  }
]

export default routes
