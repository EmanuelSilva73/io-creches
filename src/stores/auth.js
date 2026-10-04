import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'io-creches:usuario'

// Autenticação provisória (sem backend): qualquer e-mail/senha entra.
// Substituir pela autenticação real quando a API estiver disponível.
export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? 'null'))

  const isAuthenticated = computed(() => !!user.value)

  async function login({ email }) {
    user.value = { nome: 'Usuário de teste', email }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user.value))
  }

  function logout() {
    user.value = null
    sessionStorage.removeItem(STORAGE_KEY)
  }

  return { user, isAuthenticated, login, logout }
})
