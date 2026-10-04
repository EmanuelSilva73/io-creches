import { mockAdapter } from './mockAdapter'

/**
 * Camada de serviços da aplicação.
 *
 * As páginas e stores usam SOMENTE este módulo para acessar dados. Hoje ele
 * delega para um adaptador em memória (mockAdapter). Para integrar um backend
 * real (por exemplo, Directus ou uma API REST própria), basta criar outro
 * adaptador com a mesma interface e trocá-lo aqui:
 *
 *   list(collection, { filter })  -> Promise<Array>
 *   get(collection, id)           -> Promise<Object>
 *   create(collection, data)      -> Promise<Object>
 *   update(collection, id, data)  -> Promise<Object>
 *   remove(collection, id)        -> Promise<void>
 */
const adapter = mockAdapter

export const api = {
  list: (collection, params) => adapter.list(collection, params),
  get: (collection, id) => adapter.get(collection, id),
  create: (collection, data) => adapter.create(collection, data),
  update: (collection, id, data) => adapter.update(collection, id, data),
  remove: (collection, id) => adapter.remove(collection, id),
}

export default api
