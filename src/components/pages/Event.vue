<script setup lang="ts">
import { router } from '../../plugins/router'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const title = (router.currentRoute.value.query.title as string) || 'No Title'
const description = (router.currentRoute.value.query.description as string) || 'No Description'
const startDate = new Date(router.currentRoute.value.query.startDate as string)
const endDate = new Date(router.currentRoute.value.query.endDate as string)

const curDate = ref(new Date())
const sync = ref(true)

let interval: any = null

onMounted(() => {
  interval = setInterval(() => {
    if (sync.value) {
      curDate.value = new Date()
    }
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})


const totalTime = computed(() => endDate.getTime() - startDate.getTime())
const elapsedTime = computed(() => curDate.value.getTime() - startDate.getTime())
const remainingTime = computed(() => endDate.getTime() - curDate.value.getTime())

const progress = computed(() => {
  return Math.min(Math.max(elapsedTime.value / totalTime.value, 0), 1)
})


function formatDuration(ms: number) {
  let seconds = Math.floor(ms / 1000)

  const years = Math.floor(seconds / (365 * 24 * 3600))
  seconds %= 365 * 24 * 3600

  const months = Math.floor(seconds / (30 * 24 * 3600))
  seconds %= 30 * 24 * 3600

  const days = Math.floor(seconds / (24 * 3600))
  seconds %= 24 * 3600

  const hours = Math.floor(seconds / 3600)
  seconds %= 3600

  const minutes = Math.floor(seconds / 60)
  seconds %= 60

  return `${years}y ${months}m ${days}d ${hours}h ${minutes}m ${seconds}s`
}

function getTotalYears(ms: number) {
  const seconds = Math.floor(ms / 1000)
  const years = seconds / (365 * 24 * 3600)
  return addDotEveryThreeDigits(years.toFixed(2))
}

function getTotalMonths(ms: number) {
  const seconds = Math.floor(ms / 1000)
  const months = seconds / (30 * 24 * 3600)
  return addDotEveryThreeDigits(months.toFixed(2))
}

function getTotalDays(ms: number) {
  const seconds = Math.floor(ms / 1000)
  const days = seconds / (24 * 3600)
  return addDotEveryThreeDigits(days.toFixed(2))
}

function getTotalHours(ms: number) {
  const seconds = Math.floor(ms / 1000)
  const hours = Math.floor(seconds / 3600)
  return addDotEveryThreeDigits(hours.toFixed(1))
}

function getTotalMinutes(ms: number) {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  return addDotEveryThreeDigits(minutes.toString())
}

function getTotalSeconds(ms: number) {
  const seconds = Math.floor(ms / 1000)
  return addDotEveryThreeDigits(seconds.toString())
}

function addDotEveryThreeDigits(num: string) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-8 text-center
              bg-white text-gray-900
              dark:bg-gray-900 dark:text-gray-100
              transition-colors duration-500">

    <!-- Title -->
    <h1 class="text-3xl font-bold mb-2">{{ title }}</h1>
    <p class="text-gray-600 dark:text-gray-300 mb-6">{{ description }}</p>

    <div class="flex justify-center items-center gap-6 mb-6 flex-wrap">
      <div class="flex items-center gap-2">
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="sync" class="sr-only peer" />

          <div class="w-14 h-8 bg-gray-300 rounded-full 
                      dark:bg-gray-600
                      peer-checked:bg-blue-500
                      transition-colors duration-300">
          </div>

          <div class="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md
                      transform transition-all duration-300
                      peer-checked:translate-x-6">
          </div>
        </label>
        <span>Sync</span>
      </div>
    </div>

    <!-- Progress -->
    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-5 overflow-hidden">
      <div
        class="h-full bg-blue-500 transition-all duration-500"
        :style="{ width: progress * 100 + '%' }"
      ></div>
    </div>
    <p class="mt-2 font-medium">
      {{ (progress * 100).toFixed(2) }}%
    </p>

    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Elapsed -->
      <div class="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 transition-colors duration-500">
        <h2 class="text-xl font-semibold mb-1">Start date</h2>
        <p class="mb-4 text-gray-600 dark:text-gray-300">{{ startDate.toLocaleString() }}</p>

        <h2 class="text-xl font-semibold mb-3">Elapsed Time</h2>
        <p class="mb-2 text-gray-600 dark:text-gray-300">{{ formatDuration(elapsedTime) }} passed</p>
        <p class="mb-2 text-blue-600 font-medium">
          {{ ((elapsedTime / totalTime) * 100).toFixed(2) }}%
        </p>

        <p class="text-lg font-semibold mt-4 mb-1">Total elapsed time</p>

        <div class="text-gray-600 dark:text-gray-300 space-y-1">
          <p><strong>{{ getTotalYears(elapsedTime) }}</strong> years</p>
          <p><strong>{{ getTotalMonths(elapsedTime) }}</strong> months</p>
          <p><strong>{{ getTotalDays(elapsedTime) }}</strong> days</p>
          <p><strong>{{ getTotalHours(elapsedTime) }}</strong> hours</p>
          <p><strong>{{ getTotalMinutes(elapsedTime) }}</strong> minutes</p>
          <p><strong>{{ getTotalSeconds(elapsedTime) }}</strong> seconds</p>
        </div>
      </div>

      <!-- Remaining -->
      <div class="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 transition-colors duration-500">
        <h2 class="text-xl font-semibold mb-1">End date</h2>
        <p class="mb-4 text-gray-600 dark:text-gray-300">{{ endDate.toLocaleString() }}</p>

        <h2 class="text-xl font-semibold mb-3">Remaining Time</h2>
        <p class="mb-2 text-gray-600 dark:text-gray-300">{{ formatDuration(remainingTime) }} remaining</p>
        <p class="mb-2 text-green-600 font-medium">
          {{ ((remainingTime / totalTime) * 100).toFixed(2) }}%
        </p>

        <p class="text-lg font-semibold mt-4 mb-1">Total remaining time</p>

        <div class="text-gray-700 dark:text-gray-300 space-y-1">
          <p><strong>{{ getTotalYears(remainingTime) }}</strong> years</p>
          <p><strong>{{ getTotalMonths(remainingTime) }}</strong> months</p>
          <p><strong>{{ getTotalDays(remainingTime) }}</strong> days</p>
          <p><strong>{{ getTotalHours(remainingTime) }}</strong> hours</p>
          <p><strong>{{ getTotalMinutes(remainingTime) }}</strong> minutes</p>
          <p><strong>{{ getTotalSeconds(remainingTime) }}</strong> seconds</p>
        </div>
      </div>

    </div>
  </div>
</template>