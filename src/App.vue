<script setup lang="ts">
import { i18n } from './plugins/i18n';
import { router } from './plugins/router';
import { ref } from 'vue';


if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

if (localStorage.locale) {
  i18n.locale.value = localStorage.locale
} else {
  localStorage.locale = i18n.locale.value
}

</script>

<template>
  <div class="main-container">
    <router-view />
  </div>
</template>

<style scoped>
.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @apply bg-gray-100 dark:bg-gray-800;
}
</style>
