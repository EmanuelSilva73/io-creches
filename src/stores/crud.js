import { ref } from 'vue'

import api from '@/services/api'

// Estado e ações comuns (listar, salvar, excluir) para stores de cadastro
export function useCrud(collection) {
  const items = ref([])
  const loading = ref(false)
  const saving = ref(false)
  const loaded = ref(false)

  async function fetchAll({ force = false } = {}) {
    if (loaded.value && !force) return items.value
    loading.value = true
    try {
      items.value = await api.list(collection)
      loaded.value = true
      return items.value
    } finally {
      loading.value = false
    }
  }

  async function save(data) {
    saving.value = true
    try {
      if (data.id) {
        const updated = await api.update(collection, data.id, data)
        const index = items.value.findIndex((item) => item.id === data.id)
        if (index !== -1) items.value[index] = updated
        return updated
      }
      const created = await api.create(collection, data)
      items.value.push(created)
      return created
    } finally {
      saving.value = false
    }
  }

  async function remove(id) {
    saving.value = true
    try {
      await api.remove(collection, id)
      items.value = items.value.filter((item) => item.id !== id)
    } finally {
      saving.value = false
    }
  }

  function findById(id) {
    return items.value.find((item) => item.id === id)
  }

  return { items, loading, saving, loaded, fetchAll, save, remove, findById }
}
