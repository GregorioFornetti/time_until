<script setup lang="ts">
defineEmits(['click'])
</script>

<template>
  <div
    @click="$emit('click')"
    class="group flex items-center justify-center w-64 h-56 rounded-2xl border-2 border-dashed border-gray-300 bg-white cursor-pointer transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-500 dark:hover:bg-gray-700"
  >
    <font-awesome-icon
      icon="fa-solid fa-plus"
      class="text-2xl text-gray-400 transition group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300"
    />
  </div>
</template>