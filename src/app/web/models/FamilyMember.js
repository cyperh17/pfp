import differenceInYears from 'date-fns/difference_in_years'

/**
 * Член семьи
 */
export default class FamilyMember {
  constructor (args) {
    this.id = args.id
    this.idKinship = args.idKinship
    this.name = args.name
    this.birthDate = args.birthDate
  }

  get age () {
    const { birthDate } = this
    return Math.abs(differenceInYears(birthDate, Date.now()))
  }
}
