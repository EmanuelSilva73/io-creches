// Regras de validação reutilizáveis nos formulários do Vuetify
export const required = (value) =>
  (value !== null && value !== undefined && value !== '') || 'Campo obrigatório'

export const email = (value) => !value || /.+@.+\..+/.test(value) || 'E-mail inválido'

export const positive = (value) => Number(value) > 0 || 'Informe um número maior que zero'
