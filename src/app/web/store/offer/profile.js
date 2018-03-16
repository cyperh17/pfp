import R from 'ramda'

import { ProfileService } from '../../services'

import { RESET } from './reset'
import { prefix as folderPrefix } from './_prefix'

const prefix = folderPrefix + 'PROFILE/'

const SAVE = prefix + 'SAVE'
const REMOVE = prefix + 'REMOVE'

/**
 * Редюсер риск-профиля
 */
export default (state = null, { type, payload }) => {  // NOSONAR
  switch (type) {
    case SAVE + '_FULFILLED':
    case SAVE: return payload
    case REMOVE: return null
    case RESET: return null
    default: return state
  }
}

/**
 * Сохранить или обновить риск-профиль
 * @param {object} obj данные формы риск-профиля
 * @param {number} obj.offerId идентификатор ПФП
 * @param {number} obj.idQuestionnaire идентификатор опросника
 * @param {boolean} obj.update обновить или создать результаты опроса
 */
export const saveProfile = ({ offerId, idQuestionnaire, update, ...payload }) => {
  const profileAPI = new ProfileService(offerId)
  const profile = update
    ? profileAPI.update(
      idQuestionnaire,
      R.values(
        R.mapObjIndexed(
          (value, key) => ({ question: key.split('_')[1], answer: value })
        )
      )
    )
    : profileAPI.create({ answers: R.values(payload) }, idQuestionnaire)
  return { type: SAVE, payload: profile }
}

/**
 * Удалить данные риск-профиля
 */
export const removeProfile = () => ({ type: REMOVE })
