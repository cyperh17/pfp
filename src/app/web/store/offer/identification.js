import R from 'ramda'
import identification from '../../api/identification'

import { RESET } from './reset'
import { prefix as folderPrefix } from './_prefix'

const prefix = folderPrefix + 'IDENTIFICATION/'

const SEARCH = prefix + 'SEARCH'
const REMOVE = prefix + 'REMOVE'

const initState = {
  loading: false,
  error: false,
  data: []
}

/**
 * Редюсер для поиска клиента
 */
export default (state = initState, { type, payload }) => {  // NOSONAR
  switch (type) {
    case SEARCH + '_PENDING': return R.merge(state, { loading: true, error: false })
    case SEARCH + '_FULFILLED':
    case SEARCH: return R.merge(state, { ...payload, loading: false })
    case REMOVE: return initState
    case RESET: return initState
    default: return state
  }
}

/**
 * Поиск клиента
 */
export const searchClients = payload => ({
  type: SEARCH,
  payload: identification(payload)
})

/**
 * Удалить список найденных клиентов
 */
export const removeClients = () => ({ type: REMOVE })
