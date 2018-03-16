import BaseService from './BaseService'

const {
  REACT_APP_ADMIN_HISTORY
} = process.env

export class HistoryService extends BaseService {
  constructor () { super(REACT_APP_ADMIN_HISTORY) }

  static get name () { return 'HISTORY/' }
}

export default HistoryService
