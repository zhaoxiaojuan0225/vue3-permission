import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore, type RouteItemType } from '@/stores/menu'

import login from '@/views/login/login.vue'
import layout from '@/views/layout.vue'
import notFound from '@/views/404.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/:catchAll(.*)*',
      name: 'NotFound',
      component: notFound,
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout,
      children: [],
    },
  ],
})
let hasAddedRoutes = false

// 添加动态路由的函数
const addDynamicRoutes = (routes: RouteItemType[]) => {
  routes.forEach((route) => {
    // 创建路由配置 - 使用 RouteRecordRaw 类型
    const routeConfig: RouteRecordRaw = {
      path: route.path,
      name: route.name,
      component: () => import(`../views${route.component}` || ''),
      meta: route.meta,
    }
    // 处理嵌套路由 - 使用 RouteRecordRaw 类型
    if (route.children && route.children.length > 0) {
      addDynamicRoutes(route.children)
    }
    // 添加路由
    router.addRoute('layout', routeConfig)
    // router.addRoute(routeConfig)
  })
}
// 路由守卫
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  if (to.path === '/login') {
    next()
    return
  }
  if (!authStore.token) {
    next('/login')
    return
  }
  if (to.path === '/' && authStore.token) {
    next('/home')
    return
  }
  if (!hasAddedRoutes) {
    try {
      // 获取路由数据
      const routes = await authStore.menuRoutes
      // 添加动态路由
      await addDynamicRoutes(routes)
      // 标记已添加路由
      hasAddedRoutes = true
      // 重新导航
      // next({ ...to, replace: true })
      // 解决刷新一直进404页面
      return next({ path: to.path, query: to.query, replace: true })
    } catch (error) {
      console.error('添加路由失败:', error)
      next('/login')
    }
  } else {
    next()
  }
})
export default router
