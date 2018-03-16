import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { Cell, PieChart, Pie, Legend, Tooltip } from 'recharts'

import R from 'ramda'

import materialColors from '../../utils/materialColors'

/**
 * Диаграмма распределения продуктов в портфеле
 */
function OfferProducts ({ products, persents }) {
  const result = R.mapObjIndexed(
    (value, key) => {
      const currentProduct = R.find(R.propEq('id', Number(key)), products)
      const formattedValue = value.toLocaleString(
        'ru',
        {
          minimumIntegerDigits: 2,
          minimumFractionDigits: 2,
          useGrouping: false
        }
      )
      return {
        id: currentProduct.id,
        name: `(${formattedValue} %) ${currentProduct.displayName}`,
        persent: value
      }
    },
    persents
  )
  const colors = materialColors(R.values(result).length)
  return (
    <Row>
      <Col lg={12}>
        <PieChart width={1000} height={300}>
          <Pie
            data={R.sortBy(R.prop('persent'), R.values(result)).reverse()}
            dataKey='persent'
            cx='50%'
            cy='50%'
            outerRadius='60%'
            innerRadius='35%'
            fill='#8884d8'
            isAnimationActive={false}
            label
            minAngle={12}
            paddingAngle={1}
          >
            {
              R.values(result).map(
                (_, index) => <Cell key={index} fill={colors[index]} />
              )
            }
          </Pie>
          <Tooltip />
          <Legend
            align='right'
            verticalAlign='middle'
            layout='vertical'
            iconType='circle'
          />
        </PieChart>
      </Col>
    </Row>
  )
}

OfferProducts.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      displayName: PropTypes.string
    })
  ),
  persents: PropTypes.objectOf(
    PropTypes.number
  )
}

export default connect(
  ({ lib: { products } }) => ({ products })
)(OfferProducts)
