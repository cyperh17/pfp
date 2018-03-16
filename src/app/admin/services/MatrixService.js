import BaseService from './BaseService'

const {
  REACT_APP_ADMIN_MATRIX
} = process.env

export class MatrixService extends BaseService {
  constructor () { super(REACT_APP_ADMIN_MATRIX) }

  static get name () { return 'MATRIX/' }
}

export default MatrixService
