import { defineStore } from 'pinia'

import { useCrud } from './crud'

export const useResponsaveisStore = defineStore('responsaveis', () => useCrud('responsaveis'))
