import { ref } from 'vue'
import { defineStore } from 'pinia'
export interface RouteItemType {
  id: string
  name: string
  path: string
  meta: { hidden?: boolean; btn?: string[] }
  children?: RouteItemType[] // 可选子路由
  component?: string
}

export const useAuthStore = defineStore('infor', {
  state: () => ({
    token: ref(''),
    menuRoutes: [] as RouteItemType[], // 新增菜单数据存储
  }),
  actions: {
    setToken(token: string) {
      this.token = token
    },
    getRoutes(mockRoutes: RouteItemType[]) {
      this.menuRoutes = mockRoutes
    },
    logout() {
      this.token = ''
      this.menuRoutes = []
    },
  },
  persist: true,
})
