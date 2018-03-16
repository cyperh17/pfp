import { OfferService } from '../services'

const prefix = 'OFFER_LIST/'

const ADD = prefix + 'ADD'
const DEL = prefix + 'DEL'

/**
 * Редюсер для списка ПФП.
 */
export default (state = {}, { type, payload }) => {
  switch (type) {
    case ADD + '_FULFILLED':
    case ADD: return payload
    case DEL: return {}
    default: return state
  }
}

/**
 * Добавить ПФП в список
 * @param {object} payload параметры фильтрации (см. документацию API)
 */
export const add = payload => ({
  type: ADD,
  payload: new OfferService().readAll(payload)
})

/**
 * Удалить ПФП из списка
 */
export const del = () => ({ type: DEL })
