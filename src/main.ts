import { createApp } from 'vue'
import App from './App.vue'
import i18n from './plugins/i18n';
import './index.css'
import './plugins/marked_config'
import './plugins/fontawessome'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { router } from './plugins/router'

const app = createApp(App);
app.use(i18n);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
