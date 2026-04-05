<script setup lang="ts">
import { router } from '../../plugins/router';
import { i18n } from '../../plugins/i18n';

const props = defineProps<{
  title: string
  description?: string
  startDate?: string
  endDate?: string
}>()

function formatDate(date: string | Date) {
  if (!date) return ""
  return new Date(date).toLocaleDateString(i18n.locale.value)
}

function redirectToEventPage() {
  const queryParams = new URLSearchParams({
      title: props.title,
      description: props.description || '',
      startDate: props.startDate || '',
      endDate: props.endDate || ''
  }).toString()
  router.push(`/event?${queryParams}`)
}

</script>

<template>
  <div
    class="group relative p-4 w-64 h-56 rounded-2xl border-2 border-gray-300 bg-white cursor-pointer transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-500 dark:hover:bg-gray-700"
    @click="redirectToEventPage"
  >
    <h3
      class="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 h-[3.5rem]"
    >
      {{ title }}
    </h3>
    <p
      v-if="description"
      class="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3 h-[3.75rem]"
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
      class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100"
    >
      <button
        @click.stop="$emit('edit')"
        class="rounded-lg px-2 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600"
      >
        <font-awesome-icon
          icon="fa-solid fa-pen"
          class="text-sm text-gray-700 dark:text-gray-200"
        />
      </button>
      <button
        @click.stop="$emit('delete')"
        class="rounded-lg px-2 py-1 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-700"
      >
        <font-awesome-icon
          icon="fa-solid fa-trash"
          class="text-sm text-red-600 dark:text-red-400"
        />
      </button>
    </div>
  </div>
</template>