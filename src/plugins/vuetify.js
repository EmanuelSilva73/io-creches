import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import { pt } from 'vuetify/locale'

export const THEME_STORAGE_KEY = 'io-creches:tema'

const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)

// Componentes e diretivas são importados automaticamente pelo vite-plugin-vuetify
const vuetify = createVuetify({
  locale: {
    locale: 'pt',
    fallback: 'pt',
    messages: { pt },
  },

  date: {
    locale: { pt: 'pt-BR' },
  },

  theme: {
    defaultTheme: savedTheme === 'dark' ? 'dark' : 'light',

    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1E88E5',
          secondary: '#7E57C2',
          accent: '#26A69A',
          success: '#43A047',
          warning: '#FB8C00',
          error: '#E53935',
          background: '#F5F7FA',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#64B5F6',
          secondary: '#B39DDB',
          accent: '#4DB6AC',
          success: '#66BB6A',
          warning: '#FFA726',
          error: '#EF5350',
        },
      },
    },
  },

  defaults: {
    VTextField: { variant: 'outlined', density: 'comfortable' },
    VSelect: { variant: 'outlined', density: 'comfortable' },
    VAutocomplete: { variant: 'outlined', density: 'comfortable' },
    VTextarea: { variant: 'outlined', density: 'comfortable' },
    VCard: { rounded: 'lg' },
  },
})

export default vuetify
