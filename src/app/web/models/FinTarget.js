/**
 * Финансовая цель
 */
export default class FinTarget {
  constructor (args) {
    this.id = args.id
    this.title = args.title
    this.amount = args.amount
    this.years = args.years
    this.idTypeGoalCatalog = args.idTypeGoalCatalog
    if (args.pensionSettings) {
      this.pensionPay = args.pensionSettings.pensionPay
      this.pensionPeriod = args.pensionSettings.pensionPeriod
    }
  }

  pensionAmount (income, coefficient = 1) {
    const incomeYear = income * 12
    const saving = incomeYear * this.years * coefficient
    const waste = incomeYear * this.pensionPay / 100 * this.pensionPeriod
    return waste < saving ? waste : saving
  }

  pensionPayments (income, coefficient = 1) {
    const incomeYear = income * 12
    const saving = incomeYear * this.years * coefficient
    const maxPayments = saving / (this.pensionPeriod * 12)
    const realPayments = this.amount / (this.pensionPeriod * 12)
    return realPayments < maxPayments ? realPayments : maxPayments
  }
}
