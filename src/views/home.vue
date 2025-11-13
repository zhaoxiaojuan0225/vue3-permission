<template>
  <div>home</div>
  <button v-permission="'view'">查看</button>
  <button v-permission="'edit'">编辑</button>
  <button v-permission="'delete'">删除</button>
</template>
<script setup lang="ts">
import { getHomeGoodsApi } from '@/api/home'
import { onMounted } from 'vue'

onMounted(async () => {
  const res = await getHomeGoodsApi({
    url: '/user/order/detail',
  })
  console.log(res)
})
</script>
<style scoped></style>
