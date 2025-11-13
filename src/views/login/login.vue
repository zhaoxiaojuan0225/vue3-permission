<template>
  <div class="login">
    <el-button @click="toLogin">登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/menu'
import { mockRoutesData } from '@/data/menuData' //此处模拟接口返回的数据
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
let toLogin = async () => {
  //调用getRoutes方法，将后端返回的路由数据添加在缓存中
  await authStore.getRoutes(mockRoutesData)
  authStore.setToken('this is token')
  router.push('/home')
}
</script>
<style>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
