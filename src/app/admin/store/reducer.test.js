/* eslint-env jest */

import { createStore } from 'redux'

import HistoryService from '../services/HistoryService'

import reducer, { actions } from './reducer'

describe('Редюсер подстраивается под сервис', () => {
  let store
  let historyActions
  beforeAll(() => {
    global.sessionStorage = {
      getItem: function (key) { return this[key] },
      setItem: function (key, value) { this[key] = value },
      removeItem: function (key) { delete this[key] }
    }

    store = createStore(reducer(HistoryService))
    historyActions = actions(HistoryService)
  })

  beforeEach(() => { store.dispatch(historyActions.reset()) })

  test('Actions правильно формируют имя типа', () => {
    expect(historyActions.create().type).toBe('HISTORY/CREATE')
    expect(historyActions.read().type).toBe('HISTORY/READ')
    expect(historyActions.update().type).toBe('HISTORY/UPDATE')
    expect(historyActions.reset().type).toBe('HISTORY/RESET')
  })

  test('Начальное состояние store равно []', () => {
    expect(store.getState()).toEqual([])
  })

  test('Создание элемента', () => {
    store.dispatch(historyActions.create([ { create: true } ]))
    expect(store.getState()).toEqual([ { create: true } ])
  })

  test('Чтение элемента', () => {
    store.dispatch(historyActions.read([ { read: true } ]))
    expect(store.getState()).toEqual([ { read: true } ])
  })

  test('Обновление элемента', () => {
    store.dispatch(historyActions.create([ { id: 1, update: false } ]))
    store.dispatch(historyActions.update([ { id: 1, update: true } ]))
    expect(store.getState()).toEqual([ { id: 1, update: true } ])
  })
})
