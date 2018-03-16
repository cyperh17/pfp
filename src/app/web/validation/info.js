import Joi from 'joi-browser'

import target from './target'

const sum = Joi.number().integer().min(0)

export default Joi.object().keys({
  savings: sum
    .min(Joi.ref('$minSavings'))
    .required()
    .label('Текущие накопления'),
  investingMeans: sum
    .required()
    .label('Средства для инвестирования сегодня'),
  obligations: sum
    .required()
    .label('Суммарный объем фин. обязательств/кредитов'),
  obligationRepaymentYear: Joi
    .number()
    .min(new Date().getFullYear())
    .max(new Date().getFullYear() + 100)
    .label('Год погашения обязательств')
    .when(
      'obligations',
      { is: Joi.number().greater(0).required(), then: Joi.required() }
    ),
  idObligationRepaymentType: Joi
    .number()
    .integer()
    .min(1)
    .max(2)
    .label('Тип погашения')
    .when(
      'obligations',
      { is: Joi.number().greater(0).required(), then: Joi.required() }
    ),
  obligationInterestRate: Joi
    .when(
      'idObligationRepaymentType',
      { is: Joi.equal(1).required(), then: Joi.number().min(0).max(100).required().label('Процентная ставка') }
    )
    .when(
      'idObligationRepaymentType',
      { is: Joi.equal(2).required(), then: sum.required().label('Размер ежемесячного платежа') }
    ),
  expenditure: sum
    .required()
    .label('Совокупные ежемесячные траты'),
  income: sum
    .required()
    .label('Совокупный ежемесячный доход'),
  isAcceptCreditCard: Joi
    .boolean()
    .required()
    .label('Оформление кредитной карты'),
  idRejectionType: Joi
    .number()
    .label('Причина отказа')
    .allow(null),
  rejectionReason: Joi
    .string()
    .label('Формулировка причины')
    .when(
      'isAcceptCreditCard',
      { is: Joi.equal(false).required(), then: Joi.required() }
    ),
  finTarget: Joi
    .array()
    .items(target),
  isExistNszh: Joi
    .boolean()
    .label('Полис НСЖ'),
  nszhAmount: sum
    .label('Страховая сумма')
    .when(
      'isExistNszh',
      { is: Joi.equal(true).required(), then: Joi.required() }
    ),
  nszhYears: sum
    .label('Осталось лет')
    .when(
      'isExistNszh',
      { is: Joi.equal(true).required(), then: Joi.required() }
    )
})
.options({ allowUnknown: true })
