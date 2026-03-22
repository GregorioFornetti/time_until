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

router.afterEach((to) => {
  const siteName = i18n.t('router.title') as string
  
  if (to.path === '/event' && to.query.name) {
    const name = (to.query.name as string).toLowerCase()
    document.title = `${siteName} ${name}`
  } else {
    document.title = `${siteName} ?`
  }
})