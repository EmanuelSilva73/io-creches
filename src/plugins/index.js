import pinia from './pinia'
import router from '@/router'
import vuetify from './vuetify'

// Registra todos os plugins da aplicação em um único lugar
export function registerPlugins(app) {
  app.use(pinia)
  app.use(router)
  app.use(vuetify)
}
