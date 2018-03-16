/* eslint-env jest */

import validate from './index'
import { target } from './target'

describe('Валидация финансовых целей', () => {
  test('не отображаются ошибки валидации параметров пенсии, если цель пустая', () => {
    const invalidTarget = {}
    const validationResult = validate(target)(invalidTarget)
    expect(validationResult.pensionPay).toBeUndefined()
    expect(validationResult.pensionPeriod).toBeUndefined()
  })
  test('отсутствуют ошибки при валидной цели', () => {
    const validTarget = {
      title: '1',
      amount: 1,
      years: 1,
      idTypeGoalCatalog: 1
    }
    const validationResult = validate(target)(validTarget)
    expect(validationResult).toEqual({})
  })
})
