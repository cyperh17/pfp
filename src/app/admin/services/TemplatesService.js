import URI from 'urijs'
import BaseService from './BaseService'

const {
  REACT_APP_ADMIN_TEMPLATES
} = process.env

export class TemplatesService extends BaseService {
  constructor (id = '') {
    const url = new URI('/')
      .segment([REACT_APP_ADMIN_TEMPLATES, String(id)])
      .toString()
    super(url)
  }

  static get name () { return 'TEMPLATES/' }
}

export default TemplatesService
