import R from 'ramda'
import Joi from 'joi-browser'

import errorsMessages from './errorsMessages'

import clientSchema from './client'
import familySchema, { familyArray as familyArraySchema } from './family'
import infoSchema from './info'
import targetSchema, { targetsArray as targetsArraySchema } from './target'
import {
  fioBirthDate,
  fioPhone,
  passport,
  phone
} from './identification'

const validate = schema => (context = {}) => values => {
  if (!schema.validate) schema = Joi.object(schema)
  const { error } = schema.validate(
    values,
    {
      abortEarly: false,
      language: errorsMessages,
      context
    }
  )
  return R.mergeAll(
    R.map(
      item => R.assocPath(item.path, item.message, {}),
      R.propOr([], 'details', error)
    )
  )
}

export const info = validate(infoSchema)
export const target = validate(targetSchema)
export const targetsArray = validate(targetsArraySchema)
export const client = validate(clientSchema)
export const family = validate(familySchema)
export const familyArray = validate(familyArraySchema)
export const identification = {
  fioBirthDate: validate(fioBirthDate),
  fioPhone: validate(fioPhone),
  passport: validate(passport),
  phone: validate(phone)
}
export default validate
