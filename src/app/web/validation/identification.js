import Joi from 'joi-browser'

const day = '(0[1-9]|[12][0-9]|3[01])'
const month = '(0[1-9]|1[012])'
const year = '(19[0-9][0-9]|20[0-9][0-9])'
const date = new RegExp(`${year}-${month}-${day}`)
const phoneNumber = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
const passportSeria = /^\d{2} \d{2}$/
const passportNumber = /^\d{6}$/

export const fioBirthDate = Joi.object().keys({
  lastname: Joi.string().required().label('Фамилия'),
  firstname: Joi.string().required().label('Имя'),
  middlename: Joi.string().required().label('Отчество'),
  birthDate: Joi
    .string()
    .regex(date, 'даты')
    .isoDate()
    .required()
    .label('Дата рождения')
})

export const fioPhone = Joi.object().keys({
  lastname: Joi.string().required().label('Фамилия'),
  firstname: Joi.string().required().label('Имя'),
  middlename: Joi.string().required().label('Отчество'),
  mobilePhone: Joi
    .string()
    .regex(phoneNumber, 'телефона')
    .required()
    .label('Мобильный телефон')
})

export const passport = Joi.object().keys({
  passportSeria: Joi
    .string()
    .regex(passportSeria, 'серии паспорта')
    .required()
    .label('Серия паспорта'),
  passportNumber: Joi
    .string()
    .regex(passportNumber, 'номера паспорта')
    .required()
    .label('Номер паспорта')
})

export const phone = Joi.object().keys({
  mobilePhone: Joi
    .string()
    .regex(phoneNumber, 'телефона')
    .required()
    .label('Мобильный телефон')
})
