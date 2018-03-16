import BaseService from './BaseService'

const {
  REACT_APP_ADMIN_USERS
} = process.env

export class UsersService extends BaseService {
  constructor () { super(REACT_APP_ADMIN_USERS) }

  static get name () { return 'USERS/' }
}

export default UsersService
