<script setup lang="ts">
import { ref } from 'vue';
import { i18n } from '../../plugins/i18n'

import EventModal from '../modal/EventModal.vue';
import SuccessAlert from '../alerts/SuccessAlert.vue';
import EventCard from '../cards/EventCard.vue';
import AddEventCard from '../cards/AddEventCard.vue';


interface EventInfo {
  title: string
  description?: string
  startDate?: string
  endDate?: string
}


function getEventsFromLocalStorage(): EventInfo[] {
  const eventsJson = localStorage.getItem('events')
  if (!eventsJson) {
    return []
  }
  try {
    return JSON.parse(eventsJson)
  } catch (e) {
    console.error('Failed to parse events from localStorage', e)
    return []
  }
}

function closeModal() {
    showModal.value = false
}

function triggerAlert() {
  showAlert.value = true
}


const events = ref<EventInfo[]>(getEventsFromLocalStorage())
const showModal = ref(true)
const showAlert = ref(false)
const title = ref('')
const description = ref('')
const startDate = ref('')
const endDate = ref('')
</script>

<template>
    <SuccessAlert
        v-model:show="showAlert"
        :message="i18n.t('alert.successMessage')"
        :duration="4000"
        class="mt-4"
    />

    <EventModal
        v-model:title="title"
        v-model:description="description"
        v-model:startDate="startDate"
        v-model:endDate="endDate"

        old-title="AAAAA"
        :show="showModal"
        @update="triggerAlert"
        :closeModal="closeModal"
    />

    <EventCard
        title="Sample Event asdas ds dasd asd asd asd asdasdas asd asd "
        description="This is a sample event description to demonstrate the EventCard component. Testando se aparece o bagulho e ai mermaoooo"
        startDate="2024-07-01"
        endDate="2024-07-02"
    />

    <AddEventCard @click="showModal = true" />
</template>

<style scoped>

</style>
