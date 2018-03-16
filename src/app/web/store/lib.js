import { LibService } from '../services'

const prefix = 'LIB/'

const LOAD = prefix + 'LOAD'

/**
 * Редюсер для справочников.
 * Обрабатывает справочники на основе имени
 */
export default lib => (state = [], { type, payload, meta = {} }) => {
  if (lib !== meta.lib) return state

  switch (type) {
    case LOAD + '_FULFILLED':
    case LOAD: return payload
    default: return state
  }
}

/**
 * Загрузить справочник
 * @param {string} lib название справочника
 */
export const load = lib => ({
  type: LOAD,
  payload: new LibService(lib).readAll(),
  meta: { lib }
})
