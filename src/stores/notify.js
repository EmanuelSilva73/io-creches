import { ref } from 'vue'
import { defineStore } from 'pinia'

// Mensagens rápidas (snackbar) exibidas pelo layout
export const useNotifyStore = defineStore('notify', () => {
  const show = ref(false)
  const text = ref('')
  const color = ref('success')

  function notify(message, type = 'success') {
    text.value = message
    color.value = type
    show.value = true
  }

  return { show, text, color, notify }
})
