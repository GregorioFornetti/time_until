<script setup lang="ts">
import BaseModal from './BaseModal.vue'
import { ref } from 'vue';

const props = defineProps<{
  type: 'create' | 'edit'
  show: boolean
  titleInitText?: string
  descriptionInitText?: string
  startDateInit?: string
  endDateInit?: string
  closeModal?: () => void
}>()

const errors = ref({
  title: '',
  endDate: ''
})

const title = ref(props.titleInitText || '')
const description = ref(props.descriptionInitText || '')
const startDate = ref(props.startDateInit || '')
const endDate = ref(props.endDateInit || '')
const formRef = ref<HTMLFormElement | null>(null)

const handleSubmit = () => {
    
    console.log({
        title: title.value,
        description: description.value,
        startDate: startDate.value,
        endDate: endDate.value
    })

    errors.value.title =  !title.value.trim() ? 'Title is required' : ''
    errors.value.endDate = !endDate.value.trim() ? 'End date is required' : ''

    console.log(errors.value)

    if (errors.value.title || errors.value.endDate) return
}
</script>

<template>
    <BaseModal
        :title="props.type === 'create' ? 'Create Event' : 'Edit Event'"
        :show="show"
        :closeModal="closeModal"
    >
        <template #body>
            <form ref="formRef" @submit.prevent="handleSubmit">
                <!-- Title -->
                <div class="mt-4">
                    <label class="block mb-1 text-lg font-medium text-gray-300">
                        Title <span class="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        v-model="title"
                        placeholder="Enter event title"
                        :class="['w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500', errors.title ? 'border-red-500 ring-red-500' : '']"
                    />
                    <p v-if="errors.title" class="mt-1 text-sm text-red-500">{{ errors.title }}</p>
                </div>

                <!-- Description -->
                <div class="mt-4">
                    <label class="block mb-1 text-lg font-medium text-gray-300">
                        Description
                    </label>
                    <textarea
                        v-model="description"
                        rows="3"
                        placeholder="Enter event description"
                        class="w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>

                <!-- Start Date -->
                <div class="mt-4">
                    <label class="block mb-1 text-lg font-medium text-gray-300">
                        Start Date
                    </label>
                    <input
                        v-model="startDate"
                        type="datetime-local"
                        class="px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <!-- End Date -->
                <div class="mt-4">
                    <label class="block mb-1 text-lg font-medium text-gray-300">
                        End Date <span class="text-red-500">*</span>
                    </label>
                    <input
                        type="datetime-local"
                        v-model="endDate"
                        :class="['px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500', errors.endDate ? 'border-red-500 ring-red-500' : '']"
                    />
                    <p v-if="errors.endDate" class="mt-1 text-sm text-red-500">{{ errors.endDate }}</p>
                </div>
            </form>
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
                    type="button" @click="formRef?.requestSubmit()"
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
