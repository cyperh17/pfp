/* eslint-env browser */

import BaseService from './BaseService'

const {
  REACT_APP_LIB_PREFIX,
  REACT_APP_LIB_SETTINGS
} = process.env

/**
 * Сервис получения справочников
 */
export class LibService extends BaseService {
  constructor (name = '') {
    super(REACT_APP_LIB_PREFIX + name)
    this.name = name
  }

  readAll (params = {}) {
    if (this.name === REACT_APP_LIB_SETTINGS) {
      return super.readAll(params)
        .then(data => {
          data.forEach(item => sessionStorage.setItem(item.key, item.value))
          return data
        })
    } else {
      return super.readAll(params)
    }
  }
}

export default LibService
