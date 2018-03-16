import URI from 'urijs'
import BaseService from './BaseService'

const {
  REACT_APP_ADMIN_PRODUCTS
} = process.env

export class ProductsSettingsService extends BaseService {
  constructor (id = '') {
    const url = new URI('/')
      .segment([REACT_APP_ADMIN_PRODUCTS, String(id)])
    if (id) url.segment('/settings')
    super(url.toString())
  }

  static get name () { return 'PRODUCTS_SETTINGS/' }
}

export default ProductsSettingsService
