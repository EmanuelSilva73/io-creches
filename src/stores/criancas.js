import { computed } from 'vue'
import { defineStore } from 'pinia'

import { useCrud } from './crud'

export const useCriancasStore = defineStore('criancas', () => {
  const crud = useCrud('criancas')

  const ativas = computed(() => crud.items.value.filter((crianca) => crianca.ativo))

  function porTurma(turmaId) {
    return ativas.value.filter((crianca) => crianca.turmaId === turmaId)
  }

  return { ...crud, ativas, porTurma }
})
