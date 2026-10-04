import seed from '@/data/mock'

// Adaptador em memória: simula uma API REST com latência.
// Os dados voltam ao estado inicial ao recarregar a página.

const db = structuredClone(seed)

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms))

function table(collection) {
  if (!db[collection]) throw new Error(`Coleção desconhecida: ${collection}`)
  return db[collection]
}

function nextId(rows) {
  return rows.reduce((max, row) => Math.max(max, row.id), 0) + 1
}

function matches(row, filter = {}) {
  return Object.entries(filter).every(([key, value]) => row[key] === value)
}

export const mockAdapter = {
  async list(collection, { filter } = {}) {
    await delay()
    return structuredClone(table(collection).filter((row) => matches(row, filter)))
  },

  async get(collection, id) {
    await delay()
    const row = table(collection).find((item) => item.id === id)
    if (!row) throw new Error('Registro não encontrado')
    return structuredClone(row)
  },

  async create(collection, data) {
    await delay()
    const rows = table(collection)
    const row = { ...structuredClone(data), id: nextId(rows) }
    rows.push(row)
    return structuredClone(row)
  },

  async update(collection, id, data) {
    await delay()
    const rows = table(collection)
    const index = rows.findIndex((item) => item.id === id)
    if (index === -1) throw new Error('Registro não encontrado')
    rows[index] = { ...rows[index], ...structuredClone(data), id }
    return structuredClone(rows[index])
  },

  async remove(collection, id) {
    await delay()
    const rows = table(collection)
    const index = rows.findIndex((item) => item.id === id)
    if (index !== -1) rows.splice(index, 1)
  },
}
