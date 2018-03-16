/* eslint-env jest */

import validate from './index'
import info from './info'

describe('Валидация финансовой информации', () => {
  test('корректо присваиваются имена полей', () => {
    let invalidInfo
    let validationResult
    invalidInfo = { obligations: 1, idObligationRepaymentType: 1 }
    validationResult = validate(info)(invalidInfo)
    expect(validationResult.obligationInterestRate).toMatch('Процентная ставка')
    invalidInfo = { obligations: 1, idObligationRepaymentType: 2 }
    validationResult = validate(info)(invalidInfo)
    expect(validationResult.obligationInterestRate).toMatch('Размер ежемесячного платежа')
  })
  test('отсутствуют ошибки при валидной информации', () => {
    const validInfo = {
      savings: 2000000,
      investingMeans: 1,
      obligations: 0,
      expenditure: 1,
      income: 1,
      isAcceptCreditCard: true,
      finTarget: []
    }
    const validationResult = validate(info)(validInfo)
    expect(validationResult).toEqual({})
  })
})
