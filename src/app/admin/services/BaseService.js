/* eslint-env browser */

import axios from 'axios'
import URI from 'urijs'

const {
  REACT_APP_SERVER_ADDR = ''
} = window.ENV

const {
  REACT_APP_SERVER_URL,
  REACT_APP_ADMIN_PREFIX
} = process.env

/**
 * Базовый сервис для общения с сервером ПФП
 */
export class BaseService {
  constructor (url = '') {
    this.url = url
    const Authorization = `Bearer ${sessionStorage.getItem('token')}`
    const baseURL = new URI(REACT_APP_SERVER_ADDR)
      .segment(REACT_APP_SERVER_URL)
      .segment(REACT_APP_ADMIN_PREFIX)
      .toString()
    this.server = axios.create({ baseURL, headers: { Authorization } })
  }

  create (data = []) {
    return this.server.post(this.url, data)
      .then(res => res.data)
      .catch(console.error)
  }

  read (params = {}) {
    return this.server.get(this.url, { params })
      .then(res => res.data)
      .catch(console.error)
  }

  update (data = []) {
    return this.server.put(this.url, data)
      .then(res => res.data)
      .catch(console.error)
  }
}

export default BaseService
