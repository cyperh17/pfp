import R from 'ramda'

import {
  InfoService,
  TargetService
} from '../../services'

import { RESET } from './reset'
import { prefix as folderPrefix } from './_prefix'

const prefix = folderPrefix + 'INFO/'

const SAVE = prefix + 'SAVE'
const REMOVE = prefix + 'REMOVE'

const SAVE_TARGET = prefix + 'SAVE_TARGET'
const REMOVE_TARGET = prefix + 'REMOVE_TARGET'

/**
 * Редюсер для финансовой информации
 */
export default (state = null, { type, payload, meta }) => {  // NOSONAR
  switch (type) {
    case SAVE + '_FULFILLED': return R.merge(payload, meta)
    case REMOVE: return null
    case SAVE_TARGET + '_FULFILLED': {
      // При сохранении список финансовых целей объединяется
      // с ответом сервера (id сохраненной финансовой цели) поидексно
      const targets = R.defaultTo([], payload).map(
        (item, index) => R.merge(item, meta.finTarget[index])
      )
      return R.assoc('finTarget', targets, state || {})
    }
    case REMOVE_TARGET: {
      // Из списка финансовых целей удаляется объект с соответствующим id
      const targets = R.reject(
        R.propEq('id', payload),
        R.prop('finTarget', state)
      )
      return R.assoc('finTarget', targets, state || {})
    }
    case RESET: return null
    default: return state
  }
}

/**
 * Сохранить финансовую информацию
 * @param {object} obj данны формы финансовой информации
 * @param {number} obj.offerId идентификатор ПФП
 */
export const saveInfo = ({ offerId, finTarget, ...payload }) => {
  const infoAPI = new InfoService(offerId)
  const info = payload.id
    ? infoAPI.update('', payload)
    : infoAPI.create(payload)
  return { type: SAVE, payload: info, meta: payload }
}

/**
 * Сохранить финансовые  цели
 * @param {object} obj данные формы финансовой информации
 * @param {number} obj.offerId идентификатор ПФП
 */
export const saveInfoTarget = ({ offerId, ...payload }) => {
  const targetAPI = new TargetService(offerId || '')
  // По очереди сохраняем все финансовые цели,
  // выбирая функцию сохранения по наличию id
  const savedTarget = Promise.all(
    R.propOr([], 'finTarget', payload).map(
      item => item.id
        ? targetAPI.update(item.id, item)
        : targetAPI.create(item)
    )
  )
  return { type: SAVE_TARGET, payload: savedTarget, meta: payload }
}

/**
 * Удалить финансовую информацию
 */
export const removeInfo = () => ({ type: REMOVE })

/**
 * Удалить финансовую цель
 * @param {number} payload идентификатор финансовой цели
 */
export const removeInfoTarget = payload => {
  const target = Promise.resolve()
    .then(() => new TargetService().delete(payload))
    .then(() => payload)
  return { type: REMOVE_TARGET, payload: target }
}
