import BaseService from './BaseService'
import { PaginatedState } from '../store/reducer'

const {
  REACT_APP_ADMIN_SETTINGS
} = process.env

export class SettingsService extends BaseService {
  constructor () { super(REACT_APP_ADMIN_SETTINGS) }

  read (params = {}) {
    return super.read(params)
      .then(
        data => new PaginatedState({
          data,
          total: data.length,
          pageNumber: 1,
          pageSize: 20
        })
      )
  }

  static get name () { return 'SETTINGS/' }
}

export default SettingsService
