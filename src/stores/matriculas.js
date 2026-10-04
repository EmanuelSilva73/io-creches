import { computed } from 'vue'
import { defineStore } from 'pinia'

import { useCrud } from './crud'

export const useMatriculasStore = defineStore('matriculas', () => {
  const crud = useCrud('matriculas')

  const pendentes = computed(() => crud.items.value.filter((m) => m.situacao === 'Pendente'))

  return { ...crud, pendentes }
})
