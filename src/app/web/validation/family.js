import Joi from 'joi-browser'

const day = '(0[1-9]|[12][0-9]|3[01])'
const month = '(0[1-9]|1[012])'
const year = '(19[0-9][0-9]|20[0-9][0-9])'
const date = new RegExp(`${year}-${month}-${day}`)

const family = Joi.object().keys({
  id: Joi.number(),
  name: Joi
    .string()
    .required()
    .label('Имя'),
  birthDate: Joi
    .string()
    .regex(date, 'даты')
    .isoDate()
    .required()
    .label('Дата рождения'),
  idKinship: Joi
    .number()
    .integer()
    .required()
    .label('Степень родства')
})

export const familyArray = {
  family: Joi.array().items(family)
}

export default family
