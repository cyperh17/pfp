import React from 'react'
import PropTypes from 'prop-types'
import { Button, Table } from 'react-bootstrap'
import R from 'ramda'

/**
 * Компонент таблицы категории продукта,
 * в которой выводятся конкретные предложения
 * по продуктам
 */
export default function OfferDetailedTable ({ products = [] }) {
  return (
    <Table hover responsive>
      <thead>
        <tr>
          <th>Продукт</th>
          <th>Валюта</th>
          <th>Макс. ставка</th>
          <th>Срок, лет</th>
          <th>Мин. сумма</th>
          <th>Взнос, руб</th>
          <th>Выплата %</th>
          <th>Пополнение</th>
          <th>Снятие</th>
          <th style={{ width: '30%' }}>Комментарий</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {
          products.map(
            item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.currencies.join(', ')}</td>
                <td>{item.maxBid}</td>
                <td>{range('term', item)}</td>
                <td>{item.minSum}</td>
                <td>{range('amount', item)}</td>
                <td>{item.interestPayment}</td>
                <td>{item.refill ? '+' : '-'}</td>
                <td>{item.cut ? '+' : '-'}</td>
                <td>
                  <small className='text-muted'>
                    Допустимый возраст клиента {range('clientAge', item)} лет
                  </small>
                </td>
                <td>
                  <Button
                    bsStyle='primary'
                    bsSize='sm'
                    onClick={() => { window.open(item.url || '/') }}
                  >
                    Оформить
                  </Button>
                </td>
              </tr>
            )
          )
        }
      </tbody>
    </Table>
  )
}

OfferDetailedTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      url: PropTypes.string
    })
  )
}

function range (field = '', obj = {}) {
  const min = obj[field + 'Min']
  const max = obj[field + 'Max']
  if (R.is(Number, min) && R.is(Number, max)) return `${min.toLocaleString()} - ${max.toLocaleString()}`
  if (R.is(Number, min)) return `от ${min.toLocaleString()}`
  if (R.is(Number, max)) return `до ${max.toLocaleString()}`
  return ''
}
