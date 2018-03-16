import R from 'ramda'
import shortId from 'shortid'

const CREATE = 'CREATE'
const UPDATE = 'UPDATE'
const REMOVE = 'REMOVE'
const RESTORE = 'RESTORE'
const READ = 'READ'
const SAVE = 'SAVE'
const RESET = 'RESET'

export class PaginatedState {
  constructor (args = {}) {
    const defaultProp = R.curry(
      (prop, value, obj) => R.defaultTo(value, R.prop(prop, obj))
    )
    this.pageNumber = defaultProp('pageNumber', 0, args)
    this.pageSize = defaultProp('pageSize', 0, args)
    this.total = defaultProp('total', 0, args)
    this.data = defaultProp('data', [], args)
    this.isModified = false
  }

  create (value) {
    this.data = R.append(value, this.data)
    this.isModified = true
    this.total += 1
    return this
  }

  // Обновляет элемент массива по ключу
  updateBy (prop, value) {
    this.data = R.update(
      R.findIndex(
        R.propEq(prop, R.prop(prop, value)),
        this.data
      ),
      value,
      this.data
    )
    this.isModified = true
    return this
  }
}

export const setLocalId = R.assoc('id', shortId.generate())

// Маркирует объект статусом
export const marking = R.curry(
  (status, obj) => R.assoc('status', status, obj)
)

export const markingCreated = value => marking(CREATE, setLocalId(value))
export const markingUpdated = value => R.propEq('status', CREATE, value)
  ? value
  : marking(UPDATE, value)

// Маркирует данные статусом
export const markingAll = R.curry(
  (status, obj) => R.assoc(
    'data',
    R.map(
      R.assoc('status', status),
      R.prop('data', obj)
    ),
    obj
  )
)

// Фильтрует по статусу
export const filterByStatus = R.curry(
  (status, obj) => R.filter(R.propEq('status', status), obj)
)

export default (Service, uniqProp = 'id') =>
  (state = new PaginatedState(), { type, payload = {} }) => {  // NOSONAR
    switch (type) {
      case Service.name + CREATE:
        return new PaginatedState(state).create(payload)

      case Service.name + UPDATE:
      case Service.name + REMOVE:
      case Service.name + RESTORE:
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
  read: (id, payload) => ({
    type: Service.name + READ,
    payload: new Service(id).read(payload)
      .then(markingAll(READ))
  }),
  save: (id, payload, params) => {
    const service = new Service(id)
    const created = filterByStatus(CREATE, payload)
    const updated = filterByStatus(UPDATE, payload)
    if (created.length) service.create(created)
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
