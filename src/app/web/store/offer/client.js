import R from 'ramda'
import { FamilyService } from '../../services'

import { RESET } from './reset'
import { prefix as folderPrefix } from './_prefix'

const prefix = folderPrefix + 'CLIENT/'

const SAVE = prefix + 'SAVE'
const REMOVE = prefix + 'REMOVE'

const SAVE_FAMILY = prefix + 'SAVE_FAMILY'
const REMOVE_FAMILY = prefix + 'REMOVE_FAMILY'

/**
 * Редюсер для работы с формой клиента
 */
export default (state = null, { type, payload, meta }) => {  // NOSONAR
  switch (type) {
    case SAVE: return payload
    case REMOVE: return null
    case SAVE_FAMILY + '_FULFILLED':
    case SAVE_FAMILY: {
      // При сохранении список членов семьи объединяется
      // с ответом сервера (id сохраненного члена семьи) поидексно
      const family = R.defaultTo([], payload).map(
        (item, index) => R.merge(item, meta.family[index])
      )
      return R.assoc('family', family, state || {})
    }
    case REMOVE_FAMILY: {
      // Из списка членов семьи удаляется объект с соответствующим id
      const family = R.reject(
        R.propEq('id', payload),
        R.prop('family', state)
      )
      return R.assoc('family', family, state || {})
    }
    case RESET: return null
    default: return state
  }
}

/**
 * Сохранение клиента
 * @param {object} payload данные из формы клиента
 */
export const saveClient = payload => {
  // Забираем необходимые поля
  let client = R.pick(
    [ 'id', 'surname', 'name', 'patronymic', 'birthDate', 'sex' ],
    payload
  )
  // Переименовываем поле id, если указан пол
  // (значит это пересохранение внутри формы)
  if (!client.sex) {
    client.idSiebel = client.id
    client = R.dissoc('id', client)
  }
  // Приводим поле "Дата рождения" к нужному формату
  client = R.over(
    R.lensProp('birthDate'),
    date => date ? new Date(date).toISOString().split('T')[0] : '',
    client
  )
  return { type: SAVE, payload: client }
}

/**
 * Сохранение членов семьи
 * @param {number} obj.offerId идентификатор ПФП
 * @param {array} obj.family список членов семьи
 */
export const saveClientFamily = ({ offerId, ...payload }) => {
  const familyAPI = new FamilyService(offerId || '')
  // По очереди сохраняем всех членов семьи,
  // выбирая функцию сохранения по наличию id
  const savedFamily = Promise.all(
    R.propOr([], 'family', payload).map(
      item => item.id
        ? familyAPI.update(item.id, item)
        : familyAPI.create(item)
    )
  )
  return { type: SAVE_FAMILY, payload: savedFamily, meta: payload }
}

/**
 * Удаление клиента
 */
export const removeClient = () => ({ type: REMOVE })

/**
 * Удаление члеоа семьи
 * @param {number} payload идентификатор удаляемого члена семьи
 */
export const removeClientFamily = payload => {
  // Возвращаем полученные значения,
  // т.к. сервер отвечает пустой строкой
  const family = Promise.resolve()
    .then(() => new FamilyService().delete(payload))
    .then(() => payload)
  return { type: REMOVE_FAMILY, payload: family }
}
