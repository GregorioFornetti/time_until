<script setup lang="ts">
import BaseModal from './BaseModal.vue'
import { ref } from 'vue';
import { router } from '../../plugins/router';
import { i18n } from '../../plugins/i18n';

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

    errors.value.title =  !title.value.trim() ? i18n.t('modal.titleRequiredError') : ''
    errors.value.endDate = !endDate.value.trim() ? i18n.t('modal.endDateRequiredError') : ''

    if (errors.value.title || errors.value.endDate) return

    if (startDate.value && endDate.value && new Date(startDate.value) > new Date(endDate.value)) {
        errors.value.endDate = i18n.t('modal.endDateAfterStartError')
        return
    }

    // Redirect to event page with event data as query params (for demo purposes)
    const queryParams = new URLSearchParams({
        title: title.value,
        description: description.value,
        startDate: startDate.value,
        endDate: endDate.value
    }).toString()
    router.push(`/event?${queryParams}`)
}
</script>

<template>
    <BaseModal
        :title="props.type === 'create' ? i18n.t('modal.createTitle') : i18n.t('modal.editTitle')"
        :show="show"
        :closeModal="closeModal"
    >
        <template #body>
            <form ref="formRef" @submit.prevent="handleSubmit">
                <!-- Title -->
                <div class="mt-4">
                    <label class="block mb-1 text-lg font-medium text-gray-300">
                        {{ $t('modal.title') }} <span class="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        v-model="title"
                        :placeholder="i18n.t('modal.titlePlaceholder')"
                        :class="['w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500', errors.title ? 'border-red-500 ring-red-500' : '']"
                    />
                    <p v-if="errors.title" class="mt-1 text-sm text-red-500">{{ errors.title }}</p>
                </div>

                <!-- Description -->
                <div class="mt-4">
                    <label class="block mb-1 text-lg font-medium text-gray-300">
                        {{ $t('modal.description') }}
                    </label>
                    <textarea
                        v-model="description"
                        rows="3"
                        :placeholder="i18n.t('modal.descriptionPlaceholder')"
                        class="w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>

                <!-- Start Date -->
                <div class="mt-4">
                    <label class="block mb-1 text-lg font-medium text-gray-300">
                        {{ $t('modal.startDate') }}
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
                        {{ $t('modal.endDate') }} <span class="text-red-500">*</span>
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
                    {{ i18n.t('modal.cancel') }}
                </button>
                <button
                    type="button" @click="formRef?.requestSubmit()"
                    class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition"
                >
                    {{ props.type === 'create' ? i18n.t('modal.create') : i18n.t('modal.save') }}
                </button>
            </div>
        </template>
    </BaseModal>
</template>

<style scoped>

</style>
