/* eslint-env browser */

import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { reducer as toastrReducer } from 'react-redux-toastr'
import { reducer as formReducer } from 'redux-form'

import token, { add as readToken } from './token'

import reducer from './reducer'
import matrixReducer from './matrixReducer'
import listReducer from './listReducer'

import HistoryService from '../services/HistoryService'
import MatrixService from '../services/MatrixService'
import ProductCategoryService from '../services/ProductCategoryService'
import ProductsService from '../services/ProductsService'
import ProductsSettingsService from '../services/ProductsSettingsService'
import QuestionnairesService from '../services/QuestionnairesService'
import ReferencesService from '../services/ReferencesService'
import RiskProfilesService from '../services/RiskProfilesService'
import SettingsService from '../services/SettingsService'
import TemplatesService from '../services/TemplatesService'
import UsersService from '../services/UsersService'

// Комбинирование редюсеров
const reducers = combineReducers({
  form: formReducer,
  toastr: toastrReducer,
  token,
  History: reducer(HistoryService),
  Matrix: matrixReducer(MatrixService),
  ProductCategory: reducer(ProductCategoryService),
  Products: reducer(ProductsService),
  ProductsSettings: listReducer(ProductsSettingsService),
  ProductsSettingsSelected: reducer(ProductsSettingsService),
  Questionnaires: reducer(QuestionnairesService),
  References: listReducer(ReferencesService),
  ReferenceSelected: reducer(ReferencesService),
  RiskProfiles: reducer(RiskProfilesService),
  Settings: reducer(SettingsService),
  Templates: reducer(TemplatesService),
  Users: reducer(UsersService)
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
    store.dispatch(readToken())
  }

  return store
}
