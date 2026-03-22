<script setup lang="ts">
import { watch, onUnmounted } from 'vue'

const props = defineProps<{
  title: string
  show: boolean
  closeModal?: () => void
}>()

function close() {
  props.closeModal?.()
}

// Lock / unlock body scroll
watch(
  () => props.show,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
  { immediate: true }
)

// Safety cleanup if component unmounts while open
onUnmounted(() => {
  document.body.style.overflow = ''
})

</script>

<template>
  <Teleport v-if="show" to="body">
    <!-- Overlay -->
    <div
      class="fixed inset-0 z-50 bg-black/20 overflow-y-auto"
      @click="close"
    >
      <!-- Center wrapper -->
      <div class="min-h-full flex items-center justify-center p-4">
        
        <!-- Modal -->
        <div
          class="w-full max-w-5xl bg-white rounded-lg shadow dark:bg-gray-700 max-h-[90vh] flex flex-col"
          @click.stop
        >
          <!-- Header -->
          <div class="flex items-center justify-between p-4 border-b dark:border-gray-600">
            <h2 class="text-3xl font-semibold text-gray-900 dark:text-white">
              {{ title }}
            </h2>

            <button
              v-if="closeModal"
              type="button"
              class="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              @click="close"
            >
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </button>
          </div>

          <!-- Scrollable body -->
          <div class="p-4 overflow-y-auto">
            <slot name="body" />
          </div>

          <!-- Footer -->
          <div class="p-4 border-t dark:border-gray-600">
            <slot name="footer" />
          </div>

        </div>
      </div>
    </div>
  </Teleport>
</template>
