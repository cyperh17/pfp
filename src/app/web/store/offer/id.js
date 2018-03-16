import { OfferService } from '../../services'

import { RESET } from './reset'
import { prefix as folderPrefix } from './_prefix'

const prefix = folderPrefix + 'ID/'

const SAVE = prefix + 'SAVE'
const REMOVE = prefix + 'REMOVE'

/**
 * Редюсер для идентификатора ПФП
 */
export default (state = null, { type, payload }) => {  // NOSONAR
  switch (type) {
    case SAVE + '_FULFILLED':
    case SAVE: return payload.id || state
    case REMOVE: return null
    case RESET: return null
    default: return state
  }
}

/**
 * Создает ПФП и сохраняет его id
 * @param {object} payload параметры клиента
 */
export const saveId = payload => ({
  type: SAVE,
  payload: new OfferService().create(payload)
})

/**
 * Удалить id ПФП
 */
export const removeId = () => ({ type: REMOVE })
