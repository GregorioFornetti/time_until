
import { createI18n } from 'vue-i18n';

import en from '../translations/en.json';
import pt_br from '../translations/pt_br.json';


const I18n = createI18n({
  // For use with Vue Composition API
  legacy: false,
  locale: 'PT-BR',
  messages: {
    'PT-BR': pt_br,
    'EN': en
  }
});

export const i18n = I18n.global;

export default I18n;