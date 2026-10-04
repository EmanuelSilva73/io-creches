import { computed } from 'vue'
import { useTheme } from 'vuetify'

import { THEME_STORAGE_KEY } from '@/plugins/vuetify'

// Alterna entre tema claro e escuro e lembra a escolha no navegador
export function useAppTheme() {
  const theme = useTheme()

  const isDark = computed(() => theme.global.current.value.dark)

  function setTheme(name) {
    theme.change(name)
    localStorage.setItem(THEME_STORAGE_KEY, name)
  }

  function toggleTheme() {
    setTheme(isDark.value ? 'light' : 'dark')
  }

  return { isDark, setTheme, toggleTheme }
}
