import { createRouter, createWebHashHistory } from 'vue-router'
import homeRoutes from './modules/home.route'

export default createRouter({
  history: createWebHashHistory(),
  routes: [...homeRoutes]
})
