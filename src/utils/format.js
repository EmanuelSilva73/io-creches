// Formata uma data ISO (AAAA-MM-DD) para o padrão brasileiro (DD/MM/AAAA)
export function formatDate(value) {
  if (!value) return ''
  const [year, month, day] = value.slice(0, 10).split('-')
  return `${day}/${month}/${year}`
}

// Retorna a data de hoje no formato ISO (AAAA-MM-DD), no fuso local
export function todayISO() {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60000
  return new Date(now.getTime() - offset).toISOString().slice(0, 10)
}

// Idade aproximada em anos e meses, ex.: "1 ano e 6 meses"
export function formatAge(birthDate) {
  if (!birthDate) return ''
  const birth = new Date(`${birthDate}T00:00:00`)
  const now = new Date()
  let months = (now.getFullYear() - birth.getFullYear()) * 12 + now.getMonth() - birth.getMonth()
  if (now.getDate() < birth.getDate()) months -= 1
  if (months < 0) return ''

  const years = Math.floor(months / 12)
  const rest = months % 12
  const parts = []
  if (years) parts.push(`${years} ${years === 1 ? 'ano' : 'anos'}`)
  if (rest || !years) parts.push(`${rest} ${rest === 1 ? 'mês' : 'meses'}`)
  return parts.join(' e ')
}
