import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import R from 'ramda'
import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts'

import materialColors from '../../utils/materialColors'

/**
 * График взносов и накоплений
 */
const TotalChart = ({ data, amount, libProducts }) => {
  // Разворачивает вложенные массивы в плоскую структуру
  const expand = arrKey => obj => {
    obj[arrKey].forEach(
      item => {
        R.mapObjIndexed(
          (value, key) => {
            Object.assign(obj, { [`${arrKey}_${item.id}_${key}`]: value })
          },
          item
        )
      }
    )
    return R.dissoc(arrKey, obj)
  }
  let chartData = R.map(expand('products'), data)
  chartData = R.map(expand('goals'), chartData)
  chartData = R.map(
    item => R.assoc('year', item.year + new Date().getFullYear(), item),
    chartData
  )
  // Вычисляет количество продуктов и целей
  const uniqList = (field, list) => R.uniqWith(
    R.eqBy(R.prop('id')),
    R.reduce((acc, item) => R.concat(acc, item[field]), [], list)
  )
  const products = R.map(
    item => {
      const currentProduct = R.find(R.propEq('id', item.id), libProducts)
      return R.assoc('name', currentProduct.displayName, item)
    },
    uniqList('products', data)
  )
  const goals = uniqList('goals', data)
  // Подбирает цвета
  const colors = materialColors(data[0].products.length)
  return (
    <ComposedChart width={1000} height={300} data={chartData}>
      <XAxis dataKey='year' />
      <YAxis />
      <Tooltip />
      <Legend
        align='right'
        verticalAlign='middle'
        layout='vertical'
      />
      <CartesianGrid stroke='#f5f5f5' />
      {
        products.map(
          (item, index) => (
            <Area
              name={item.name}
              stackId='products'
              dataKey={`products_${item.id}_${amount ? 'amount' : 'fee'}`}
              stroke={colors[index]}
              fill={colors[index]}
            />
          )
        )
      }
      {
        amount &&
        goals.map(
          item => (
            <Bar
              dataKey={`goals_${item.id}_amount`}
              name={item.title}
              barSize={15}
              fill={materialColors(1)[0]}
            />
          )
        )
      }
    </ComposedChart>
  )
}

TotalChart.propTypes = {
  data: PropTypes.array.isRequired,
  amount: PropTypes.bool,
  libProducts: PropTypes.array
}

export default connect(
  ({ lib: { products } }) => ({ libProducts: products })
)(TotalChart)
