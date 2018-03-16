import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import R from 'ramda'

/**
 * Таблица результатов расчета
 */
function ResultTable (props) {
  const { products = [], result, showPeriods, savings } = props
  const list = showPeriods
    ? result
    : result.filter((item, index) => index === 0 || !!item.goals.length)
  return (
    <Table hover bordered responsive condensed className='result-table'>
      <thead>
        <tr>
          <th className='text-center'>Год</th>
          {
            products.map(
              item => (
                <th key={item.id} className='text-center'>
                  {item.displayName}
                </th>
              )
            )
          }
          {
            savings && (
              <th className='text-center'>Итого</th>
            )
          }
          <th className='text-center'>Цели</th>
        </tr>
      </thead>
      <tbody className='text-center'>
        {
          list.map(
            (item, index) => (
              <tr key={index}>
                <td>{new Date().getFullYear() + item.year}</td>
                {
                  products.map(
                    ({ id }) => {
                      const currentProduct = item.products.find(
                        value => value.id === id
                      )
                      return savings
                        ? (
                          <td key={id}>
                            {R.propOr(0, 'amount', currentProduct).toLocaleString()}
                          </td>
                        )
                        : (
                          <td key={id}>
                            {R.propOr(0, 'fee', currentProduct).toLocaleString()}
                          </td>
                        )
                    }
                  )
                }
                {
                  savings && (
                    <td>{item.total.toLocaleString()}</td>
                  )
                }
                <td>
                  {
                    item.goals.map(
                      goal => (
                        <div key={goal.id}>
                          <div>{goal.amount.toLocaleString()}</div>
                          <small className='text-muted'>
                            <em>{goal.title}</em>
                          </small>
                        </div>
                      )
                    )
                  }
                </td>
              </tr>
            )
          )
        }
      </tbody>
    </Table>
  )
}

ResultTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      displayName: PropTypes.string
    }),
  ),
  result: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number,
      savings: PropTypes.number,
      total: PropTypes.number,
      goal: PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number
      }),
      products: PropTypes.arrayOf(
        PropTypes.shape({
          product_id: PropTypes.number,
          value: PropTypes.number
        }),
      )
    }),
  ),
  showPeriods: PropTypes.bool,
  savings: PropTypes.bool
}

export default connect(
  ({ lib: { products } }) => ({ products })
)(ResultTable)
