import { combineReducers } from 'redux'

import client from './client'
import id from './id'
import identification from './identification'
import info from './info'
import profile from './profile'

export default combineReducers({
  client,
  id,
  identification,
  info,
  profile
})

export * from './client'
export * from './id'
export * from './identification'
export * from './info'
export * from './profile'
export * from './reset'
