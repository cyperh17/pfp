import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'

import R from 'ramda'

import OfferDetailedTable from './OfferDetailedTable'

/**
 * Выводит список таблиц с предлагаемыми продуктами,
 * объединенные по категории
 */
function OfferDetailed ({ products, resultProducts }) {
  const category = R.mapObjIndexed(
    (value, key) => {
      const tmpCategory = R.find(R.propEq('id', Number(key)), products)
      if (value.length) return { ...tmpCategory, products: value }
    },
    resultProducts
  )
  return (
    <div>
      {
        R.values(category).map(
          item => item && (
            <Panel key={item.id}>
              <Panel.Heading>
                <Panel.Title componentClass='b'>{item.displayName}</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <OfferDetailedTable products={item.products} />
              </Panel.Body>
            </Panel>
          )
        )
      }
    </div>
  )
}

OfferDetailed.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      displayName: PropTypes.string
    }),
  ),
  resultProducts: PropTypes.objectOf(
    PropTypes.array
  )
}

export default connect(
  ({ lib: { products } }) => ({ products })
)(OfferDetailed)
