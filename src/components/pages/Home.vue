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
const showModal = ref(false)
const showAlert = ref(false)
const title = ref('')
const description = ref('')
const startDate = ref('')
const endDate = ref('')
const oldTitle = ref('')
</script>

<template>

    <div class="flex flex-wrap gap-6 mt-8 p-12 justify-center">
        <EventCard
            v-for="event of events"
            :title="event.title"
            :description="event.description"
            :startDate="event.startDate"
            :endDate="event.endDate"
            @edit="() => {
              console.log(event.startDate)
              title = event.title
              description = event.description || ''
              startDate = event.startDate || ''
              endDate = event.endDate || ''
              oldTitle = event.title
              showModal = true
            }"
        />

        <AddEventCard 
            @click="() => {
              title = ''
              description = ''
              startDate = ''
              endDate = ''
              oldTitle = ''
              showModal = true
            }" 
        />
    </div>



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

        :old-title="oldTitle"
        :show="showModal"
        @update="triggerAlert"
        :closeModal="closeModal"
    />
</template>

<style scoped>

</style>
