<script setup lang="ts">
import BaseModal from './BaseModal.vue'

const props = defineProps<{
  type: 'create' | 'edit'
  show: boolean
  titleInitText?: string
  descriptionInitText?: string
  startDateInit?: string
  endDateInit?: string
  closeModal?: () => void
}>()
</script>

<template>
    <BaseModal
        :title="props.type === 'create' ? 'Create Event' : 'Edit Event'"
        :show="show"
        :closeModal="closeModal"
    >
        <template #body>
            <!-- Title -->
            <div>
                <label class="block mb-1 text-lg font-medium text-gray-300">
                    Title
                </label>
                <input
                    type="text"
                    :value="titleInitText"
                    placeholder="Enter event title"
                    class="w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <!-- Description -->
            <div>
                <label class="block mb-1 text-lg font-medium text-gray-300">
                    Description
                </label>
                <textarea
                    :value="descriptionInitText"
                    rows="3"
                    placeholder="Enter event description"
                    class="w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
            </div>

            <!-- Start Date -->
            <div>
                <label class="block mb-1 text-lg font-medium text-gray-300">
                    Start Date
                </label>
                <input
                    type="datetime-local"
                    :value="startDateInit"
                    class="px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <!-- End Date -->
            <div>
                <label class="block mb-1 text-lg font-medium text-gray-300">
                    End Date
                </label>
                <input
                    type="datetime-local"
                    :value="endDateInit"
                    class="px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
        </template>

        <template #footer>
             <div class="flex justify-end gap-3">
                <button
                    type="button"
                    @click="closeModal?.()"
                    class="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition"
                >
                    {{ props.type === 'create' ? 'Create' : 'Save' }}
                </button>
            </div>
        </template>
    </BaseModal>
</template>

<style scoped>

</style>
