/* eslint-env browser */

import axios from 'axios'

const {
  REACT_APP_SERVER_ADDR = ''
} = window.ENV

const {
  REACT_APP_SERVER_URL
} = process.env

/**
 * Базовый сервис для общения с сервером ПФП
 */
export class BaseService {
  constructor (url = '') {
    this.url = url
    this.server = axios.create({
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      baseURL: REACT_APP_SERVER_ADDR + REACT_APP_SERVER_URL
    })
  }

  create (data, id = '') {
    return this.server.post(this.url + id, data)
      .then(res => res.data)
      .catch(console.error)
  }

  read (id, params = {}) {
    return this.server.get(this.url + id, { params })
      .then(res => res.data)
      .catch(console.error)
  }

  readAll (params = {}) {
    return this.server.get(this.url, { params })
      .then(res => res.data)
      .catch(console.error)
  }

  update (id, data) {
    return this.server.put(this.url + id, data)
      .then(res => res.data)
      .catch(console.error)
  }

  delete (id) {
    return this.server.delete(this.url + id)
      .then(res => res.data)
      .catch(console.error)
  }
}

export default BaseService
