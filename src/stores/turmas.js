import { defineStore } from 'pinia'

import { useCrud } from './crud'

export const useTurmasStore = defineStore('turmas', () => useCrud('turmas'))
