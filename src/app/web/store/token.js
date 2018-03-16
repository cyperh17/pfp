/* eslint-env browser */

import jwtDecode from 'jwt-decode'

const prefix = 'TOKEN/'

const ADD = prefix + 'ADD'
const DEL = prefix + 'DEL'

/**
 * Редюсер для работы с токеном
 */
export default (state = null, { type, payload }) => {
  switch (type) {
    case ADD: return payload
    case DEL: return null
    default: return state
  }
}

/**
 * Чтение и расшифровка токена из sessionStorage
 */
export const add = () => {
  const token = jwtDecode(sessionStorage.getItem('token'))
  const readOnly = token.role.toLowerCase() !== 'managers'
  const isAdmin = token.isAdmin
  return {
    type: ADD,
    payload: { ...token, readOnly, isAdmin }
  }
}

/**
 * Удаление данных токена
 */
export const del = () => {
  sessionStorage.removeItem('token')
  return { type: DEL }
}
