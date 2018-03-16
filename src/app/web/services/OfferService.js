import BaseService from './BaseService'

const { REACT_APP_PFP } = process.env

/**
 * Сервис для работы с ПФП
 */
export class OfferService extends BaseService {
  constructor (id, suffix = '') {
    const offerAddr = id ? id + '/' : REACT_APP_PFP
    super(offerAddr + suffix)
  }
}

export default OfferService
