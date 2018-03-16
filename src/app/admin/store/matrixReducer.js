import R from 'ramda'

import {
  PaginatedState,
  markingUpdated,
  markingAll,
  filterByStatus
} from './reducer'

const UPDATE = 'UPDATE'
const READ = 'READ'
const SAVE = 'SAVE'
const RESET = 'RESET'

const boxedIds = [ 16, 17, 18 ]
const markingIsBox = R.assoc('isBox')
const isBoxedProduct = obj => R.contains(R.prop('productCategoryId', obj), boxedIds)

export default (Service, uniqProp = 'productCategoryId') =>
  (state = new PaginatedState(), { type, payload = {} }) => {  // NOSONAR
    switch (type) {
      case Service.name + UPDATE:
        return new PaginatedState(state).updateBy(uniqProp, payload)

      case Service.name + READ + '_FULFILLED':
      case Service.name + READ:
      case Service.name + SAVE + '_FULFILLED':
      case Service.name + SAVE: return new PaginatedState(payload)

      case Service.name + RESET: return new PaginatedState()
      default: return state
    }
  }

export const actions = Service => ({
  update: payload => ({
    type: Service.name + UPDATE,
    payload: markingUpdated(payload)
  }),
  read: payload => ({
    type: Service.name + READ,
    payload: new Service().read(payload)
      .then(R.map(item => markingIsBox(isBoxedProduct(item), item)))
      .then(data => new PaginatedState({ data, total: data.length, pageNumber: 1, pageSize: 20 }))
      .then(markingAll(READ))
  }),
  save: (payload, params) => {
    const service = new Service()
    const updated = filterByStatus(UPDATE, payload)
    if (updated.length) service.update(updated)
    return {
      type: Service.name + SAVE,
      payload: service.read(params)
        .then(markingAll(READ))
    }
  },
  reset: () => ({
    type: Service.name + RESET
  })
})
