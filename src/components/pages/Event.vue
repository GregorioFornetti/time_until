<script setup lang="ts">
import { i18n } from '../../plugins/i18n'
import { router } from '../../plugins/router'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const title = (router.currentRoute.value.query.title as string) || 'No Title'
const description = router.currentRoute.value.query.description as string
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

  return `${years}${i18n.t('eventPage.yearAbv')} ${months}${i18n.t('eventPage.monthAbv')} ${days}${i18n.t('eventPage.dayAbv')} ${hours}${i18n.t('eventPage.hourAbv')} ${minutes}${i18n.t('eventPage.minuteAbv')} ${seconds}${i18n.t('eventPage.secondAbv')}`
}

function getTotalYears(ms: number) {
  const seconds = Math.floor(ms / 1000)
  const years = seconds / (365 * 24 * 3600)
  return formatNumber(Number(years.toFixed(2)))
}

function getTotalMonths(ms: number) {
  const seconds = Math.floor(ms / 1000)
  const months = seconds / (30 * 24 * 3600)
  return formatNumber(Number(months.toFixed(2)))
}

function getTotalDays(ms: number) {
  const seconds = Math.floor(ms / 1000)
  const days = seconds / (24 * 3600)
  return formatNumber(Number(days.toFixed(2)))
}

function getTotalHours(ms: number) {
  const seconds = Math.floor(ms / 1000)
  const hours = Math.floor(seconds / 3600)
  return formatNumber(Number(hours.toFixed(1)))
}

function getTotalMinutes(ms: number) {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  return formatNumber(minutes)
}

function getTotalSeconds(ms: number) {
  const seconds = Math.floor(ms / 1000)
  return formatNumber(seconds)
}

function formatNumber(num: number) {
  return new Intl.NumberFormat(i18n.locale.value).format(num)
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-8 text-center
              bg-white text-gray-900
              dark:bg-gray-900 dark:text-gray-100
              transition-colors duration-500">

    <!-- Title -->
    <div class="mb-6">
      <h1 class="text-3xl font-bold mb-3">{{ title }}</h1>
      <p class="text-gray-600 dark:text-gray-300" v-if="description">{{ description }}</p>
    </div>

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
        <span>{{ $t('eventPage.sync') }}</span>
      </div>
    </div>

    <!-- Progress -->
    <div v-if="!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())" class="mb-8">
      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-5 overflow-hidden">
        <div
          class="h-full bg-blue-500 transition-all duration-500"
          :style="{ width: progress * 100 + '%' }"
        ></div>
      </div>
      <p class="mt-2 font-medium">
        {{ formatNumber(Number((progress * 100).toFixed(2))) }}%
      </p>
    </div>

    <div
      class="mt-8 grid gap-6 justify-items-center"
      :class="[
        (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime()))
          ? 'grid-cols-1 md:grid-cols-2'
          : 'grid-cols-1'
      ]"
    >

      <!-- Elapsed -->
      <div class="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 transition-colors duration-500" v-if="!isNaN(startDate.getTime())">
        <h2 class="text-xl font-semibold mb-1">{{ $t('eventPage.startDate') }}</h2>
        <p class="mb-4 text-gray-600 dark:text-gray-300">{{ startDate.toLocaleString(i18n.locale.value) }}</p>

        <h2 class="text-xl font-semibold mb-3">{{ $t('eventPage.elapsedTime') }}</h2>
        <p class="mb-2 text-gray-600 dark:text-gray-300">{{ formatDuration(elapsedTime) }} {{ $t('eventPage.elapsed') }}</p>
        <p class="mb-2 text-gray-600 dark:text-gray-300 font-medium" v-if="!isNaN(endDate.getTime())">
          {{ formatNumber(Number(((elapsedTime / totalTime) * 100).toFixed(2))) }}%
        </p>

        <p class="text-lg font-semibold mt-4 mb-1">{{ $t('eventPage.totalElapsedTime') }}</p>

        <div class="text-gray-600 dark:text-gray-300 space-y-1">
          <p><strong>{{ getTotalYears(elapsedTime) }}</strong> {{ $t('eventPage.years') }}</p>
          <p><strong>{{ getTotalMonths(elapsedTime) }}</strong> {{ $t('eventPage.months') }}</p>
          <p><strong>{{ getTotalDays(elapsedTime) }}</strong> {{ $t('eventPage.days') }}</p>
          <p><strong>{{ getTotalHours(elapsedTime) }}</strong> {{ $t('eventPage.hours') }}</p>
          <p><strong>{{ getTotalMinutes(elapsedTime) }}</strong> {{ $t('eventPage.minutes') }}</p>
          <p><strong>{{ getTotalSeconds(elapsedTime) }}</strong> {{ $t('eventPage.seconds') }}</p>
        </div>
      </div>

      <!-- Remaining -->
      <div class="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 transition-colors duration-500" v-if="!isNaN(endDate.getTime())">
        <h2 class="text-xl font-semibold mb-1">{{ $t('eventPage.endDate') }}</h2>
        <p class="mb-4 text-gray-600 dark:text-gray-300">{{ endDate.toLocaleString(i18n.locale.value) }}</p>

        <h2 class="text-xl font-semibold mb-3">{{ $t('eventPage.remainingTime') }}</h2>
        <p class="mb-2 text-gray-600 dark:text-gray-300">{{ formatDuration(remainingTime) }} {{ $t('eventPage.remaining') }}</p>
        <p class="mb-2 text-gray-600 dark:text-gray-300 font-medium" v-if="!isNaN(startDate.getTime())">
          {{ formatNumber(Number(((remainingTime / totalTime) * 100).toFixed(2))) }}%
        </p>

        <p class="text-lg font-semibold mt-4 mb-1">{{ $t('eventPage.totalRemainingTime') }}</p>

        <div class="text-gray-700 dark:text-gray-300 space-y-1">
          <p><strong>{{ getTotalYears(remainingTime) }}</strong> {{ $t('eventPage.years') }}</p>
          <p><strong>{{ getTotalMonths(remainingTime) }}</strong> {{ $t('eventPage.months') }}</p>
          <p><strong>{{ getTotalDays(remainingTime) }}</strong> {{ $t('eventPage.days') }}</p>
          <p><strong>{{ getTotalHours(remainingTime) }}</strong> {{ $t('eventPage.hours') }}</p>
          <p><strong>{{ getTotalMinutes(remainingTime) }}</strong> {{ $t('eventPage.minutes') }}</p>
          <p><strong>{{ getTotalSeconds(remainingTime) }}</strong> {{ $t('eventPage.seconds') }}</p>
        </div>
      </div>

    </div>
  </div>
</template>