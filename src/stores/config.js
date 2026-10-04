import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'io-creches:config'

const defaults = {
  nomeInstituicao: 'Creche Municipal',
  municipio: '',
  anoLetivo: new Date().getFullYear(),
}

// Preferências gerais do sistema, salvas no navegador por enquanto
export const useConfigStore = defineStore('config', () => {
  const config = ref({ ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') })

  watch(config, (value) => localStorage.setItem(STORAGE_KEY, JSON.stringify(value)), {
    deep: true,
  })

  return { config }
})
