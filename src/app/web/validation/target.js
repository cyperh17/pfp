import Joi from 'joi-browser'

const sum = Joi.number().integer().min(0)

export const target = Joi.object().keys({
  id: Joi.number(),
  title: Joi
    .string()
    .required()
    .label('Название'),
  amount: sum
    .required()
    .label('Сумма'),
  years: sum
    .max(100)
    .required()
    .label('Лет до'),
  idTypeGoalCatalog: Joi
    .number()
    .integer()
    .required()
    .label('Тип цели'),
  pensionPay: Joi
    .number()
    .min(10)
    .max(100)
    .label('Выплаты на пенсии')
    .when(
      'idTypeGoalCatalog',
      { is: Joi.equal(4, 5).required(), then: Joi.required() }
    ),
  pensionPeriod: Joi
    .number()
    .min(1)
    .max(30)
    .label('Ожидаемый период выплаты')
    .when(
      'idTypeGoalCatalog',
      { is: Joi.equal(4, 5).required(), then: Joi.required() }
    )
})

export const targetsArray = {
  finTarget: Joi.array().items(target)
}

export default target
