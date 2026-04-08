import { createWebHashHistory, createRouter } from 'vue-router'

import Home from '../components/pages/Home.vue'
import Event from '../components/pages/Event.vue'

import { i18n } from './i18n';

const routes = [
  { path: '/', component: Home },
  { path: '/event', component: Event }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export function updateDocumentTitle(to: any) {
  const siteName = i18n.t('router.title') as string
  
  if (to.path === '/event' && to.query.title) {
    const name = (to.query.title as string).toLowerCase()
    document.title = `${siteName} ${name}`
  } else {
    document.title = `${siteName}`
  }
}

router.afterEach(updateDocumentTitle)