<script setup lang="ts">
import { ref } from 'vue';
import EventModal from '../modal/EventModal.vue';
import SuccessAlert from '../SuccessAlert.vue';
import { i18n } from '../../plugins/i18n'
import EventCard from '../EventCard.vue';

const showModal = ref(true)
const showAlert = ref(false)

function closeModal() {
    showModal.value = false
}

const triggerAlert = () => {
  showAlert.value = true
}
</script>

<template>
    <SuccessAlert
        v-model:show="showAlert"
        :message="i18n.t('alert.successMessage')"
        :duration="4000"
        class="mt-4"
    />

    <EventModal
        type="create"
        old-title="AAAAA"
        :show="showModal"
        @update="triggerAlert"
        :closeModal="closeModal"
    />

    <EventCard
        title="Sample Event"
        description="This is a sample event description to demonstrate the EventCard component."
        startDate="2024-07-01"
        endDate="2024-07-02"
    />
</template>

<style scoped>

</style>
