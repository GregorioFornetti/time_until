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
    class="group relative rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
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
      <span v-if="startDate">Start: {{ formatDate(startDate) }}</span>
      <span v-if="endDate" class="ml-2">
        End: {{ formatDate(endDate) }}
      </span>
    </div>

    <div
      class="absolute bottom-3 right-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100"
    >
      <button
        @click="$emit('edit')"
        class="rounded-lg p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-gray-700 dark:text-gray-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 5h2M12 20h9M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z"
          />
        </svg>
      </button>
      <button
        @click="$emit('delete')"
        class="rounded-lg p-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/40 dark:hover:bg-red-900/60"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-red-600 dark:text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 7h12M9 7V4h6v3m-7 4v6m4-6v6m5 0H7a2 2 0 01-2-2V7h14v10a2 2 0 01-2 2z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>