import {
  ClientService,
  FamilyService,
  TargetService,
  ProfileService,
  OfferService
} from '../../services'

import { prefix as folderPrefix } from './_prefix'

const prefix = folderPrefix + 'OFFER/'

const ADD = prefix + 'ADD'
const DEL = prefix + 'DEL'

/**
 * Редюсер ПФП для профиля
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
 * Загрузить данные ПФП
 * @param {number} payload идентификатор ПФП
 */
export const addOffer = payload => ({
  type: ADD,
  payload: Promise.all([
    new OfferService().read(payload),
    new ClientService(payload).readAll(),
    new FamilyService(payload).readAll(),
    new TargetService(payload).readAll(),
    new ProfileService(payload).readAll()
  ]).then(res => ({
    ...res[0],
    client: res[1],
    family: res[2],
    finGoals: res[3],
    questionnaire: res[4]
  }))
})

/**
 * Удалить данные ПФП
 */
export const delOffer = () => ({ type: DEL })
