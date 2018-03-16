/* eslint-env browser */

import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { reducer as toastrReducer } from 'react-redux-toastr'
import { reducer as formReducer } from 'redux-form'

import lib, { load as loadLib } from './lib'
import offer from './offer'
import offerList from './offerList'
import profile from './profile'
import token, { add as readToken } from './token'

const {
  REACT_APP_LIB_SETTINGS,
  REACT_APP_LIB_PRODUCTS,
  REACT_APP_LIB_RESULTS,
  REACT_APP_LIB_KINSHIPS,
  REACT_APP_LIB_OBLIGATIONS,
  REACT_APP_LIB_CARD_REJECTION,
  REACT_APP_LIB_TARGETS,
  REACT_APP_LIB_QUESTIONARY
} = process.env

// Комбинирование редюсеров
const reducers = combineReducers({
  form: formReducer,
  toastr: toastrReducer,
  lib: combineReducers({
    settings: lib(REACT_APP_LIB_SETTINGS),
    products: lib(REACT_APP_LIB_PRODUCTS),
    pfpResult: lib(REACT_APP_LIB_RESULTS),
    kinship: lib(REACT_APP_LIB_KINSHIPS),
    obligationType: lib(REACT_APP_LIB_OBLIGATIONS),
    creditCardRejectionType: lib(REACT_APP_LIB_CARD_REJECTION),
    finTargetType: lib(REACT_APP_LIB_TARGETS),
    questionary: lib(REACT_APP_LIB_QUESTIONARY)
  }),
  offer,
  offerList,
  profile,
  token
})

// Подключение браузерного расширения для Redux
const dev = process.env.NODE_ENV === 'development'
const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

let composeEnhancers = dev && devTools ? devTools : compose

export default () => {
  const store = createStore(
    reducers,
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware,
        promiseMiddleware()
      )
    )
  )

  if (sessionStorage.getItem('token')) {
    // Чтение токена
    store.dispatch(readToken());
    // Загрузка справочников
    [
      REACT_APP_LIB_SETTINGS,
      REACT_APP_LIB_PRODUCTS,
      REACT_APP_LIB_RESULTS,
      REACT_APP_LIB_KINSHIPS,
      REACT_APP_LIB_OBLIGATIONS,
      REACT_APP_LIB_CARD_REJECTION,
      REACT_APP_LIB_TARGETS,
      REACT_APP_LIB_QUESTIONARY
    ].forEach(lib => store.dispatch(loadLib(lib)))
  }

  return store
}
