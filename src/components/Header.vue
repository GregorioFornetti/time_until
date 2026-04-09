<script setup lang="ts">
import { watch, ref } from 'vue'
import { i18n } from '../plugins/i18n'
import { RouterLink } from 'vue-router'
import { router } from '../plugins/router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import SuccessAlert from './alerts/SuccessAlert.vue'
import { updateDocumentTitle } from '../plugins/router'
import { useRoute } from 'vue-router'

const isDark = ref(localStorage.theme === 'dark')
const menuOpen = ref(false)
const showAlert = ref(false)
const successMessage = ref('')

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function languageChanged() {
  localStorage.setItem('locale', i18n.locale.value)
  updateDocumentTitle(router.currentRoute.value)
  documentTitle.value = document.title
}

function copyUrlToClipboard() {
  const url = window.location.href
  navigator.clipboard.writeText(url).then(() => {
    successMessage.value = i18n.t('alert.copySuccessMessage')
    showAlert.value = true
  })
}

const route = useRoute()
const documentTitle = ref(document.title)

watch(
  () => route.fullPath,
  () => {
    documentTitle.value = document.title
  }
)
</script>

<template>
  <header class="fixed top-0 w-full z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex h-16 items-center justify-between">

        <div class="w-1/4">
          <RouterLink v-if="router.currentRoute.value.path !== '/'" to="/" >
            <FontAwesomeIcon icon="fa-solid fa-chevron-left" class="text-gray-700 dark:text-gray-200 btn_hover" />
          </RouterLink>
          <button @click="copyUrlToClipboard" v-if="router.currentRoute.value.path !== '/'" to="/">
            <FontAwesomeIcon icon="fa-solid fa-link" class="text-gray-700 dark:text-gray-200 btn_hover" />
          </button>
        </div>

        <nav class="hidden md:block flex-1 min-w-0 text-xl font-medium dark:text-gray-200 truncate text-center">
          {{ documentTitle }}
        </nav>

        <div class="hidden md:flex items-center space-x-4 w-1/4 justify-end">

          <button @click="toggleTheme" class="btn_hover" aria-label="Toggle dark mode">
            <span v-if="isDark">
              <font-awesome-icon icon="fa-solid fa-moon" class="text-gray-500" />
            </span>
            <span v-else>
              <font-awesome-icon icon="fa-solid fa-sun" class="text-orange-400" />
            </span>
          </button>

          <select @change="languageChanged" v-model="$i18n.locale" class="header_select">
            <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
          </select>
        </div>

        <button @click="toggleMenu" class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <font-awesome-icon icon="fa-solid fa-bars" class="text-gray-700 dark:text-gray-200" />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="menuOpen" class="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <nav class="flex flex-col px-4 py-4 space-y-4">
        <span class="text-xl font-medium dark:text-gray-200 text-center">{{ documentTitle }}</span>
        <div class="flex items-center justify-between">
          <button @click="toggleTheme" class="btn_hover">
            <span v-if="isDark">
              <font-awesome-icon icon="fa-solid fa-moon" class="text-gray-500" />
            </span>
            <span v-else>
              <font-awesome-icon icon="fa-solid fa-sun" class="text-orange-400" />
            </span>
          </button>

          <select @change="languageChanged" v-model="$i18n.locale" class="header_select">
            <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
          </select>
        </div>
      </nav>
    </div>
  </header>

  <SuccessAlert
    v-model:show="showAlert"
    :message="successMessage"
    :duration="4000"
  />
</template>

<style scoped>
.nav-link {
  @apply text-gray-700 dark:text-gray-200
         hover:text-blue-600 dark:hover:text-blue-400
         transition-colors cursor-pointer
         text-lg;
}

.router-link-exact-active {
  @apply font-bold text-blue-600 dark:text-blue-400;
}

.nav-link.active {
  @apply font-bold text-blue-600 dark:text-blue-400;
}

.header_select {
  @apply bg-transparent border border-gray-300 dark:border-gray-600
         rounded-md px-2 py-1 text-sm
         dark:text-white dark:bg-gray-900
}

.btn_hover {
  @apply p-2 rounded-lg
         hover:bg-gray-100 dark:hover:bg-gray-800;
}
</style>