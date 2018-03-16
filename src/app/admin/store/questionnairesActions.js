import R from 'ramda'

import {
  markingCreated,
  markingUpdated,
  markingAll,
  filterByStatus
} from './reducer'

const CREATE = 'CREATE'
const UPDATE = 'UPDATE'
const REMOVE = 'REMOVE'
const RESTORE = 'RESTORE'
const READ = 'READ'
const SAVE = 'SAVE'
const RESET = 'RESET'

export const actions = Service => ({
  create: payload => ({
    type: Service.name + CREATE,
    payload: markingCreated(payload)
  }),
  update: payload => ({
    type: Service.name + UPDATE,
    payload: markingUpdated(payload)
  }),
  remove: payload => ({
    type: Service.name + REMOVE,
    payload: markingUpdated(R.assoc('isRemoved', true, payload))
  }),
  restore: payload => ({
    type: Service.name + RESTORE,
    payload: markingUpdated(R.assoc('isRemoved', false, payload))
  }),
  read: (params, itemParams = {}) => ({
    type: Service.name + READ,
    payload: new Service().read(params)
      .then(markingAll(READ))
      // Чтение вопросов опросника
      .then(async item => R.assoc(
        'data',
        await Promise.all(
          item.data.map(
            async questionnaire => {
              const service = new Service(questionnaire.id)
              const result = await service.read(itemParams)
              return R.assoc('questions', result, questionnaire)
            }
          )
        ),
        item
      ))
  }),
  save: (payload, params) => {
    const created = filterByStatus(CREATE, payload)
    const updated = filterByStatus(UPDATE, payload)
    if (created.length) {
      created.map(
        item => new Service().create(R.dissoc('questions', item))
          .then(({ id }) => new Service(id).create(item.questions))
      )
    }
    if (updated.length) {
      updated.map(
        item => new Service().update(R.dissoc('questions', item))
          .then(({ id }) => new Service(id).update(item.questions))
      )
    }
    return {
      type: Service.name + SAVE,
      payload: new Service().read(params)
        .then(markingAll(READ))
    }
  },
  reset: () => ({
    type: Service.name + RESET
  })
})
