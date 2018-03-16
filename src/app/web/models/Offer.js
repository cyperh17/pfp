import R from 'ramda'

import Client from './Client'
import FamilyMember from './FamilyMember'
import FinInfo from './FinInfo'
import FinTarget from './FinTarget'
import Polis from './Polis'

/**
 * Персональное финансовое предложение
 */
export default class Offer {
  constructor (args) {
    this.id = args.id
    this.client = new Client(args.client)
    this.family = R.defaultTo([], args.family)
      .map(member => new FamilyMember(member))
    this.finInfo = new FinInfo(R.pathOr({}, ['finInfo'], args))
    if (
      R.path(['finInfo', 'insurance', 'nszhAmount'], args) ||
      R.path(['finInfo', 'insurance', 'nszhYears'], args)
    ) {
      this.polis = new Polis(R.path(['finInfo', 'insurance'], args))
    }
    this.finTarget = R.defaultTo([], args.finGoals)
      .map(target => new FinTarget(target))
    this.created = new Date(args.created)
    this.profile = args.riskProfile
    this.status = args.status
  }
}
