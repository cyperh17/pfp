import URI from 'urijs'
import BaseService from './BaseService'

const {
  REACT_APP_ADMIN_REFERENCES
} = process.env

export class ReferencesService extends BaseService {
  constructor (id = '') {
    const url = new URI('/')
      .segment([REACT_APP_ADMIN_REFERENCES, String(id)])
      .toString()
    super(url)
  }

  static get name () { return 'REFERENCES/' }
}

export default ReferencesService
