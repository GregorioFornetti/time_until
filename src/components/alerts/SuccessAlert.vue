<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue"

const props = defineProps<{
  message: string
  duration: number
  show: boolean
}>()

const emit = defineEmits(["update:show"])

const visible = ref(props.show)
let timer: number | undefined

const close = () => {
  visible.value = false
  emit("update:show", false)
}

const startTimer = () => {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      close()
    }, props.duration)
  }
}

watch(() => props.show, (newVal) => {
  visible.value = newVal
  if (newVal) {
    clearTimeout(timer)
    startTimer()
  }
})

onMounted(() => {
  if (visible.value) startTimer()
})

onBeforeUnmount(() => {
  clearTimeout(timer)
})
</script>

<template>
  <transition
    enter-active-class="transition ease-out duration-300"
    leave-active-class="transition ease-in duration-200"
    enter-from-class="opacity-0 -translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div
      v-if="visible"
      class="fixed top-5 left-1/2 z-50 -translate-x-1/2"
    >
      <div
        class="flex items-center justify-between gap-3 rounded-xl border border-green-300 bg-green-100 px-4 py-3 text-green-800 shadow-lg w-auto max-w-md"
      >
        <span class="text-sm font-medium">
          {{ message }}
        </span>

        <button
          @click="close"
          class="text-green-700 hover:text-green-900 transition"
        >
          ✕
        </button>
      </div>
    </div>
  </transition>
</template>