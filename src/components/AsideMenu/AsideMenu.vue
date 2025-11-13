<template>
  <el-menu
    v-if="menuItems?.length > 0"
    :default-active="menuActive"
    :default-openeds="[menuActive]"
    :unique-opened="uniqueOpened"
  >
    <MenuSection v-for="(menu, index) in menuItems" :key="menu.id" :menu="menu" />
  </el-menu>
</template>
<script setup lang="ts">
import { useAuthStore, type RouteItemType } from '@/stores/menu.ts'
import { ref, onMounted, computed } from 'vue'
import MenuSection from './MenuSection.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const menuItems = ref<RouteItemType[]>([])
const menuActive = computed(() => route.path)
const uniqueOpened = ref(true)
onMounted(async () => {
  try {
    const authStore = await useAuthStore()
    menuItems.value = authStore.menuRoutes
  } catch (error) {
    console.error('加载菜单失败:', error)
  }
})
</script>
<style></style>
