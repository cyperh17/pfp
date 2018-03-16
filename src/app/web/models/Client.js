import R from 'ramda'
import differenceInYears from 'date-fns/difference_in_years'

/**
 * Клиент. Используется при формировании профиля
 */
export default class Client {
  constructor (args) {
    this.id = args.id
    this.idSiebel = args.idSiebel
    this.surname = args.surname
    this.name = args.name
    this.patronymic = args.patronymic
    if (args.birthDate) {
      this.birthDate = args.birthDate
    }
    this.sex = args.sex
  }

  get fio () {
    const {
      surname = '',
      name = '',
      patronymic = ''
    } = this
    return `${surname} ${name} ${patronymic}`
  }

  get age () {
    const { birthDate } = this
    return Math.abs(differenceInYears(birthDate, Date.now()))
  }

  static fromSiebel (client) {
    client.idSiebel = client.id
    client = R.dissoc('id', client)
    if (client.birthDate) {
      client.birthDate = new Date(client.birthDate).toISOString().split('T')[0]
    }
    return new Client(client)
  }
}
