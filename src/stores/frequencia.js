import { ref } from 'vue'
import { defineStore } from 'pinia'

import api from '@/services/api'

// Registro de presença diária por turma
export const useFrequenciaStore = defineStore('frequencia', () => {
  const registros = ref([])
  const loading = ref(false)
  const saving = ref(false)

  async function carregar(turmaId, data) {
    loading.value = true
    try {
      registros.value = await api.list('frequencias', { filter: { turmaId, data } })
      return registros.value
    } finally {
      loading.value = false
    }
  }

  // presencas: { [criancaId]: boolean }
  async function salvar(turmaId, data, presencas) {
    saving.value = true
    try {
      for (const [id, presente] of Object.entries(presencas)) {
        const criancaId = Number(id)
        const existente = registros.value.find((r) => r.criancaId === criancaId)
        if (existente) {
          await api.update('frequencias', existente.id, { presente })
        } else {
          await api.create('frequencias', { turmaId, data, criancaId, presente })
        }
      }
      await carregar(turmaId, data)
    } finally {
      saving.value = false
    }
  }

  return { registros, loading, saving, carregar, salvar }
})
