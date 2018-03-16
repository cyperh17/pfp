const READ = 'READ'
const RESET = 'RESET'

export default Service =>
  (state = [], { type, payload }) => {  // NOSONAR
    switch (type) {
      case Service.name + 'LIST/' + READ + '_FULFILLED':
      case Service.name + 'LIST/' + READ: return payload
      case Service.name + 'LIST/' + RESET: return []
      default: return state
    }
  }

export const actions = Service => ({
  read: payload => ({
    type: Service.name + 'LIST/' + READ,
    payload: new Service().read(payload)
  }),
  reset: () => ({
    type: Service.name + 'LIST/' + RESET
  })
})
