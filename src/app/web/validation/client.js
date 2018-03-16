import Joi from 'joi-browser'

import { familyArray } from './family'

const day = '(0[1-9]|[12][0-9]|3[01])'
const month = '(0[1-9]|1[012])'
const year = '(19[0-9][0-9]|20[0-9][0-9])'
const date = new RegExp(`${year}-${month}-${day}`)

export const client = Joi.object().keys({
  id: Joi.any(),
  idSiebel: Joi.any(),
  surname: Joi.string(),
  name: Joi.string(),
  patronymic: Joi.string(),
  birthDate: Joi
    .string()
    .regex(date, 'даты')
    .isoDate()
    .required()
    .label('Дата рождения'),
  sex: Joi
    .string()
    .valid('male', 'female')
    .required()
    .label('Пол')
})

export default client.keys(familyArray)
