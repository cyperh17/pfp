import BaseService from './BaseService'

const {
  REACT_APP_ADMIN_PRODUCT_CATEGORY
} = process.env

export class ProductCategoryService extends BaseService {
  constructor () { super(REACT_APP_ADMIN_PRODUCT_CATEGORY) }

  static get name () { return 'PRODUCT_CATEGORY/' }
}

export default ProductCategoryService
