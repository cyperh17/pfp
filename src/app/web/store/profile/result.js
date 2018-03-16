import { CalculateService } from '../../services'

import { prefix as folderPrefix } from './_prefix'

const prefix = folderPrefix + 'RESULT/'

const ADD = prefix + 'ADD'
const DEL = prefix + 'DEL'

/**
 * Редюсер результатаов расчета
 */
export default (state = {}, { type, payload }) => {  // NOSONAR
  switch (type) {
    case ADD + '_FULFILLED':
    case ADD: return payload
    case DEL: return {}
    default: return state
  }
}

/**
 * Расчитать ПФП
 * @param {number} obj.offerId идентификатор ПФП
 */
export const addResult = ({ offerId, values }) => ({
  type: ADD,
  payload: new CalculateService(offerId).create(values)
})

/**
 * Удалить результаты расчета
 */
export const delResult = () => ({ type: DEL })
