import R from 'ramda'
import BaseService from './BaseService'

const {
  REACT_APP_ADMIN_PRODUCTS
} = process.env

export class ProductsService extends BaseService {
  constructor () { super(REACT_APP_ADMIN_PRODUCTS) }

  read (params) {
    return super.read(params)
      .then(R.evolve({
        data: R.map(
          R.evolve({
            currencyIds: value => R.mergeAll(
              R.map(
                index => ({ [index]: true }),
                value
              )
            )
          })
        )
      }))
  }

  update (data = []) {
    const newData = R.map(
      R.evolve({
        currencyIds: value => {
          const result = []
          R.forEachObjIndexed(
            (value, key) => value && result.push(key)
          )
        }
      }),
      data
    )
    return super.update(newData)
  }

  static get name () { return 'PRODUCTS/' }
}

export default ProductsService
