<template>
  <div class="layout">
    <el-container>
      <el-header>
        <h5 class="title">后台管理系统</h5>
        <el-button @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <AsideMenu />
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import AsideMenu from '@/components/AsideMenu/AsideMenu.vue'
import { useAuthStore } from '@/stores/menu.ts'

import { useRouter } from 'vue-router'

const router = useRouter()
const logout = () => {
  useAuthStore().logout()
  router.push('/login')
}
</script>
<style>
.layout,
.el-container {
  height: 100%;
}
.el-aside {
  height: 100%;
  background-color: #eee;
}
.el-header {
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
