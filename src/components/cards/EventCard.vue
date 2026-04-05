<script setup lang="ts">

defineProps<{
  title: string
  description?: string
  startDate?: string | Date
  endDate?: string | Date
}>()

function formatDate(date: string | Date) {
  if (!date) return ""
  return new Date(date).toLocaleDateString()
}

</script>

<template>
  <div
    class="group relative rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800 w-64 h-56"
  >
    <h3
      class="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2"
    >
      {{ title }}
    </h3>
    <p
      v-if="description"
      class="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3"
    >
      {{ description }}
    </p>
    <div
      v-if="startDate || endDate"
      class="mt-3 text-xs text-gray-500 dark:text-gray-400"
    >
      <span v-if="startDate">
        Start: {{ formatDate(startDate) }}
      </span>
      <span v-if="endDate" class="ml-2">
        End: {{ formatDate(endDate) }}
      </span>
    </div>

    <div
      class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100"
    >
      <button
        @click="$emit('edit')"
        class="rounded-lg px-2 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        <font-awesome-icon
          icon="fa-solid fa-pen"
          class="text-sm text-gray-700 dark:text-gray-200"
        />
      </button>
      <button
        @click="$emit('delete')"
        class="rounded-lg px-2 py-1 bg-red-100 hover:bg-red-200 dark:bg-red-900/40 dark:hover:bg-red-900/60"
      >
        <font-awesome-icon
          icon="fa-solid fa-trash"
          class="text-sm text-red-600 dark:text-red-400"
        />
      </button>
    </div>
  </div>
</template>