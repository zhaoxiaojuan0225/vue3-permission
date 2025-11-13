<template>
  <!-- 1、存在子项的使用el-sub-menu   2、不存在子项的使用el-menu-item -->
  <!-- 有子菜单的情况 -->
  <el-sub-menu v-if="menu.children?.length" :index="menu.path">
    <template #title>
      <span>{{ menu.title }}</span>
    </template>
    <MenuSection v-for="child in menu.children" :key="child.path" :menu="child" />
  </el-sub-menu>
  <!-- 无子菜单情况 -->
  <el-menu-item v-else :index="menu.path">
    <router-link :to="menu.path">
      <span>{{ menu.title }}</span>
    </router-link>
  </el-menu-item>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
defineProps(['menu'])
</script>
<style scoped>
a {
  width: 100%;
  text-align: left;
}
.el-menu-item.is-active,
.el-menu-item.is-active a {
  color: #10a3c4;
}
</style>
