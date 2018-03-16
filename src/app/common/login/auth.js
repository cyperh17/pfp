/* eslint-env browser */

import axios from 'axios'

const {
  REACT_APP_SERVER_ADDR = ''
} = window.ENV

const {
  REACT_APP_SERVER_URL,
  REACT_APP_AUTH_URL
} = process.env

/**
 * Функция получения токена на сервере
 */
export default ({ login = '', password = '' }) => axios({
  baseURL: REACT_APP_SERVER_ADDR + REACT_APP_SERVER_URL,
  url: REACT_APP_AUTH_URL,
  method: 'GET',
  headers: {
    Authorization: 'Basic ' + btoa(login + ':' + password),
    'Content-Type': 'application/json'
  }
})
  .then(response => response.data)
  .catch(response => ({ status: response.response.status }))
