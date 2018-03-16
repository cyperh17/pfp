import { combineReducers } from 'redux'

import offer from './offer'
import result from './result'

export default combineReducers({
  offer,
  result
})

export * from './offer'
export * from './result'
