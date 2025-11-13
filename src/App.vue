<template>
  <RouterView />
</template>
<script setup lang="ts"></script>

<style>
#app,
body,
html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
a {
  text-decoration: none;
  color: #2c3e50;
}
.el-menu {
  border-right: none;
  background-color: #eee;
}
</style>
