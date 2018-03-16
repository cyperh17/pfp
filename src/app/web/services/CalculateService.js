import OfferService from './OfferService'

const { REACT_APP_PFP_CALCULATE } = process.env

/**
 * Сервис расчета финансового предложения
 */
export class CalculateService extends OfferService {
  constructor (offerId) { super(offerId, REACT_APP_PFP_CALCULATE) }

  create (data, id = '') {
    return this.server.post(this.url + id, data)
      .then(
        res => {
          if (res.status === 204) return { status: res.status, ...res.data }
          return res.data
        }
      )
      .catch(console.error)
  }
}

export default CalculateService
