import { onMounted, ref } from 'vue'

import { useNotifyStore } from '@/stores/notify'

// Controla diálogo de formulário e confirmação de exclusão das telas de cadastro
export function useCrudPage(store, emptyItem, { label = 'Registro' } = {}) {
  const notify = useNotifyStore()

  const search = ref('')
  const dialog = ref(false)
  const confirmDialog = ref(false)
  const editing = ref(emptyItem())
  const toDelete = ref(null)

  onMounted(() => store.fetchAll())

  function openNew() {
    editing.value = emptyItem()
    dialog.value = true
  }

  function openEdit(item) {
    editing.value = { ...item }
    dialog.value = true
  }

  async function save() {
    try {
      const isNew = !editing.value.id
      await store.save(editing.value)
      dialog.value = false
      notify.notify(`${label} ${isNew ? 'cadastrado(a)' : 'atualizado(a)'} com sucesso.`)
    } catch (error) {
      notify.notify(error.message, 'error')
    }
  }

  function askDelete(item) {
    toDelete.value = item
    confirmDialog.value = true
  }

  async function confirmDelete() {
    try {
      await store.remove(toDelete.value.id)
      confirmDialog.value = false
      notify.notify(`${label} excluído(a).`)
    } catch (error) {
      notify.notify(error.message, 'error')
    }
  }

  return {
    search,
    dialog,
    confirmDialog,
    editing,
    toDelete,
    openNew,
    openEdit,
    save,
    askDelete,
    confirmDelete,
  }
}
