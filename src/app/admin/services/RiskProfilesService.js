import BaseService from './BaseService'

const {
  REACT_APP_ADMIN_RISK_PROFILES
} = process.env

export class RiskProfilesService extends BaseService {
  constructor () { super(REACT_APP_ADMIN_RISK_PROFILES) }

  static get name () { return 'RISK_PROFILES/' }
}

export default RiskProfilesService
