import R from 'ramda'

/**
 * Финансовая информация
 */
export default class FinInfo {
  constructor (args) {
    this.income = R.defaultTo(0, args.income)
    this.expenditure = R.defaultTo(0, args.expenditure)
    this.savings = R.defaultTo(0, args.savings)
    this.investingMeans = R.defaultTo(0, args.investingMeans)
    this.obligations = R.defaultTo(0, args.obligations)
    this.annualIncome = R.defaultTo(0, args.annualIncome)
    this.investmentReserve = R.defaultTo(0, args.investmentReserve)
  }
}
